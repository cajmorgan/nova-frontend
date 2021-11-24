import { Group, Router, Element, root } from '../../index';
import { header } from './header'
import { taskWrapper } from './taskWrapper';

const title = new Element('h1', root, { className: 'title', innerText: 'TO-DO'} );
const App = new Group([
  title,
  header,
  taskWrapper
])

new Router('/', [App])