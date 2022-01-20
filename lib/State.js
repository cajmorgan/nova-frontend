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

  getState() {
    return this.#state;
  }

  //If you have a state ARRAY, you can get a portion of it by supplying id and keyname
  getStateById(id, keyname = 'id') {
    return this.#state.filter(fragment => fragment[keyname] === id);
  }

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

  createAction(name, deps) {
    const newAction = { name, deps };
    //Should verify name if exists?
    this.#actions.push(newAction);
  }

  getAction(name, deps) {
    const index = this.#actions.findIndex(action => action.name === name)
    if (deps)
      this.#actions[index].deps = {...this.#actions[index].deps, ...deps };
    return this.#actions[index].deps;
  }

  subscribe(listener) {
    if (!this.#listeners.includes(listener)) 
      this.#listeners.push(listener);
    
    return () => {
      const index = this.#listeners.indexOf(listener);
      this.#listeners.splice(index, 1);
    }
  } 
  /**
   * Can execute component using updateState. 
   * Can also execute specific type if listener has type attr and matches action.type.
   * If listener is pure function, it will be executed on every dispatch
   * @param {*} action 
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