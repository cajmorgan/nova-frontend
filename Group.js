class Group {
  #arrayOfComponents

  constructor(arrayOfComponents) {
    this.#arrayOfComponents = arrayOfComponents;
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