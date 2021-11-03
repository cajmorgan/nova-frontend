// // new Router('/', [header]);
// // new Router('/things', [header, things]);
// // const button = new Element('button', root, { innerText: 'Go To Things' }, true);
// // button.addEventListener('click', () => {
// //   if (Router.getPath() === '/')
// //     Router.changePath('/things')
// //   else {
// //     Router.changePath('/')
// //   }
// // })


// // header.render();

// const imageBuild = `
//   h1 innerText: '{{title}}' id: 'helo'
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
// new Router('/', [header, images]);
// new Router('/head', [images]);
// new Router('/hiho', [header]);

// imageOne.retrieve('h1')[0].addStyle('color', 'red');

