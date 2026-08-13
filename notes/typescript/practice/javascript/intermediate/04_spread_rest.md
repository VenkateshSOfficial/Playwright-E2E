# Spread & Rest Operators in JavaScript

Both use `...` but in **opposite directions**:

| Operator | Direction | Usage |
|----------|-----------|-------|
| **Spread** `...` | Expands an iterable into individual elements | Calling functions, copying arrays/objects |
| **Rest** `...` | Collects multiple elements into one | Function parameters, destructuring |

> **Tip:** If `...` is on the **left side** of `=` or in function params → Rest. If on the **right side** or in a call → Spread.

---

## Example 1 — Basic

```js
// Spread — expand array into individual arguments
const nums = [3, 1, 4, 1, 5, 9];
console.log(Math.max(...nums));  // 9  (without spread: Math.max([3,1,4...]) = NaN)
console.log(Math.min(...nums));  // 1

// Spread — copy an array
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] — unchanged
console.log(copy);     // [1, 2, 3, 4]

// Spread — merge arrays
const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b, 5];
console.log(merged); // [1, 2, 3, 4, 5]

// Rest — collect arguments in a function
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3));         // 6
console.log(sum(10, 20, 30, 40));  // 100
```

---

## Example 2 — Intermediate

```js
// Spread — copy and merge objects
const defaults = { theme: "light", lang: "en", fontSize: 14 };
const overrides = { theme: "dark", fontSize: 16 };

const settings = { ...defaults, ...overrides }; // later keys win
console.log(settings);
// { theme: 'dark', lang: 'en', fontSize: 16 }

// Spread — add/update object properties immutably
const user = { id: 1, name: "Alice", role: "user" };
const updatedUser = { ...user, role: "admin", lastSeen: new Date() };
console.log(user.role);        // "user" — original unchanged
console.log(updatedUser.role); // "admin"

// Rest in destructuring
const { id, name, ...profile } = { id: 1, name: "Alice", age: 25, city: "Delhi" };
console.log(id, name); // 1 "Alice"
console.log(profile);  // { age: 25, city: 'Delhi' }

const [first, second, ...remaining] = [10, 20, 30, 40, 50];
console.log(first, second); // 10 20
console.log(remaining);     // [30, 40, 50]

// Rest — mixed required and variadic params
function log(level, ...messages) {
  console.log(`[${level.toUpperCase()}]`, messages.join(" "));
}
log("info", "User", "logged", "in");   // [INFO] User logged in
log("error", "File not found");        // [ERROR] File not found
```

---

## Example 3 — Advanced

```js
// Deep merge with spread (shallow — only works one level deep)
const config1 = { db: { host: "localhost", port: 5432 }, debug: false };
const config2 = { db: { port: 3306, name: "mydb" }, debug: true };

// Shallow merge — db is completely replaced by config2.db
const shallowMerged = { ...config1, ...config2 };
console.log(shallowMerged.db); // { port: 3306, name: 'mydb' } ← host is LOST

// Deep merge using recursion
function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

const deepMerged = deepMerge(config1, config2);
console.log(deepMerged.db); // { host: 'localhost', port: 3306, name: 'mydb' } ✅

// Spread to pass dynamic props to functions
function createTag(tag, { className, id, ...attrs } = {}) {
  const attrStr = Object.entries(attrs)
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
  return `<${tag} class="${className}" id="${id}" ${attrStr}></${tag}>`;
}

console.log(createTag("input", {
  className: "form-input",
  id: "email",
  type: "email",
  placeholder: "Enter email",
}));
// <input class="form-input" id="email" type="email" placeholder="Enter email"></input>
```
