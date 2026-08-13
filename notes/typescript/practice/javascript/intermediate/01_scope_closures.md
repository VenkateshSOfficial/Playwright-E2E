# Scope & Closures in JavaScript

## Scope
Scope determines **where variables are accessible** in your code.

| Scope Type | Description |
|------------|-------------|
| **Global** | Accessible everywhere |
| **Function** | Only inside the function |
| **Block** | Only inside `{}` (with `let`/`const`) |

## Closure
A closure is a function that **remembers variables from its outer scope** even after that outer function has finished executing.

---

## Example 1 — Basic

```js
// Global scope
let globalVar = "I am global";

function showScope() {
  // Function scope
  let functionVar = "I am function-scoped";
  console.log(globalVar);   // ✅ accessible
  console.log(functionVar); // ✅ accessible

  if (true) {
    // Block scope
    let blockVar = "I am block-scoped";
    const blockConst = "also block-scoped";
    console.log(blockVar); // ✅ accessible
  }

  // console.log(blockVar); // ❌ ReferenceError
}

showScope();
// console.log(functionVar); // ❌ ReferenceError

// Basic closure
function outer() {
  let count = 0;  // outer variable

  function inner() {
    count++;  // inner function accesses outer variable
    return count;
  }

  return inner;
}

const counter = outer(); // outer() is done, but 'count' is remembered
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

---

## Example 2 — Intermediate

```js
// Hoisting — var declarations are moved to top of scope
console.log(a); // undefined (hoisted, not initialized)
var a = 5;
console.log(a); // 5

// console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 10;

// Closure for data privacy (encapsulation)
function createBankAccount(initialBalance) {
  let balance = initialBalance; // private — not accessible from outside

  return {
    deposit(amount) {
      balance += amount;
      console.log(`Deposited ₹${amount}. Balance: ₹${balance}`);
    },
    withdraw(amount) {
      if (amount > balance) {
        console.log("Insufficient funds");
        return;
      }
      balance -= amount;
      console.log(`Withdrew ₹${amount}. Balance: ₹${balance}`);
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(1000);
account.deposit(500);    // Deposited ₹500. Balance: ₹1500
account.withdraw(200);   // Withdrew ₹200. Balance: ₹1300
console.log(account.getBalance()); // 1300
// console.log(account.balance); // undefined — balance is private!
```

---

## Example 3 — Advanced

```js
// Classic closure bug with var in loops
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 3, 3, 3 ← BUG: all share the same 'i'
  }, 100);
}

// Fix 1: use let (block-scoped — each iteration gets its own 'i')
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 0, 1, 2 ✅
  }, 100);
}

// Fix 2: IIFE to capture 'i' in each iteration
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j); // 0, 1, 2 ✅
    }, 100);
  })(i);
}

// Closure with memoization
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

function slowFibonacci(n) {
  if (n <= 1) return n;
  return slowFibonacci(n - 1) + slowFibonacci(n - 2);
}

const fastFibonacci = memoize(slowFibonacci);
console.log(fastFibonacci(40)); // Much faster on repeated calls
```
