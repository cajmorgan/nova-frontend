class Group {
  #arrayOfComponents
  #parent

  constructor(arrayOfComponents, parent) {
    this.#arrayOfComponents = arrayOfComponents || [];
    this.#parent = parent
    this.#createComponents();
    this.#wrapper();
  }

  get components() {
    return this.#arrayOfComponents
  }

  #createComponents() {
    this.#arrayOfComponents = this.#arrayOfComponents.map(curr => {
      if (curr.node)
        return curr.createComponent();
      else
        return curr;
    })
  }

  #wrapper() {
    if (this.#parent) {
      this.#arrayOfComponents.forEach(comp => {
        comp.elements[0].changeParent(this.#parent.node);
      })
    }
  }

  sortInDom(prop = 'id', order = 'ascending') {
    // Sorts wrappers in groups based on 
    // f.e ID in the DOM elems and just use insertbefores to 
    // change only those that needs to change.
    // You can also add so it regexes away for example "task1" so it just looks for the numbers. 
    /**
     * Algoritmen:
     * Nested Loop with one element, 
     * insertBefore on the first element that has the same or higher value than element
     * 
     */
  }

  render() {
    this.#arrayOfComponents.forEach(comp => {
      comp.render();
    })
  }

  add(component) {
    this.#arrayOfComponents = [...this.#arrayOfComponents, component];
    component.elements[0].changeParent(this.#parent.node);
    this.render();
  }

  update(arrayOfComponents) {
    this.arrayOfComponents = arrayOfComponents;
    this.#wrapper();
    this.render();
  }

  unrender() {
    this.#arrayOfComponents.forEach(comp => {
      comp.unrender();
    })
  }

  retrieve(id) {
    const comp = this.#arrayOfComponents.find(comp => comp.retrieve(`#${id}`))
    return comp.elements;
  }

  deleteById(id) {
    let index;
    this.#arrayOfComponents.forEach((comp, i) => {
      if (comp.elements[0].id === id) {
        index = i;
        while (comp.elements.length > 0)
          comp.deleteByIndex(0);
      }
    })
    
    this.#arrayOfComponents.splice(index, 1);
  }

}

export default Group
