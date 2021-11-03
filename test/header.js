import { Generator } from '../index'

const generator = new Generator();

const header = generator.createTree(`
  header
    h1 className: 'header__title' innerText: 'Image Gallery'
    h2 className: 'header__sub' innerText: 'Just search!'
  end`)

export default header
