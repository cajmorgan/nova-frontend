

module.exports = class StaticElement {

  constructor(type, parent, props, id) {
    this.type = type;
    this.parent = parent;
    this.props = props;
    this.id = id;
    this.children = [];
    this._pushChild();
  }

  _pushChild() {
    if (this.parent)
      this.parent.children.push(this);
  }
}
