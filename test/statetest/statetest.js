import { State, Element, Generator, root } from '../../index'

(function() {
  function worker (state, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 'YOOOO';
      case 'TRIPLE':
        return (state % 2) ? state * 3 : state;
      default:
        return state;
    }
  };


  // const workers = State.mergeWorkers(likesWorker, secondWorker);
  const state = new State(worker, 'helo');
  state.createAction('incrementLikes', { type: 'INCREMENT' })
  state.createAction('doubleLikes', { type: 'DOUBLE' })

  const generator = new Generator();
  const text = generator.createTree(`
    h1 innerText: 'helo'
    h2 innerText: 'yo'
  end`)

  text.render()
  // const text = new Element('h1', root, { innerText: state.getState().likesWorker }, true);
  const changeText = () => {
    text.elements.forEach(elem => {
      elem.updateNode({ innerText: state.getState() });
    })
  }

  state.subscribe(changeText);

  text.elements[0].addEventListener('click', () => {
    state.dispatch(state.getAction('incrementLikes'));
  })

 

  // const store = Redux.createStore(likesReducer);
  
 
  
  // const render = () => {
  //   const el = document.getElementById('value');
  //   el.innerHTML = store.getState().toString();
  // };
  
  // render();
  // // You should somehow get a notification from the store and call render()...
  // store.subscribe(render);
  
  // document.getElementById('like').addEventListener('click', () => {
  //   // Create an Action (command) about what should happend and send that to the store
  //   
  // });
  
  // document.getElementById('double').addEventListener('click', () => {
  //   // Create an Action (command) about what should happend and send that to the store
  //   store.dispatch(doubleLikes);
  // });
  
  // document.getElementById('tripple').addEventListener('click', () => {
  //   // Create an Action (command) about what should happend and send that to the store
  //   store.dispatch(tripleLikes);
  // });
  
  })();
  