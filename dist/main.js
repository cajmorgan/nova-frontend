/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Element\": () => (/* reexport safe */ _lib_nova__WEBPACK_IMPORTED_MODULE_0__.Element),\n/* harmony export */   \"Generator\": () => (/* reexport safe */ _lib_nova__WEBPACK_IMPORTED_MODULE_0__.Generator),\n/* harmony export */   \"Component\": () => (/* reexport safe */ _lib_nova__WEBPACK_IMPORTED_MODULE_0__.Component),\n/* harmony export */   \"Group\": () => (/* reexport safe */ _lib_nova__WEBPACK_IMPORTED_MODULE_0__.Group),\n/* harmony export */   \"Router\": () => (/* reexport safe */ _lib_nova__WEBPACK_IMPORTED_MODULE_0__.Router),\n/* harmony export */   \"root\": () => (/* reexport safe */ _lib_nova__WEBPACK_IMPORTED_MODULE_0__.root)\n/* harmony export */ });\n/* harmony import */ var _lib_nova__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/nova */ \"./lib/nova.js\");\n\n\n\n\n//# sourceURL=webpack://nova/./index.js?");

/***/ }),

/***/ "./lib/Component.js":
/*!**************************!*\
  !*** ./lib/Component.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Component {\n  #arrayOfElements;\n  #parent\n\n  constructor(arrayOfElements) {\n    this.#arrayOfElements = arrayOfElements;\n    this.#parent;\n  }\n\n  get elements() {\n    return this.#arrayOfElements;\n  }\n\n  setProps(stateObject) {\n    for (const key in stateObject) {\n      const toFind = `{{${key}}}`;\n      this.#arrayOfElements.forEach(elem => {\n        for (const prop in elem.node) {\n          if (elem.node[prop] === toFind) {\n            elem.node[prop] = stateObject[key];\n          }\n        }\n      })\n    }\n  }\n\n  retrieve(input) {\n    let retrievedElements = [];\n    if(input[0] === '#') {\n      retrievedElements = this.#arrayOfElements\n        .find(element => element.node.id === input.replace('#', ''));\n    } else if (input[0] === '.') {\n      this.#arrayOfElements.forEach(element => {\n        if (element.node.className === input.replace('.', '')) {\n          retrievedElements.push(element);\n        }\n      })\n    } else {\n      this.#arrayOfElements.forEach(element => {\n        if (element.type === input) {\n          retrievedElements.push(element);\n        }\n      })\n    }\n\n    return retrievedElements;\n  }\n\n  changeParent(newParent) {\n    this.#parent = newParent\n    this.#arrayOfElements[0].changeParent(newParent.node);\n  }\n\n  render() {\n    if(this.#parent)\n      this.#parent.addNode();\n    \n    this.#arrayOfElements.forEach(element => {\n      element.addNode();\n    })\n  }\n\n  unrender() {\n    this.#arrayOfElements.forEach(element => {\n      element.removeNode();\n    })\n  }\n\n  deleteByIndex(index) {\n    this.#arrayOfElements.splice(index, 1);\n  }\n\n  deleteById(id) {\n    this.#arrayOfElements = this.#arrayOfElements.filter(elem => id !== elem.id);\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);\n\n\n//# sourceURL=webpack://nova/./lib/Component.js?");

/***/ }),

/***/ "./lib/Element.js":
/*!************************!*\
  !*** ./lib/Element.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _nova__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nova */ \"./lib/nova.js\");\n\n\nclass Element {\n  #type;\n  #parent;\n  #node;\n  #elementObject;\n  #removed;\n  #init\n\n  constructor(type, parent, elementObject, init) {\n    this.#type = type;\n    this.#parent = parent.node ? parent.node : parent;\n    this.#node = null;\n    this.#elementObject = elementObject;\n    this.#removed = true;\n    this.#init = init\n    this.#createNode();\n    this.#checkInit();\n  }\n  \n  get node() {\n    return this.#node;\n  }\n\n  get type() {\n    return this.#type;\n  }\n\n  get parent() {\n    return this.#parent;\n  }\n\n  get value() {\n    return this.#node.value;\n  }\n\n  get id() {\n    return this.#node.id;\n  }\n\n  get text() {\n    return this.#node.textContent;\n  }\n\n  get html() {\n    return this.#node.innerHTML;\n  }\n\n  get siblings() {\n    return this.parent.children;\n  }\n\n  get children() {\n    return this.node.children;\n  }\n\n  get removed() {\n    return this.#removed;\n  }\n\n  #checkInit() {\n    if (this.#init) {\n      this.addNode();\n    } \n  }\n\n  #validateProps(elementObject) {\n    const options = this.#generateOptions();\n    for (const prop in elementObject) {\n      if (!options.includes(prop)) {\n        throw new Error(`Supplied property in updateNode call doesn't exist on type ${this.#type}`);\n      }\n    }\n  }\n\n  #createNode() {\n    const newNode = document.createElement(this.#type);\n    this.#node = newNode;\n    this.#validateProps(this.#elementObject);\n    for (const prop in this.#elementObject) {\n      this.#node[prop] = this.#elementObject[prop];\n    }    \n  }\n\n  #generateOptions() {\n    const optionsArray = [];\n    for (const opt in this.#node) {\n      optionsArray.push(opt);\n    }\n\n    return optionsArray;\n  }\n\n  updateNode(elementObject) {\n    this.#validateProps(elementObject);\n\n    this.#elementObject = { ...this.#elementObject, ...elementObject }\n    for (const prop in this.#elementObject) {\n      if (this.#node[prop] !== this.#elementObject[prop])\n        this.#node[prop] = this.#elementObject[prop];\n    }\n  }\n\n  toggleNode() {\n    if (this.#removed === true) {\n      this.addNode();\n    } else {\n      this.removeNode();\n    }\n  } \n\n  addNode() {\n    if (this.#removed === false) {\n      throw new Error('Adding a node previously not removed is not possible, try \"copyNode()\" instead.');\n    }\n\n    this.parent.appendChild(this.node);\n    this.#removed = false;\n  }\n  \n  removeNode() {\n    this.parent.removeChild(this.node);\n    this.#removed = true;\n  }\n\n  changeParent(newParentNode) {\n    if (this.#parent !== newParentNode) {\n      this.#parent = newParentNode;\n      this.#parent.appendChild(this.node);\n    }\n  }\n\n  addEventListener(event, callback) {\n    this.node.addEventListener(event, callback); \n  }\n\n  addStyle(property, css) {\n    this.#node.style[property] = css;\n  }\n\n  createComponent() {\n    return new _nova__WEBPACK_IMPORTED_MODULE_0__.Component([this])\n  }\n\n  insertBeforeSibling() {\n    let childrenList = this.node.parentNode.children;\n    let indexPositionOfTarget = null;\n    for (let i = 0; i < childrenList.length; i++) {\n      if (childrenList[i] === this.node) {\n          indexPositionOfTarget = i;\n          break;\n      }\n    }\n\n    if (indexPositionOfTarget !== 0) {\n      const current = childrenList[indexPositionOfTarget];\n      const prev = childrenList[indexPositionOfTarget - 1]\n      this.#parent.insertBefore(current, prev)\n    } \n\n  }\n\n  insertAfterSibling() {\n    let childrenList = this.node.parentNode.children;\n    let indexPositionOfTarget = null;\n    for (let i = 0; i < childrenList.length; i++) {\n      if (childrenList[i] === this.node) {\n          indexPositionOfTarget = i;\n          break;\n      }\n    }\n\n    if (indexPositionOfTarget < childrenList.length - 1) {\n      const current = childrenList[indexPositionOfTarget];\n      const next = childrenList[indexPositionOfTarget + 1]\n      this.#parent.insertBefore(next, current)\n    } \n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Element);\n\n\n//# sourceURL=webpack://nova/./lib/Element.js?");

/***/ }),

/***/ "./lib/Generator.js":
/*!**************************!*\
  !*** ./lib/Generator.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _nova__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nova */ \"./lib/nova.js\");\n\n\nclass Generator {\n  constructor() {\n    this.tokens = [];\n    this.treeObjectArray = [];\n    this.indentationRule = 2\n    this.endToken = 'end'\n    this.rules = {\n      typeExpected: true,\n      valueExpected: false,\n      checkNextTypeIsValue: false\n    }\n  }\n\n  get elements() {\n    return this.elementsArray;\n  }\n\n  get tags() {\n    return [\"a\",\"abbr\",\"acronym\",\"address\",\"applet\",\"area\",\"article\",\"aside\",\"audio\",\"b\",\"base\",\"basefont\",\"bb\",\"bdo\",\"big\",\"blockquote\",\"body\",\"br /\",\"button\",\"canvas\",\"caption\",\"center\",\"cite\",\"code\",\"col\",\"colgroup\",\"command\",\"datagrid\",\"datalist\",\"dd\",\"del\",\"details\",\"dfn\",\"dialog\",\"dir\",\"div\",\"dl\",\"dt\",\"em\",\"embed\",\"eventsource\",\"fieldset\",\"figcaption\",\"figure\",\"font\",\"footer\",\"form\",\"frame\",\"frameset\",\"h1\", \"h2\", \"h3\", \"h4\", \"h5\", \"h6\",\"head\",\"header\",\"hgroup\",\"hr /\",\"html\",\"i\",\"iframe\",\"img\",\"input\",\"ins\",\"isindex\",\"kbd\",\"keygen\",\"label\",\"legend\",\"li\",\"link\",\"map\",\"mark\",\"menu\",\"meta\",\"meter\",\"nav\",\"noframes\",\"noscript\",\"object\",\"ol\",\"optgroup\",\"option\",\"output\",\"p\",\"param\",\"pre\",\"progress\",\"q\",\"rp\",\"rt\",\"ruby\",\"s\",\"samp\",\"script\",\"section\",\"select\",\"small\",\"source\",\"span\",\"strike\",\"strong\",\"style\",\"sub\",\"sup\",\"table\",\"tbody\",\"td\",\"textarea\",\"tfoot\",\"th\",\"thead\",\"time\",\"title\",\"tr\",\"track\",\"tt\",\"u\",\"ul\",\"var\",\"video\",\"wbr\"]\n  }\n  \n  generateElementsFromTree() {\n    const root = document.getElementById('root');\n    const elementsArray = [];\n    let priorityArray = [];\n    let lowestIndentation = 0;\n    let previousPriority = null;\n    \n    this.treeObjectArray.forEach((object, index) => {\n      if (index === 0) \n        lowestIndentation = object.priority\n      else\n        if (object.priority < lowestIndentation)\n          lowestIndentation = object.priority;\n    })\n/**\n * Priority Array -\n * You will keep a parent there until the priority subtracts back to same priority, \n * splice it from array\n */ \n    let iterations = 0;\n    this.treeObjectArray.forEach((object) => {\n      let element;\n      if (object.priority === lowestIndentation) {\n        element = new _nova__WEBPACK_IMPORTED_MODULE_0__.Element(object.tag, root, object.propertyObject);\n        priorityArray = priorityArray.filter(elem => elem.priority <= object.priority - 2);\n      } else if (object.priority === (previousPriority + 2)) {\n        const parentObject = priorityArray.find(elem => elem.priority === object.priority - 2);\n        element = new _nova__WEBPACK_IMPORTED_MODULE_0__.Element(object.tag, parentObject.element, object.propertyObject);\n      } else if (object.priority <= (previousPriority - 2)) {\n        //Filter out everything that isn't grandparent\n        priorityArray = priorityArray.filter(elem => elem.priority <= object.priority - 2);\n        let parentObject = priorityArray.find(elem => elem.priority === object.priority - 2);\n        element = new _nova__WEBPACK_IMPORTED_MODULE_0__.Element(object.tag, parentObject.element, object.propertyObject);\n      } else if (object.priority === previousPriority) {\n        /* Removing previous priority so it doesn't interfere with paternity*/\n        priorityArray.splice(iterations - 1, 1);\n        iterations--;\n        const parentObject = priorityArray.find(elem => elem.priority === object.priority - 2);\n        element = new _nova__WEBPACK_IMPORTED_MODULE_0__.Element(object.tag, parentObject.element, object.propertyObject);\n      }\n\n      iterations++;\n      elementsArray.push(element);\n      priorityArray.push({ element, priority: object.priority });\n      previousPriority = object.priority;\n    })\n    \n    this.elementsArray = elementsArray;\n  }\n\n  createTreeObjectFromTokens() {\n    this.tokens.forEach((line, index) => {\n      const indentation = line[0].indentation;\n      const treeObject = {};\n      const propertyObject = {};\n      let tokenValue = false;\n      for (let tokenIndex = 0; tokenIndex < line.length; tokenIndex++) {\n        if (line[tokenIndex].type === 'token_tag') {\n          treeObject.tag = line[tokenIndex].token;\n          treeObject.priority = indentation;\n          continue;\n        } \n\n        if (line[tokenIndex].type === 'token_property') {\n          propertyObject[line[tokenIndex].token] = line[tokenIndex + 1].token;\n          tokenIndex++;\n        }\n      }\n\n      treeObject.propertyObject = propertyObject;\n      this.treeObjectArray.push(treeObject);\n\n    })\n  }\n\n  checkGrammar(currentToken, lineNumber, currentLineTokens) {\n    /** Grammars\n     * token_tag ex. div section form button\n     * token_property\n     * token_value \n     */\n    const tags = this.tags;\n    let returnType = '';\n\n    if (this.rules.typeExpected) {\n      if (tags.includes(currentToken)) {\n        returnType = 'token_tag';\n      } else if (currentToken === this.endToken) {\n        return 0;\n      } else {\n        console.table(currentToken);\n        throw new Error(`Invalid type, check if applied HTML tag on line ${lineNumber + 1} is valid. To see available tags, console.log(generator.tags)`)\n      }\n    }\n\n    if (this.rules.valueExpected) {\n      const lineType = currentLineTokens[0].token;\n        const testNode = document.createElement(lineType)\n        for (const elem in testNode) {\n          if (elem == currentToken)\n            returnType = 'token_property'\n        }\n\n        if (returnType !== 'token_property')\n          throw new Error(`Invalid property value ${currentToken} for ${lineType}`)\n        return 'token_property';\n    }\n\n    if (this.rules.checkNextTypeIsValue) {\n      if (currentToken[0] === '\\'' && currentToken[currentToken.length - 1] === '\\'') {\n        currentToken = currentToken.replace(/'/g, '');\n        returnType = 'token_value';\n      }\n    }\n\n    return returnType;\n  }\n\n  generateTokens(inputArr) {\n    const arrayOfLines = inputArr.filter(elem => elem.length !== 0);\n    arrayOfLines.forEach((line, lineNumber) => {\n      const currentLineTokens = [];\n      this.rules.typeExpected = true;\n      let indentation = 0;\n      for (let i = 0; line[i] == ' '; i++) {\n        indentation++;\n      } \n\n      //Rule: Value Expected -- If ':' is found, next grammarcheck type needs to be 'value' else throw error\n      let currentToken = '';\n      let lastChar = ''\n      for (let lineIndex = indentation; lineIndex <= line.length; lineIndex++) {\n        if ((line[lineIndex] !== ' ' && lineIndex !== line.length) && line[lineIndex]) {\n          if (this.rules.valueExpected && line[lineIndex] !== '\\'') \n            throw new Error('Missing \\' after :');         \n\n          if (line[lineIndex] === ':') {\n            this.rules.valueExpected = true;\n            continue;\n          }\n\n          currentToken += line[lineIndex];\n          lastChar = line[lineIndex];\n        } else if (this.rules.checkNextTypeIsValue && lastChar !== '\\'') {\n          currentToken += line[lineIndex];\n          lastChar = line[lineIndex];\n        } else {\n          //Validate token\n          const type = this.checkGrammar(currentToken, lineNumber, currentLineTokens)\n\n          if (this.rules.typeExpected && type !== 'token_tag' && currentToken !== this.endToken) \n            throw new Error(\"type expected as first token! ex. div\");\n          this.rules.typeExpected = false;\n\n          if (this.rules.checkNextTypeIsValue && type !== 'token_value') \n            throw new Error(\"'value' expected after after token_property\")\n          this.rules.checkNextTypeIsValue = false;\n\n          if (this.rules.valueExpected) {\n            this.rules.checkNextTypeIsValue = true;\n            this.rules.valueExpected = false;\n          }\n\n          if (type === 'token_value') \n            currentToken = currentToken.replace(/'/g, '');\n          currentLineTokens.push({ token: currentToken, type });\n          currentToken = '';\n        }\n      }\n\n      currentLineTokens.unshift({ indentation })\n      this.tokens.push(currentLineTokens);\n    })\n  }\n\n  createTree(input, indentationRule = 2) {\n    this.indentationRule = indentationRule;\n    const splitByNewLines = input.split('\\n');\n    this.generateTokens(splitByNewLines);\n    this.createTreeObjectFromTokens();\n    this.generateElementsFromTree();\n    this.elementsArray.pop();\n    const elementsArray = [...this.elementsArray]\n    this.defaultGenerator()\n    return new _nova__WEBPACK_IMPORTED_MODULE_0__.Component(elementsArray)\n  } \n\n  defaultGenerator() {\n    this.tokens = [];\n    this.treeObjectArray = [];\n    this.indentationRule = 2\n    this.endToken = 'end'\n    this.rules = {\n      typeExpected: true,\n      valueExpected: false,\n      checkNextTypeIsValue: false\n    }\n    this.elementsArray = [];\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Generator);\n\n//# sourceURL=webpack://nova/./lib/Generator.js?");

/***/ }),

/***/ "./lib/Group.js":
/*!**********************!*\
  !*** ./lib/Group.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Group {\n  #arrayOfComponents\n  #parent\n\n  constructor(arrayOfComponents, parent) {\n    this.#arrayOfComponents = arrayOfComponents;\n    this.#parent = parent\n    this.#wrapper();\n  }\n\n  get components() {\n    return this.#arrayOfComponents\n  }\n\n  #wrapper() {\n    if(this.#parent)\n      this.#arrayOfComponents.forEach(comp => {\n        comp.elements[0].changeParent(this.#parent.node);\n      })\n  }\n\n  render() {\n    this.#arrayOfComponents.forEach(comp => {\n      comp.render();\n    })\n  }\n\n  unrender() {\n    this.#arrayOfComponents.forEach(comp => {\n      comp.unrender();\n    })\n  \n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Group);\n\n\n//# sourceURL=webpack://nova/./lib/Group.js?");

/***/ }),

/***/ "./lib/Router.js":
/*!***********************!*\
  !*** ./lib/Router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Router {\n  #path\n  #componentArray\n  #hash\n  #rendered\n\n  constructor(path, componentArray, hash) {\n    this.#path = path;\n    this.#componentArray = componentArray;\n    this.#hash = hash;\n    this.#rendered = false;\n    this.#checkPath();\n  }\n\n  get path() {\n    return this.#path\n  }\n\n  set path(newPath) {\n    this.#path = newPath;\n  }\n\n  #checkPath() {\n    if (this.#hash) {\n      this.#addChangeListener();\n    } else if (this.path === window.location.pathname)\n        this.#render();\n    //Add regex for ID paths, /:id. \n  }\n\n  #render() {\n    this.#componentArray.forEach(comp => comp.render());\n    this.#rendered = true;\n  }\n\n  #unrender() {\n    this.#componentArray.forEach(comp => comp.unrender());\n    this.#rendered = false;\n  }\n\n  static getPath() {\n    return window.location.pathname;\n  }\n\n  static changePath(newPath) {\n    window.location.href = newPath;\n  }\n\n  static changeHash() {\n    window.dispatchEvent(new Event('locationChange'));\n  }\n\n  #addChangeListener() {\n    window.addEventListener('locationChange', () => {\n      const url = window.location.hash;\n      if (url === this.#path.replace('/', '') && !this.#rendered) {\n        this.#render();\n      } else if (this.#rendered) {\n        this.#unrender();\n      }\n    })\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);\n\n//# sourceURL=webpack://nova/./lib/Router.js?");

/***/ }),

/***/ "./lib/nova.js":
/*!*********************!*\
  !*** ./lib/nova.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Element\": () => (/* reexport safe */ _Element__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"Generator\": () => (/* reexport safe */ _Generator__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   \"Component\": () => (/* reexport safe */ _Component__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   \"Group\": () => (/* reexport safe */ _Group__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   \"Router\": () => (/* reexport safe */ _Router__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n/* harmony export */   \"root\": () => (/* binding */ root)\n/* harmony export */ });\n/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Element */ \"./lib/Element.js\");\n/* harmony import */ var _Generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Generator */ \"./lib/Generator.js\");\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Component */ \"./lib/Component.js\");\n/* harmony import */ var _Group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Group */ \"./lib/Group.js\");\n/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Router */ \"./lib/Router.js\");\n\n\n\n\n\n\nconst root = document.getElementById('root');\n\n\n\n//# sourceURL=webpack://nova/./lib/nova.js?");

/***/ }),

/***/ "./test/app.js":
/*!*********************!*\
  !*** ./test/app.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./index.js\");\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header */ \"./test/header.js\");\n/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search */ \"./test/search.js\");\n/* harmony import */ var _gallery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gallery */ \"./test/gallery.js\");\n/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pagination */ \"./test/pagination.js\");\n/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./footer */ \"./test/footer.js\");\n\n\n\n\n\n\n\nconst frontPage = new _index__WEBPACK_IMPORTED_MODULE_0__.Group([\n  _header__WEBPACK_IMPORTED_MODULE_1__[\"default\"], \n  _search__WEBPACK_IMPORTED_MODULE_2__.search, \n  _gallery__WEBPACK_IMPORTED_MODULE_3__.galleryWrapper.createComponent(), \n  _pagination__WEBPACK_IMPORTED_MODULE_4__.paginationWrapper.createComponent(),\n  _footer__WEBPACK_IMPORTED_MODULE_5__[\"default\"]])\n\nnew _index__WEBPACK_IMPORTED_MODULE_0__.Router('/', [frontPage])\nnew _index__WEBPACK_IMPORTED_MODULE_0__.Router('/search', [_header__WEBPACK_IMPORTED_MODULE_1__[\"default\"]])\n\n//# sourceURL=webpack://nova/./test/app.js?");

/***/ }),

/***/ "./test/footer.js":
/*!************************!*\
  !*** ./test/footer.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./index.js\");\n\n\nconst generator = new _index__WEBPACK_IMPORTED_MODULE_0__.Generator();\n\nconst footer = generator.createTree(`\n  footer className: 'footer'\n    p innerText: '@cajmorgan'\n  end`)\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (footer);\n\n//# sourceURL=webpack://nova/./test/footer.js?");

/***/ }),

/***/ "./test/gallery.js":
/*!*************************!*\
  !*** ./test/gallery.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"galleryWrapper\": () => (/* binding */ galleryWrapper),\n/* harmony export */   \"createGallery\": () => (/* binding */ createGallery)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./index.js\");\n\n\nconst galleryWrapper = new _index__WEBPACK_IMPORTED_MODULE_0__.Element('section', _index__WEBPACK_IMPORTED_MODULE_0__.root, { className: 'gallery-wrapper' });\n\nasync function createGallery(dataPromise) {\n  const imageBuild = `\n  div className: 'gallery__image'\n    p innerText: '{{title}}'\n    img srcset: '{{url}}'\n  end`\n  \n  const images = [];\n  const generator = new _index__WEBPACK_IMPORTED_MODULE_0__.Generator();\n  const data = await dataPromise;\n  data.forEach(imageInfo => {\n    const image = generator.createTree(imageBuild);\n    image.setProps({ title: imageInfo.artist, url: imageInfo.url });\n    images.push(image);\n  })\n  \n  const gallery = new _index__WEBPACK_IMPORTED_MODULE_0__.Group(images, galleryWrapper);\n  return gallery;\n}\n\n\n\n//# sourceURL=webpack://nova/./test/gallery.js?");

/***/ }),

/***/ "./test/header.js":
/*!************************!*\
  !*** ./test/header.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./index.js\");\n\n\nconst generator = new _index__WEBPACK_IMPORTED_MODULE_0__.Generator();\n\nconst header = generator.createTree(`\n  header\n    h1 className: 'header__title' innerText: 'Image Gallery'\n    h2 className: 'header__sub' innerText: 'Just search!'\n  end`)\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (header);\n\n\n//# sourceURL=webpack://nova/./test/header.js?");

/***/ }),

/***/ "./test/pagination.js":
/*!****************************!*\
  !*** ./test/pagination.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createPagination\": () => (/* binding */ createPagination),\n/* harmony export */   \"paginationWrapper\": () => (/* binding */ paginationWrapper)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./index.js\");\n\n\nconst paginationWrapper = new _index__WEBPACK_IMPORTED_MODULE_0__.Element('section', _index__WEBPACK_IMPORTED_MODULE_0__.root, { className: 'pagination-wrapper' });\n\nlet pageNum = 1;\n\nfunction createPagination(total_pages, makeSearch) {\n  const generator = new _index__WEBPACK_IMPORTED_MODULE_0__.Generator();\n  const pagination = generator.createTree(`\n    div className: 'pagination'\n      button id: 'prev' innerText: 'prev'\n      button id: 'next' innerText: 'next'\n  end`)\n \n  if (pageNum === 1 || total_pages <= 1) {\n    pagination.deleteById('prev');\n  }\n\n  if (pageNum === total_pages || !total_pages) {\n    pagination.deleteById('next');\n  }\n\n  for(let i = 1; i < pagination.elements.length; i++) {\n    pagination.elements[i].addEventListener('click', async (e) => {\n      if(e.target.id === 'prev') {\n        pageNum--\n      } else if (e.target.id === 'next') {\n        pageNum++\n      }\n      \n      makeSearch('', pageNum);\n    })\n  }\n  \n  const paginationGroup = new _index__WEBPACK_IMPORTED_MODULE_0__.Group([pagination], paginationWrapper)\n\n  return paginationGroup;\n}\n\n\n\n//# sourceURL=webpack://nova/./test/pagination.js?");

/***/ }),

/***/ "./test/search.js":
/*!************************!*\
  !*** ./test/search.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"search\": () => (/* binding */ search),\n/* harmony export */   \"makeSearch\": () => (/* binding */ makeSearch)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./index.js\");\n/* harmony import */ var _gallery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gallery */ \"./test/gallery.js\");\n/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pagination */ \"./test/pagination.js\");\n\n\n\n\nconst fetchData = async (input, pageNum) => {\n  const res = await fetch(`https://api.unsplash.com/search/photos?page=${pageNum}&query=${input}`, { headers: { Authorization: \"Client-ID gHo75RTRrKxBFHgmuKFJfkTQJDI8YfoszFyse8ovX9s\" } });\n    const searchData = await res.json();\n    const imageResults = searchData.results.map((image) => {\n      return {\n        artist: image.user.name,\n        description: image.description,\n        url: image.urls.small,\n      }\n    });\n\n  return [imageResults, searchData.total_pages];\n}\n\nconst state = {};\n\nconst generator = new _index__WEBPACK_IMPORTED_MODULE_0__.Generator()\nconst search = generator.createTree(`\n  section className: 'search-container'\n    form className: 'search-form'\n      label\n        input type: 'text' className: 'search-form__input' id: 'form-input'\n      input type: 'submit' className: 'search-form__submit' id: 'submit-btn'\n  end`)\n\n\nasync function makeSearch(e, pageNum = 1) {\n  if (e) e.preventDefault();\n  \n  const input = search.retrieve('#form-input').value\n  const [data, totalPages] = await fetchData(input, pageNum);\n  if (state.gallery) { \n    state.gallery.unrender();\n    state.pagination.unrender();\n  }\n\n  state.gallery = await (0,_gallery__WEBPACK_IMPORTED_MODULE_1__.createGallery)(data);\n  state.pagination = await (0,_pagination__WEBPACK_IMPORTED_MODULE_2__.createPagination)(totalPages, makeSearch);\n\n  new _index__WEBPACK_IMPORTED_MODULE_0__.Group([state.pagination, state.gallery]).render();\n}\n\nsearch.retrieve('#submit-btn').addEventListener('click', makeSearch)\n\n\n\n//# sourceURL=webpack://nova/./test/search.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./test/app.js");
/******/ 	
/******/ })()
;