class State {
  #state
  #reducer
  #listeners

  constructor(reducer, initialState) {
    this.#reducer = reducer;
    this.#state = initialState || null
    this.#listeners = [];
  }

  get now() {
    return this.#state;
  }

  get listeners() {
    return this.#listeners;
  }

  static createReducer() {

  }

  createAction(actionObj) {
    
  }

  getAction() {

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