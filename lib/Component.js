class Component {
  #arrayOfElements;

  constructor(arrayOfElements) {
    this.#arrayOfElements = arrayOfElements;
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

  render() {
    this.#arrayOfElements.forEach(element => {
      element.addNode();
    })
  }

  unrender() {
    this.#arrayOfElements.forEach(element => {
      element.removeNode();
    })
  }

}

export default Component
