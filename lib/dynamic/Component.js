
/**
 * @name Component
 * @class 
 * @desc
 * The component is a wrapper for Elements. A component is basically a block of Elements.
 * The best way to create a Component is to use the Generator. 
 * You can also supply it with an array of Elements. 
 * @example
 * import { Generator } from 'nova';
 * const generator = new Generator();
 * const header = generator.createTree(`
 *   header className: 'header'
 *     h1 className: 'header__title' innerText: 'Hello World!'
 *     h2 className: 'header__subtitle' innerText: 'This is my site.'
 * end`)
 * 
 * header.render(); //header is the component
 */
module.exports = class Component {
  #arrayOfElements;
  #parent
  #stateUpdaterArray

  constructor(arrayOfElements, parent) {
    this.#arrayOfElements = arrayOfElements;
    this.#parent = parent || this.#arrayOfElements[0].parent;
    this.#stateUpdaterArray = [];
  }

  /**
   * @returns {ArrayOfElements}
   */
  get elements() {
    return this.#arrayOfElements;
  }

  /**
   * @desc
   * Set props of a generated component using Generator. 
   * When generating the component, you need to put the value where you want to set the props as '{{whatever}}'.
   * Then when supplying the propsObject to the setProps function, you set the value by { whatever: your-value }
   * @param {Object} propsObject 
   * @example
   * const task = generator.createTree(`
   * article className: 'task' id: '{{id}}'
   *   h2 className: 'task__title' innerText: '{{title}}'
   *   p className: 'task__description' innerText: '{{description}}'
   *   button className: 'task__remove-button' innerText: 'X'
   *  end`)
   *
   *  task.setProps({
   *  id: 1, 
   *  title: 'Buy Milk', 
   *  description: 'With chocolate taste',
   *})
   * 
   * @returns {void}
   */
  setProps(propsObject) {
    for (const key in propsObject) {
      const toFind = `{{${key}}}`;
      this.#arrayOfElements.forEach(elem => {
        for (const prop in elem.node) {
          if (elem.node[prop] === toFind) {
            elem.node[prop] = propsObject[key];
            elem.props[prop] = propsObject[key];
          }
        }
      })
    }
  }


  /**
   * @desc
   * A clever way to set state directly to elements properties using Generator. 
   * It works similarily to setProps but with some modifications.
   * To fully understand how this function works, it's recommended to read the docs about State and Generator first.
   * When generating the component like setProps, you need to put the value where you want to set the state as '{{workerName.whateverProp}}' note the DOT '.'.
   * 
   * When supplying the initial state to State, 
   * you should supply it as an object with the key name of the worker with the preferred value, f.e { whateverWorker: { whateverField: 'whateverValue' }} (See example below for clarification).
   * The field is the name you supply when generating the elements (Check generator example below for clarification).
   * 
   * The worker needs to return an object with all fields specified in the generator, else it will replace the state with undefined.
   * Everytime the worker returns the object with the specified field, it will automatically update the value you supplied in the generator. 
   * 
   * This method is very useful when you want the state to be managed by the library instead of supplying custom functions to update the text.
   * 
   * NOTE: The following example below is not using the intended project structure used for state, and should preferable be splitted into different files, 
   * but it's just a simple demonstration of how setState works.
   * @example
   * const whateverWorker = (state, action) => {
   *  switch (action.type) {
   *    case 'WHATEVER_ACTION':
   *  return { whateverText: state[action.field] + action.appendText };
   *  default:
   *    return state;
   *  }
   * };
   * 
   * const initState = { whateverWorker: { whateverText: 'yo' } };
   * const workers = State.mergeWorkers({ whateverWorker });
   * const state = new State(workers, initState);
   * state.createAction('whateverAction', { type: 'WHATEVER_ACTION' });
   * 
   * const generator = new Generator();
   * const header = generator.createTree(`
   *  header
   *    div
   *      h1 innerText: '{{whateverWorker.whateverText}}'
   * end`);
   * 
   * header.setState(state);
   * state.subscribe(header);
   * 
   * //Gets the div as in the order supplied to generator
   * header.elements[1].addEventListener('click', () => {
   *  state.dispatch(state.getAction('whateverAction', { appendText: 'HELLO', field: 'whateverText' }));
   * })
   * 
   * header.render();
   * @param {Object} state 
   * @returns {void}
   */
  setState(state) {
    const statesValues = state.getState();
    for (const key in statesValues) {
      const toFind = `{{${key.replace(/\..+/gi, '')}}}`;
      this.#arrayOfElements.forEach(elem => {
        for (const prop in elem.node) {
          if (String(elem.node[prop]).replace(/\.[a-z]+/gi, '') === toFind) {
            let properties = elem.node[prop].match(/(?<=\.)[a-z]+/gi)[0] || null;
            const updateState = () => {
              if (properties) {
                const stateObject = state.getState()[key];
                elem.node[prop] = stateObject[properties];
              }
              else
                elem.node[prop] = state.getState()[key];
            }
            updateState();
            this.#stateUpdaterArray.push(updateState);
          }
        }
      })
    }
  }

  updateState() {
    this.#stateUpdaterArray.forEach(func => {
      func();
    })
  }

  /**
   * @desc
   * A fluid function that returns the elements searched for in a component based on id, class or tag.
   * It checks for # to find a id and in taht case returns the element directly. 
   * For tags and classes, it will always return an array of the found elements.
   * @example
   * const header = generator.createTree(`
   *  div id: 'hello'
   *    h1 innerText: 'Yo!'
   *  div
   *    h2 innerText: 'Welcome.' 
   * end`)
   * 
   * const divWithIdHello = header.retrieve('#hello')
   * const bothDivs = header.retrieve('div');
   * 
   * @param {String} input 
   * @returns {Element}
   */
  retrieve(input) {
    let retrievedElements = [];
    if (input[0] === '#') {
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

  /**
   * @desc
   * Changes the components grandparent to another element supplied.
   * 
   * @example
   * const generator = new Generator();
   *
   *   const aNewParent = new Element('article', root, {}, true);
   *
   *   const header = generator.createTree(`
   *     div id: 'grandparent'
   *       h1 innerText: 'Welcome!'
   *       div
   *         h2 innerText: 'To my page...'
   *         div 
   *         div
   *   end`)
   *
   *   header.changeParent(aNewParent);
   *   header.render();
   * @param {Element} newParent 
   */
  changeParent(newParent) {
    this.#parent = newParent
    this.#arrayOfElements[0].changeParent(newParent.node);
  }

  sortInDom(prop = 'id', order = 'ascending') {
    // Sorts wrappers in groups based on 
    // f.e ID in the DOM elems and just use insertbefores to 
    // change only those that needs to change.
    // You can also add so it regexes away for example "task1" so it just looks for the numbers. 
    /**
     * Algoritmen:
     * Nested Loop with one element, 
     * insertBefore on the first element that has the same or higher value than element
     * 
     */
  }

  /**
   * @desc
   * Calls node.appendChild for every node inside the elements of the component.
   */
  render() {
    this.#arrayOfElements.forEach(element => {
      element.addNode();
    })
  }

  /**
   * @desc
   * Calls node.removeChild for every node inside the elements of the component.
   */
  unrender() {
    this.#arrayOfElements.forEach(element => {
      if (!element.removed)
        element.removeNode();
    })
  }


  /**
   * @desc
   * Discards element inside component based on index, either from array supplied or the order from generator.createTree.
   * Calling this before render has undefined behavior. 
   * Note that index 0 will remove the whole component. 
   * @param {Number} index 
   */
  deleteByIndex(index) {
    const targetElement = this.#arrayOfElements[index]
    if (!targetElement.removed)
      targetElement.removeNode();
    this.#arrayOfElements.splice(index, 1);
  }

  /**
   * @desc
   * Deletes element based on ID, doesn't need any #.
   * Else the same applies to this function as deleteByIndex.
   * @param {String} id 
   */
  deleteById(id) {
    const index = this.#arrayOfElements.findIndex(elem => elem.id === id);
    const targetElement = this.#arrayOfElements[index];
    if (!targetElement.removed)
      targetElement.removeNode();
    this.#arrayOfElements.splice(index, 1);
  }

}

