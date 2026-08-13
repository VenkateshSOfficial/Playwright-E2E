# Modules in JavaScript

Modules let you **split code into separate files** and share code between them using `export` and `import`.

### Two Module Systems
| System | Syntax | Used In |
|--------|--------|---------|
| **ES Modules** (ESM) | `import` / `export` | Modern browsers, Node.js (`.mjs` or `"type":"module"`) |
| **CommonJS** (CJS) | `require` / `module.exports` | Node.js (`.js` default) |

---

## Example 1 — Basic

```js
// ---- math.js ----
// Named exports — export multiple things
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// ---- main.js ----
// Named imports — must use the exact exported names
import { PI, add, multiply } from "./math.js";

console.log(PI);             // 3.14159
console.log(add(3, 4));      // 7
console.log(multiply(5, 6)); // 30

// Import with alias
import { add as sum } from "./math.js";
console.log(sum(10, 20)); // 30

// Import everything as a namespace
import * as MathUtils from "./math.js";
console.log(MathUtils.PI);         // 3.14159
console.log(MathUtils.add(1, 2));  // 3
```

---

## Example 2 — Intermediate

```js
// ---- user.js ----
// Default export — one per file, any name when importing
const defaultUser = { name: "Guest", role: "viewer" };
export default defaultUser;

// Mix of default and named exports
export const VERSION = "1.0.0";
export function createUser(name, role = "user") {
  return { id: Date.now(), name, role };
}

// ---- app.js ----
import defaultUser, { VERSION, createUser } from "./user.js";
// ^default import  ^named imports

console.log(defaultUser);           // { name: 'Guest', role: 'viewer' }
console.log(VERSION);               // "1.0.0"
console.log(createUser("Alice"));   // { id: ..., name: 'Alice', role: 'user' }

// Re-exporting — barrel file pattern
// ---- index.js (barrel) ----
export { add, multiply } from "./math.js";
export { createUser } from "./user.js";
export { default as defaultUser } from "./user.js";

// Now consumers import from one place:
// import { add, createUser } from "./index.js";

// CommonJS (Node.js)
// ---- config.js ----
// module.exports = { apiUrl: "https://api.example.com", port: 3000 };

// ---- server.js ----
// const config = require("./config");
// console.log(config.apiUrl);
```

---

## Example 3 — Advanced

```js
// Dynamic imports — load modules on demand (code splitting)
async function loadChart() {
  const { Chart } = await import("./chart.js"); // loaded only when needed
  return new Chart();
}

// Lazy loading a feature
document.getElementById("exportBtn").addEventListener("click", async () => {
  const { generatePDF } = await import("./pdf-generator.js");
  await generatePDF(document.body);
});

// Conditional imports
async function loadLocale(lang) {
  try {
    const module = await import(`./locales/${lang}.js`);
    return module.default;
  } catch {
    const fallback = await import("./locales/en.js");
    return fallback.default;
  }
}

const translations = await loadLocale("fr");

// Module with singleton pattern
// ---- store.js ----
let state = { user: null, cart: [] };

export function getState() {
  return { ...state }; // return copy, not reference
}

export function setState(updates) {
  state = { ...state, ...updates };
}

export function subscribe(listener) {
  // simplified — real apps use event emitters
  return () => {}; // unsubscribe function
}

// ---- anywhere.js ----
import { getState, setState } from "./store.js";

setState({ user: { name: "Alice" } });
console.log(getState().user); // { name: 'Alice' }
// Same state is shared across all files that import from store.js
```

---

## Tree-shaking — Why Named Exports Are Better

Tree-shaking is a build-tool technique (Webpack, Vite, Rollup) that **removes unused exports** from the final bundle.

```js
// ✅ Named exports — tree-shakable
// utils.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a * b; }

// app.js — only imports 'add'
import { add } from "./utils.js";
// Build tool sees subtract and multiply are never imported → removes them from bundle

// ❌ Default export of an object — NOT tree-shakable
// utils.js
export default { add, subtract, multiply };

// app.js
import utils from "./utils.js";
utils.add(1, 2);
// Build tool can't tell which properties are used → keeps entire object
```

> **Rule:** Prefer named exports for utility functions. Use default export for a single main thing (a class, a component, a config object).

---

## Circular Dependencies — The Hidden Trap

A circular dependency is when **module A imports from B** and **module B imports from A**.

```js
// ❌ Circular dependency example

// a.js
import { b } from "./b.js";
export const a = "value-a";
console.log("b is:", b); // ⚠️ may be undefined at this point!

// b.js
import { a } from "./a.js";
export const b = "value-b";
console.log("a is:", a); // ⚠️ may be undefined at this point!

// Why: When a.js loads, it starts executing b.js first.
// b.js tries to import 'a' from a.js, but a.js hasn't finished — so 'a' is undefined.
```

```js
// ✅ Fix: extract the shared value into a third module
// shared.js
export const sharedValue = "shared";

// a.js — import from shared, not from b
import { sharedValue } from "./shared.js";
export const a = sharedValue + "-a";

// b.js — import from shared, not from a
import { sharedValue } from "./shared.js";
export const b = sharedValue + "-b";
```

> **Rule:** If two modules need each other, extract shared logic into a third module.
