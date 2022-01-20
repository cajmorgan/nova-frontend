import { Generator } from '../../index';
import state from './state/state';

const generator = new Generator();

const header = generator.createTree(`
  header className: 'header'
    form className: 'header__form'
      label className: 'form__label' htmlFor: 'title-input' innerText: 'Title'
      input className: 'form__input' id: 'title-input' value: '{{inputWorker.title}}'
      label className: 'form__label' htmlFor: 'description-input' innerText: 'Description'
      input className: 'form__input' id: 'description-input' value: '{{inputWorker.description}}'
      input className: 'form__button' id: 'submit-btn' type: 'submit' value: 'Add'
end`)

header.setState(state);
state.subscribe(header);

/** Event listeners */
header.retrieve('#title-input').addEventListener('input', (e) => {
    state.dispatch(state.getAction('inputChange', { value: e.target.value, field: 'title' }))
  })

header.retrieve('#description-input').addEventListener('input', (e) => {
  state.dispatch(state.getAction('inputChange', { value: e.target.value, field: 'description' }))
})

header.retrieve('.header__form')[0].addEventListener('submit', (e) => {
  e.preventDefault();
  const input = state.getState().inputWorker;
  state.dispatch(state.getAction('taskAdd', { task: {
    id: Date.now(),
    title: input.title,
    description: input.description,
    done: false
  } }))
})

export {
  header,
  state
};