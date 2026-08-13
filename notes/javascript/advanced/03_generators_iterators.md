# Generators & Iterators in JavaScript

## Iterator
An **iterator** is an object with a `next()` method that returns `{ value, done }`.

## Generator
A **generator** is a special function (`function*`) that can **pause and resume** execution using `yield`. It automatically creates an iterator.

---

## Example 1 — Basic

```js
// Generator function — uses function* and yield
function* simpleGenerator() {
  yield 1;   // pause and return 1
  yield 2;   // pause and return 2
  yield 3;   // pause and return 3
  // function ends → { value: undefined, done: true }
}

const gen = simpleGenerator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Use for...of to iterate (stops when done: true)
for (const value of simpleGenerator()) {
  console.log(value); // 1, 2, 3
}

// Spread works too
console.log([...simpleGenerator()]); // [1, 2, 3]

// Infinite range generator (lazy — only produces values when asked)
function* range(start = 0, end = Infinity, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

for (const n of range(1, 6)) {
  console.log(n); // 1, 2, 3, 4, 5
}
```

---

## Example 2 — Intermediate

```js
// Custom iterator — manually implement the iterator protocol
function createRangeIterator(start, end) {
  let current = start;

  return {
    next() {
      if (current <= end) {
        return { value: current++, done: false };
      }
      return { value: undefined, done: true };
    },
    [Symbol.iterator]() {  // make it iterable (works with for...of)
      return this;
    },
  };
}

const iter = createRangeIterator(1, 5);
console.log(iter.next()); // { value: 1, done: false }
console.log(iter.next()); // { value: 2, done: false }

for (const n of createRangeIterator(1, 3)) {
  console.log(n); // 1, 2, 3
}

// Generator with return value
function* withReturn() {
  yield "a";
  yield "b";
  return "final"; // done: true, value: 'final'
}

const g = withReturn();
console.log(g.next()); // { value: 'a', done: false }
console.log(g.next()); // { value: 'b', done: false }
console.log(g.next()); // { value: 'final', done: true }  ← skipped by for...of

// Passing values INTO generator
function* calculator() {
  const a = yield "Enter first number";
  const b = yield "Enter second number";
  yield `Result: ${a + b}`;
}

const calc = calculator();
console.log(calc.next().value);   // "Enter first number"
console.log(calc.next(10).value); // "Enter second number" (10 → a)
console.log(calc.next(20).value); // "Result: 30" (20 → b)
```

---

## Example 3 — Advanced

```js
// Async generator — yield async values
async function* fetchPages(url) {
  let page = 1;

  while (true) {
    const response = await fetch(`${url}?page=${page}&limit=5`);
    const data = await response.json();

    if (data.length === 0) return; // stop iteration

    yield data;  // yield one page of results at a time
    page++;
  }
}

// Consume with for await...of
async function processAllPosts() {
  for await (const posts of fetchPages("https://jsonplaceholder.typicode.com/posts")) {
    console.log(`Processing ${posts.length} posts...`);
    // handle each batch without loading all data at once
  }
}

// Generator pipeline — chain transformations lazily
function* filter(iterable, predicate) {
  for (const item of iterable) {
    if (predicate(item)) yield item;
  }
}

function* map(iterable, transform) {
  for (const item of iterable) {
    yield transform(item);
  }
}

function* take(iterable, n) {
  let count = 0;
  for (const item of iterable) {
    if (count++ >= n) return;
    yield item;
  }
}

// Infinite sequence of natural numbers
function* naturals() {
  let n = 1;
  while (true) yield n++;
}

// Get the first 5 even squares — all lazily evaluated!
const result = take(
  map(
    filter(naturals(), n => n % 2 === 0), // even numbers: 2, 4, 6, 8...
    n => n * n                            // square them: 4, 16, 36, 64...
  ),
  5 // take first 5
);

console.log([...result]); // [4, 16, 36, 64, 100]
```
