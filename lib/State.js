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

  createAction() {

  }

  subscribe(listener) {
    if (!this.#listeners.includes(listener))
      this.#listeners.push(listener);
  } 

  unsubscribe(listener) {
    this.#listeners = this.#listeners.filter(func => listener !== func)
  }

  dispatch(action) {
    this.#state = this.#reducer(this.now, action);
    this.#listeners.forEach(listener => {
      listener()
    })
  }


}

export default State