const fs = require('fs/promises');
const terser = require('terser');
const CleanCSS = require('clean-css');
const path = require('path');
const packageinfo = require('../../package.json');

module.exports = class StaticCompiler {
  constructor(components, pathname, options = { lang: 'en' }) {
    this.HTMLDocument = '';
    this.JSDocument = '';
    this.CSSDocument = '';
    this.components = components || [];
    this.options = options;
    this.cwd = '';
    this.home = '';
    this.pathname = pathname;
    this.pagesFolderName = 'pages'
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

  async _recurisveDirRead(folderpath) {
    const res = await fs.readdir(folderpath);
    for (let i = 0; i < res.length; i++) {
      switch (res[i]) {
        case 'dynamic.js':
          const JSBuffer = await fs.readFile(path.join(folderpath, res[i]));
          this.JSDocument += JSBuffer.toString();
          this.JSDocument += '\n';
          break;
        case 'styles.css':
          const CSSBuffer = await fs.readFile(path.join(folderpath, res[i]));
          this.CSSDocument += CSSBuffer.toString();
          this.CSSDocument += '\n';
          break;
      }
      if (!/\./.test(res[i]))
        await this._recurisveDirRead(path.join(folderpath, res[i]))
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
    await this._createFolders();
    /** HTML */
    try {
      await this._readFiles();
      await this._fileWriter(this.HTMLDocument, 'index.html');
      await this._fileWriter(this.JSDocument, 'script.js');
      await this._fileWriter(this.CSSDocument, 'styles.css');
    } catch (e) {
      console.error(e);
    }
  }

  async _copyNova() {
    const novaDirectory = path.join(require.resolve('nova-frontend'), '..');
    await fs.copyFile(path.join(
      novaDirectory,
      `nova${this.packageinfo.version}.min.js`),
      path.join(this.home, 'build'));

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
    await this._copyNova();

  }
}
