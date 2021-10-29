class Generator {
  constructor() {
    this.tokens = [];
    this.treeObjectArray = [];
    this.rules = {
      typeExpected: true,
      valueExpected: false,
      checkNextTypeIsValue: false
    }
  }

  get tags() {
    return ["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bb","bdo","big","blockquote","body","br /","button","canvas","caption","center","cite","code","col","colgroup","command","datagrid","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","em","embed","eventsource","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1", "h2", "h3", "h4", "h5", "h6","head","header","hgroup","hr /","html","i","iframe","img","input","ins","isindex","kbd","keygen","label","legend","li","link","map","mark","menu","meta","meter","nav","noframes","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strike","strong","style","sub","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr"]
  }
  
  generateElementsFromTree() {
    const root = document.getElementById('root');
    const elementsArray = [];
    let priorityArray = [];
    let lowestIndentation = 0;
    let previousPriority = null;
    
    this.treeObjectArray.forEach((object, index) => {
      if (index === 0) 
        lowestIndentation = object.priority
      else
        if (object.priority < lowestIndentation)
          lowestIndentation = object.priority;
    })
/**
 * Priority Array -
 * You will keep a parent there until the priority subtracts back to same priority, 
 * splice it from array
 */
    this.treeObjectArray.forEach((object) => {
      let element;
      if (object.priority === lowestIndentation) {
        element = new Element(object.tag, root, object.propertyObject);
       
      } else if (object.priority === previousPriority + 2) {
        const parentObject = priorityArray.find(elem => elem.priority === object.priority - 2);
        element = new Element(object.tag, parentObject.element, object.propertyObject);
      } else if (object.priority === previousPriority - 2) {
        //Filter out everything that isn't grandparent
        priorityArray = priorityArray.filter(elem => elem.priority <= object.priority - 4);
        const parentObject = priorityArray.find(elem => elem.priority === object.priority - 2);
        element = new Element(object.tag, parentObject.element, object.propertyObject);
      }

      elementsArray.push(element);
      priorityArray.push({ element, priority: object.priority });
      previousPriority = object.priority;
    })
    

  }

  createTreeObjectFromTokens() {
    this.tokens.forEach((line, index) => {
      const indentation = line[0].indentation;
      const treeObject = {};
      const propertyObject = {};
      let tokenValue = false;
      for (let tokenIndex = 0; tokenIndex < line.length; tokenIndex++) {
        if (line[tokenIndex].type === 'token_tag') {
          treeObject.tag = line[tokenIndex].token;
          treeObject.priority = indentation;
          continue;
        } 

        if (line[tokenIndex].type === 'token_property') {
          propertyObject[line[tokenIndex].token] = line[tokenIndex + 1].token;
          tokenIndex++;
        }

        //MAKE CHILDREN
      }

      treeObject.propertyObject = propertyObject;
      this.treeObjectArray.push(treeObject);

    })
  }

  checkGrammar(currentToken, lineNumber, currentLineTokens) {
    /** Grammars
     * token_tag ex. div section form button
     * token_property
     * token_value 
     */
    const tags = this.tags;
    let returnType = '';

    if (this.rules.typeExpected) {
      if (tags.includes(currentToken)) {
        returnType = 'token_tag';
      } else {
        throw new Error(`Invalid type, check if applied HTML tag on line ${lineNumber + 1} is valid. To see available tags, console.log(generator.tags)`)
      }
    }

    if (this.rules.valueExpected) {
      // const lineType = currentLineTokens[0].type;
      //   const testNode = document.createElement(lineType)
      //   for (const elem in testNode) {
      //     if (elem === currentToken)
      //       returnType = 'token_property'
      //   }

      //   if (returnType !== 'token_property')
      //     throw new Error(`Invalid property value ${currentToken} for ${lineType}`)
        return 'token_property';
    }

    if (this.rules.checkNextTypeIsValue) {
      if (currentToken[0] === '\'' && currentToken[currentToken.length - 1] === '\'') {
        currentToken = currentToken.replace(/'/g, '');
        returnType = 'token_value';
      }
    }

    return returnType;
  }

  generateTokens(inputArr) {
    const arrayOfLines = inputArr.filter(elem => elem.length !== 0);
    arrayOfLines.forEach((line, lineNumber) => {
      const currentLineTokens = [];
      this.rules.typeExpected = true;
      let indentation = 0;
      for (let i = 0; line[i] == ' '; i++) {
        indentation++;
      } 

      //Rule: Value Expected -- If ':' is found, next grammarcheck type needs to be 'value' else throw error
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
          const type = this.checkGrammar(currentToken, lineNumber, currentLineTokens)

          if (this.rules.typeExpected && type !== 'token_tag') 
            throw new Error("type expected as first token! ex. div");
          this.rules.typeExpected = false;

          if (this.rules.checkNextTypeIsValue && type !== 'token_value') 
            throw new Error("'value' expected after after token_property")
          this.rules.checkNextTypeIsValue = false;

          if (this.rules.valueExpected) {
            this.rules.checkNextTypeIsValue = true;
            this.rules.valueExpected = false;
          }

          if (type === 'token_value') 
            currentToken = currentToken.replace(/'/g, '');
          currentLineTokens.push({ token: currentToken, type });
          currentToken = '';
        }
      }

      currentLineTokens.unshift({ indentation })
      this.tokens.push(currentLineTokens);
    })
  }

  createTree(input) {
    const splitByNewLines = input.split('\n');
    this.generateTokens(splitByNewLines);
    this.createTreeObjectFromTokens();
    this.generateElementsFromTree();
    
  } 


}

const generator = new Generator()
generator.createTree(`
  div className: 'hello'
    section
      h1
      h2
    article
      h2
  div
`)


// Tree creation from pseudo html input from generator below

const exampleObj = [{
  tag: 'div',
  parent: 'NODE TO PARENT',
  propertyObject: { className: 'helloDiv' },
  children: [
    {
      tag: 'section',
      parent: 'NODE TO PARENT',
      propertyObject: {},
      children: [
        { type: 'h1',
          parent: 'NODE TO PARENT',
          propertyObject: { className: 'helo', innerText: 'hejsan' },
          children: {}
        }
      ]
    },
    {
      tag: 'article',
      parent: 'NODE TO PARENT',
      propertyObject: {},
      children: {}
    }
  ],

},
{
  tag: 'div',
  parent: 'NODE TO PARENT',
  propertyObject: {},
  children: [{
    type: 'div',
    parent: 'NODE TO PARENT',
    elementObject: {}
    }
  ]
}
]


