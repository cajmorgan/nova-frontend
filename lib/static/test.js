import { StaticGenerator } from "../nova.js";
import StaticCompiler from "./StaticCompiler.js";

const gen = new StaticGenerator();

const header = gen.createTree(`
  div className: 'grandfather' id: 'awesome'
    div className: 'mother'
      h1 innerText: 'hello'
      h2 innerText: 'well'
      p innerText: 'yo'
    div className: 'father'
      div
        h2 innerText: 'nesting'
end`)

const gallery = gen.createTree(`
  div className: 'gallery'
    section
      h1 innerText: 'Gallery'
end`)

const compiler = new StaticCompiler([header, gallery], './', { html: 'index', js: 'index', css: 'styles' }, 'en')
compiler.compile();
// console.log(compiler.HTMLDocument)

