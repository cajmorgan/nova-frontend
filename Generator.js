// Tree creation from pseudo html input from generator below

const exampleObj = [{
  type: 'div',
  parent: 'NODE TO PARENT',
  elementObject: { className: 'helloDiv' },
  children: [
    {
      type: 'section',
      parent: 'NODE TO PARENT',
      elementObject: {},
      children: [
        { type: 'h1',
          parent: 'NODE TO PARENT',
          elementObject: { className: 'helo', innerText: 'hejsan' },
          children: {}
        }
      ]
    },
    {
      type: 'article',
      parent: 'NODE TO PARENT',
      elementObject: {},
      children: {}
    }
  ],

},
{
  type: 'div',
  parent: 'NODE TO PARENT',
  elementObject: {},
  children: [{
    type: 'div',
    parent: 'NODE TO PARENT',
    elementObject: {}
    }
  ]
}
]


const generator = new Generator()
const [divOne, section, h1, article, divTwo] = generator.createTree({
html: `
div className: 'helloDiv'
  section
    h1 className: 'helo' innerText: 'hejsan'
  article
div
`})
