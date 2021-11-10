class State {
  #state;
  #worker;
  #listeners;
  #actions;

  constructor(worker, initialState) {
    this.#worker = worker;
    this.#state = initialState || null
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

  static mergeWorkers(workers) {
    return (state, action) => {
      const stateObj = {};
      for (const worker in workers) {
        const newState = workers[worker](state[worker], action);
        stateObj[worker] = newState
      }
      // workers.forEach(worker => {
      //   const name = worker.toString().split(' ')[1];
      //   console.log(name);

      //   const newState = worker(state[name], action);
      //   stateObj[name] = newState;
      // })

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

  dispatch(action) {
    this.#state = this.#worker(this.getState(), action);
    this.#listeners.forEach(listener => {
      listener()
    })
  }


}

export default State