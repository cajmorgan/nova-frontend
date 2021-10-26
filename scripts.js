class Element {
  constructor(type, parent, elementObject) {
    this.type = type;
    this.parent = parent;
    this.nodeOfElement = null;
    this.elementObject = elementObject;
  }
  
  get node() {
    return this.nodeOfElement;
  }

  createNode() {
    const newNode = document.createElement(this.type);
    this.nodeOfElement = newNode;
    for (const prop in this.elementObject) {
      this.nodeOfElement[prop] = this.elementObject[prop];
    }

    this.parent.appendChild(newNode);
  }

  updateNode(elementObject) {
    this.elementObject = { ...this.elementObject, ...elementObject };
    for (const prop in this.elementObject) {
      if (this.nodeOfElement[prop] !== this.elementObject[prop])
        this.nodeOfElement[prop] = this.elementObject[prop];
    }
  }

  addEventListener(event, callback) {
    this.node.addEventListener(event, callback); 
  }

}


const div = new Element('div', document.body, { className: 'hello', id: 'coolDiv'})
div.createNode();
const button = new Element('button', div.node, { id: 'coolBtn', innerText: 'yooo', className: 'yoo' })
button.createNode();
button.addEventListener('click', () => {
  button.updateNode({ innerText: 'hello' });
})
