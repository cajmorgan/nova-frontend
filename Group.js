class Group {
  #arrayOfComponents

  constructor(arrayOfComponents) {
    this.#arrayOfComponents = arrayOfComponents;
  }

  get components() {
    return this.#arrayOfComponents
  }

  render() {
    this.#arrayOfComponents.forEach(comp => {
      comp.render();
    })
  }

  unrender() {
    this.#arrayOfComponents.forEach(comp => {
      comp.unrender();
    })
  }

}

export default Group
