# Functions in JavaScript & TypeScript

> Functions are reusable blocks of code. In TS, you explicitly type parameters and return values.

---

## Three Ways to Define a Function

| Type              | Syntax                         | Hoisted? | `this` binding |
|-------------------|--------------------------------|----------|----------------|
| Named function    | `function foo() {}`            | ✅ Yes   | Dynamic        |
| Anonymous / Expression | `const foo = function() {}` | ❌ No   | Dynamic        |
| Arrow function    | `const foo = () => {}`         | ❌ No    | Lexical (inherits from parent) |

---

## 1. Named Functions

### What is it?

A **named function** is a function you define using the `function` keyword with a proper name.

Think of it like a **recipe card in a recipe book** — you write the recipe once, give it a name (e.g. *"Pasta"*), and you can use it any time by calling that name.

Key properties:
- **Hoisted** — JS reads named functions first before running any other code. So you can call a named function even *before* the line where it's written.
- Has its **own `this`** — the value of `this` depends on who calls the function.
- Best for **general-purpose, reusable logic** that needs to be called from many places.

```js
// You can call it BEFORE it's defined — hoisting at work!
learn(); // ✅ works fine

function learn() {
    console.log("Learning TypeScript");
}
```

---

### Basic
```ts
function learn(): void {
    console.log("Learning TypeScript");
}
```
> `: void` means this function does not return anything useful — it just does a job (logs to console).

### With Parameters

Parameters are the **inputs** you give a function. Like a washing machine that needs clothes and detergent to run — you pass in the values it needs.

```ts
function calculateSum(x: number, y: number): number {
    return x + y;
}
calculateSum(3, 5); // 8
```
> In TypeScript, you must say **what type** each parameter is (`number`, `string`, etc.), and what type the function will **return**.

### Rest Parameters

`...val` means "accept **any number** of arguments and bundle them into an array".

Think of it like ordering food — instead of saying "I want 1 burger", "I want 1 fries", "I want 1 drink" separately, you just say "give me everything".

```ts
function addSums(...val: number[]): number {
    let initSum = 0;
    for (const value of val) {
        initSum += value;
    }
    return initSum;
}
addSums(1, 2, 3, 4); // 10  — passed 4 numbers, all bundled into val[]
```
> `...val` must always be the **last** parameter. You can't put anything after it.

### Union Types

Sometimes a parameter can be **either one type or another**. The `|` symbol means "or".

```ts
function allPerforms(...val: number[] | string[]): number | string {
    let summ: number = 0;
    let allData: string = '';
    for (const valuee of val) {
        if (typeof valuee === 'number') {
            summ += valuee;                 // adds numbers
        } else {
            allData = valuee.toUpperCase(); // uppercases strings
        }
    }
    return summ || allData; // returns whichever has a value
}
```
> Use `typeof` to check what type a value is at **runtime** before working with it.

### Optional Parameters (`?`)

Adding `?` after a parameter name makes it **not required** — the caller can choose to pass it or skip it.

Think of it like a coffee order form — Name and Size are **required**, but "extra shot" is **optional**.

```ts
function getAllData(a: number, b: string, c?: boolean): void {
    if (c) {
        console.log(`a: ${a}, b: ${b}, c: ${c}`);
    } else {
        console.log(`a: ${a}, b: ${b}`);
    }
}
getAllData(1, "hello");         // a: 1, b: hello       — c was skipped
getAllData(1, "hello", true);   // a: 1, b: hello, c: true — c was provided
```

> Optional params must come **after** required params. `(a?, b)` is invalid — `(a, b?)` is correct.

### Default Parameters

A **default parameter** is a fallback value — if the caller doesn't pass that argument, the function uses the default.

Like a pizza shop: if you don't specify the size, they give you "Medium" by default.

```ts
function defaultDiscount(value: number, div: number = 2): number {
    return value / div;
}
defaultDiscount(100);    // 50 — div not passed, uses default 2
defaultDiscount(100, 4); // 25 — div=4 overrides the default
```
> Default params kick in when the argument is `undefined`. Passing `null` does **not** trigger the default.

---

## 2. Anonymous Functions (Function Expressions)

### What is it?

An **anonymous function** is a function with **no name** — it is stored directly inside a variable.

Think of it like a **sticky note** — instead of writing a formal recipe in a book with a name on the cover, you write the instructions on a sticky note and stick it to the fridge. The sticky note (variable) *holds* the recipe, but the recipe itself has no formal title.

```
Named function:    function learn() { ... }   ← has a name
Anonymous:         const learn = function() { ... }  ← no name, stored in a variable
```

Key properties:
- **Not hoisted** — you must define it *before* you use it. Calling it before its line throws a `ReferenceError`.
- Has its **own `this`** — same dynamic binding as named functions.
- Good when you want to **assign a function to a variable**, pass it as a value, or keep it scoped.

```js
greet(); // ❌ ReferenceError: Cannot access 'greet' before initialization

const greet = function() {
    console.log("Hello!");
};

greet(); // ✅ works fine after definition
```

---

### Basic
```ts
let message = function (): string {
    return "How are you?";
};
```
> The variable `message` holds the function. You call it the same way: `message();`

### With Parameters
```ts
let allSums = function (x: number, y: number): number {
    return x + y;
};
```

### With Rest Parameters
```ts
let calcu = function (...vals: number[]): number {
    let sum = 0;
    for (const val of vals) {
        sum += val;
    }
    return sum;
};
```

### With Union Types
```ts
let checks = function (...val: number[] | string[]): number | string {
    let total: number = 0;
    let upperCase: string = "";
    for (let v of val) {
        if (typeof v === 'number') {
            total += v;
        } else {
            upperCase = v.toUpperCase();
        }
    }
    return total || upperCase;
};
```

### With Ternary Operator
```ts
let checking = function (...datas: number[] | string[]): number | string {
    let calcDatas: number = 0;
    let cases: string = "";
    for (const data of datas) {
        (typeof data === 'number') ? (calcDatas += data) : (cases = data.toUpperCase());
    }
    return calcDatas || cases;
};
```

### With Optional Parameter
```ts
let opt = function (name: string, age: number, email?: string): string {
    return email
        ? `name: ${name}, age: ${age}, email: ${email}`
        : `name: ${name}, age: ${age}`;
};
```

---

## 3. Arrow Functions

### What is it?

An **arrow function** is a shorter, cleaner way to write a function using the `=>` (fat arrow) syntax.

Think of it like a **text message vs a formal letter** — both communicate the same thing, but a text is shorter and more casual. Arrow functions are the "text message" of functions.

```
Regular function:   const add = function(a, b) { return a + b; }
Arrow function:     const add = (a, b) => a + b;    ← much shorter!
```

Key properties:
- **Not hoisted** — must be defined before use, just like anonymous functions.
- **No own `this`** — this is the biggest difference. Arrow functions **borrow `this`** from the place they are written (lexical binding). They never have their own `this`.
- **Implicit return** — if the function body is a single expression, you can skip `{}` and `return`.
- Best for **short callbacks, array methods**, and situations where you want to preserve the outer `this`.

```js
// Without arrow functions — common bug with 'this'
function Timer() {
    this.seconds = 0;
    setInterval(function() {
        this.seconds++; // ❌ 'this' is window, not the Timer!
    }, 1000);
}

// With arrow functions — 'this' is correctly inherited
function Timer() {
    this.seconds = 0;
    setInterval(() => {
        this.seconds++; // ✅ 'this' is the Timer object
    }, 1000);
}
```

### Syntax Shorthand Rules

| Situation | Syntax | Example |
|---|---|---|
| No params | `() =>` | `() => console.log("hi")` |
| One param | `x =>` (no parentheses needed) | `x => x * 2` |
| Multiple params | `(a, b) =>` | `(a, b) => a + b` |
| Single expression | No `{}` or `return` needed | `(a, b) => a + b` |
| Multiple statements | Need `{}` and `return` | `(a, b) => { const r = a+b; return r; }` |

---

### No Params, No Return
```ts
let helloArrow = (): void => {
    console.log("Arrow function");
};
```

### With Parameters
```ts
let funcArrow = (a: number, b: number): number => {
    return a * b;
};

// Single expression — implicit return (drop {} and return)
let multiply = (a: number, b: number): number => a * b;
```
> When the entire function is just one expression, the `{}` braces and `return` keyword can be removed — the value is returned automatically.

### Optional Parameter
```ts
let optArrow = (name: string, age?: number): number | string => {
    return age ? `name: ${name}, age: ${age}` : `name: ${name}`;
};
```

### Default Parameter
```ts
let defaultArrowVal = (x: number, y: number = 2): number => x / y;
defaultArrowVal(10);    // 5
defaultArrowVal(10, 5); // 2
```

### Rest Parameters
```ts
let multiplyArray = (...value: number[]): number => {
    let mul: number = 1;
    for (let val of value) {
        mul *= val;
    }
    return mul;
};
console.log(multiplyArray(1, 2, 3)); // 6
```

### Union Types (Arrow)
```ts
let arraysArrow = (...v: number[] | string[]): number | string => {
    let sums: number = 0;
    let naam: string = '';
    for (let vv of v) {
        (typeof vv === 'number') ? (sums += vv) : (naam = vv.toUpperCase());
    }
    return sums || naam;
};
console.log(arraysArrow("I am Venkatesh")); // I AM VENKATESH
```

---

## 4. Function Types in TypeScript

```ts
// Define what a function should look like
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
```

---

## 5. Higher-Order Functions

Functions that take other functions as arguments or return functions.

```ts
// Takes a function as argument (callback pattern)
function applyOperation(a: number, b: number, op: (x: number, y: number) => number): number {
    return op(a, b);
}
applyOperation(5, 3, (x, y) => x + y); // 8
applyOperation(5, 3, (x, y) => x * y); // 15

// Returns a function
function multiplier(factor: number): (n: number) => number {
    return (n) => n * factor;
}
const double = multiplier(2);
const triple = multiplier(3);
double(5); // 10
triple(5); // 15
```

---

## 6. Closures

A closure is when an inner function "remembers" variables from its outer function's scope even after the outer function has returned.

```ts
function makeCounter() {
    let count = 0; // this is "closed over"
    return function () {
        count++;
        return count;
    };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3 — count persists between calls
```

---

## 7. IIFE — Immediately Invoked Function Expression

A function that runs immediately after it's defined. Used to create a private scope.

```ts
(function () {
    const secret = "hidden";
    console.log("Runs immediately"); // ✅
})();

// Arrow IIFE
(() => {
    console.log("Arrow IIFE");
})();
```

---

## 8. `this` Keyword — In Plain English

Think of `this` as **"who is calling me right now?"**

Imagine you are an employee. When your **manager** calls you and says "come to my office", the word "my" means the **manager's office**.  
But if your **friend** calls you and says "come to my office", "my" means your **friend's office**.

The word "my" changes depending on **who is speaking** — that's exactly how `this` works in JavaScript.

---

### `this` in a Regular Function — Dynamic Binding

**Dynamic** means `this` is decided **at the time the function is called** — not when it was written.  
Whoever *calls* the function becomes `this`.

```js
const person = {
    name: "Alice",
    greet: function () {
        console.log(`Hello, I am ${this.name}`);
        //                         ↑ 'this' = person (because person called it)
    }
};

person.greet(); // ✅ Hello, I am Alice
```

Now watch what happens when you take the same function out of the object:

```js
const person = {
    name: "Alice",
    greet: function () {
        console.log(`Hello, I am ${this.name}`);
    }
};

const standalone = person.greet; // just storing the function
standalone(); // ❌ Hello, I am undefined

// Why? Because now no object is calling it.
// In non-strict mode, 'this' falls back to the global object (window in browser)
// which doesn't have a 'name' property → undefined
```

> The function is the same. But **who calls it** changed — so `this` changed. That's dynamic binding.

---

### `this` in an Arrow Function — Lexical Binding

**Lexical** means `this` is decided **at the time the code is written** — it looks at **where the arrow function is physically written** and uses the `this` from that surrounding place.

Arrow functions say: *"I don't have my own `this`. I'll just borrow `this` from wherever I was written."*

```js
const person = {
    name: "Alice",
    greet: () => {
        console.log(`Hello, I am ${this.name}`);
        //                         ↑ NOT person — arrow function doesn't own 'this'
        //                           borrows 'this' from the place it was written
        //                           which is the global scope → this.name = undefined
    }
};

person.greet(); // ❌ Hello, I am undefined
```

**This is why arrow functions are bad for object methods** — they steal `this` from the outer scope instead of pointing to the object.

---

### Side-by-Side Comparison

```js
const timer = {
    seconds: 0,

    // ❌ Problem with arrow function inside setTimeout
    startWrong: function () {
        setTimeout(() => {
            this.seconds++;                  // ✅ 'this' = timer
            console.log(this.seconds);       // works! arrow borrows 'this' from startWrong
        }, 1000);
    },

    // ❌ Problem with regular function inside setTimeout
    startBroken: function () {
        setTimeout(function () {
            this.seconds++;                  // ❌ 'this' = window/global (not timer)
            console.log(this.seconds);       // NaN or error
        }, 1000);
    }
};
```

> **The golden rule:**
> - Use a **regular function** as the object method (so `this` = the object).
> - Use an **arrow function** for callbacks *inside* that method (so `this` is inherited from the method).

---

### Real-World Analogy for Lexical vs Dynamic

| Concept | Analogy |
|---|---|
| **Dynamic binding** | A walkie-talkie — whoever presses the button, THEIR voice comes through |
| **Lexical binding** | A recorded message — the voice is fixed from when it was recorded, doesn't change |

---

### Explicitly Setting `this` — `call`, `apply`, `bind`

You can also manually tell a function what `this` should be:

```js
function introduce() {
    console.log(`I am ${this.name}`);
}

const alice = { name: "Alice" };
const bob   = { name: "Bob" };

introduce.call(alice);   // I am Alice — call with 'this' = alice, runs immediately
introduce.call(bob);     // I am Bob   — call with 'this' = bob,   runs immediately

introduce.apply(alice);  // I am Alice — same as call, but args passed as array

const aliceIntro = introduce.bind(alice); // creates a NEW function locked to alice
aliceIntro();            // I am Alice — 'this' is permanently alice
```

| Method  | Runs immediately? | Arguments          | Use case                          |
|---------|-------------------|--------------------|-----------------------------------|
| `call`  | ✅ Yes            | passed individually | borrow a method once              |
| `apply` | ✅ Yes            | passed as array    | same as call, for array of args   |
| `bind`  | ❌ No             | passed individually | create a reusable locked function |

---

## 9. Lexical Scope — In Plain English

**Scope** = the area of the code where a variable is visible and accessible.

**Lexical** = determined by **where the code is physically written** in the file, not where it runs.

Think of it like **Russian nesting dolls (matryoshka)**:

```
Outermost doll  = Global scope
  Inner doll    = Function scope
    Inner-inner = Block scope { }
```

A doll can see everything **outside itself**, but the outer doll **cannot see inside** the inner one.

```js
const globalVar = "I am global";   // visible everywhere

function outer() {
    const outerVar = "I am outer"; // visible inside outer + inner

    function inner() {
        const innerVar = "I am inner"; // only visible here

        console.log(globalVar); // ✅ can see global
        console.log(outerVar);  // ✅ can see outer
        console.log(innerVar);  // ✅ can see itself
    }

    console.log(globalVar); // ✅
    console.log(outerVar);  // ✅
    console.log(innerVar);  // ❌ ReferenceError — can't see inside inner
}
```

---

### Lexical Scope + Arrow Functions = Predictable `this`

Because arrow functions use **lexical** `this`, they look upward through the nesting dolls at the time the code is **written**:

```ts
class Timer {
    seconds: number = 0;

    start() {
        // 'this' here = the Timer instance (the object)

        setInterval(() => {
            // Arrow function: looks UP for 'this' → finds Timer's 'this' ✅
            this.seconds++;
            console.log(this.seconds); // 1, 2, 3 ...
        }, 1000);
    }
}

const t = new Timer();
t.start();
```

If you used a regular function in `setInterval`, `this` would be `window` (global), not the Timer.

---

### Scope Chain — How JS Finds a Variable

When JS sees a variable name, it searches like this:

```
1. Look in the current block/function
2. Not found? Look in the next outer function
3. Not found? Keep going up...
4. Reached global scope? Not found → ReferenceError
```

```js
const x = "global";

function first() {
    const x = "first";         // shadows the global x
    function second() {
        console.log(x);        // "first" — found in nearest outer scope
    }
    second();
}

first();                       // "first"
console.log(x);                // "global"
```

---

## Named vs Anonymous vs Arrow — Quick Recap

```ts
// Named — hoisted, has own 'this'
function greet(name: string): string {
    return `Hello, ${name}`;
}

// Anonymous — not hoisted, has own 'this'
const greet = function (name: string): string {
    return `Hello, ${name}`;
};

// Arrow — not hoisted, inherits 'this' from outer scope
const greet = (name: string): string => `Hello, ${name}`;
```

---

## Interview Tips

- Named functions are **hoisted** — you can call them before they are declared in the file.
- Arrow functions do **not** have their own `this` — ideal for callbacks, bad for object methods.
- Optional params `?` must always come after required params.
- Default params are used when the argument is `undefined` (not `null`).
- **Closure** — inner function keeps access to outer function's variables even after outer returns.
- **Higher-order function** — takes or returns a function (`.map`, `.filter`, `.reduce` are examples).
- `...rest` collects all remaining args into an array; must be the **last parameter**.
- `void` return type means the function returns `undefined` (or nothing useful).
