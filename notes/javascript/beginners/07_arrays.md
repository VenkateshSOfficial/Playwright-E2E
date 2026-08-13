# Arrays in JavaScript

An array is an ordered list of values. Arrays can hold any data type — numbers, strings, objects, even other arrays.

```js
const arr = [1, "hello", true, null, { name: "Alice" }];
```

### Common Array Methods
| Method | Purpose |
|--------|---------|
| `push` / `pop` | Add/remove from end |
| `unshift` / `shift` | Add/remove from start |
| `slice` | Extract part (non-destructive) |
| `splice` | Add/remove at any position (destructive) |
| `indexOf` / `includes` | Find elements |
| `join` | Convert to string |
| `reverse` / `sort` | Reorder |
| `map`, `filter`, `reduce` | Transform (covered in intermediate) |

---

## Example 1 — Basic

```js
const fruits = ["apple", "banana", "mango"];

// Access by index (0-based)
console.log(fruits[0]);  // "apple"
console.log(fruits[2]);  // "mango"
console.log(fruits.length); // 3

// Add and remove
fruits.push("grape");    // add to end → ["apple","banana","mango","grape"]
fruits.pop();            // remove from end → ["apple","banana","mango"]
fruits.unshift("kiwi");  // add to start → ["kiwi","apple","banana","mango"]
fruits.shift();          // remove from start → ["apple","banana","mango"]

// Check if element exists
console.log(fruits.includes("banana")); // true
console.log(fruits.indexOf("mango"));   // 2

// Join array elements into a string
console.log(fruits.join(", ")); // "apple, banana, mango"

// Reverse and sort
console.log([3, 1, 2].sort());       // [1, 2, 3]
console.log([1, 2, 3].reverse());    // [3, 2, 1]
```

---

## Example 2 — Intermediate

```js
// slice — extract without modifying original
const numbers = [10, 20, 30, 40, 50];
const sliced = numbers.slice(1, 4); // from index 1 up to (not including) 4
console.log(sliced);   // [20, 30, 40]
console.log(numbers);  // [10, 20, 30, 40, 50] — unchanged

// splice — modify original array
const colors = ["red", "green", "blue"];
const removed = colors.splice(1, 1, "yellow", "purple");
// splice(startIndex, deleteCount, ...itemsToAdd)
console.log(removed); // ["green"] (removed items)
console.log(colors);  // ["red", "yellow", "purple", "blue"]

// Spread operator — combine arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Destructuring
const [first, second, ...rest] = [10, 20, 30, 40, 50];
console.log(first);  // 10
console.log(second); // 20
console.log(rest);   // [30, 40, 50]

// Flat — flatten nested arrays
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6]
```

---

## Example 3 — Advanced

```js
// map — transform each element (returns new array)
const prices = [100, 200, 300];
const discounted = prices.map(price => price * 0.9);
console.log(discounted); // [90, 180, 270]

// filter — keep only elements that pass condition
const ages = [15, 22, 18, 30, 12, 25];
const adults = ages.filter(age => age >= 18);
console.log(adults); // [22, 18, 30, 25]

// reduce — accumulate to a single value
const cart = [
  { item: "book", price: 200 },
  { item: "pen", price: 50 },
  { item: "bag", price: 500 },
];
const total = cart.reduce((sum, product) => sum + product.price, 0);
console.log(total); // 750

// Chaining map + filter + reduce
const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 55 },
  { name: "Charlie", score: 92 },
  { name: "Diana", score: 48 },
];

const topScoreAvg = students
  .filter(s => s.score >= 60)           // keep passing students
  .map(s => s.score)                    // extract scores
  .reduce((sum, score, _, arr) => sum + score / arr.length, 0); // average

console.log(topScoreAvg.toFixed(2)); // "87.33"

// find and findIndex
const user = students.find(s => s.name === "Charlie");
console.log(user); // { name: 'Charlie', score: 92 }

const idx = students.findIndex(s => s.score < 60);
console.log(idx); // 1 (Bob)

// every and some
console.log(students.every(s => s.score > 40)); // true (all > 40)
console.log(students.some(s => s.score > 90));  // true (Charlie > 90)
```
