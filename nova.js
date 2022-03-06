/**
* Nova is an alternative to all those gigantic front-end frameworks, 
* that often do more than is necessary when it comes to building simple UIs. 
* Pure Vanilla Javascript is performance-wise the best way to build your front-end in a SPA, 
* but it can be hard to organize it properly and as the project grows, it might end up very messy. 
* This is where Nova comes in, 
* being a lightweight library packed with functionality for creating and structuring UIs more easily.
*/
const Element = require('./lib/dynamic/Element');
const Generator = require('./lib/dynamic/Generator');
const Component = require('./lib/dynamic/Component');
const Group = require('./lib/dynamic/Group');
const Router = require('./lib/dynamic/Router');
const State = require('./lib/dynamic/State');
/** STATIC */
const StaticGenerator = require('./lib/static/StaticGenerator');
const StaticElement = require('./lib/static/StaticElement');
const StaticCompiler = require('./lib/static/StaticCompiler');
const StaticComponent = require('./lib/static/StaticComponent');

module.exports = {
  Component,
  Element,
  Generator,
  Group,
  Router,
  State,
  StaticGenerator,
  StaticElement,
  StaticCompiler,
  StaticComponent,
};