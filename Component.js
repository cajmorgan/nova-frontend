class Component {
  #arrayOfElements;

  constructor(arrayOfElements) {
    this.#arrayOfElements = arrayOfElements;
  }

  get elements() {
    return this.#arrayOfElements;
  }

  

}