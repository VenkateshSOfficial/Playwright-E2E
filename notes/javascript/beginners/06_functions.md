# Functions in JavaScript

A function is a reusable block of code that performs a specific task. You define it once and call it multiple times.

### Ways to Define Functions
| Type | Syntax |
|------|--------|
| Function Declaration | `function name() {}` |
| Function Expression | `const name = function() {}` |
| Arrow Function | `const name = () => {}` |

---

## Example 1 — Basic

```js
// Function Declaration
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Alice")); // "Hello, Alice!"

// Function with default parameter
function greetUser(name = "Guest") {
  return `Welcome, ${name}!`;
}
console.log(greetUser());         // "Welcome, Guest!"
console.log(greetUser("Bob"));    // "Welcome, Bob!"

// Function Expression — stored in a variable
const add = function (a, b) {
  return a + b;
};
console.log(add(3, 4)); // 7

// Arrow Function — shorter syntax
const multiply = (a, b) => a * b;  // implicit return
console.log(multiply(5, 6)); // 30

// No parameters arrow function
const sayHi = () => "Hi there!";
console.log(sayHi()); // "Hi there!"
```

---

## Example 2 — Intermediate

```js
// Rest parameters — collect multiple arguments into an array
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3));        // 6
console.log(sum(10, 20, 30, 40)); // 100

// Functions returning functions (closure)
function makeMultiplier(factor) {
  return function (number) {
    return number * factor;
  };
}
const double = makeMultiplier(2);
const triple = makeMultiplier(3);
console.log(double(5));  // 10
console.log(triple(5));  // 15

// Immediately Invoked Function Expression (IIFE)
(function () {
  const secret = "I run immediately!";
  console.log(secret);
})();
// "I run immediately!"

// Arrow function vs regular function — difference with 'this'
const obj = {
  name: "Alice",
  regularGreet: function () {
    return `Hi, I am ${this.name}`; // 'this' refers to obj
  },
  arrowGreet: () => {
    return `Hi, I am ${this?.name}`; // 'this' does NOT refer to obj
  },
};
console.log(obj.regularGreet()); // "Hi, I am Alice"
console.log(obj.arrowGreet());   // "Hi, I am undefined"
```

---

## Example 3 — Advanced

```js
// Higher-order functions — functions that take or return functions
function applyOperation(a, b, operation) {
  return operation(a, b);
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

console.log(applyOperation(10, 3, add));       // 13
console.log(applyOperation(10, 3, subtract));  // 7

// Function composition — combining functions
const compose = (...fns) => (value) =>
  fns.reduceRight((acc, fn) => fn(acc), value);

const double = (x) => x * 2;
const addTen = (x) => x + 10;
const square = (x) => x * x;

const transform = compose(double, addTen, square);
console.log(transform(3)); // square(3)=9 → addTen(9)=19 → double(19)=38

// Memoization — caching function results
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      console.log("From cache");
      return cache[key];
    }
    cache[key] = fn(...args);
    return cache[key];
  };
}

const expensiveCalc = (n) => n * n * n;
const memoizedCalc = memoize(expensiveCalc);

console.log(memoizedCalc(5)); // 125 (calculated)
console.log(memoizedCalc(5)); // 125 (from cache)
console.log(memoizedCalc(6)); // 216 (calculated)
```
