import { State, Element, Generator, root } from '../../index'

(function() {
  function yooWorker (state, action) {
    switch (action.type) {
      case 'YO':
        return state + 'YOOOO';
      case 'HO':
        return state + 'hooo';
      default:
        return state;
    }
  };
  
  function hiWorker (state, action) {
    switch (action.type) {
      case 'HI':
        return state + 'YOOOO';
      default:
        return state;
    }
  };

  const init = { yooWorker: 'helo', hiWorker: 'hiho' };
  const workers = State.mergeWorkers({ yooWorker, hiWorker });
  const state = new State(workers, init);
  state.createAction('yoAdd', { type: 'YO' })
  state.createAction('hoAdd', { type: 'HO' })

  const generator = new Generator();
  const header = generator.createTree(`
    header
      h1 innerText: '{{yooWorker}}'
      h2 innerText: '{{hiWorker}}' id: 'helo' className: 'helo'
      h3 innerText: 'hiho'
    end`)

  //Kolla om du kan bygga nått som gör att du kan passa in state i Components i combination med generator som props?
  header.setProps(init);
  
  header.render()
  const changeText = () => {
    header.elements[1].updateNode({ innerText: state.getState().yooWorker });
  }

  const changeColor = () => {
    header.elements[2].updateNode({ innerText: state.getState().hiWorker });
  }

  state.subscribe(changeText);
  state.subscribe(changeColor);

  header.elements[1].addEventListener('click', (e) => {
    state.dispatch(state.getAction('yoAdd'));
    state.dispatch(state.getAction('hoAdd'));
  })


})();
  