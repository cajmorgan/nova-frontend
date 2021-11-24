# Nova *UNDER CONSTRUCTION*
## An alternative lightweight Front-End Library

LIST
What is Nova
Features
  Element

API

### What is Nova?
Nova is an alternative to all those gigantic front-end frameworks, that often do more than is necessary when it comes to building simple UIs. Pure Vanilla Javascript is performance-wise the best way to build your front-end in a SPA, but it can be hard to organize it properly and as the project grows, it might end up very messy. This is where Nova comes in, being a lightweight library packed with functionality for creating and structuring UIs more easily. 

### Features
Nova comes with most of the needed built-in features for handling a single-page application. Features like easily generating html, routing and state-management.

Nova is built solely on classes which are a perfect fit to handle context by storing the temporary data in a few places as possible. The topics that are necessary to understand are: 

- Elements
- Components
- The Generator
- Groups
- State
- Router


GIVE EXAMPLES SHOW OFF. 


## API
## Classes

<dl>
<dt><a href="#Component">Component</a></dt>
<dd></dd>
<dt><a href="#Element">Element</a></dt>
<dd></dd>
<dt><a href="#Generator">Generator</a></dt>
<dd></dd>
</dl>

<a name="Component"></a>

## Component
**Kind**: global class  

* [Component](#Component)
    * [new Component()](#new_Component_new)
    * [.elements](#Component+elements) ⇒ <code>ArrayOfElements</code>
    * [.setProps(propsObject)](#Component+setProps) ⇒ <code>void</code>

<a name="new_Component_new"></a>

### new Component()
The component is a wrapper for Elements. A component is basically a block of Elements.
The best way to create a Component is to use the Generator. 
You can also supply it with an array of Elements.

**Example**  
```js
import { Generator } from 'nova';
const generator = new Generator();
const header = generator.createTree(` //header is the component
  header className: 'header'
    h1 className: 'header__title' innerText: 'Hello World!'
    h2 className: 'header__subtitle' innerText: 'This is my site.'
end`)

header.render();
```
<a name="Component+elements"></a>

### component.elements ⇒ <code>ArrayOfElements</code>
**Kind**: instance property of [<code>Component</code>](#Component)  
<a name="Component+setProps"></a>

### component.setProps(propsObject) ⇒ <code>void</code>
Set props of a generated component using Generator. 
When generating the component, you need to put the value where you want to set the props as '{{whatever}}'.
Then when supplying the propsObject to the setProps function, you set the value by { whatever: your-value }

**Kind**: instance method of [<code>Component</code>](#Component)  

| Param | Type |
| --- | --- |
| propsObject | <code>Object</code> | 

**Example**  
```js
const task = generator.createTree(`
article className: 'task' id: '{{id}}'
  h2 className: 'task__title' innerText: '{{title}}'
  p className: 'task__description' innerText: '{{description}}'
  button className: 'task__remove-button' innerText: 'X'
 end`)

 task.setProps({
 id: 1, 
 title: Buy Milk, 
 description: With chocolate taste,
})
```
<a name="Element"></a>

## Element
**Kind**: global class  

* [Element](#Element)
    * [new Element(type, parent, elementObject, init)](#new_Element_new)
    * [.node](#Element+node) ⇒ <code>node</code>
    * [.type](#Element+type) ⇒ <code>type</code>
    * [.parent](#Element+parent) ⇒ <code>parent</code>
    * [.value](#Element+value) ⇒ <code>value</code>
    * [.id](#Element+id) ⇒ <code>id</code>
    * [.text](#Element+text) ⇒ <code>text</code>
    * [.html](#Element+html) ⇒ <code>html</code>
    * [.siblings](#Element+siblings) ⇒ <code>nodeArray</code>
    * [.updateNode(elementObject)](#Element+updateNode) ⇒ <code>void</code>
    * [.toggleNode()](#Element+toggleNode) ⇒ <code>void</code>
    * [.addNode()](#Element+addNode) ⇒ <code>void</code>
    * [.removeNode()](#Element+removeNode) ⇒ <code>void</code>
    * [.changeParent(newParentNode)](#Element+changeParent) ⇒ <code>void</code>
    * [.addEventListener(event, callback)](#Element+addEventListener) ⇒ <code>void</code>
    * [.addStyle(property, css)](#Element+addStyle) ⇒ <code>void</code>
    * [.createComponent()](#Element+createComponent)
    * [.beforeSibling()](#Element+beforeSibling) ⇒ <code>void</code>
    * [.afterSibling()](#Element+afterSibling) ⇒ <code>void</code>
    * [.after(reference)](#Element+after) ⇒ <code>void</code>
    * [.before(reference)](#Element+before) ⇒ <code>void</code>

<a name="new_Element_new"></a>

### new Element(type, parent, elementObject, init)
The fundamental building block in Nova is the Element, which most other things in the library are built upon. 
The element is just a shell of the normal javascript node but adds extra functionality 
and shorter syntax to access and manipulate a node.

**Returns**: void  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | An htmlTag, for example 'div' or 'button'. |
| parent | [<code>Element</code>](#Element) \| <code>node</code> | The parent in the DOM you want the element to belong to. |
| elementObject | <code>object</code> | An object containing the javascript props like: { innerText: 'helo' } |
| init | <code>boolean</code> | A boolean to indicate if you want to render the element now (default: false). |

**Example**  
```js
import { Element, root } from 'nova';
const h1 = new Element('h1', root, { innerText: 'Hello World' }, true);
```
<a name="Element+node"></a>

### element.node ⇒ <code>node</code>
Return the node of the element

**Kind**: instance property of [<code>Element</code>](#Element)  
**Example**  
```js
const h1 = new Element('h1', root, { innerText: 'Hello World' }, true);
console.log(h1.node) //returns node
```
<a name="Element+type"></a>

### element.type ⇒ <code>type</code>
Return the type of the element

**Kind**: instance property of [<code>Element</code>](#Element)  
**Example**  
```js
const h1 = new Element('h1', root, { innerText: 'Hello World' }, true);
console.log(h1.type) //returns 'h1'
```
<a name="Element+parent"></a>

### element.parent ⇒ <code>parent</code>
Return the parent of the element

**Kind**: instance property of [<code>Element</code>](#Element)  
**Example**  
```js
const h1 = new Element('h1', root, { innerText: 'Hello World' }, true);
console.log(h1.parent) //returns node of root
```
<a name="Element+value"></a>

### element.value ⇒ <code>value</code>
Return the value of the element

**Kind**: instance property of [<code>Element</code>](#Element)  
**Example**  
```js
const input = new Element('input', root, { type: 'text', value: 'some text' }, true);
console.log(h1.value) //returns 'some text'
```
<a name="Element+id"></a>

### element.id ⇒ <code>id</code>
Return the id of the element

**Kind**: instance property of [<code>Element</code>](#Element)  
**Example**  
```js
const h1 = new Element('h1', root, { id: 'title', innerText: 'Welcome!' }, true);
console.log(h1.id) //returns 'title'
```
<a name="Element+text"></a>

### element.text ⇒ <code>text</code>
Return the text of the element

**Kind**: instance property of [<code>Element</code>](#Element)  
**Example**  
```js
const h1 = new Element('h1', root, { id: 'title', innerText: 'Welcome!' }, true);
console.log(h1.text) //returns 'Welcome!'
```
<a name="Element+html"></a>

### element.html ⇒ <code>html</code>
Return the innerHTML of the element

**Kind**: instance property of [<code>Element</code>](#Element)  
**Example**  
```js
const h1 = new Element('h1', root, { id: 'title', innerText: 'Welcome!' }, true);
console.log(h1.html) //returns '<h1 id="title">Welcome!</h1>'
```
<a name="Element+siblings"></a>

### element.siblings ⇒ <code>nodeArray</code>
Return the siblings of the element

**Kind**: instance property of [<code>Element</code>](#Element)  
**Example**  
```js
const h1 = new Element('h1', root, { id: 'title', innerText: 'Welcome,' }, true);
const h2 = new Element('h2', root, { id: 'subtitle', innerText: 'To an awesome page!' }, true);
console.log(h1.siblings) //returns a nodeArray of h1 and h2.
```
<a name="Element+updateNode"></a>

### element.updateNode(elementObject) ⇒ <code>void</code>
Dynamically updates the element by passing an object containing the props you want to update

**Kind**: instance method of [<code>Element</code>](#Element)  

| Param | Type | Description |
| --- | --- | --- |
| elementObject | <code>object</code> | An object containing the javascript props like: { innerText: 'helo' } |

**Example**  
```js
const h1 = new Element('h1', root, { id: 'welcome', innerText: 'Hello World!' }, true);
h1.updateNode({ id: 'goodbye', innerText: 'Goodbye World...' })
```
<a name="Element+toggleNode"></a>

### element.toggleNode() ⇒ <code>void</code>
Toggles node on and off

**Kind**: instance method of [<code>Element</code>](#Element)  
**Example**  
```js
const h1 = new Element('h1', root, { id: 'welcome', innerText: 'Hello World!' }, true); //On with true
h1.toggleNode() //Off
h1.toggleNode() //On
```
<a name="Element+addNode"></a>

### element.addNode() ⇒ <code>void</code>
Appends node to parent.

**Kind**: instance method of [<code>Element</code>](#Element)  
**Example**  
```js
const h1 = new Element('h1', root, { id: 'welcome', innerText: 'Hello World!' }); //Off
h1.addNode() //On
```
<a name="Element+removeNode"></a>

### element.removeNode() ⇒ <code>void</code>
Removes node from parent.

**Kind**: instance method of [<code>Element</code>](#Element)  
**Example**  
```js
const h1 = new Element('h1', root, { id: 'welcome', innerText: 'Hello World!'}, true); //On
h1.removeNode() //Off
```
<a name="Element+changeParent"></a>

### element.changeParent(newParentNode) ⇒ <code>void</code>
Appends node to new parent.

**Kind**: instance method of [<code>Element</code>](#Element)  

| Param | Type |
| --- | --- |
| newParentNode | [<code>Element</code>](#Element) \| <code>node</code> | 

**Example**  
```js
const div = new Element('div', root, { className: 'container' }, true);
const h1 = new Element('h1', root, { id: 'welcome', innerText: 'Hello World!'}, true); //Appends to root
h1.changeParent(div); //Now h1 is appended to div instead.
```
<a name="Element+addEventListener"></a>

### element.addEventListener(event, callback) ⇒ <code>void</code>
Calls addEventListener on node.

**Kind**: instance method of [<code>Element</code>](#Element)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>event</code> | //f.e 'click' Any javascript supported event. |
| callback | <code>function</code> | Callback function to be invoked when event happens. |

**Example**  
```js
Check https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
```
<a name="Element+addStyle"></a>

### element.addStyle(property, css) ⇒ <code>void</code>
Dynamically adds css styles to Element.

**Kind**: instance method of [<code>Element</code>](#Element)  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | A string containing what you want to change, for example 'color' |
| css | <code>string</code> | The css value to use, for example 'red' |

<a name="Element+createComponent"></a>

### element.createComponent()
Creates a component putting the element inside

**Kind**: instance method of [<code>Element</code>](#Element)  
<a name="Element+beforeSibling"></a>

### element.beforeSibling() ⇒ <code>void</code>
Moves node one step up the tree, changing place with it's previous sibling.

**Kind**: instance method of [<code>Element</code>](#Element)  
<a name="Element+afterSibling"></a>

### element.afterSibling() ⇒ <code>void</code>
Moves node one step down the tree, changing place with it's next sibling.

**Kind**: instance method of [<code>Element</code>](#Element)  
<a name="Element+after"></a>

### element.after(reference) ⇒ <code>void</code>
Appends node after a reference sibling

**Kind**: instance method of [<code>Element</code>](#Element)  

| Param | Type |
| --- | --- |
| reference | [<code>Element</code>](#Element) | 

<a name="Element+before"></a>

### element.before(reference) ⇒ <code>void</code>
Appends node before a reference sibling

**Kind**: instance method of [<code>Element</code>](#Element)  

| Param | Type |
| --- | --- |
| reference | [<code>Element</code>](#Element) | 

<a name="Generator"></a>

## Generator
**Kind**: global class  

* [Generator](#Generator)
    * [new Generator()](#new_Generator_new)
    * [.createTree(input)](#Generator+createTree) ⇒ [<code>Component</code>](#Component)

<a name="new_Generator_new"></a>

### new Generator()
The generator is a powerful way to generate HTML without writing actual HTML!
It's meant to be very straightforward and to give your SPA a nice structure. No more angle brackets!

**Example**  
```js
import { Generator } from 'nova';
const generator = new Generator();
const header = generator.createTree(`
  header className: 'header'
    h1 className: 'header__title' innerText: 'Hello World!'
    h2 className: 'header__subtitle' innerText: 'This is my site.'
end`)

header.render();
```
<a name="Generator+createTree"></a>

### generator.createTree(input) ⇒ [<code>Component</code>](#Component)
'createTree' is the method you can use to generate HTML stored in a Component as Elements. 
The string has to be in a certain format where indentations are very important.
Indentations are what dictates if an element is a parent/child. Always use even indentations, 2 spaces per child. 
The structure is always the same: `[indentation][htmlTag][property]: '[value]'` 
like:

**Kind**: instance method of [<code>Generator</code>](#Generator)  

| Param | Type |
| --- | --- |
| input | <code>string</code> | 

**Example**  
```js
`  h1 innerText: 'helo'`
Valid properties are for specific a htmlTag. For example, you can use 'type' on 'input' but not on 'h1'
```
**Example**  
```js
` form
    input type: 'text'
end`

Indentation dictates children/parent
```
**Example**  
```js
`
  div className: 'grandparent'
    main className: 'parent'
      p className: 'child' innerText: 'I am a child of main'    
end`  

Always end the string on a new line with the word 'end'
 
Full example
```
**Example**  
```js
import { Generator } from 'nova';
const generator = new Generator();
const header = generator.createTree(`
  header className: 'header'
    h1 className: 'header__title' innerText: 'Hello World!'
    h2 className: 'header__subtitle' innerText: 'This is my site.'
  nav id: 'menu'
    ul className: 'menu__items'
      li innerText: 'First item'
      li innerText: 'Second item'
  end`)
```
