const fs = require('fs/promises');
const path = require('path');
const packageinfo = require('../../package.json');

module.exports = class StaticCompiler {
  constructor(components, pathname, options = { lang: 'en' }) {
    this.pathname = pathname;
    this.HTMLDocument = '';
    this.JSDocument = '';
    this.components = components || [];
    this.options = options;
  }

  _getBody() {
    let body = '';
    this.components.forEach(component => {
      if (component?.HTMLString)
        body += component.HTMLString;
      else
        body += component
      body += '\n';
    })

    return body;
  }

  async _createFolders() {
    const cwd = process.cwd();
    try {
      await fs.opendir(path.join(cwd, 'build'))
    } catch (e) {
      if (e.errno === -2) {
        await fs.mkdir(path.join(cwd, 'build'));
      }
    }

    try {
      await fs.mkdir(path.join(cwd, 'build', this.pathname))
    } catch (e) {
      console.error(e);
    }
  }

  _buildFiles() {
    this._createFolders();
  }

  compile() {
    if (!this.pathname)
      throw new Error('Path is not defined.');

    let HTMLDocument = `
<!-- NOVA COMPILED HTML -->
<!DOCTYPE html>

<html lang="${this.options.lang}">
  <head>
    <!-- PASTE IN MORE SCRIPTS HERE -->
    <script src="../nova${packageinfo.version}.min.js" defer></script>
    <script src="script.js" defer></script>
    <link rel="stylesheet" href="styles.css" 
  </head>
  <body>
    ${this._getBody()}
  </body>
</html>
    `
    this.HTMLDocument = HTMLDocument;
    this._buildFiles();
  }
}
