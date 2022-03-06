const { StaticGenerator } = require('../../../../nova')

const gen = new StaticGenerator();

const header = gen.createTree(`
  div
    h1 innerText: 'yooooo'
end`)

module.exports = header;