# Data Types in JavaScript & TypeScript

> JS is dynamically typed (types at runtime). TS is statically typed (types at compile time).

---

## Primitive vs Non-Primitive

| Feature             | Primitive                   | Non-Primitive              |
|---------------------|-----------------------------|----------------------------|
| **Storage**         | Stack (by value)            | Heap (by reference, pointer on stack) |
| **Mutability**      | Immutable                   | Mutable                    |
| **Equality check**  | Compares value              | Compares reference         |
| **Examples**        | `number`, `string`, `boolean` | `Array`, `Object`, `Function` |

```js
// Primitive — copied by value
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 — unchanged

// Non-primitive — copied by reference
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4] — affected!
```

---

## Primitive Data Types

### 1. `number`
```ts
let age: number = 25;
let price: number = 9.99;
let hex: number = 0xFF;       // 255
let notANum: number = NaN;    // result of invalid math
let inf: number = Infinity;   // division by zero
```

### 2. `string`
```ts
let name: string = "Alice";
let single: string = 'Bob';
let template: string = `Hello, ${name}!`; // template literal
```

### 3. `boolean`
```ts
let isActive: boolean = true;
let isDeleted: boolean = false;
```

### 4. `null`
```ts
let data: null = null; // intentionally empty — you assigned nothing
```

### 5. `undefined`
```ts
let value: undefined = undefined; // declared but not yet assigned
let x: number | undefined;        // common union pattern
```

> **`null` vs `undefined`:**
> - `null` — explicitly set to "no value" by the developer
> - `undefined` — JS assigned it because no value was provided

### 6. `symbol` *(ES6)*
```ts
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2); // false — every symbol is unique
```
> Used as unique object property keys to avoid collisions.

### 7. `bigint` *(ES2020)*
```ts
const big: bigint = 9007199254740991n; // suffix 'n'
const result = big + 1n;               // ✅
// const mixed = big + 1;              // ❌ can't mix bigint and number
```
> Use when numbers exceed `Number.MAX_SAFE_INTEGER` (2^53 - 1).

---

## TypeScript-Only Primitive-Like Types

### 8. `any`
```ts
let data: any = 42;
data = "hello"; // ✅ — bypasses type checking
data = true;    // ✅ — use sparingly, defeats TS purpose
```

### 9. `unknown`
```ts
let input: unknown = "hello";
// Must check type before using
if (typeof input === "string") {
    console.log(input.toUpperCase()); // ✅ safe
}
```
> Prefer `unknown` over `any` — it forces you to narrow the type before use.

### 10. `void`
```ts
function logMessage(): void {
    console.log("No return value");
} // used as return type when function returns nothing
```

### 11. `never`
```ts
function throwError(msg: string): never {
    throw new Error(msg); // function never returns
}
function infiniteLoop(): never {
    while (true) {} // never reaches end
}
```

### 12. `union` (`|`)
```ts
let id: number | string;
id = 101;      // ✅
id = "A-101";  // ✅
id = true;     // ❌ Error
```

---

## Non-Primitive Data Types

### 1. `Array`
```ts
let nums: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"]; // generic syntax
let mixed: (number | string)[] = [1, "two", 3];
```

### 2. `Tuple`
```ts
// Fixed-length array with defined types per position
let person: [string, number] = ["Alice", 25];
person[0] = "Bob";   // ✅
person[1] = "hello"; // ❌ position 1 must be number
```

### 3. `Object / Interface`
```ts
// Inline object type
let user: { name: string; age: number } = { name: "Alice", age: 30 };

// Interface (reusable)
interface User {
    name: string;
    age: number;
    email?: string; // optional property
}
const u: User = { name: "Bob", age: 25 };
```

### 4. `Class`
```ts
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    speak(): void {
        console.log(`${this.name} makes a sound.`);
    }
}
const dog = new Animal("Dog");
dog.speak(); // Dog makes a sound.
```

### 5. `Function` (as a type)
```ts
let add: (x: number, y: number) => number;
add = (x, y) => x + y;
```

---

## `type` vs `interface`

| Feature               | `type`                        | `interface`                    |
|-----------------------|-------------------------------|--------------------------------|
| Object shape          | ✅                            | ✅                             |
| Union types           | ✅ `type A = string \| number` | ❌                            |
| Intersection          | ✅ `type C = A & B`           | ✅ `extends`                  |
| Declaration merging   | ❌                            | ✅ (same name = merged)        |
| Class `implements`    | ✅                            | ✅                             |

```ts
// type alias
type ID = string | number;

// interface
interface Point {
    x: number;
    y: number;
}
```

---

## `typeof` Operator

```ts
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" ← known JS quirk!
console.log(typeof []);          // "object"
console.log(typeof {});          // "object"
console.log(typeof function(){}); // "function"
```

---

## Interview Tips

- `typeof null === "object"` is a **historical JS bug** — null is not actually an object.
- `undefined` means "not yet given a value"; `null` means "explicitly no value".
- `any` skips type checking; `unknown` is the safe alternative — always prefer `unknown`.
- `never` is for functions that **never return** (throw or infinite loop).
- Arrays and objects are compared **by reference**, not by value.
- Use `interface` for object shapes (especially when extending), `type` for unions/aliases.
