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

  unrender() {
    this.#arrayOfComponents.forEach(comp => {
      comp.unrender();
    })
  
  }

}

export default Group
