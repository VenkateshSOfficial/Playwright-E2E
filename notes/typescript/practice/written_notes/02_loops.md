# Loops in JavaScript & TypeScript

> Four main loop types: `for`, `for...of`, `for...in`, `forEach` + bonus: `while`, `do...while`

---

## Quick Comparison Table

| Loop          | Iterates Over          | Gives You       | Use Case                              |
|---------------|------------------------|-----------------|---------------------------------------|
| `for`         | Index-based range      | Index           | When you need the index or custom steps |
| `for...of`    | Iterable values        | Value           | Arrays, strings, Sets, Maps           |
| `for...in`    | Object keys            | Key             | Object properties                     |
| `forEach`     | Array elements         | Value + Index   | Side effects on each array element    |
| `while`       | Condition-based        | —               | Unknown number of iterations          |
| `do...while`  | Condition-based        | —               | Run at least once, then check         |

---

## 1. `for` Loop — Classic Counter Loop

```js
for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}

// Reverse
for (let i = 5; i >= 0; i--) {
    console.log(i); // 5, 4, 3, 2, 1, 0
}

// Step by 2
for (let i = 0; i <= 10; i += 2) {
    console.log(i); // 0, 2, 4, 6, 8, 10
}
```

> Best when you need the **index** or need to control step size.

---

## 2. `for...of` — Iterate Values of Iterables

Works on: **arrays, strings, Sets, Maps, generators**

```js
// Arrays
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
    console.log(fruit); // apple, banana, cherry
}

// Strings
for (const char of "hello") {
    console.log(char); // h, e, l, l, o
}

// With index using entries()
for (const [index, fruit] of fruits.entries()) {
    console.log(index, fruit); // 0 apple, 1 banana, 2 cherry
}

// Set
const uniqueNums = new Set([1, 2, 3]);
for (const num of uniqueNums) {
    console.log(num); // 1, 2, 3
}
```

> ❌ Does NOT work on plain objects.

---

## 3. `for...in` — Iterate Keys of an Object

```js
const person = { name: "Alice", age: 25, city: "NY" };

for (const key in person) {
    console.log(key);           // name, age, city
    console.log(person[key]);   // Alice, 25, NY
}
```

> ⚠️ Avoid using `for...in` on arrays — it can include inherited prototype properties. Use `for...of` for arrays.

```js
// Works on arrays but not recommended
const arr = [10, 20, 30];
for (const index in arr) {
    console.log(index); // "0", "1", "2" — keys are strings!
}
```

---

## 4. `forEach` — Array Method with Callback

```js
const nums = [10, 20, 30];

nums.forEach((num, index) => {
    console.log(index, num); // 0 10, 1 20, 2 30
});

// With just the value
nums.forEach(num => console.log(num)); // 10, 20, 30
```

> ⚠️ **Key difference from other loops:**
> - Cannot use `break` or `continue` inside `forEach`
> - Does NOT return a value (returns `undefined`)
> - Cannot be used with `await` (use `for...of` for async)

---

## 5. `while` Loop — Run While Condition Is True

```js
let i = 0;
while (i < 5) {
    console.log(i); // 0, 1, 2, 3, 4
    i++;
}
```

> Use when the number of iterations is **unknown** upfront.

---

## 6. `do...while` — Runs At Least Once

```js
let i = 0;
do {
    console.log(i); // 0, 1, 2, 3, 4
    i++;
} while (i < 5);

// Runs once even when condition is false from the start
let x = 10;
do {
    console.log("runs once"); // ✅ this prints
} while (x < 5);             // condition is false but block ran once
```

---

## 7. `break` and `continue`

```js
// break — exits the loop entirely
for (let i = 0; i < 10; i++) {
    if (i === 5) break;
    console.log(i); // 0, 1, 2, 3, 4
}

// continue — skips current iteration
for (let i = 0; i < 5; i++) {
    if (i === 2) continue;
    console.log(i); // 0, 1, 3, 4 (skips 2)
}
```

---

## TypeScript Tip

In TypeScript, loops work the same way. Type inference applies to loop variables:

```ts
const scores: number[] = [90, 85, 78];

for (const score of scores) {
    // score is inferred as number ✅
    console.log(score.toFixed(2));
}
```

---

## Interview Tips

- `for...of` is for **values**; `for...in` is for **keys**.
- `forEach` cannot `break` — use a regular `for` or `for...of` if you need to exit early.
- `for...in` on arrays gives string keys (`"0"`, `"1"`) — avoid it for arrays.
- For async/await inside loops, always use `for...of`, never `forEach`.
- `while` vs `do...while`: `do...while` always executes the body at least once.
