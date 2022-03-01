
const StaticComponent = require('./StaticComponent');
const StaticElement = require('./StaticElement');
/**
 * @name StaticGenerator
 * @class
 * @desc
 * The generator is a powerful way to generate HTML without writing actual HTML!
 * It's meant to be very straightforward and to give your SPA a nice structure. No more angle brackets!
 * @example
 * import { Generator } from 'nova';
 * const generator = new Generator();
 * const header = generator.createTree(`
 *   header className: 'header'
 *     h1 className: 'header__title' innerText: 'Hello World!'
 *     h2 className: 'header__subtitle' innerText: 'This is my site.'
 * end`)
 * 
 * header.render();
 */

/** EXTEND GENERATOR TO AVOID DUPLICATE CODE */
module.exports = class StaticGenerator {
  constructor() {
    this.tokens = [];
    this.treeObjectArray = [];
    this.indentationRule = 2
    this.endToken = 'end';
    this.HTMLString = '';
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
    return ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bb", "bdo", "big", "blockquote", "body", "br /", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "command", "datagrid", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "eventsource", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr /", "html", "i", "iframe", "img", "input", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "link", "map", "mark", "menu", "meta", "meter", "nav", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strike", "strong", "style", "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]
  }

  /** Convert JS element tags to HTML, f.e className -> class */
  _convertTag(tag) {
    if (!tag)
      return '';
    switch (tag) {
      case 'className':
        return 'class';
      default:
        return tag;
    }
  }

  _generateHTMLFromElements() {
    const grandParent = this.elementsArray[0];

    let tabs = '';
    let tabsDisabled = true;
    const tabsEdit = (action) => {
      if (tabsDisabled) return '';
      if (action === 'a') {
        tabs += '\t';
      } else if (action === 'r') {
        tabs = tabs.slice(0, tabs.length - 1);
      }

      return tabs;
    }

    const createHTMLProps = (props) => {
      let HTMLPropsString = '';
      for (const prop in props) {
        if (prop.length && prop !== 'innerText' && prop !== 'textContent') {
          HTMLPropsString += ` ${this._convertTag(prop)}="${props[prop]}"`
        }
      }

      return HTMLPropsString;
    }

    const createHTMLTree = (element) => {
      const HTMLProps = createHTMLProps(element.props);
      const HTMLText = element.props?.innerText
        || element.props?.textContent
        || '';

      if (element.children.length === 0) {
        return `${tabs}<${element.type}${HTMLProps}>${HTMLText}</${element.type}>`;
      }

      let HTMLString = `${tabs}<${element.type}${HTMLProps}>`;
      tabsEdit('a');
      /** Get children */
      for (let i = 0; i < element.children.length; i++) {
        HTMLString += createHTMLTree(element.children[i]);
      }

      return HTMLString += `${tabsEdit('r')}</${element.type}>`
    }

    this.HTMLString = createHTMLTree(grandParent);
  }

  _generateElementsFromTree() {
    const root = new StaticElement('div', null, {}, 0);
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

    let iterations = 0;
    let grandParent = false;

    this.treeObjectArray.forEach((object, index) => {
      let element;
      if (object.priority === lowestIndentation) {
        if (grandParent) {
          throw new Error('Only one grandparent allowed!');
        }

        grandParent = true;
        element = new StaticElement(object.tag, root, object.propertyObject, index + 1);
        priorityArray = priorityArray.filter(elem => elem.priority <= object.priority - 2);
      } else if (object.priority === (previousPriority + 2)) {
        const parentObject = priorityArray.find(elem => elem.priority === object.priority - 2);
        element = new StaticElement(object.tag, parentObject.element, object.propertyObject, index + 1);
      } else if (object.priority <= (previousPriority - 2)) {
        //Filter out everything that isn't grandparent
        priorityArray = priorityArray.filter(elem => elem.priority <= object.priority - 2);
        const parentObject = priorityArray.find(elem => elem.priority === object.priority - 2);
        element = new StaticElement(object.tag, parentObject.element, object.propertyObject, index + 1);
      } else if (object.priority === previousPriority) {
        /* Removing previous priority so it doesn't interfere with paternity*/
        priorityArray.splice(iterations - 1, 1);
        iterations--;
        const parentObject = priorityArray.find(elem => elem.priority === object.priority - 2);
        element = new StaticElement(object.tag, parentObject.element, object.propertyObject, index + 1);
      }

      iterations++;
      elementsArray.push(element);
      priorityArray.push({ element, priority: object.priority });
      previousPriority = object.priority;
    })

    this.elementsArray = elementsArray;
  }

  _createTreeObjectFromTokens() {
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

  _checkGrammar(currentToken, lineNumber, currentLineTokens) {
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
      // const testNode = document.createElement(lineType)
      // for (const elem in testNode) {
      //   if (elem == currentToken)
      //     returnType = 'token_property'
      // }
      returnType = 'token_property'

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

  _generateTokens(inputArr) {
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
          const type = this._checkGrammar(currentToken, lineNumber, currentLineTokens)
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

    if (this.tokens[this.tokens.length - 1][1].token !== 'end')
      throw new Error("'end' expected, not found.");
    else
      this.tokens.pop();
  }

  /**
   * 'createTree' is the method you can use to generate HTML stored in a Component as Elements. 
   * The string has to be in a certain format where indentations are very important.
   * Indentations are what dictates if an element is a parent/child. Always use even indentations, 2 spaces per child. 
   * The structure is always the same: `[indentation][htmlTag][property]: '[value]'`.
   * Note that you need to to use only one grandparent for all the element generated, else it will throw an error!.
   * like: 
   * @example
   * `  h1 innerText: 'helo'`
   * Valid properties are for specific a htmlTag. For example, you can use 'type' on 'input' but not on 'h1'
   * @example
   * ` form
   *     input type: 'text'
   * end`
   * 
   * Indentation dictates children/parent
   * @example
   * `
   *   div className: 'grandparent'
   *     main className: 'parent'
   *       p className: 'child' innerText: 'I am a child of main'    
   * end`  
   * 
   * Always end the string on a new line with the word 'end'
   *  
   * Full example
   * @example
   * import { Generator } from 'nova';
   * const generator = new Generator();
   * const header = generator.createTree(`
   *   header className: 'header'
   *     h1 className: 'header__title' innerText: 'Hello World!'
   *     h2 className: 'header__subtitle' innerText: 'This is my site.'
   *     nav id: 'menu'
   *       ul className: 'menu__items'
   *         li innerText: 'First item'
   *         li innerText: 'Second item'
   *   end`)
   * @param {string} input 
   * @returns {Component}
   */
  /** CHANGE TO STATIC SPECIFIC FOR EXTENSION INSTEAD */
  createTree(input, indentationRule = 2) {
    this.indentationRule = indentationRule;
    const splitByNewLines = input.split('\n');
    this._generateTokens(splitByNewLines);
    this._createTreeObjectFromTokens();
    this._generateElementsFromTree();
    this._generateHTMLFromElements();
    const elementsArray = [...this.elementsArray]
    this._defaultGenerator();
    return new StaticComponent(this.HTMLString, elementsArray)
  }

  _defaultGenerator() {
    this.tokens = [];
    this.treeObjectArray = [];
    this.indentationRule = 2;
    this.endToken = 'end';
    this.rules = {
      typeExpected: true,
      valueExpected: false,
      checkNextTypeIsValue: false
    }
    this.elementsArray = [];
  }

}
