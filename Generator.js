class Generator {
  constructor() {
    this.rules = {
      typeExpected: true,
      valueExpected: false,
      checkNextTypeIsValue: false
    }
  }
  
  checkGrammar(currentToken) {
    /** Grammars
     * token_type ex. div section form button
     * token_property
     * token_value 
     */
    const tags = ["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bb","bdo","big","blockquote","body","br /","button","canvas","caption","center","cite","code","col","colgroup","command","datagrid","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","em","embed","eventsource","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1 to h6","head","header","hgroup","hr /","html","i","iframe","img","input","ins","isindex","kbd","keygen","label","legend","li","link","map","mark","menu","meta","meter","nav","noframes","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strike","strong","style","sub","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr"]
    let returnType = '';

    if (this.rules.typeExpected) {
      if (tags.includes(currentToken)) {
        returnType = 'token_type';
      }
    }

    if (this.rules.checkNextTypeIsValue) {
      if (currentToken[0] === '\'' && currentToken[currentToken.length - 1] === '\'') {
        returnType = 'token_value';
      }
    }

    return returnType;
  }

  createElementsFromTokens() {

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
      const tokens = [];
      let currentToken = '';
      for (let lineIndex = indentation; lineIndex <= line.length; lineIndex++) {
        let lastChar = ''
        if ((line[lineIndex] !== ' ' && lineIndex !== line.length) && line[lineIndex]) {
          if (this.rules.valueExpected && line[lineIndex] !== '\'') 
            throw new Error('Missing \' after :');         

          if (line[lineIndex] === ':') {
            this.rules.valueExpected = true;
            continue;
          }

          currentToken += line[lineIndex];
          lastChar = line[lineIndex];
        } else {
          //Validate token
          const type = this.checkGrammar(currentToken)

          if (this.rules.typeExpected && type !== 'token_type') 
            throw new Error("type expected as first token! ex. div");
          this.rules.typeExpected = false;

          if (this.rules.checkNextTypeIsValue && type !== 'token_value') 
            throw new Error("'value' expected after after token_property")
          this.rules.checkNextTypeIsValue = false;

          if (this.rules.valueExpected) {
            this.rules.checkNextTypeIsValue = true;
            this.rules.valueExpected = false;
          }

          //If type === htmlChanger something, validate with lastchar
          tokens.push({ token: currentToken, type });
          currentToken = '';
        }
        
        //Create element from tokens
      }
      console.log(tokens);
      



    })
  } 
}

const generator = new Generator()
generator.createTree(`
  div className: 'helloDiv'
    section
      h1 className: 'helo' innerText: 'hejsan'
    article
  div
`)


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


