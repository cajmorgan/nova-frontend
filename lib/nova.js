/**
* Nova is an alternative to all those gigantic front-end frameworks, 
* that often do more than is necessary when it comes to building simple UIs. 
* Pure Vanilla Javascript is performance-wise the best way to build your front-end in a SPA, 
* but it can be hard to organize it properly and as the project grows, it might end up very messy. 
* This is where Nova comes in, 
* being a lightweight library packed with functionality for creating and structuring UIs more easily.
*/
import Element from './Element'
import Generator from './Generator'
import Component from './Component'
import Group from './Group'
import Router from './Router'
import State from './State'


const root = document.getElementById('root');

export { Element, Generator, Component, Group, Router, State, root };