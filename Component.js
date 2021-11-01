class Component {
  #arrayOfElements;

  constructor(arrayOfElements) {
    this.#arrayOfElements = arrayOfElements;
  }

  get elements() {
    return this.#arrayOfElements;
  }

  // retrieveElement() {

  // }

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