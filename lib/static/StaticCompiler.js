const packageinfo = require('../../package.json')

module.exports = class StaticCompiler {
  constructor(components, options = { lang: 'en' }) {
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

  _buildFiles() {

  }

  compile() {
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
  }
}
