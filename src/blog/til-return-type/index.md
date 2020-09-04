---
title: Today I learned - ReturnType<T>
date: "2020-09-04T17:00:00.121Z"
published: false
cover: "./jehyun-sung-6U5AEmQIajg-unsplash.jpg"
description: In TypeScript we often need to deal with third-party and/or native functions and based on the implementation their return types might differ. Luckily, TypeScript has a trick up the sleeve how to resolve them.
---

In TypeScript we often deal with functions coming from the untyped third-party libraries or native functions. The details of their implementation might not be clear to us, or their types might differ depending on the environment. So how do we correctly type them in our code? Do we use `any` to make TS compiler happy?

## What type is `setTimeout`?

One of the most common functions used in JavaScript (and thus, TypeScript) is `setTimeout`:
```typescript
let timeout; // which type am I?

timeout = setTimeout(() => doSomething(), TIMEOUT_DURATION);
```

Which type does `timeout` have? Experienced reader would happily say: `number`. If you'd ask NodeJS developer they would say: `NodeJS.Timeout`. So which one is correct? The answer is - it depends.

How do you properly type the function that returns different result type depending on the environment or some other moving conditions? Luckily, TypeScript has a mechanism that solves those dynamic situations.

## Meet `ReturnType<T>`

According to the [official TypeScript docs](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype), `ReturnType<T>` "constructs a type consisting of the return type of function T.

```typescript
type T0 = ReturnType<() => string>;
//    ^ = type T0 = string
type T1 = ReturnType<(s: string) => void>;
//    ^ = type T1 = void
```

Ok, so now we know how to extract return type, but we still need type of `setTimeout` to feed it as a generic parameter. Luckily, JavaScript has neat [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator. We can now write the above code as:
```typescript
let timeout: ReturnType<typeof setTimeout>;

timeout = setTimeout(() => doSomething(), TIMEOUT_DURATION);
```

TypeScript compiler is now happy and our code is still protected by the correct type.


