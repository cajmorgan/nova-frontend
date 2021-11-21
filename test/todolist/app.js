import { Group, Router, Element, root } from '../../index';
import header from './header'
// import { search } from './search'
// import { galleryWrapper } from './gallery';
// import { paginationWrapper } from './pagination';
// import footer from './footer'

const title = new Element('h1', root, { className: 'title', innerText: 'TO-DO'} );
const App = new Group([
  title,
  header
  ])

new Router('/', [App])