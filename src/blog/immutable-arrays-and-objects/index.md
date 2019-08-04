---
title: Immutable arrays and objects
date: "2019-07-19T09:00:00.121Z"
cover: "./patrick-carr-pAoo1Rs1Yy8-unsplash.jpg"
description: Recently there has been an explosion of popularity of libraries like Redux and NGRX. One common requirement they have is an immutable state. Switching to immutable state helps us to more easily reason about our state of the application and to easily track changes. It also helps us to avoid unplanned side effect.
---

Recently there has been an explosion of popularity of libraries like **Redux** and **NGRX**. One common requirement they have is an **immutable state**. The state of the application is a result of a list of actions sequentially applied to the initial state. Each state of the application is unchangeable. A new action uses the existing state to calculate a new one. This helps us to avoid accidental state changes via mutable operations. It also allows us to investigate which actions led to our current state.

Normally, we describe states through objects and arrays:
```javascript
const state = {
  userName: 'jdoe',
  favouriteColours: ['blue', 'orange', 'green'],
  company: 'UltimateCourses',
  skills: ['javascript', 'react', 'vue', 'angular', 'svelte']
};
```

Even simple state changes, normally done with two-way binding (e.g. `v-model` in Vue or `ngModel` in Angular), could benefit from the immutable approach. We do this by making a copy of the component's input, mutating the copy and output the mutated copy to the caller. This largely reduces the potential for side effects. 

Common state action is to add or remove items from an array or to add or remove fields from an object. However, the standard operations are mutating the original object. Let's see how we can apply them in an immutable way. Our goal is to create a new object, rather than changing the existing. For simplicity, we will be using [rest and spread operators](https://javascript.info/rest-parameters-spread-operator) introduced in ES6, but all this is possible (albeit less elegantly) with ES5 functions as well.

## Immutable array operations

Array has several mutable operations - [push](#push), [pop](#pop), [splice](#removal-and-inserting-of-items), [shift](#shift), [unshift](#unshift), [reverse](#sort-and-reverse) and [sort](#sort-and-reverse). Using them is usually causing side effects and bugs that are hard to track. That's why it's important to use an immutable way.

### Push

Push is an operation that adds a new item on top of the array.

```javascript
const fruits = ['orange', 'apple', 'lemon'];
fruits.push('banana'); // = ['orange', 'apple', 'lemon', 'banana']
```

The resulting array is a concatenation of the original array and the item. Let's try to accomplish that in an immutable way:

```javascript
const fruits = ['orange', 'apple', 'lemon'];
const newFruits = [...fruits, 'banana']; // = ['orange', 'apple', 'lemon', 'banana']
```

The spread operator `...` here is 'spreading' the items of the array as arguments.

### Unshift

Unshift is an operation similar to [push](#push). However, instead of adding the item at the end we will prepend the item at the beginning of the array.

```javascript
const fruits = ['orange', 'apple', 'lemon'];
fruits.unshift('banana'); // = ['banana', 'orange', 'apple', 'lemon']
```

Similarly, we will use a spread operation to achieve immutability, but with a slight modification:

```javascript
const fruits = ['orange', 'apple', 'lemon'];
const newFruits = ['banana', ...fruits]; // = ['banana', 'orange', 'apple', 'lemon']
```

### Pop

Pop is an operation that removes the last item from the end of the array and returns it.

```javascript
const fruits = ['orange', 'apple', 'lemon', 'banana'];
const lastFruit = fruits.pop(); // = 'banana', fruits = ['orange', 'apple', 'lemon']
```

To remove the item in an immutable way we will use `slice`. Note that we are making a copy of the last item before this operation. If the copy is not needed we can skip the second line, of course.

```javascript
const fruits = ['orange', 'apple', 'lemon', 'banana'];
const lastFruit = fruits[fruits.length - 1]; // = 'banana'
const newFruits = fruits.slice(0, fruits.length - 1); // = ['orange', 'apple', 'lemon']
```

### Shift

Shift is an operation similar to [pop](#pop), but instead of removing the item from the end we remove the item from the beginning of the array.

```javascript
const fruits = ['orange', 'apple', 'lemon', 'banana'];
const firstFruit = fruits.shift(); // = 'orange', fruits = ['apple', 'lemon', 'banana']
```

Our immutable solution is equivalent to the immutable `pop`. We don't have to specify the end limit of `slice` operation if we want to take all items until the end.

```javascript
const fruits = ['orange', 'apple', 'lemon', 'banana'];
const firstFruit = fruits[0]; // = 'orange'
const newFruits = fruits.slice(1); // = ['apple', 'lemon', 'banana']
```

### Removal and inserting of items

To add or remove an item from an array, we usually use `splice`.

```javascript
const fruits = ['orange', 'apple', 'lemon', 'banana'];
// remove two items from position 1, and replace it with 'strawberry'
fruits.splice(1, 2, 'strawberry'); // = ['orange', 'strawberry', 'banana']
```

Combined `slice` and `spread` gives us the same result, but in an immutable fashion:

```javascript
const fruits = ['orange', 'apple', 'lemon', 'banana'];
const newFruits = [...fruits.slice(0, 1), 'strawberry', ...fruits.slice(3)]; // = ['orange', 'strawberry', 'banana']
```

### Sort and reverse

`Sort` and `reverse` are operators that, respectively, sort and invert the array's items order.

```javascript
const fruits = ['orange', 'apple', 'lemon', 'banana'];
fruits.sort(); // = ['apple', 'banana', 'lemon', 'orange'];
fruits.reverse(); // = ['orange', 'lemon', 'banana', 'apple'];
```

Both, `sort` and `reverse`, are mutable in nature. However, using spread, we can make a copy of the array so the mutation happens on the copy, instead of the original array.

```javascript
const fruits = ['orange', 'apple', 'lemon', 'banana'];
const sorted = [...fruits].sort(); // = ['apple', 'banana', 'lemon', 'orange'];
const inverted = [...fruits].reverse(); // = ['banana', 'lemon', 'apple', 'orange'];
const sortedAndInverted = [...sorted].reverse(); // = ['orange', 'lemon', 'banana', 'apple'];
```

Thanks to the immutability, we can now separate sorting from inversion. As a result, we have all four variants (including the original array) available.

## Immutable object operations

State objects tend to grow in applications. However, for certain functionality of the application, we don't need the full state. Usually, we change a small portion of the object and then merge it back. Let's learn how to split and change the object, without affecting the original.

### Modify and/or add property

Let's say we want to change the selected fruit and set the new quantity. The standard way to do it is by mutating the object.

```javascript
const state = {
  selected: 'apple',
  quantity: 13,
  fruits: ['orange', 'apple', 'lemon', 'banana']
};
state.selected = 'orange';
state.quantity = 5;
state.origin = 'imported from Spain';
/* 
state = {
  selected: 'orange',
  quantity: 5,
  fruits: ['orange', 'apple', 'lemon', 'banana'],
  origin: 'imported from Spain'
}
*/
```

Again, we can leverage the spread operator to create a copy of the object with fields changed. The spread here is, similar to <a href="#push">array</a>, spreading the key-value pairs of the original object onto a new one. With the next two lines, we are overriding the values from the original object. The last line is creating a new field called 'origin'.

```javascript
const state = {
  selected: 'apple',
  quantity: 13,
  fruits: ['orange', 'apple', 'lemon', 'banana']
};
const newState = {
  ...state,
  selected: 'orange',
  quantity: 5,
  origin: 'imported from Spain'
};
/* 
newState = {
  fruits: ['orange', 'apple', 'lemon', 'banana'],
  selected: 'orange',
  quantity: 5,
  origin: 'imported from Spain'
}
*/
```

### Remove a property

To remove an object's property in a mutable way, we will simply call `delete`:

```javascript
const state = {
  selected: 'apple',
  quantity: 13,
  fruits: ['orange', 'apple', 'lemon', 'banana']
};
delete state.quantity;
/* 
state = {
  selected: 'apple',
  fruits: ['orange', 'apple', 'lemon', 'banana']
} 
*/
```

Removing a property in an immutable way requires a little trick provided by spread's counterpart `rest`. Rest operator is written in the same way as `spread` - with `...`. However, the meaning, in this case, is not to spread all the fields, but rather remaining ones.

```javascript
const state = {
  selected: 'apple',
  quantity: 13,
  fruits: ['orange', 'apple', 'lemon', 'banana']
};
const { quantity, ...newState } = state;
/* 
quantity = 13
newState = {
  selected: 'apple',
  fruits: ['orange', 'apple', 'lemon', 'banana']
}
*/
```

This technique is called [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) as we are unpacking the original state object. We assign quantity key-value pair to constant `quantity` and assign rest of the object to `newState`.

## Complex structures

Complex structures have nested arrays or objects. In the following example, `state` has nested array `gang`.

```javascript
const state = {
  selected: 4,
  gang: [
    'Mike',
    'Dustin',
    'Lucas',
    'Will',
    'Jane'
  ]
};
const newState = { ...state };
newState.selected = 11;
newState.gang.push('Max');
newState.gang.push('Suzie');
/* 
state = {
  selected: 4,
  gang: [
    'Mike',
    'Dustin',
    'Lucas',
    'Will',
    'Jane'
    'Max',
    'Suzie'
  ]
}
newState = {
  selected: 11,
  gang: [
    'Mike',
    'Dustin',
    'Lucas',
    'Will',
    'Jane'
    'Max',
    'Suzie'
  ]
}
state.gang === newState.gang
*/
```

Not what we expected, right? Performing `spread` operation on the complex structures makes just a shallow (first level) copy of the structure. Here it only copied the reference to the `gang` array, not the actual array. Adding new elements to the array influenced both `state` and `newState`. To solve this we need to spread the array separately.

```javascript
const newState = { 
  ...state, 
  gang: [...state.gang] 
};
```

However, `gang` could also be a complex structure (e.g. array of objects). If we change one of the objects underneath, it will change in both arrays.

```javascript
const state = {
  selected: 4,
  gang: [
    { id: 1, name: 'Mike' },
    { id: 2, name: 'Dustin' },
    { id: 3, name: 'Lucas' },
    { id: 4, name: 'Will' },
    { id: 11, name: 'Jane' }
  ]
}
const newState = {
  selected: 11,
  gang: [...state.gang]
}
newState.gang[4].name = 'Eleven';
/* 
state = {
  selected: 4,
  gang: [
    { id: 1, name: 'Mike' },
    { id: 2, name: 'Dustin' },
    { id: 3, name: 'Lucas' },
    { id: 4, name: 'Will' },
    { id: 11, name: 'Eleven' }
  ]
}
newState = {
  selected: 11,
  gang: [
    { id: 1, name: 'Mike' },
    { id: 2, name: 'Dustin' },
    { id: 3, name: 'Lucas' },
    { id: 4, name: 'Will' },
    { id: 11, name: 'Eleven' }
  ]
}
*/
```

One solution would be to spread also every `gang` member object, but this can go on forever. Also, we might not know how many levels there are. Not to worry, as there is a trick that handles all those cases.

Calling `JSON.parse(JSON.stringify(obj))` makes a deep clone of an object. It converts an object to a string representation and then parses it back to a new object. All references from the original object remain intact.

In most cases, of course, spread on the first level is enough. But we need to be aware of this peculiar behavior to circumvent the potential problems.

## Conclusion

We learned how we can replace mutable operations with their immutable counterparts. Switching to immutable state helps us to more easily reason about our state of the application and to easily track changes. It also helps us to avoid unplanned side effect.

Please have in mind that immutable operations are recreating the array or object every time. If you are dealing with large objects or collections, this might not be the ideal way to handle your data. There are some libraries that are specialized in fast immutable operations (e.g. [Immutable JS](https://github.com/immutable-js/immutable-js) or [Immer](https://github.com/immerjs/immer)), so if you hit the performance roadblock with immutable operations, be sure to check them out.
