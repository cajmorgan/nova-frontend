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

### Element(tag, parent, propertyObject, render);
The fundamental building block in Nova is the Element, which most other things in the library are built upon. The element is just a shell of the normal javascript node but adds extra functionality and shorter syntax to access and manipulate a node. 

The Element represent One node and are created as following: 

```c
import { Element, root } from 'nova';
const h1 = new Element('h1', root, { innerText: 'Hello World' }, true);

```

First we import Element and root. *IMPORTANT* always have a parent root in your html file with the id of "root": 

```c
<main id="root"></main>
```

### Element Methods

#### Element.addNode() [void]
  Appends the node to the parent if it's not already rendered, else throws an error.

  ```c
  const h1 = new Element('h1', root, { innerText: 'Hello World' });
  h1.addNode();
  ```

### Element.removeNode() [void]
  Removes the node from the parent, to add node again, you can call Element.addNode().

  ```c
  const h1 = new Element('h1', root, { innerText: 'Hello World' }, true); // Render set to true 
  h1.removeNode();
  ```

### Element.toggleNode() [void]
  Toggles between adding and removing the node from the parent. 

  ```c 
  const h1 = new Element('h1', root, { innerText: 'Hello World' });
  h1.toggleNode(); //on
  h1.toggleNode(); //off

  ```

### Element.updateNode(propertyObject) [void]
  This method takes an propertyObject and updates the node accordingly. The element object uses the properties from the normal node, for example: className, innerText and id. You can only specify properties that exists for that specific html tag. 

  ```c
  const h1 = new Element('h1', root, { innerText: 'Hello World' }, true);
  h1.updateNode({ // Updates all specified properties, only works with properties that exists on h1
    innerText: 'Yooo'
    id: 'title'
    className: 'h1'
  })

  ```
### Element.changeParent(Element || node) [void]
  If you want to change the parentNode of the element, you can pass in either the element or node of the new parent and calling this method. The element node will be appended to the new parent node.

  ```c
  const h1 = new Element('h1', root, { innerText: 'Hello World' }, true);
  const newParent = new Element('div', root, {}, true);
  h1.changeParent(newParent);

  ```
### Element.addEventListener(event, callback) [void]
  Calls the normal addEventListener on the element node.


### Element Getters

#### Element.node
  returns the node of the Element which you can use normal Javascript node methods on.

### Element.type



(See API for full reference and all functionality)
