import { Generator, Group } from '../index'

const build = `
  div id: '{{buildId}}'
    h1 innerText: '{{title}}'
  end`

const generator = new Generator();
const thingOne = generator.createTree(build)
const thingTwo = generator.createTree(build)
const thingThree = generator.createTree(build)

const things = [thingOne, thingTwo, thingThree];

things.forEach((thing, index) => {
  thing.setProps({ buildId: `thing${index}`, title: `hello${index}`});
})

const thingGroup = new Group(things);

export default thingGroup