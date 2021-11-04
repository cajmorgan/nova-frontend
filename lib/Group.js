class Group {
  #arrayOfComponents
  #parent

  constructor(arrayOfComponents, parent) {
    this.#arrayOfComponents = arrayOfComponents;
    this.#parent = parent
    this.#wrapper();
  }

  get components() {
    return this.#arrayOfComponents
  }

  #wrapper() {
    if(this.#parent)
      this.#arrayOfComponents.forEach(comp => {
        comp.elements[0].changeParent(this.#parent.node);
      })
  }

  render() {
    if (this.#parent)
      this.#parent.addNode();
    
    this.#arrayOfComponents.forEach(comp => {
      comp.render();
    })
  }

  unrender() {
    this.#arrayOfComponents.forEach(comp => {
      comp.unrender();
    })
    
    if (this.#parent)
      this.#parent.removeNode();
  }

}

export default Group
