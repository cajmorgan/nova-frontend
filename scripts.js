//Create div tree class ? 

class Element {
  #type;
  #parent;
  #node;
  #elementObject;

  constructor(type, parent, elementObject) {
    this.#type = type;
    this.#parent = parent;
    this.#node = null;
    this.#elementObject = elementObject;
  }
  
  get node() {
    return this.#node;
  }

  get parent() {
    return this.#parent;
  }

  createNode() {
    const newNode = document.createElement(this.#type);
    this.#node = newNode;
    for (const prop in this.#elementObject) {
      this.#node[prop] = this.#elementObject[prop];
    }
    this.#parent.appendChild(newNode);
  }

  updateNode(elementObject) {
    this.#elementObject = { ...this.#elementObject, ...elementObject };
    for (const prop in this.#elementObject) {
      if (this.#node[prop] !== this.#elementObject[prop])
        this.#node[prop] = this.#elementObject[prop];
    }
  }

  changeParent(newParentNode) {
    //Check type of newParentNode, needs to be object
    if (this.#parent !== newParentNode) {
      this.#parent.removeChild(this.node);
      this.#parent = newParentNode;
      this.#parent.appendChild(this.node);
    }
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

  addEventListener(event, callback) {
    this.node.addEventListener(event, callback); 
  }

}


const div = new Element('div', document.body, { className: 'hello', id: 'coolDiv'})
div.createNode();
const buttonOne = new Element('button', div.node, { id: 'btnOne', innerText: 'One', className: 'btns' })
buttonOne.createNode();
const buttonTwo = new Element('button', div.node, { id: 'btnTwo', innerText: 'Two', className: 'btns' })
buttonTwo.createNode();
const buttonThree = new Element('button', div.node, { id: 'btnThree', innerText: 'Three' , className: 'btns' })
buttonThree.createNode();

[buttonOne, buttonTwo, buttonThree].forEach(elem => {
  elem.addEventListener('click', () => {
    const node = elem.node;
    // elem.insertAfterSibling();
    elem.insertAfterSibling();
  })
})
// buttonOne.addEventListener('click', () => {
//   buttonOne.updateNode({ innerText: 'Hello' })
//   // buttonOne.changeParent(document.body);
// })
