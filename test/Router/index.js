import { Router, Group, Element, Generator, root } from '../../';

const wrapper = new Element('div', root, { id: 'wrapper' }, true);

const generator = new Generator;
const component = generator.createTree(`
  div
    h1 innerText: 'Router example.'
    button innerText: 'Click it'
end`)

component.retrieve('button')[0].addEventListener('click', () => {
  Router.changePath('/about');
})

const about = new Element('h1', root, { innerText: 'Hello there!'}).createComponent();
const group = new Group([component], wrapper);

new Router('/', [group])
new Router('/about', [about]);