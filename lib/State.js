class State {
  #state
  #reducer
  #listeners
  #actions

  constructor(reducer, initialState) {
    this.#reducer = reducer;
    this.#state = initialState || null
    this.#listeners = [];
    this.#actions = [];
  }

  get now() {
    return this.#state;
  }

  get listeners() {
    return this.#listeners;
  }

  get actions() {
    return this.#actions;
  }

  static createReducer() {

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

  dispatch(action) {
    this.#state = this.#reducer(this.now, action);
    this.#listeners.forEach(listener => {
      listener()
    })
  }


}

export default State