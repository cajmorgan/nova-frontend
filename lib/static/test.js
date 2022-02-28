import StaticGenerator from "./StaticGenerator.js";


const gen = new StaticGenerator();

gen.createTree(`
  div
    div
      h1 innerText: 'hello'
      h2
      p innerText: 'yo'
    div
      div
        h2 innerText: 'nesting'
end`)