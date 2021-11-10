import { State, Element, Generator, root } from '../../index'

(function() {
  function yooWorker (state = 'helo', action) {
    switch (action.type) {
      case 'YO':
        return state + 'YOOOO';
      default:
        return state;
    }
  };
  function hiWorker (state = 'helo', action) {
    switch (action.type) {
      case 'HI':
        return state + 'YOOOO';
      default:
        return state;
    }
  };

  const workers = State.mergeWorkers({ yooWorker, hiWorker });
  const state = new State(workers);
  state.createAction('yoAdd', { type: 'YO' })
  state.createAction('hiAdd', { type: 'HI' })

  const generator = new Generator();
  const header = generator.createTree(`
    header
      h1 innerText: '{{yooWorker}}'
      h2 innerText: '{{hiWorker}}' id: 'helo' className: 'helo'
    end`)

  header.render()
  const changeText = () => {
    header.elements[1].updateNode({ innerText: state.getState().yooWorker });
    header.elements[2].updateNode({ innerText: state.getState().hiWorker });
  }

  state.subscribe(changeText);

  header.elements[0].addEventListener('click', () => {
    state.dispatch(state.getAction('yoAdd'));
    state.dispatch(state.getAction('hiAdd'));
  })

 

})();
  