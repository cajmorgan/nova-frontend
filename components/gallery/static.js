const { StaticGenerator } = require('../../nova')

const gen = new StaticGenerator();

function gallery(text) {
  return gen.createTree(`
    div className: 'gallery'
      section
        h1 innerText: '{{text}}' id: 'important'
  end`).setProps({ text });
}

module.exports = gallery;