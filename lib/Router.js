class Router {
  #path
  #componentArray
  #hash
  #rendered

  constructor(path, componentArray, hash) {
    this.#path = path;
    this.#componentArray = componentArray;
    this.#hash = hash;
    this.#rendered = false;
    this.#checkPath();
  }

  get path() {
    return this.#path
  }

  set path(newPath) {
    this.#path = newPath;
  }

  #checkPath() {
    if (this.#hash) {
      this.#addChangeListener();
    } else if (this.path === window.location.pathname)
        this.#render();
  }

  #render() {
    this.#componentArray.forEach(comp => comp.render());
    this.#rendered = true;
  }

  #unrender() {
    this.#componentArray.forEach(comp => comp.unrender());
    this.#rendered = false;
  }

  static changeHash() {
    window.dispatchEvent(new Event('locationChange'));
  }

  #addChangeListener() {
    window.addEventListener('locationChange', () => {
      const url = window.location.hash;
      if (url === this.#path.replace('/', '') && !this.#rendered) {
        this.#render();
      } else if (this.#rendered) {
        this.#unrender();
      }
    })
  }
}

export default Router