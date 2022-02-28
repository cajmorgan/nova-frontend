import { StaticCompiler } from "../nova.js";

class StaticComponent extends StaticCompiler {
  constructor(HTMLString, elementsArray) {
    super();
    this.HTMLString = HTMLString;
    this.elementsArray = elementsArray;
    this._pushToCompiler(this.HTMLString);
  }

  _pushToCompiler(HTMLString) {
    this.components.push(HTMLString);
  }
}

export default StaticComponent;