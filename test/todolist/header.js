import { Generator } from '../../index';
import state from './state/state';

const generator = new Generator();

const header = generator.createTree(`
  header className: 'header'
    button className: 'header__hideDone' innerText: 'Hide Done'
    button className: 'header__clearInput' innerText: 'Clear Text'
    form className: 'header__form'
      label className: 'form__label' htmlFor: 'title-input' innerText: 'Title'
      input className: 'form__input' id: 'title-input' value: '{{inputWorker.title}}'
      label className: 'form__label' htmlFor: 'description-input' innerText: 'Description'
      input className: 'form__input' id: 'description-input' value: '{{inputWorker.description}}'
      input className: 'form__button' id: 'submit-btn' type: 'submit' value: 'Add'
end`)

header.setState(state);
state.subscribe(header);

header
  .retrieve('#title-input')
  .addEventListener('keydown', (e) => {
    state.dispatch(state.getAction('inputChange', { value: e.target.value, field: 'title' }))
  })

export default header;