/**
 * @name Router
 * @class
 * @desc
 * To get the full SPA feel the router is here for rendering different groups or components based on the url. 
 * 
 * @example
 *  import { Router, Group, Element, Generator, root } from '../../';
 * 
 *  const wrapper = new Element('div', root, { id: 'wrapper' }, true);
 *
 *  const generator = new Generator;
 *  const component = generator.createTree(`
 *    div
 *      h1 innerText: 'Router example.'
 *      button innerText: 'Click it'
 *  end`)
 *
 *  component.retrieve('button')[0].addEventListener('click', () => {
 *    Router.changePath('/about');
 *  })
 *
 *  const about = new Element('h1', root, { innerText: 'Hello there!'}).createComponent();
 *  const group = new Group([component], wrapper);
 *
 *  new Router('/', [group])
 *  new Router('/about', [about]);
 * 
 * @param {String} path - The path bound to this route. All components applied will be rendered only when the URI is the same.
 * @param {Components[]} componentArray - Array of components. If you want to supply an element you can do Element.createComponent();
 */
module.exports = class Router {
  #path
  #componentArray
  #rendered

  constructor(path, componentArray) {
    this.#path = path;
    this.#componentArray = componentArray;
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
    this.#addChangeListener();
    if (this.path === window.location.pathname) {
      this.#render();
    }
  }

  #render() {
    this.#componentArray.forEach(comp => comp.render());
    this.#rendered = true;
  }

  #unrender() {
    this.#componentArray.forEach(comp => comp.unrender());
    this.#rendered = false;
  }

  /**
   * @desc
   * Returns current url path
   * @returns current path
   */
  static getPath() {
    return window.location.pathname;
  }

  /**
   * @desc
   * A static mathod that uses history.pushState to set new url location.
   * @example
   * Router.newPath('/contact');
   * @param {String} newPath
   */
  static changePath(newPath) {
    window.history.pushState({}, '', newPath);
    window.dispatchEvent(new Event('locationChange'));
  }

  #addChangeListener() {
    ['locationChange', 'popstate'].forEach(state => {
      window.addEventListener(state, () => {
        const url = window.location.pathname;
        if (url === this.#path && !this.#rendered) {
          this.#render();
        } else if (this.#rendered) {
          this.#unrender();
        }
      })
    })
  }
}