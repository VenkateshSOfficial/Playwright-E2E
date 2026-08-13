# Higher-Order Functions in JavaScript

A **Higher-Order Function (HOF)** is a function that either:
1. **Takes a function as an argument**, or
2. **Returns a function**

The most common built-in HOFs for arrays are: `map`, `filter`, `reduce`, `forEach`, `find`, `every`, `some`.

---

## Example 1 — Basic

```js
const numbers = [1, 2, 3, 4, 5];

// forEach — loop over array (no return value)
numbers.forEach(num => console.log(num)); // 1 2 3 4 5

// map — transform each element, returns NEW array
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(numbers); // [1, 2, 3, 4, 5] — original unchanged

// filter — keep elements that pass the test, returns NEW array
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// find — returns FIRST element that matches
const firstBig = numbers.find(num => num > 3);
console.log(firstBig); // 4

// some — true if AT LEAST ONE element passes
console.log(numbers.some(num => num > 4));  // true

// every — true if ALL elements pass
console.log(numbers.every(num => num > 0)); // true
console.log(numbers.every(num => num > 3)); // false
```

---

## Example 2 — Intermediate

```js
// reduce — accumulate all elements into a single value
const cart = [
  { name: "Book", price: 200, qty: 2 },
  { name: "Pen", price: 50, qty: 5 },
  { name: "Bag", price: 800, qty: 1 },
];

const totalCost = cart.reduce((total, item) => {
  return total + item.price * item.qty;
}, 0); // 0 is the initial value

console.log(totalCost); // 1450

// Chaining HOFs
const students = [
  { name: "Alice", grade: 88 },
  { name: "Bob", grade: 55 },
  { name: "Charlie", grade: 92 },
  { name: "Diana", grade: 45 },
];

// Get names of students who passed (grade >= 60), sorted by grade
const topStudents = students
  .filter(s => s.grade >= 60)
  .sort((a, b) => b.grade - a.grade)  // descending
  .map(s => `${s.name} (${s.grade})`);

console.log(topStudents); // ["Charlie (92)", "Alice (88)"]

// Custom HOF — function that takes another function
function repeat(times, action) {
  for (let i = 0; i < times; i++) {
    action(i);
  }
}

repeat(3, i => console.log(`Iteration ${i}`));
// Iteration 0, Iteration 1, Iteration 2
```

---

## Example 3 — Advanced

```js
// reduce to group items
const orders = [
  { product: "book", category: "education" },
  { product: "pen", category: "stationery" },
  { product: "novel", category: "education" },
  { product: "ruler", category: "stationery" },
  { product: "laptop", category: "electronics" },
];

const grouped = orders.reduce((acc, order) => {
  const { category, product } = order;
  if (!acc[category]) acc[category] = [];
  acc[category].push(product);
  return acc;
}, {});

console.log(grouped);
// {
//   education: ['book', 'novel'],
//   stationery: ['pen', 'ruler'],
//   electronics: ['laptop']
// }

// flatMap — map + flatten in one step
const sentences = ["hello world", "foo bar"];
const words = sentences.flatMap(sentence => sentence.split(" "));
console.log(words); // ["hello", "world", "foo", "bar"]

// Building a custom pipe function (HOF that returns HOF)
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

const processPrice = pipe(
  price => price * 1.18,         // add 18% GST
  price => Math.round(price),    // round to integer
  price => `₹${price}`          // format as currency
);

console.log(processPrice(100)); // "₹118"
console.log(processPrice(250)); // "₹295"
```
