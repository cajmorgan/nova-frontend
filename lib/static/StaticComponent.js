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
  setProps(props) {
    for (const key in props) {
      let replacement;
      if (typeof props[key] === 'string')
        replacement = props[key];
      else if (typeof props[key] === 'function')
        replacement = props[key]().HTMLString;
      else if (props[key].HTMLString)
        replacement = props[key].HTMLString;

      this.HTMLString = this.HTMLString.replace(`{{${key}}}`, replacement);
    }

    return this;
  }

  mergeComponents() {

  }
}
