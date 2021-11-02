import { Element, Generator, Group, Router } from './nova';
const root = document.getElementById('root');

const generator = new Generator()
const header = generator.createTree(`
  header className: 'header'
    nav
      ul
        li  innerText: 'hello Sir' className: 'hoho'
        li  innerText: 'good Day Sir'
        li  innerText: 'hiho'
  end`)

// header.render();

const imageBuild = `
  h1 innerText: '{{title}}'
  h2 innerText: '{{sub}}'
  div
    p innerText: '{{subsub}}'
  end` 

const imageOne = generator.createTree(imageBuild)
const imageTwo = generator.createTree(imageBuild)
const imageThree = generator.createTree(imageBuild)
imageOne.setProps({ title: 'helo', sub: 'yo', subsub: 'hiho' })
imageTwo.setProps({ title: 'helo2', sub: 'yo2', subsub: 'haho' })
imageThree.setProps({ title: 'helo3', sub: 'yo3', subsub: 'haha' })

const images = new Group([imageOne, imageTwo, imageThree])

const frontPage = new Router('/', [header, images]);
const secondage = new Router('/head', [images]);
const thirdage = new Router('/hiho', [header]);

// imageOne.retrieve('h1')[0].addStyle('color', 'red');
