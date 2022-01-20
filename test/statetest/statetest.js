import { State, Element, Generator, root } from '../../index'

(function() {
  const yooWorker = (state, action) => {
    switch (action.type) {
      case 'YO':
        return { title: state[action.field] + action.text };
      case 'HO':
        return { title: state[action.field] + action.text };
      default:
        return state;
    }
  };
  
  const hiWorker = (state, action) => {
    switch (action.type) {
      case 'HI':
        return {title: state[action.field] + 'hiho'};
      default:
        return state;
    }
  };

  const init = { yooWorker: { title: 'yo' }, hiWorker: { title: 'hiha' } };
  const workers = State.mergeWorkers({ yooWorker, hiWorker });
  const state = new State(workers, init);
  state.createAction('yoAdd', { type: 'YO' })
  state.createAction('hoAdd', { type: 'HI' })

  const generator = new Generator();
  const header = generator.createTree(`
    header
      div
        h1 innerText: '{{yooWorker.title}}'
      div
        h2 innerText: '{{hiWorker.title}}' id: 'helo' className: 'helo'
      h3 innerText: 'hiho'
    end`)

  header.setState(state);
  state.subscribe(header);

  header.elements[1].addEventListener('click', (e) => {
    state.dispatch(state.getAction('yoAdd', { text: 'helo', field: 'title' }));
    state.dispatch(state.getAction('hoAdd', { text: 'yo', field: 'title' }));
  })

  header.render()
})();
  