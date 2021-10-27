
function createHeader() {
  const header = new Element('header', root, { className: 'hello', innerText: 'yo', id:'hello'})
    

  // const header = new Element('header', root, { className: 'header' });
  //   const header__div = new Element('div', header, { className: 'header__div' });
  //     const h1 = new Element('h1', header__div, { className: 'header__div--h1', innerText: "Welcome To New Framework!" });
  //     const h2 = new Element('h2', header__div, { className: 'header__div--h2', innerText: "hi me"});
  //     const textinput = new Element('input', header__div, { id: 'text-input', type: 'text', value: 5 });
  // textinput.addEventListener('click', () => {
  //   const value = textinput.value * 2;
  //   textinput.updateNode({ value });
  //   h2.updateNode({ innerText: value });
  //   h2.addStyle('color', 'red');
  // })
}

createHeader();

// const section = new Element('section', root);
//   const section__button = new Element('button', section, { innerText: 'A button' });
//   section__button.addEventListener('click', () => {
//     section__button.updateNode({ innerText: "you clicked me", id: "five" });
//   })






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