import { Generator } from '../../index'

const generator = new Generator();

const footer = generator.createTree(`
  footer className: 'footer'
    p innerText: '@cajmorgan'
  end`)

export default footer

