class Component {
  #arrayOfElements;

  constructor(arrayOfElements) {
    this.#arrayOfElements = arrayOfElements;
  }

  get elements() {
    return this.#arrayOfElements;
  }

  retrieveElement(input) {
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