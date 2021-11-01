
const generator = new Generator()
const header = generator.createTree(`
  header className: 'header'
    nav
      ul
        li  innerText: 'hello Sir'
        li  innerText: 'good Day Sir'
        li  innerText: 'hiho'
  end`)

header.render();

// const frontPage = new Router('/', [header]);
// const secondage = new Router('/hiho', [header]);