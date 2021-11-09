import { State, Element, root } from '../../index'

(function() {
  const likesReducer = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 'YOOOO';
      case 'DOUBLE':
        return state + 'hi';
      case 'TRIPLE':
        return (state % 2) ? state * 3 : state;
      default:
        return state;
    }
  };

  const state = new State(likesReducer, 'hello');
  state.createAction('incrementLikes', { type: 'INCREMENT' })
  

  const text = new Element('h1', root, { innerText: state.now }, true);
  const changeText = () => {
    text.updateNode({ innerText: state.now });
  }

  state.subscribe(changeText);

  text.addEventListener('click', () => {
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
  