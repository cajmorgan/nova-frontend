import { State, Element, Generator, root } from '../../index'

(function() {
  const yooWorker = (state, action) => {
    switch (action.type) {
      case 'YO':
        return state + 'YOOOO';
      case 'HO':
        return state + 'hooo';
      default:
        return state;
    }
  };
  
  const hiWorker = (state, action) => {
    switch (action.type) {
      case 'HI':
        return state + 'hiho';
      default:
        return state;
    }
  };

  const init = { yooWorker: 'helo', hiWorker: 'hiho' };
  const workers = State.mergeWorkers({ yooWorker, hiWorker });
  const state = new State(workers, init);
  state.createAction('yoAdd', { type: 'YO' })
  state.createAction('hoAdd', { type: 'HI' })

  const generator = new Generator();
  const header = generator.createTree(`
    header
      h1 innerText: '{{yooWorker}}'
      h2 innerText: '{{hiWorker}}' id: 'helo' className: 'helo'
      h3 innerText: 'hiho'
    end`)

  header.setState(state);
  

  state.subscribe(header);

  header.elements[1].addEventListener('click', (e) => {
    state.dispatch(state.getAction('yoAdd'));
    state.dispatch(state.getAction('hoAdd'));
  })

  header.render()
})();
  