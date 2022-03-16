const fs = require('fs/promises');
const { fork } = require('child_process');
const terser = require('terser');
const CleanCSS = require('clean-css');
const path = require('path');
const packageinfo = require('../../package.json');

module.exports = class StaticCompiler {
  constructor(components, pathname, options = { lang: 'en', title: 'nova', isBuilding: false, customScripts: [], importComponents: [] }) {
    this.HTMLDocument = '';
    this.JSDocument = '';
    this.CSSDocument = '';
    this.components = components || [];
    this.options = options;
    this.cwd = '';
    this.home = '';
    this.pathname = pathname;
    this.pagesFolderName = 'pages';
  }

  async fullBuild() {
    this.home = await this._findHome(process.cwd());
    const pagesDir = path.join(this.home, this.pagesFolderName);
    await this._recurisveDirRead(pagesDir);
    await this._copyNova();

    return pagesDir;
  }


  async watch() {
    try {
      const pagesDir = await this.fullBuild();
      const watcher = fs.watch(pagesDir, { recursive: true })
      for await (const event of watcher) {
        const filepath = path.join(pagesDir, event.filename.replace(/\/.+/, ''), 'page.js');
        this._executeChild(filepath)
      }

    } catch (e) {
      console.error(e);
    }
  }

  async _findHome(root) {
    const assumedPath = path.join(root, 'package.json');

    try {
      await fs.access(assumedPath)
      return path.resolve(assumedPath, '..');
    } catch (e) {
      if (e.errno === -2)
        return await this._findHome(path.resolve(root, '..'));
    }
  }

  async _cleanOutRequire(buffer) {
    let counter, matchCounter, newBuffer;
    newBuffer = buffer;
    const novaMatch = Buffer.from('@nova');
    for (counter = 0; counter < buffer?.length; counter++) {
      matchCounter = 0;
      while (buffer[counter] === novaMatch[matchCounter]) {
        if (novaMatch.length - 1 === matchCounter) {
          while (buffer[counter] !== 10)
            counter++;
          newBuffer = buffer.slice(counter, buffer.length - 1);
          return newBuffer;
        }

        counter++;
        matchCounter++;
      }
    }

    return newBuffer;
  }

  async _executeChild(modulePath) {
    const child = fork(modulePath);
    child.on('spawn', () => {
      console.log(`Executing ${modulePath}`);
    })

    child.on('error', () => {
      console.log(`FAILED: ${modulePath}`);
    })

    child.on('exit', (code) => {
      console.log(`Process exited with code ${code}`)
    })
  }

  /**
   * Imports components from other page
   */
  async _importPageComponents() {
    for (const dir of this.options.importComponents) {
      const folderpath = path.join(this.home, this.pagesFolderName, dir.page, 'components', dir.component);
      await this._recurisveDirRead(folderpath);
    }
  }

  async _recurisveDirRead(folderpath) {
    const res = await fs.readdir(folderpath);
    for (let i = 0; i < res.length; i++) {
      switch (res[i]) {
        case 'dynamic.js':
          let JSBuffer = await fs.readFile(path.join(folderpath, res[i]));
          JSBuffer = await this._cleanOutRequire(JSBuffer)
          this.JSDocument += JSBuffer.toString();
          this.JSDocument += '\n';
          break;
        case 'styles.css':
          const CSSBuffer = await fs.readFile(path.join(folderpath, res[i]));
          this.CSSDocument += CSSBuffer.toString();
          this.CSSDocument += '\n';
          break;
        case 'page.js': {
          if (this.options.isBuilding) {
            const modulePath = path.join(folderpath, res[i]);
            this._executeChild(modulePath);
          }
          break;
        }
      }
      if (!/\./.test(res[i]))
        await this._recurisveDirRead(path.join(folderpath, res[i]))
    }
  }


  async _readFiles() {
    const folderpath = path.join(this.home, this.pagesFolderName, this.pathname)
    try {
      await fs.access(folderpath);
      if (this.options.importComponents?.length > 0)
        await this._importPageComponents();
      await this._recurisveDirRead(folderpath);
    } catch (e) {
      console.error(e);
    }

    /** MINIFY DYNAMIC JS & STYLES */
    await this._cleanOutRequire();
    this.JSDocument = (await terser.minify(this.JSDocument)).code;
    this.CSSDocument = new CleanCSS().minify(this.CSSDocument).styles;
  }

  _getBody() {
    let body = '';
    this.components.forEach(component => {
      if (component?.HTMLString)
        body += component.HTMLString;
      else
        body += component
    })

    return body;
  }

  async _createFolders() {
    try {
      const dir = await fs.opendir(path.join(this.home, 'build'));
      await dir.close();
    } catch (e) {
      if (e.errno === -2) {
        await fs.mkdir(path.join(this.home, 'build'));
      }
    }

    try {
      const dir = await fs.opendir(path.join(this.home, 'build', this.pathname));
      await dir.close();
    } catch (e) {
      if (e.errno === -2) {
        await fs.mkdir(path.join(this.home, 'build', this.pathname))
      }
    }
  }

  async _fileWriter(document, file) {
    await fs.writeFile(path.join(this.home,
      'build',
      this.pathname,
      file),
      document,
      { flag: 'w+' });
  }

  async _buildFiles() {
    try {
      await this._createFolders();
      await this._readFiles();
      await this._fileWriter(this.HTMLDocument, 'index.html');
      await this._fileWriter(this.JSDocument, 'script.js');
      await this._fileWriter(this.CSSDocument, 'styles.css');
    } catch (e) {
      console.error(e);
    }
  }

  async _copyNova() {
    if (this.options.isBuilding) {
      const novaDirectory = path.join(require.resolve('nova-frontend'), '..');
      const novaFilename = `nova${packageinfo.version}.min.js`
      await fs.copyFile(path.join(
        novaDirectory,
        `${novaFilename}`),
        path.join(this.home, `build/${novaFilename}`));
    }
  }

  _customScripts() {
    let customScriptsString = ''
    if (this.options.customScripts?.length > 0) {
      this.options.customScripts.forEach(script => {
        let scriptString = `<script src="${script.src}" ${script.mode}></script>\n`
        customScriptsString += scriptString;
      })
    }

    return customScriptsString;
  }

  async compile() {
    if (!this.pathname)
      throw new Error('Path is not defined.');

    this.cwd = process.cwd();
    this.home = await this._findHome(this.cwd);
    let HTMLDocument = `
    <!-- NOVA COMPILED HTML -->
    <!DOCTYPE html>

    <html lang="${this.options.lang}">
      <head>
        <!-- PASTE IN MORE SCRIPTS HERE -->
        <script src="../nova${packageinfo.version}.min.js" defer></script>
        <script src="script.js" defer></script>
        <link rel="stylesheet" href="styles.css">
        <title>${this.options.title}</title>
        <link rel="icon" type="${this.options?.favicon?.type}" href="${this.options?.favicon?.path}">
        <meta charset="utf-8">
        ${this._customScripts()}
      </head>
      <body>
        <main id="root">
          ${this._getBody()}
        </main>
      </body>
    </html>
        `

    this.CSSDocument = `
    /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
    */
    
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
      display: block;
    }
    body {
      line-height: 1;
    }
    ol, ul {
      list-style: none;
    }
    blockquote, q {
      quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }`


    this.HTMLDocument = HTMLDocument;
    await this._buildFiles();
  }
}
