const { StaticGenerator } = require('../../../../nova')
const gallery = require('../../../../components/gallery/static');

// const gen = new StaticGenerator();

// const arrTest = [{ title: 'hello', desc: 'nicenice' }, { title: 'hiho', desc: 'fyfan' }];

// let arrTestString = '';
// arrTest.forEach(one => {
//   const comp = gen.createTree(`
//     div
//       h1 innerText: '{{title}}'
//       p innerText: '{{desc}}'
//   end`)

//   comp.setProps({ title: one.title, desc: one.desc });
//   arrTestString += comp.HTMLString;
// })

// const header = gen.createTree(`
//   div className: 'wrapper' innerText: '{{arrTest}}'
// end`)

// header.setProps({ arrTest: arrTestString });

function header(fem) {
  const gen = new StaticGenerator();

  const component = gen.createTree(`
    div className: 'hello'
      h1 innerText: '{{fem}}'
      div className: 'gallerWrapper' innerText: '{{gallery}}'
  end`)

  component.setProps({ fem, gallery: gallery('ett galleri') });


  return component;
}


module.exports = header;