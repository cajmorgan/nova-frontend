import { Router, Element, root } from '../index';
import header from './header.js'
import things from './things'

new Router('/', [header]);
new Router('/things', [header, things]);
const button = new Element('button', root, { innerText: 'Go To Things' }, true);
button.addEventListener('click', () => {
  if (window.location.pathname === '/')
    window.location.href = '/things';
})


// header.render();

// const imageBuild = `
//   h1 innerText: '{{title}}'
//   h2 innerText: '{{sub}}'
//   div
//     p innerText: '{{subsub}}'
//   end` 

// const imageOne = generator.createTree(imageBuild)
// const imageTwo = generator.createTree(imageBuild)
// const imageThree = generator.createTree(imageBuild)
// imageOne.setProps({ title: 'helo', sub: 'yo', subsub: 'hiho' })
// imageTwo.setProps({ title: 'helo2', sub: 'yo2', subsub: 'haho' })
// imageThree.setProps({ title: 'helo3', sub: 'yo3', subsub: 'haha' })

// const images = new Group([imageOne, imageTwo, imageThree])

// images.render();
// const frontPage = new Router('/', [header, images]);
// const secondage = new Router('/head', [images]);
// const thirdage = new Router('/hiho', [header]);

// imageOne.retrieve('h1')[0].addStyle('color', 'red');

