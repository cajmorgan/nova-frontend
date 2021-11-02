
const generator = new Generator()
const header = generator.createTree(`
  header className: 'header'
    nav
      ul
        li  innerText: 'hello Sir' className: 'hoho'
        li  innerText: 'good Day Sir'
        li  innerText: 'hiho'
  end`)

header.render();

const imageBuild = `
  h1 innerText: '{{title}}'
  h2 innerText: '{{sub}}'
  div
    p innerText: '{{title}}'
  end` 

const imageOne = generator.createTree(imageBuild)
const imageTwo = generator.createTree(imageBuild)
const imageThree = generator.createTree(imageBuild)
imageOne.setVariables({ title: 'helo', sub: 'yo' })
imageTwo.setVariables({ title: 'helo2', sub: 'yo2' })
imageThree.setVariables({ title: 'helo3', sub: 'yo3' })

const images = new Group([imageOne, imageTwo, imageThree])

images.render();
images.render();

// const frontPage = new Router('/', [header]);
// const secondage = new Router('/hiho', [header]);