import { Router, Generator, root } from '../index';
import header from './Header'
import { search } from './search'


new Router('/', [header, search])