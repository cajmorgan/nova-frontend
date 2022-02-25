import { Generator, Element, root } from "../..";

const generator = new Generator();

// const aNewParent = new Element('article', root, {}, true);

const header = generator.createTree(`
  div id: 'hello'
    h1 innerText: 'Welcome!'
    div
      h2 innerText: 'To my page...'
      div 
      div
end`)

header.render();
// header.changeParent(aNewParent);
