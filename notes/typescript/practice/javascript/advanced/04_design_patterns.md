# Design Patterns in JavaScript

Design patterns are **proven, reusable solutions** to common programming problems. They are not code — they are templates for how to structure code.

### Most Common Patterns
| Pattern | Category | Purpose |
|---------|----------|---------|
| **Module** | Creational | Encapsulate private state |
| **Singleton** | Creational | One instance only |
| **Factory** | Creational | Create objects without `new` |
| **Observer** | Behavioral | Subscribe/notify pattern |
| **Strategy** | Behavioral | Swap algorithms at runtime |
| **Decorator** | Structural | Add behavior without modifying original |

### When to Use Each Pattern
| Pattern | Use When | Real Example |
|---------|----------|--------------|
| **Module** | You need private state in a standalone unit | Shopping cart, counter, config |
| **Singleton** | Only ONE instance should exist app-wide | App config, DB connection, logger |
| **Factory** | Object creation logic is complex or conditional | Create `AdminUser` vs `GuestUser` based on role |
| **Observer** | Multiple parts need to react to the same event | UI updates on data change, event bus |
| **Strategy** | You want to swap an algorithm at runtime | Sorting, payment method selection, validation rules |
| **Decorator** | Add logging, timing, auth checks without touching original function | API middleware, method wrappers |

---

## Example 1 — Basic (Module & Singleton)

```js
// Module Pattern — encapsulate private data
const Counter = (function () {
  // private
  let count = 0;

  // public interface
  return {
    increment() { count++; },
    decrement() { count--; },
    getCount() { return count; },
    reset() { count = 0; },
  };
})();

Counter.increment();
Counter.increment();
Counter.increment();
console.log(Counter.getCount()); // 3
// console.log(Counter.count);   // undefined — private!

// Singleton Pattern — only ONE instance ever created
class AppConfig {
  static #instance = null;

  #settings = { theme: "light", lang: "en" };

  static getInstance() {
    if (!AppConfig.#instance) {
      AppConfig.#instance = new AppConfig();
    }
    return AppConfig.#instance;
  }

  get(key) { return this.#settings[key]; }
  set(key, value) { this.#settings[key] = value; }
}

const config1 = AppConfig.getInstance();
const config2 = AppConfig.getInstance();

config1.set("theme", "dark");
console.log(config2.get("theme")); // "dark" — same instance!
console.log(config1 === config2);  // true
```

---

## Example 2 — Intermediate (Factory & Observer)

```js
// Factory Pattern — create objects based on type
function createUser(type, name) {
  const base = { name, createdAt: new Date() };

  const roles = {
    admin: { ...base, role: "admin", permissions: ["read", "write", "delete"] },
    editor: { ...base, role: "editor", permissions: ["read", "write"] },
    viewer: { ...base, role: "viewer", permissions: ["read"] },
  };

  if (!roles[type]) throw new Error(`Unknown user type: ${type}`);
  return roles[type];
}

const admin = createUser("admin", "Alice");
const viewer = createUser("viewer", "Bob");
console.log(admin.permissions);  // ['read', 'write', 'delete']
console.log(viewer.permissions); // ['read']

// Observer Pattern — event bus / pub-sub
class EventEmitter {
  #listeners = {};

  on(event, callback) {
    if (!this.#listeners[event]) this.#listeners[event] = [];
    this.#listeners[event].push(callback);
    return () => this.off(event, callback); // return unsubscribe function
  }

  off(event, callback) {
    this.#listeners[event] = (this.#listeners[event] || [])
      .filter(cb => cb !== callback);
  }

  emit(event, data) {
    (this.#listeners[event] || []).forEach(cb => cb(data));
  }
}

const emitter = new EventEmitter();

const unsubscribe = emitter.on("login", user => {
  console.log(`User logged in: ${user.name}`);
});

emitter.on("login", user => {
  console.log(`Send welcome email to: ${user.email}`);
});

emitter.emit("login", { name: "Alice", email: "alice@example.com" });
// User logged in: Alice
// Send welcome email to: alice@example.com

unsubscribe(); // stop first listener
emitter.emit("login", { name: "Bob", email: "bob@example.com" });
// Send welcome email to: bob@example.com (only second listener runs)
```

---

## Example 3 — Advanced (Strategy & Decorator)

```js
// Strategy Pattern — swap algorithms at runtime
class Sorter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  sort(data) {
    return this.strategy([...data]); // copy to avoid mutation
  }
}

const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++)
    for (let j = 0; j < arr.length - i - 1; j++)
      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
  return arr;
};

const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
};

const sorter = new Sorter(quickSort);
console.log(sorter.sort([5, 3, 8, 1, 9, 2])); // [1, 2, 3, 5, 8, 9]

sorter.strategy = bubbleSort; // swap strategy at runtime
console.log(sorter.sort([5, 3, 8, 1])); // [1, 3, 5, 8]

// Decorator Pattern — add behavior to functions without modifying them
function withLogging(fn) {
  return function (...args) {
    console.log(`Calling ${fn.name} with`, args);
    const result = fn.apply(this, args);
    console.log(`${fn.name} returned`, result);
    return result;
  };
}

function withTiming(fn) {
  return function (...args) {
    const start = performance.now();
    const result = fn.apply(this, args);
    console.log(`${fn.name} took ${(performance.now() - start).toFixed(2)}ms`);
    return result;
  };
}

function calculateTotal(prices) {
  return prices.reduce((sum, p) => sum + p, 0);
}

const trackedTotal = withLogging(withTiming(calculateTotal));
trackedTotal([100, 200, 300]);
// Calling withTiming with [[100, 200, 300]]
// calculateTotal took 0.05ms
// withTiming returned 600
```
