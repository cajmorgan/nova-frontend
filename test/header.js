import { Generator } from '../index';

const generator = new Generator()
const header = generator.createTree(`
  header className: 'header'
    nav
      ul
        li  innerText: 'hello Sir' className: 'hoho'
        li  innerText: 'good Day Sir'
        li  innerText: 'hiho'
  end`)

  

  // header.retrieve('li').forEach(elem => {
  //   elem.addEventListener('click', () => {
  //     const text = elem.text;
  //     elem.updateNode({ innerText: 'Clicked!' });
  //     setTimeout(() => {
  //       elem.updateNode({ innerText: text });
  //     }, 500);
  //   })
  // })

export default header;