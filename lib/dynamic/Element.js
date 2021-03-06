import { Component } from '../nova'

/**
 * @name Element
 * @class
 * @param {string} type
 * An htmlTag, for example 'div' or 'button'. 
 * @param {Element|node} parent
 * The parent in the DOM you want the element to belong to.
 * @param {object} elementObject
 * An object containing the javascript props like: { innerText: 'helo' }
 * @param {boolean} init 
 * A boolean to indicate if you want to render the element now (default: false). 
 * @desc
 * The fundamental building block in Nova is the Element, which most other things in the library are built upon. 
 * The element is just a shell of the normal javascript node but adds extra functionality 
 * and shorter syntax to access and manipulate a node.
 * @example
 * import { Element, root } from 'nova';
 * const h1 = new Element('h1', root, { innerText: 'Hello World' }, true);
 * @returns void
 */
class Element {
  #type;
  #parent;
  #node;
  #elementObject;
  #removed;
  #init;

  constructor(type, parent, elementObject, init) {
    this.#type = type;
    this.#parent = parent.node ? parent.node : parent;
    this.#node = null;
    this.#elementObject = elementObject;
    this.#removed = true;
    this.#init = init
    this.#createNode();
    this.#checkInit();
  }
  
  /**
   * @desc
   * Return the node of the element
   * @example
   * const h1 = new Element('h1', root, { innerText: 'Hello World' }, true);
   * console.log(h1.node) //returns node
   * @return {node}
   *  
   */
  get node() {
    return this.#node;
  }

   /**
   * @desc
   * Return the type of the element
   * @example
   * const h1 = new Element('h1', root, { innerText: 'Hello World' }, true);
   * console.log(h1.type) //returns 'h1'
   * @return {type}
   *  
   */
  get type() {
    return this.#type;
  }

   /**
   * @desc
   * Return the parent of the element
   * @example
   * const h1 = new Element('h1', root, { innerText: 'Hello World' }, true);
   * console.log(h1.parent) //returns node of root
   * @return {parent}
   */
  get parent() {
    return this.#parent;
  }

   /**
   * @desc
   * Return the value of the element
   * @example
   * const input = new Element('input', root, { type: 'text', value: 'some text' }, true);
   * console.log(h1.value) //returns 'some text'
   * @return {value}
   */
  get value() {
    return this.#node.value;
  }

   /**
   * @desc
   * Return the id of the element
   * @example
   * const h1 = new Element('h1', root, { id: 'title', innerText: 'Welcome!' }, true);
   * console.log(h1.id) //returns 'title'
   * @return {id}
   */
  get id() {
    return this.#node.id;
  }

  get className() {
    return this.#node.className;
  }

  /**
   * @desc
   * Return the text of the element
   * @example
   * const h1 = new Element('h1', root, { id: 'title', innerText: 'Welcome!' }, true);
   * console.log(h1.text) //returns 'Welcome!'
   * @return {text}
   */
  get text() {
    return this.#node.textContent;
  }

  /**
   * @desc
   * Return the innerHTML of the element
   * @example
   * const h1 = new Element('h1', root, { id: 'title', innerText: 'Welcome!' }, true);
   * console.log(h1.html) //returns '<h1 id="title">Welcome!</h1>'
   * @return {html}
   */
  get html() {
    return this.#node.innerHTML;
  }

   /**
   * @desc
   * Return the siblings of the element
   * @example
   * const h1 = new Element('h1', root, { id: 'title', innerText: 'Welcome,' }, true);
   * const h2 = new Element('h2', root, { id: 'subtitle', innerText: 'To an awesome page!' }, true);
   * console.log(h1.siblings) //returns a nodeArray of h1 and h2.
   * @return {nodeArray}
   */
  get siblings() {
    return this.parent.children;
  }

  get children() {
    return this.node.children;
  }

  get removed() {
    return this.#removed;
  }

  get props() {
    return this.#elementObject;
  }

  #checkInit() {
    if (this.#init) {
      this.addNode();
    } 
  }

  #validateProps(elementObject) {
    const options = this.#generateOptions();
    for (const prop in elementObject) {
      if (!options.includes(prop)) {
        throw new Error(`Supplied property in updateNode call doesn't exist on type ${this.#type}`);
      }
    }
  }

  #createNode() {
    const newNode = document.createElement(this.#type);
    this.#node = newNode;
    this.#validateProps(this.#elementObject);
    for (const prop in this.#elementObject) {
      this.#node[prop] = this.#elementObject[prop];
    }    
  }

  #generateOptions() {
    const optionsArray = [];
    for (const opt in this.#node) {
      optionsArray.push(opt);
    }

    return optionsArray;
  }

  /**
   * @desc
   * Dynamically updates the element by passing an object containing the props you want to update
   * @param {object} elementObject
   * An object containing the javascript props like: { innerText: 'helo' }
   * @example
   * const h1 = new Element('h1', root, { id: 'welcome', innerText: 'Hello World!' }, true);
   * h1.updateNode({ id: 'goodbye', innerText: 'Goodbye World...' })
   * @return {void}
   */
  updateNode(elementObject) {
    this.#validateProps(elementObject);
    this.#elementObject = { ...this.#elementObject, ...elementObject }
    for (const prop in this.#elementObject) {
      if (this.#node[prop] !== this.#elementObject[prop])
        this.#node[prop] = this.#elementObject[prop];
    }
  }

   /**
   * @desc
   * Toggles node on and off
   * @example
   * const h1 = new Element('h1', root, { id: 'welcome', innerText: 'Hello World!' }, true); //On with true
   * h1.toggleNode() //Off
   * h1.toggleNode() //On
   * @return {void}
   */
  toggleNode() {
    if (this.#removed === true) {
      this.addNode();
    } else {
      this.removeNode();
    }
  } 

  /**
   * @desc
   * Appends node to parent. 
   * @example
   * const h1 = new Element('h1', root, { id: 'welcome', innerText: 'Hello World!' }); //Off
   * h1.addNode() //On
   * @return {void}
   */
  addNode() {
    this.parent.appendChild(this.node);
    this.#removed = false;
  }
  
   /**
   * @desc
   * Removes node from parent. 
   * @example
   * const h1 = new Element('h1', root, { id: 'welcome', innerText: 'Hello World!'}, true); //On
   * h1.removeNode() //Off
   * @return {void}
   */
  removeNode() {
    this.parent.removeChild(this.node);
    this.#removed = true;
  }

  /**
   * @desc
   * Appends node to new parent. 
   * @param {Element|node} newParentNode
   * @example
   * const div = new Element('div', root, { className: 'container' }, true);
   * const h1 = new Element('h1', root, { id: 'welcome', innerText: 'Hello World!'}, true); //Appends to root
   * h1.changeParent(div); //Now h1 is appended to div instead.
   * @return {void}
   */
  changeParent(newParentNode) {
    if (newParentNode.node) {
      newParentNode = newParentNode.node
    }

    if (this.#parent !== newParentNode) {
      this.#parent = newParentNode;
      this.#parent.appendChild(this.node);
    }
  }

  /**
   * @desc
   * Calls addEventListener on node. 
   * @param {event} event //f.e 'click'
   * Any javascript supported event. 
   * @param {function} callback
   * Callback function to be invoked when event happens. 
   * @example
   * Check https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   * @return {void}
   */
  addEventListener(event, callback) {
    this.node.addEventListener(event, callback); 
  }

  /**
   * @desc
   * Dynamically adds css styles to Element.
   * @param {string} property 
   * A string containing what you want to change, for example 'color'
   * @param {string} css 
   * The css value to use, for example 'red'
   * @return {void}
   */
  addStyle(property, css) {
    this.#node.style[property] = css;
  }

  /**
   * @desc
   * Creates a component putting the element inside
   */
  createComponent() {
    return new Component([this], this.parent);
  }

  /**
   * @desc
   * Moves node one step up the tree, changing place with it's previous sibling. 
   * @return {void}
   */
  beforeSibling() {
    let childrenList = this.node.parentNode.children;
    let indexPositionOfTarget = null;
    for (let i = 0; i < childrenList.length; i++) {
      if (childrenList[i] === this.node) {
          indexPositionOfTarget = i;
          break;
      }
    }

    if (indexPositionOfTarget !== 0) {
      const current = childrenList[indexPositionOfTarget];
      const prev = childrenList[indexPositionOfTarget - 1]
      this.#parent.insertBefore(current, prev)
    } 

  }

   /**
   * @desc
   * Moves node one step down the tree, changing place with it's next sibling. 
   * @return {void}
   */
  afterSibling() {
    let childrenList = this.node.parentNode.children;
    let indexPositionOfTarget = null;
    for (let i = 0; i < childrenList.length; i++) {
      if (childrenList[i] === this.node) {
          indexPositionOfTarget = i;
          break;
      }
    }

    if (indexPositionOfTarget < childrenList.length - 1) {
      const current = childrenList[indexPositionOfTarget];
      const next = childrenList[indexPositionOfTarget + 1]
      this.#parent.insertBefore(next, current)
    } 
  }

  /**
   * @desc
   * Appends node after a reference sibling
   * @param {Element} reference 
   * @returns {void}
   */
  after(reference) {
    const ref = reference.node.nextSibling;
    if (ref)
      this.parent.insertBefore(this.node, ref);
    else 
      this.parent.appendChild(this.node);
  }

  /**
   * @desc
   * Appends node before a reference sibling
   * @param {Element} reference 
   * @returns {void}
   */
  before(reference) {
    if (reference)
      this.parent.insertBefore(this.node, reference.node);
  }

}

export default Element;
