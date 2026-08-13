# Currying & Memoization in JavaScript

## Currying
Currying transforms a function with multiple arguments into a **sequence of functions**, each taking one argument at a time.

```
f(a, b, c)  →  f(a)(b)(c)
```

## Memoization
Memoization **caches the result** of a function call so repeated calls with the same arguments return the cached result instantly.

---

## Example 1 — Basic

```js
// Regular function
function add(a, b) {
  return a + b;
}
console.log(add(3, 4)); // 7

// Curried version
function curriedAdd(a) {
  return function (b) {
    return a + b;
  };
}

const add5 = curriedAdd(5);   // partially applied
console.log(add5(3));  // 8
console.log(add5(10)); // 15

// Arrow function currying — short syntax
const multiply = a => b => a * b;
const double = multiply(2);
const triple = multiply(3);

console.log(double(6));  // 12
console.log(triple(6));  // 18

// Basic memoization
function memoize(fn) {
  const cache = {};
  return function (n) {
    if (n in cache) return cache[n];
    cache[n] = fn(n);
    return cache[n];
  };
}

const slowSquare = n => {
  // simulating slow computation
  return n * n;
};

const fastSquare = memoize(slowSquare);
console.log(fastSquare(5));  // 25 (computed)
console.log(fastSquare(5));  // 25 (from cache)
```

---

## Example 2 — Intermediate

```js
// Practical currying — building reusable functions
const discount = rate => price => price * (1 - rate);

const tenPercentOff = discount(0.10);
const twentyPercentOff = discount(0.20);

console.log(tenPercentOff(1000));    // 900
console.log(twentyPercentOff(1000)); // 800

// Curried filter and map
const filter = predicate => array => array.filter(predicate);
const map = transform => array => array.map(transform);

const isEven = n => n % 2 === 0;
const double = n => n * 2;

const getDoubledEvens = array =>
  map(double)(filter(isEven)(array));

console.log(getDoubledEvens([1, 2, 3, 4, 5, 6])); // [4, 8, 12]

// Memoization with multiple arguments
function memoizeMulti(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log(`Cache hit for: ${key}`);
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const memoizedAdd = memoizeMulti((a, b) => a + b);
console.log(memoizedAdd(3, 4)); // 7 (computed)
console.log(memoizedAdd(3, 4)); // 7 (cache hit)
console.log(memoizedAdd(5, 6)); // 11 (computed)
```

---

## Example 3 — Advanced

```js
// Generic curry function — convert any function to curried form
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args); // enough args — call original
    }
    return function (...moreArgs) {
      return curried.apply(this, args.concat(moreArgs)); // collect more args
    };
  };
}

function volume(l, w, h) {
  return l * w * h;
}

const curriedVolume = curry(volume);
console.log(curriedVolume(2)(3)(4));   // 24 — one at a time
console.log(curriedVolume(2, 3)(4));   // 24 — two then one
console.log(curriedVolume(2)(3, 4));   // 24 — one then two
console.log(curriedVolume(2, 3, 4));   // 24 — all at once

// Memoization with TTL (Time-To-Live cache expiry)
function memoizeWithTTL(fn, ttlMs = 5000) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < ttlMs) {
      return cached.value; // fresh cache
    }

    const value = fn.apply(this, args);
    cache.set(key, { value, timestamp: Date.now() });
    return value;
  };
}

// Simulates an expensive API call
const fetchUserData = memoizeWithTTL(
  async (userId) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return res.json();
  },
  30000 // cache for 30 seconds
);

// First call fetches from API; subsequent calls within 30s return cached
fetchUserData(1).then(user => console.log(user.name));
fetchUserData(1).then(user => console.log(user.name)); // from cache
```
