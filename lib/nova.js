/**
* Nova is an alternative to all those gigantic front-end frameworks, 
* that often do more than is necessary when it comes to building simple UIs. 
* Pure Vanilla Javascript is performance-wise the best way to build your front-end in a SPA, 
* but it can be hard to organize it properly and as the project grows, it might end up very messy. 
* This is where Nova comes in, 
* being a lightweight library packed with functionality for creating and structuring UIs more easily.
*/
const Element = require('./dynamic/Element');
const Generator = require('./dynamic/Generator');
const Component = require('./dynamic/Component');
const Group = require('./dynamic/Group');
const Router = require('./dynamic/Router');
const State = require('./dynamic/State');
/** STATIC */
const StaticGenerator = require('./static/StaticGenerator');
const StaticElement = require('./static/StaticElement');
const StaticCompiler = require('./static/StaticCompiler');
const StaticComponent = require('./static/StaticComponent');

let root;
if (typeof document !== 'undefined') {
  root = document?.getElementById('root');
}

module.exports = {
  Element,
  Generator,
  Component,
  Group,
  Router,
  State,
  StaticGenerator,
  StaticElement,
  StaticCompiler,
  StaticComponent,
  root: root
};