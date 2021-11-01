//Create div tree class ? 
class Element {
  #type;
  #parent;
  #node;
  #elementObject;
  #removed;
  #init

  constructor(type, parent, elementObject, init) {
    this.#type = type;
    this.#parent = parent.node ? parent.node : parent;
    this.#node = null;
    this.#elementObject = elementObject;
    this.#removed = false;
    this.#init = init
    this.#checkInit();
  }
  
  get node() {
    return this.#node;
  }

  get parent() {
    return this.#parent;
  }

  get value() {
    return this.#node.value;
  }

  get text() {
    return this.#node.textContent;
  }

  get html() {
    return this.#node.innerHTML;
  }

  get siblings() {
    return this.parent.children;
  }

  get children() {
    return this.node.children;
  }

  #checkInit() {
    if (this.#init) {
      this.#createNode();
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
    
    this.#parent.appendChild(newNode);
  }

  #generateOptions() {
    const optionsArray = [];
    for (const opt in this.#node) {
      optionsArray.push(opt);
    }

    return optionsArray;
  }

  updateNode(elementObject) {
    this.#validateProps(elementObject);

    this.#elementObject = { ...this.#elementObject, ...elementObject }
    for (const prop in this.#elementObject) {
      if (this.#node[prop] !== this.#elementObject[prop])
        this.#node[prop] = this.#elementObject[prop];
    }
  }

  toggleNode() {
    if (this.#removed === true) {
      this.addNode();
    } else {
      this.removeNode();
    }
  } 

  addNode() {
    if (this.#removed === false) {
      throw new Error('Adding a node previously not removed is not possible, try "copyNode()" instead.');
    }

    this.parent.appendChild(this.node);
    this.#removed = false;
  }
  
  removeNode() {
    this.parent.removeChild(this.node);
    this.#removed = true;
  }

  changeParent(newParentNode) {
    //Check type of newParentNode, needs to be object
    if (this.#parent !== newParentNode) {
      this.#parent.removeChild(this.node);
      this.#parent = newParentNode;
      this.#parent.appendChild(this.node);
    }
  }

  addEventListener(event, callback) {
    this.node.addEventListener(event, callback); 
  }

  addStyle(property, css) {
    this.#node.style[property] = css;
  }

  insertBeforeSibling() {
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

  insertAfterSibling() {
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

}


