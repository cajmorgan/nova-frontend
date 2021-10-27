class Generator {
  constructor() {

  }
  
  checkGrammar() {
    return 'something';
  }

  createTree(input) {
    const splitByNewLines = input.split('\n');
    const arrayOfLines = splitByNewLines.filter(elem => elem.length !== 0);
    const elementsToReturn = [];
    
    let prevLineIndentation = 0
    arrayOfLines.forEach(line => {
      let indentation = 0;
      for (let i = 0; line[i] == ' '; i++) {
        indentation++;
      } 

      //Rule: Value Expected -- If ':' is found, next grammarcheck type needs to be 'value' else throw error
      const rules = {
        valueExpected: false
      }
      const tokens = [];
      let currentToken = '';
      for (let lineIndex = indentation; lineIndex < line.length; lineIndex++) {
        let lastChar = ''
        if (line[lineIndex] !== ' ' && line[lineIndex]) {
          if (rules.valueExpected && line[lineIndex] !== '\'') 
            throw new Error('Missing \' after :');
          rules.valueExpected = false;
          
          if (line[lineIndex] === ':') {
            rules.valueExpected = true;
            continue;
          }

          currentToken += line[lineIndex];
          lastChar = line[lineIndex];
        } else {
          //Validate token
          const type = this.checkGrammar(currentToken)
          //If type === htmlChanger something, validate with lastchar
          tokens.push({token: currentToken, type });
          currentToken = '';
        }
        
      
      }
      console.log(tokens);
      



    })
  } 
}



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
generator.createTree(`
  div className: 'helloDiv'
    section
      h1 className: 'helo' innerText: 'hejsan'
    article
  div
`)
