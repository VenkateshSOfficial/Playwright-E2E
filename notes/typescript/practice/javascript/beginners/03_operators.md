# Operators in JavaScript

Operators perform operations on values (called **operands**).

### Types of Operators
| Category | Operators |
|----------|-----------|
| Arithmetic | `+` `-` `*` `/` `%` `**` |
| Assignment | `=` `+=` `-=` `*=` `/=` |
| Comparison | `==` `===` `!=` `!==` `>` `<` `>=` `<=` |
| Logical | `&&` `\|\|` `!` |
| Ternary | `condition ? value1 : value2` |
| Nullish Coalescing | `??` |
| Optional Chaining | `?.` |

> **Always prefer `===` over `==`** — `===` checks value AND type (strict equality).

---

## Example 1 — Basic

```js
// Arithmetic operators
let a = 10, b = 3;

console.log(a + b);  // 13
console.log(a - b);  // 7
console.log(a * b);  // 30
console.log(a / b);  // 3.333...
console.log(a % b);  // 1  (remainder)
console.log(a ** b); // 1000 (exponentiation: 10³)

// Assignment operators
let x = 5;
x += 3;  // x = x + 3 → 8
x -= 2;  // x = x - 2 → 6
x *= 4;  // x = x * 4 → 24
console.log(x); // 24

// Comparison operators
console.log(5 == "5");  // true  (loose — only checks value)
console.log(5 === "5"); // false (strict — checks value AND type)
console.log(5 !== 6);   // true
```

---

## Example 2 — Intermediate

```js
// Logical operators
let isLoggedIn = true;
let hasPermission = false;

console.log(isLoggedIn && hasPermission); // false (both must be true)
console.log(isLoggedIn || hasPermission); // true  (at least one must be true)
console.log(!isLoggedIn);                 // false (negation)

// Short-circuit evaluation
let name = null;
let displayName = name || "Guest";  // if name is falsy, use "Guest"
console.log(displayName); // "Guest"

// Ternary operator — shorthand for if/else
let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"

// Nullish Coalescing (??) — only falls back if value is null or undefined
let userScore = 0;
console.log(userScore || 100);  // 100 (because 0 is falsy — WRONG behavior)
console.log(userScore ?? 100);  // 0   (only null/undefined triggers fallback)
```

---

## Example 3 — Advanced

```js
// Optional Chaining (?.) — safely access nested properties
const user = {
  name: "Alice",
  address: {
    city: "Mumbai",
  },
};

console.log(user.address.city);        // "Mumbai"
console.log(user.address.zip);         // undefined (no error)
console.log(user.phone?.number);       // undefined (no error, phone doesn't exist)
// console.log(user.phone.number);     // ❌ TypeError: Cannot read property of undefined

// Optional chaining with methods
const arr = null;
console.log(arr?.map(x => x * 2));    // undefined (no error)

// Combining ?? and ?.
const config = null;
const timeout = config?.settings?.timeout ?? 3000;
console.log(timeout); // 3000 (default)

// Logical Assignment operators (ES2021)
let a = null;
a ??= "default";   // assign only if null or undefined
console.log(a);    // "default"

let b = false;
b ||= "fallback";  // assign only if falsy
console.log(b);    // "fallback"

let c = 5;
c &&= c * 2;       // assign only if truthy
console.log(c);    // 10
```
