# Loops in JavaScript

Loops repeat a block of code multiple times. JavaScript has several loop types for different use cases.

| Loop | Best Used For |
|------|--------------|
| `for` | When you know the number of iterations |
| `while` | When condition is checked before each iteration |
| `do...while` | When code must run at least once |
| `for...of` | Iterating over arrays, strings (values) |
| `for...in` | Iterating over object keys |

---

## Example 1 — Basic

```js
// for loop
for (let i = 1; i <= 5; i++) {
  console.log("Count:", i);
}
// Count: 1, 2, 3, 4, 5

// while loop
let count = 0;
while (count < 3) {
  console.log("While count:", count);
  count++;
}
// While count: 0, 1, 2

// do...while — runs at least once even if condition is false
let x = 10;
do {
  console.log("Runs once:", x); // prints even though x > 5
  x++;
} while (x < 5);
// Runs once: 10

// break — exit loop early
for (let i = 0; i < 10; i++) {
  if (i === 4) break;
  console.log(i); // 0, 1, 2, 3
}

// continue — skip current iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i); // 0, 1, 3, 4
}
```

---

## Example 2 — Intermediate

```js
// for...of — iterate over array values
const fruits = ["apple", "banana", "mango"];

for (const fruit of fruits) {
  console.log(fruit); // apple, banana, mango
}

// for...of with index using entries()
for (const [index, fruit] of fruits.entries()) {
  console.log(`${index}: ${fruit}`);
  // 0: apple, 1: banana, 2: mango
}

// for...in — iterate over object keys
const person = { name: "Alice", age: 25, city: "Mumbai" };

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
  // name: Alice, age: 25, city: Mumbai
}

// Nested loops — multiplication table
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`${i} x ${j} = ${i * j}`);
  }
}
```

---

## Example 3 — Advanced

```js
// Looping with array methods (functional style — preferred in modern JS)
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// forEach — loop with side effects
numbers.forEach((num, index) => {
  if (num % 2 === 0) console.log(`Even at index ${index}: ${num}`);
});

// while loop for pagination (real-world pattern)
async function fetchAllPages(url) {
  let page = 1;
  let allData = [];
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();

    allData = [...allData, ...data.items];
    hasMore = data.hasNextPage;
    page++;
  }

  return allData;
}

// Labelled break — break out of nested loops
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      console.log(`Breaking at i=${i}, j=${j}`);
      break outer; // exits both loops
    }
    console.log(`i=${i}, j=${j}`);
  }
}
// i=0,j=0 | i=0,j=1 | i=0,j=2 | i=1,j=0 | Breaking at i=1, j=1

// Generator-based loop (lazy iteration)
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

for (const num of range(0, 10, 2)) {
  console.log(num); // 0, 2, 4, 6, 8
}
```
