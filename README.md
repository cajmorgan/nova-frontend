# Nova *UNDER CONSTRUCTION*
## An alternative lightweight Front-End Library

LIST
What is Nova
Features
  Element

API

### What is Nova?
Nova is an alternative to all those gigantic front-end frameworks, that often do more than is necessary when it comes to building simple UIs. Pure Vanilla Javascript is performance-wise the best way to build your front-end, but it can be hard to organize it properly and as the project grows, it might end up very messy. This is where Nova comes in, being a lightweight library packed with functionality for creating UI easier. 

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
Appends node to parent, throws error if is already appended.

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