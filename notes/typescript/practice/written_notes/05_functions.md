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

### Basic
```ts
function learn(): void {
    console.log("Learning TypeScript");
}
```

### With Parameters
```ts
function calculateSum(x: number, y: number): number {
    return x + y;
}
calculateSum(3, 5); // 8
```

### Rest Parameters
```ts
function addSums(...val: number[]): number {
    let initSum = 0;
    for (const value of val) {
        initSum += value;
    }
    return initSum;
}
addSums(1, 2, 3, 4); // 10
```

### Union Types
```ts
function allPerforms(...val: number[] | string[]): number | string {
    let summ: number = 0;
    let allData: string = '';
    for (const valuee of val) {
        if (typeof valuee === 'number') {
            summ += valuee;
        } else {
            allData = valuee.toUpperCase();
        }
    }
    return summ || allData;
}
```

### Optional Parameters (`?`)
```ts
function getAllData(a: number, b: string, c?: boolean): void {
    if (c) {
        console.log(`a: ${a}, b: ${b}, c: ${c}`);
    } else {
        console.log(`a: ${a}, b: ${b}`);
    }
}
getAllData(1, "hello");         // a: 1, b: hello
getAllData(1, "hello", true);   // a: 1, b: hello, c: true
```

> Optional params must come **after** required params.

### Default Parameters
```ts
function defaultDiscount(value: number, div: number = 2): number {
    return value / div;
}
defaultDiscount(100);    // 50 — uses default div=2
defaultDiscount(100, 4); // 25 — overrides default
```

---

## 2. Anonymous Functions (Function Expressions)

### Basic
```ts
let message = function (): string {
    return "How are you?";
};
```

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

Shorter syntax. Key difference: **no own `this`** — inherits `this` from surrounding scope.

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

// Single expression — implicit return (no {} or return needed)
let multiply = (a: number, b: number): number => a * b;
```

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
