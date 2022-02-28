/**
* Nova is an alternative to all those gigantic front-end frameworks, 
* that often do more than is necessary when it comes to building simple UIs. 
* Pure Vanilla Javascript is performance-wise the best way to build your front-end in a SPA, 
* but it can be hard to organize it properly and as the project grows, it might end up very messy. 
* This is where Nova comes in, 
* being a lightweight library packed with functionality for creating and structuring UIs more easily.
*/
import Element from './dynamic/Element.js'
import Generator from './dynamic/Generator.js'
import Component from './dynamic/Component.js'
import Group from './dynamic/Group.js'
import Router from './dynamic/Router.js'
import State from './dynamic/State.js'
/** STATIC */
import StaticGenerator from './static/StaticGenerator.js'
import StaticElement from './static/StaticElement.js'
import StaticCompiler from './static/StaticCompiler.js'
import StaticComponent from './static/StaticComponent.js'

let root;
if (typeof document !== 'undefined') {
  root = document?.getElementById('root');
}

export {
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
  root
};