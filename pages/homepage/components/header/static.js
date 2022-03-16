const { StaticGenerator } = require('../../../../nova')

const gen = new StaticGenerator();

const arrTest = [{ title: 'hello', desc: 'nicenice' }, { title: 'hiho', desc: 'fyfan' }];

let arrTestString = '';
arrTest.forEach(one => {
  const comp = gen.createTree(`
    div
      h1 innerText: '{{title}}'
      p innerText: '{{desc}}'
  end`)

  comp.setProps({ title: one.title, desc: one.desc });
  arrTestString += comp.HTMLString;
})

const header = gen.createTree(`
  div className: 'wrapper' innerText: '{{arrTest}}'
end`)

header.setProps({ arrTest: arrTestString });

module.exports = header;