# Variables in JavaScript & TypeScript

> Introduced before ES6: `var` | Introduced after ES6: `let` & `const`

---

## Quick Comparison Table

| Feature              | `var`                        | `let`                        | `const`                      |
|----------------------|------------------------------|------------------------------|------------------------------|
| **Scope**            | Function-scoped              | Block-scoped                 | Block-scoped                 |
| **Declaration**      | Can declare first, assign later | Can declare first, assign later | Must assign at declaration |
| **Re-declaration**   | ✅ Allowed                   | ❌ Not allowed               | ❌ Not allowed               |
| **Re-initialization**| ✅ Allowed                   | ✅ Allowed                   | ❌ Not allowed               |
| **Hoisting**         | Hoisted & initialized to `undefined` | Hoisted but in TDZ | Hoisted but in TDZ |
| **Global object**    | Attaches to `window`         | Does NOT attach to `window`  | Does NOT attach to `window`  |

---

## 1. Scope

```js
// var → function-scoped (leaks out of blocks)
function testVar() {
    if (true) {
        var x = 10;
    }
    console.log(x); // ✅ 10 — accessible outside the if block
}

// let & const → block-scoped (stays inside {})
function testLet() {
    if (true) {
        let y = 20;
    }
    console.log(y); // ❌ ReferenceError: y is not defined
}
```

---

## 2. Declaration & Assignment

```js
var a;      // ✅ declare first
a = 5;      // ✅ assign later

let b;      // ✅ declare first
b = 10;     // ✅ assign later

const c;    // ❌ SyntaxError: Missing initializer in const declaration
const c = 15; // ✅ must assign at declaration
```

---

## 3. Re-declaration

```js
var name = "Alice";
var name = "Bob"; // ✅ No error

let age = 25;
let age = 30;     // ❌ SyntaxError: Identifier 'age' already declared

const city = "NY";
const city = "LA"; // ❌ SyntaxError
```

---

## 4. Re-initialization (Re-assignment)

```js
var score = 10;
score = 20;   // ✅ allowed

let count = 1;
count = 5;    // ✅ allowed

const PI = 3.14;
PI = 3.15;    // ❌ TypeError: Assignment to constant variable
```

> **Note:** `const` with objects/arrays — the reference is constant, but the contents can be mutated.
```js
const person = { name: "Alice" };
person.name = "Bob"; // ✅ allowed — mutating property, not reassigning reference
person = {};         // ❌ not allowed — reassigning reference
```

---

## 5. Hoisting

Hoisting means JS moves variable/function declarations to the top of their scope during the **compilation phase** (before execution).

```js
// var → hoisted and initialized to undefined
console.log(x); // undefined (no error)
var x = 5;

// let & const → hoisted but NOT initialized → Temporal Dead Zone (TDZ)
console.log(y); // ❌ ReferenceError: Cannot access 'y' before initialization
let y = 10;
```

### Temporal Dead Zone (TDZ)
- The period between the start of the block and the point where `let`/`const` is declared.
- Accessing the variable in this zone throws a `ReferenceError`.
- This is a safety feature that catches bugs from using variables before they're ready.

```
Block starts  →  [TDZ for y]  →  let y = 10  →  y is accessible
```

---

## Interview Tips

- **Use `const` by default**, `let` when you need to reassign, avoid `var`.
- `var` in a loop can cause bugs because of function scope (use `let` in loops).
- TDZ only applies to `let` and `const`, not `var`.
- `const` doesn't make objects immutable — use `Object.freeze()` for that.
- All three are hoisted, but only `var` is initialized (to `undefined`) during hoisting.
