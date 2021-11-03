import { Router, Generator, root } from '../index';
import search from './Search'

const generator = new Generator();
const pageTwo = generator.createTree(`
  h1 innerText: 'PaggesssTwo'
end`)

new Router('/', [search])
new Router('/two', [pageTwo])
