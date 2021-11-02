import { Component, Element } from './nova';

class Generator {
  constructor() {
    this.tokens = [];
    this.treeObjectArray = [];
    this.indentationRule = 2
    this.endToken = 'end'
    this.rules = {
      typeExpected: true,
      valueExpected: false,
      checkNextTypeIsValue: false
    }
  }

  get elements() {
    return this.elementsArray;
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
    let iterations = 0;
    this.treeObjectArray.forEach((object) => {
      let element;
      if (object.priority === lowestIndentation) {
        element = new Element(object.tag, root, object.propertyObject);
        priorityArray = priorityArray.filter(elem => elem.priority <= object.priority - 2);
      } else if (object.priority === (previousPriority + 2)) {
        const parentObject = priorityArray.find(elem => elem.priority === object.priority - 2);
        element = new Element(object.tag, parentObject.element, object.propertyObject);
      } else if (object.priority <= (previousPriority - 2)) {
        //Filter out everything that isn't grandparent
        priorityArray = priorityArray.filter(elem => elem.priority <= object.priority - 2);
        let parentObject = priorityArray.find(elem => elem.priority === object.priority - 2);
        element = new Element(object.tag, parentObject.element, object.propertyObject);
      } else if (object.priority === previousPriority) {
        /* Removing previous priority so it doesn't interfere with paternity*/
        priorityArray.splice(iterations - 1, 1);
        iterations--;
        const parentObject = priorityArray.find(elem => elem.priority === object.priority - 2);
        element = new Element(object.tag, parentObject.element, object.propertyObject);
      }

      iterations++;
      elementsArray.push(element);
      priorityArray.push({ element, priority: object.priority });
      previousPriority = object.priority;
    })
    
    this.elementsArray = elementsArray;
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
      } else if (currentToken === this.endToken) {
        return 0;
      } else {
        console.table(currentToken);
        throw new Error(`Invalid type, check if applied HTML tag on line ${lineNumber + 1} is valid. To see available tags, console.log(generator.tags)`)
      }
    }

    if (this.rules.valueExpected) {
      const lineType = currentLineTokens[0].token;
        const testNode = document.createElement(lineType)
        for (const elem in testNode) {
          if (elem == currentToken)
            returnType = 'token_property'
        }

        if (returnType !== 'token_property')
          throw new Error(`Invalid property value ${currentToken} for ${lineType}`)
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
      let lastChar = ''
      for (let lineIndex = indentation; lineIndex <= line.length; lineIndex++) {
        if ((line[lineIndex] !== ' ' && lineIndex !== line.length) && line[lineIndex]) {
          if (this.rules.valueExpected && line[lineIndex] !== '\'') 
            throw new Error('Missing \' after :');         

          if (line[lineIndex] === ':') {
            this.rules.valueExpected = true;
            continue;
          }

          currentToken += line[lineIndex];
          lastChar = line[lineIndex];
        } else if (this.rules.checkNextTypeIsValue && lastChar !== '\'') {
          currentToken += line[lineIndex];
          lastChar = line[lineIndex];
        } else {
          //Validate token
          const type = this.checkGrammar(currentToken, lineNumber, currentLineTokens)

          if (this.rules.typeExpected && type !== 'token_tag' && currentToken !== this.endToken) 
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

  createTree(input, indentationRule = 2) {
    this.indentationRule = indentationRule;
    const splitByNewLines = input.split('\n');
    this.generateTokens(splitByNewLines);
    this.createTreeObjectFromTokens();
    this.generateElementsFromTree();
    this.elementsArray.pop();
    const elementsArray = [...this.elementsArray]
    this.defaultGenerator()
    return new Component(elementsArray)
  } 

  defaultGenerator() {
    this.tokens = [];
    this.treeObjectArray = [];
    this.indentationRule = 2
    this.endToken = 'end'
    this.rules = {
      typeExpected: true,
      valueExpected: false,
      checkNextTypeIsValue: false
    }
    this.elementsArray = [];
  }

}

export default Generator