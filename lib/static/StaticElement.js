

class StaticElement {

  constructor(type, parent, elementObject, id) {
    this.type = type;
    this.parent = parent;
    this.elementObject = elementObject;
    this.id = id;
    this.children = [];
    this._pushChild();
  }

  _pushChild() {
    if (this.parent)
      this.parent.children.push(this);
  }
}

export default StaticElement;