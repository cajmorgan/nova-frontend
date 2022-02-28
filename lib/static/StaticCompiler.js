

class StaticCompiler {
  constructor(components, path, filenames, lang = 'en') {
    this.HTMLDocument = '';
    this.components = components || [];
    this.filenames = filenames;
    this.path = path;
    this.lang = lang;
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

  compile() {
    let HTMLDocument = `
<!-- NOVA COMPILED HTML ${this.filenames.html}-->
<!DOCTYPE html>

<html lang="${this.lang}">
  <head>
    <!-- PASTE IN MORE SCRIPTS HERE -->
    <script src="${this.filenames.js}.js" defer></script>
    <link rel="stylesheet" href="${this.filenames.css}.css" 
  </head>
  <body>
    ${this._getBody()}
  </body>
</html>
    `
    this.HTMLDocument = HTMLDocument;
  }
}

export default StaticCompiler;