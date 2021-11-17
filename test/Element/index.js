import { Element, root } from '../../index'

const container = new Element('div', root, {}, true);
const h1 = new Element('h1', container, { innerText: 'helo' }, true);
const h2 = new Element('h2', container, { innerText: 'helo' }, true);
const h3 = new Element('h3', container, { innerText: 'helo' }, true);

