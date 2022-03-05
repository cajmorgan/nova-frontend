const fs = require('fs/promises');
const { fork } = require('child_process');
const terser = require('terser');
const CleanCSS = require('clean-css');
const path = require('path');
const packageinfo = require('../../package.json');

module.exports = class StaticCompiler {
  constructor(components, pathname, options = { lang: 'en' }, isBuilding = false) {
    this.HTMLDocument = '';
    this.JSDocument = '';
    this.CSSDocument = '';
    this.components = components || [];
    this.options = options;
    this.cwd = '';
    this.home = '';
    this.pathname = pathname;
    this.pagesFolderName = 'pages';
    this.isBuilding = isBuilding;
  }

  async fullBuild() {
    this.home = await this._findHome(process.cwd());
    const pagesDir = path.join(this.home, this.pagesFolderName);
    await this._recurisveDirRead(pagesDir);
    await this._copyNova();
  }

  fileBuild() {

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
          if (this.isBuilding) {
            const modulePath = path.join(folderpath, res[i]);
            this._executeChild(modulePath);
          }
          break;
        }
      }
      if (!/\./.test(res[i]))
        await this._recurisveDirRead(path.join(folderpath, res[i]), this.isBuilding)
    }
  }


  async _readFiles() {
    const folderpath = path.join(this.home, this.pagesFolderName, this.pathname)
    try {
      await fs.access(folderpath);
      await this._recurisveDirRead(folderpath);
    } catch (e) {
      console.error(e);
    }

    /** MINIFY DYNAMIC JS & STYLES */
    this._cleanOutRequire();
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
      await fs.opendir(path.join(this.home, 'build'))
    } catch (e) {
      if (e.errno === -2) {
        await fs.mkdir(path.join(this.home, 'build'));
      }
    }

    try {
      await fs.opendir(path.join(this.home, 'build', this.pathname))
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
    if (this.isBuilding) {
      const novaDirectory = path.join(require.resolve('nova-frontend'), '..');
      const novaFilename = `nova${packageinfo.version}.min.js`
      await fs.copyFile(path.join(
        novaDirectory,
        `${novaFilename}`),
        path.join(this.home, `build/${novaFilename}`));
    }
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
      </head>
      <body>
        <main id="root">
          ${this._getBody()}
        </main>
      </body>
    </html>
        `
    this.HTMLDocument = HTMLDocument;
    await this._buildFiles();
  }
}
