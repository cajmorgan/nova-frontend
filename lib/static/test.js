import StaticGenerator from "./StaticGenerator.js";


const gen = new StaticGenerator();

gen.createTree(`
  div
    h1 innerText: 'hello'
    p innerText: 'yo'
  div
    div
      h2 innerText: 'nesting'
end`)