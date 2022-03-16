const StaticCompiler = require("./StaticCompiler");

module.exports = class StaticComponent extends StaticCompiler {
  constructor(HTMLString, elementsArray) {
    super();
    this.HTMLString = HTMLString;
    this.elementsArray = elementsArray;
    this._pushToCompiler(this.HTMLString);
  }

  _pushToCompiler(HTMLString) {
    this.components.push(HTMLString);
  }

  /** 
   * 
   * @param {Object} components
   */
  setProps(components) {
    for (const key in components) {
      this.HTMLString = this.HTMLString.replace(`{{${key}}}`, components[key]);
    }
  }
}
