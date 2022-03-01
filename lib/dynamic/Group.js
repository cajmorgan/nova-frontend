/**
 * @name Group
 * @class
 * @desc
 * A group is a wrapper for components where it's possible to do bulk operations.
 * This is very usefuly when you want a group of components to have the same parent.
 * In a situation where you want to append new components, for example in a todo-list, 
 * it's highly recommended to wrap them all in a group so they share the same grandparent. 
 * @example
 * const taskOne = generator.createTree(`
 *  ...
 * `)
 * 
 * const taskTwo = ...
 * 
 * 
 * const taskWrapper = new Element('section', root, { className: 'task-wrapper' });
 * const tasks = new Group([taskOne, taskTwo], taskWrapper);
 * tasks.render();
 * 
 * @param {Components[]} arrayOfComponents - An array of components, every element will be automatically converted to a component. 
 * @param {Element} parent - Element used to wrap the components, changing the grandparent node. 
 */

module.exports = class Group {
  #arrayOfComponents
  #parent

  constructor(arrayOfComponents, parent) {
    this.#arrayOfComponents = arrayOfComponents || [];
    this.#parent = parent
    this.#createComponents();
    this.#wrapper();
  }

  /** 
   * @desc
   * Returns an array of components
   * @returns {Component[]}
   */
  get components() {
    return this.#arrayOfComponents
  }

  #createComponents() {
    this.#arrayOfComponents = this.#arrayOfComponents.map(curr => {
      if (curr.node)
        return curr.createComponent();
      else
        return curr;
    })
  }

  #wrapper() {
    if (this.#parent) {
      this.#arrayOfComponents.forEach(comp => {
        comp.elements[0].changeParent(this.#parent.node);
      })
    }
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
   * Calls render on all Components inside Group. Same as Component.render().
   */
  render() {
    this.#arrayOfComponents.forEach(comp => {
      comp.render();
    })
  }

  /**
   * @desc
   * Adds a new component to the group dynamically. 
   * This also has the effect of assigning the wrapper grandparent to the added component.
   * Very useful when you are adding new components dynamically to the DOM, like more todos in a list.
   * @param {Component} component 
   */
  add(component) {
    this.#arrayOfComponents = [...this.#arrayOfComponents, component];
    component.elements[0].changeParent(this.#parent.node);
    this.render();
  }

  /**
   * @desc
   * Replaces the components in the group with a new array of components. 
   * @param {Component[]} arrayOfComponents 
   */
  update(arrayOfComponents) {
    this.arrayOfComponents = arrayOfComponents;
    this.#wrapper();
    this.render();
  }

  /**
   * @desc
   * Calls unrender on all components. Same as Component.unrender().
   */
  unrender() {
    this.#arrayOfComponents.forEach(comp => {
      comp.unrender();
    })
  }

  /**
   * @desc
   * Retrieve a component in a group. At the moment only supports ids.
   * @param {String} id 
   * @returns {elements[]}
   */
  retrieve(id) {
    const comp = this.#arrayOfComponents.find(comp => comp.retrieve(`#${id}`))
    return comp.elements;
  }

  /**
   * @desc
   * Deletes a component in a group by id. 
   * @param {String} id 
   */
  deleteById(id) {
    let index;
    this.#arrayOfComponents.forEach((comp, i) => {
      if (comp.elements[0].id === id) {
        index = i;
        while (comp.elements.length > 0)
          comp.deleteByIndex(0);
      }
    })

    this.#arrayOfComponents.splice(index, 1);
  }

}

