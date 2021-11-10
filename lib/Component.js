class Component {
  #arrayOfElements;
  #parent

  constructor(arrayOfElements) {
    this.#arrayOfElements = arrayOfElements;
    this.#parent;
  }

  get elements() {
    return this.#arrayOfElements;
  }

  setProps(stateObject) {
    for (const key in stateObject) {
      const toFind = `{{${key}}}`;
      this.#arrayOfElements.forEach(elem => {
        for (const prop in elem.node) {
          if (elem.node[prop] === toFind) {
            elem.node[prop] = stateObject[key];
          }
        }
      })
    }
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
