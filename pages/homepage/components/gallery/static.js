const { StaticGenerator } = require('../../../../index')

const gen = new StaticGenerator();

const gallery = gen.createTree(`
  div className: 'gallery'
    section
      h1 innerText: 'Gallery'
end`);

module.exports = gallery;