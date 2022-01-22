/**
 * @name State
 * @class
 * @desc
 * State management for Nova. Heavily inspired by Redux with a similar system but in a way, more compact.
 * @example
 * const initState = { exampleWorkerOne: { someText: 'hello, '}, exampleWorkerTwo: ... } 
 * const workers = State.mergeWorkers({ exampleWorkerOne, exampleWorkerTwo });
 * const state = new State(workers, initState);
 */
class State {
  #state;
  #worker;
  #listeners;
  #actions;

  constructor(worker, initialState) {
    this.#worker = worker;
    this.#state = initialState || {}
    this.#listeners = [];
    this.#actions = [];
  }

  get listeners() {
    return this.#listeners;
  }

  get actions() {
    return this.#actions;
  }

  /**
   * @desc
   * Returns the state object.
   * @example
   * const initState = { whateverWorker: { title: 'Yo!', desc: 'Hello there...' } };
   * const state = new State(workers, init);
   * 
   * const whateverWorkerState = state.getState().whateverWorker;
   *
   * @returns {Object} state object
   */
  getState() {
    return this.#state;
  }

  /**
   * @desc
   * MergeWorkers is a static method that should always be used before supplying workers to state initialization.
   * 
   * @example
   * const exampleWorkerOne = (state, action) => {
   *   switch(action.type) {
   *     case 'ACTION': 
   *      return state.someText + 'hello again!';
   *     default:
   *       return state;
   *   }
   * }
   * 
   * const exampleWorkerTwo = (state, action) => {
   *  ...
   * }
   * 
   * const initState = { exampleWorkerOne: { someText: 'hello, '}, exampleWorkerTwo: ... } 
   * const workers = State.mergeWorkers({ exampleWorkerOne, exampleWorkerTwo });
   * const state = new State(workers, initState);
   * 
   * @param {Object} workers takes and object that have the function as a key-value pair with same name
   * @returns {Object} state object
   */
  static mergeWorkers(workers) {
    return (state, action) => {
      const stateObj = {};
      for (const worker in workers) {
        const newState = workers[worker](state[worker], action);
        stateObj[worker] = newState
      }

      return stateObj
    }
  }

  /**
   * @desc
   * Creates the action for the worker, which you can access from the action argument in the callback. 
   * The name supplied as the first argument needs to be unique for every action.
   * @example
   * state.createAction('actionName', { type: 'ACTION' })
   * @param {String} name - unique name for action.
   * @param {Object} deps - object containing prop "type".
   */
  createAction(name, deps) {
    const newAction = { name, deps };
    this.#actions.forEach(action => {
      if (action.name === newAction.name) {
        throw new Error(`Action name "${action.name}" already exists... Please choose a different one!`);
      }
    })

    this.#actions.push(newAction);
  }

  /**
   * @desc
   * This function is used to set new dependencies to a specific action.
   * Prefarably called together with dispatch as the argument.
   * The dependency can contain an optional property for use when setting up state together with "setState". 
   * See Component for more info regarding the optional property.
   * @example
   * state.dispatch(state.getAction('actionName', { someText: 'helo', optionalProperty: 'title' })); 
   * @param {String} name - the name of the action.
   * @param {Object} deps - the dependencies that will be accessible through the action argument in the worker.
   * @returns {Objectt} - returns the dependencies. 
   */
  getAction(name, deps) {
    const index = this.#actions.findIndex(action => action.name === name)
    if (deps)
      this.#actions[index].deps = {...this.#actions[index].deps, ...deps };
    return this.#actions[index].deps;
  }

  /**
   * @desc
   * The subscribe function takes 3 different listeners as an argument. 
   * If you use "setState" together with a component, you will supply the component as the argument.
   * Generelly when not using "setState", you want to supply an object with the action type and function.
   * This will make sure that the function only gets called when the specific action is set, see example.
   * If you supply a function directly, that one will get called every time you use dispatch, 
   * which is generelly unnecessary.
   * @example
   * state.subscribe(header); //Component
   * state.subscribe({ type: 'TASK_ADD', func: addTask }); //Only called when "TASK_ADD" is dispatched.
   * state.subscribe(addTask); //Called every dispatch.
   * @param {Component | Object | Function} listener 
   * @returns {Function} . unsubscribe function, call it to remove listener.
   */
  subscribe(listener) {
    if (!this.#listeners.includes(listener)) 
      this.#listeners.push(listener);
    
    return () => {
      const index = this.#listeners.indexOf(listener);
      this.#listeners.splice(index, 1);
    }
  } 
  /**
   * @desc
   * Dispatch is what you call to update state.
   * It's preferable to call it together with "getAction".
   * It first calls the worker to get the state and modifications.
   * Then it will call the listener you supplied with subscribe.
   * How it will call the listener depends on what type of listener you called subscribe with.
   * @example
   * state.dispatch(state.getAction('actionName', { someText: 'helo', optionalProperty: 'title' })); 
   * @param {Object} action - the dependencies supplied, see "getAction".
   */
  dispatch(action) {
    this.#state = this.#worker(this.getState(), action);
    this.#listeners.forEach(listener => {
      if (typeof listener === 'object') {
        if (listener.type === action.type) {
          listener.func();
        } else if (listener.updateState)
          listener.updateState();
      } else listener();
    })
  }


}

export default State