const { StaticGenerator } = require('../../../../../../index')

const gen = new StaticGenerator();

const header = gen.createTree(`
  div className: 'grandfather' id: 'awesome'
    div className: 'mother'
      h1 innerText: 'hello'
      h2 innerText: 'well'
      p innerText: 'yo'
    div className: 'father'
      div
        h2 innerText: 'nesting'
end`)

module.exports = header;