class Component {
  #arrayOfElements;
  #parent
  #stateUpdaterArray

  constructor(arrayOfElements) {
    this.#arrayOfElements = arrayOfElements;
    this.#parent;
    this.#stateUpdaterArray = [];
  }

  get elements() {
    return this.#arrayOfElements;
  }

  setProps(propsObject) {
    for (const key in propsObject) {
      const toFind = `{{${key}}}`;
      this.#arrayOfElements.forEach(elem => {
        for (const prop in elem.node) {
          if (elem.node[prop] === toFind) {
            elem.node[prop] = propsObject[key];
          }
        }
      })
    }
  }

  setState(state) {
    /**
     * Fixa en funktion som planterar in 
     * this.getState med korrekt value
     * Fixa en till method som kan callas från State på component,
     * Denna metod ska uppdatera de values som är redo för states.
     * Det ska användas som en mer kompakta (listeners) istället för att skapa funktion varje gång.
     * State logiken löser sig i Reducers. 
     */

    /*
    * Vi måste skapa en funktion med property of this. correctstate som pushas till arrayen och executas
    */
    const statesValues = state.getState();
    for (const key in statesValues) {
      const toFind = `{{${key}}}`;
      this.#arrayOfElements.forEach(elem => {
        for (const prop in elem.node) {
          if (elem.node[prop] === toFind) {
            const updateState = () => {
              elem.node[prop] = state.getState()[key];
            }
            updateState();
            this.#stateUpdaterArray.push(updateState);
          }
        }
      })
    }
  }

  updateState() {
    this.#stateUpdaterArray.forEach(func => {
      func();
    })
  }

  retrieve(input) {
    let retrievedElements = [];
    if(input[0] === '#') {
      retrievedElements = this.#arrayOfElements
        .find(element => element.node.id === input.replace('#', ''));
    } else if (input[0] === '.') {
      this.#arrayOfElements.forEach(element => {
        if (element.node.className === input.replace('.', '')) {
          retrievedElements.push(element);
        }
      })
    } else {
      this.#arrayOfElements.forEach(element => {
        if (element.type === input) {
          retrievedElements.push(element);
        }
      })
    }

    return retrievedElements;
  }

  changeParent(newParent) {
    this.#parent = newParent
    this.#arrayOfElements[0].changeParent(newParent.node);
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
    if(this.#parent)
      this.#parent.addNode();
    
    this.#arrayOfElements.forEach(element => {
      if (element.removed)
        element.addNode();
    })
  }

  unrender() {
    this.#arrayOfElements.forEach(element => {
      if (!element.removed)
        element.removeNode();
    })
  }

  deleteByIndex(index) {
    const targetElement = this.#arrayOfElements[index]
    if (!targetElement.removed)
      targetElement.removeNode();
    this.#arrayOfElements.splice(index, 1);
  }

  deleteById(id) {
    const index = this.#arrayOfElements.findIndex(elem => elem.id === id);
    const targetElement = this.#arrayOfElements[index];
    if (!targetElement.removed) 
      targetElement.removeNode();
    this.#arrayOfElements.splice(index, 1);

    console.log(this.#arrayOfElements);
  }

}

export default Component
