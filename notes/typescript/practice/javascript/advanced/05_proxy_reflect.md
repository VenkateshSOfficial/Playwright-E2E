# Proxy & Reflect in JavaScript

## Proxy
A `Proxy` wraps an object and **intercepts operations** on it (get, set, delete, etc.) using **traps**.

```js
const proxy = new Proxy(target, handler);
```

## Reflect
`Reflect` provides methods that mirror the `Proxy` traps and allow you to call **default object behavior** from within a trap.

---

## Example 1 — Basic

```js
// Basic Proxy — intercept get and set
const person = { name: "Alice", age: 25 };

const proxy = new Proxy(person, {
  get(target, key) {
    console.log(`Getting: ${key}`);
    return Reflect.get(target, key); // default behavior
  },

  set(target, key, value) {
    console.log(`Setting: ${key} = ${value}`);
    return Reflect.set(target, key, value); // default behavior
  },
});

proxy.name;           // Getting: name
proxy.age = 26;       // Setting: age = 26

console.log(person.age); // 26 — original is updated through proxy

// Proxy with has trap (intercepts 'in' operator)
const range = new Proxy(
  { min: 1, max: 100 },
  {
    has(target, key) {
      const num = Number(key);
      return num >= target.min && num <= target.max;
    },
  }
);

console.log(50 in range);  // true
console.log(150 in range); // false
console.log(1 in range);   // true
```

---

## Example 2 — Intermediate

```js
// Validation Proxy — enforce rules on object properties
function createValidatedObject(schema) {
  const data = {};

  return new Proxy(data, {
    set(target, key, value) {
      const rule = schema[key];
      if (!rule) throw new Error(`Unknown property: ${key}`);

      if (rule.type && typeof value !== rule.type) {
        throw new TypeError(`${key} must be a ${rule.type}, got ${typeof value}`);
      }

      if (rule.min !== undefined && value < rule.min) {
        throw new RangeError(`${key} must be >= ${rule.min}`);
      }

      if (rule.max !== undefined && value > rule.max) {
        throw new RangeError(`${key} must be <= ${rule.max}`);
      }

      return Reflect.set(target, key, value);
    },
  });
}

const user = createValidatedObject({
  name: { type: "string" },
  age: { type: "number", min: 0, max: 120 },
});

user.name = "Alice"; // ✅
user.age = 25;       // ✅

try {
  user.age = -5;     // ❌ RangeError: age must be >= 0
} catch (e) {
  console.log(e.message);
}

try {
  user.age = "old";  // ❌ TypeError: age must be a number
} catch (e) {
  console.log(e.message);
}

// Read-only Proxy
function readonly(target) {
  return new Proxy(target, {
    set() { throw new TypeError("Object is read-only"); },
    deleteProperty() { throw new TypeError("Object is read-only"); },
  });
}

const config = readonly({ apiUrl: "https://api.example.com", version: 1 });
console.log(config.apiUrl); // ✅ reading works
try {
  config.version = 2; // ❌ TypeError
} catch (e) {
  console.log(e.message); // "Object is read-only"
}
```

---

## Example 3 — Advanced

```js
// Reactive system using Proxy (like Vue 3's reactivity)
function reactive(obj, onChange) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      // recursively make nested objects reactive
      if (value && typeof value === "object") {
        return reactive(value, onChange);
      }
      return value;
    },

    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      if (oldValue !== value) {
        onChange(key, oldValue, value); // notify on change
      }
      return result;
    },

    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key);
      onChange(key, target[key], undefined);
      return result;
    },
  });
}

const state = reactive(
  { user: { name: "Alice", age: 25 }, count: 0 },
  (key, oldVal, newVal) => {
    console.log(`Changed: ${key}: ${JSON.stringify(oldVal)} → ${JSON.stringify(newVal)}`);
  }
);

state.count = 1;          // Changed: count: 0 → 1
state.count = 2;          // Changed: count: 1 → 2
state.user.name = "Bob";  // Changed: name: "Alice" → "Bob"

// Proxy for function calls — intercept function invocations
function createMethodLogger(obj) {
  return new Proxy(obj, {
    get(target, key) {
      const value = Reflect.get(target, key);
      if (typeof value === "function") {
        return function (...args) {
          console.log(`[LOG] ${key}(${args.map(a => JSON.stringify(a)).join(", ")})`);
          const result = value.apply(target, args);
          console.log(`[LOG] ${key} returned: ${JSON.stringify(result)}`);
          return result;
        };
      }
      return value;
    },
  });
}

const api = createMethodLogger({
  add: (a, b) => a + b,
  greet: name => `Hello, ${name}!`,
});

api.add(3, 4);     // [LOG] add(3, 4)  →  [LOG] add returned: 7
api.greet("Bob");  // [LOG] greet("Bob")  →  [LOG] greet returned: "Hello, Bob!"
```
