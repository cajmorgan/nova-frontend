
function createHeader() {
  const header = new Element('header', root, { className: 'header' });
  const div = new Element('div', header.node, { className: 'header__div' });
  const h1 = new Element('h1', div.node, { className: 'header__div--h1', innerText: "Welcome To New Framework!" });
  const h2 = new Element('h2', div.node, { className: 'header__div--h2', innerText: "Click me" });
  const divTwo = new Element('div', header.node, { className: 'header__div--two' });

  let counter = 0;
  h2.addEventListener('click', () => {
    if (counter % 2 === 0) {
      divTwo.insertBeforeSibling();
      h2.updateNode({ className: 'hiho' })
    } else {
      divTwo.insertAfterSibling();
      h2.updateNode({ className: 'waow' })

    }

    counter++;
  })
 
}

createHeader();




// const div = new Element('div', document.body, { className: 'hello', id: 'coolDiv'})
// div.createNode();
// const buttonOne = new Element('button', div.node, { id: 'btnOne', innerText: 'One', className: 'btns' })
// buttonOne.createNode();
// const buttonTwo = new Element('button', div.node, { id: 'btnTwo', innerText: 'Two', className: 'btns' })
// buttonTwo.createNode();
// const buttonThree = new Element('button', div.node, { id: 'btnThree', innerText: 'Three' , className: 'btns' })
// buttonThree.createNode();

// [buttonOne, buttonTwo, buttonThree].forEach(elem => {
//   elem.addEventListener('click', () => {
//     const node = elem.node;
//     // elem.insertAfterSibling();
//     elem.insertAfterSibling();
//   })
// })
// // buttonOne.addEventListener('click', () => {
// //   buttonOne.updateNode({ innerText: 'Hello' })
// //   // buttonOne.changeParent(document.body);
// // })