import { Group, Router, Element, root } from '../index';
import header from './header'
import { search } from './search'
import { galleryWrapper } from './gallery';
import { paginationWrapper } from './pagination';
import footer from './footer'

const frontPage = new Group([
  header, 
  search, 
  galleryWrapper.createComponent(), 
  paginationWrapper.createComponent(),
  footer])

new Router('/', [frontPage])
new Router('/search', [header])