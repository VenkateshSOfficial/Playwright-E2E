# Objects in JavaScript

An object is a collection of **key-value pairs**. Keys are strings (or Symbols), values can be anything.

```js
const person = {
  name: "Alice",   // key: value
  age: 25,
  isStudent: false,
};
```

---

## Example 1 — Basic

```js
const car = {
  brand: "Toyota",
  model: "Camry",
  year: 2023,
  isElectric: false,
};

// Access properties
console.log(car.brand);        // "Toyota" (dot notation)
console.log(car["model"]);     // "Camry"  (bracket notation — use for dynamic keys)

// Add, update, delete properties
car.color = "white";          // add new property
car.year = 2024;              // update existing
delete car.isElectric;        // remove property

console.log(car);
// { brand: 'Toyota', model: 'Camry', year: 2024, color: 'white' }

// Check if key exists
console.log("brand" in car);       // true
console.log("isElectric" in car);  // false

// Object with method
const greetObj = {
  name: "Bob",
  greet() {
    return `Hello, I'm ${this.name}`;
  },
};
console.log(greetObj.greet()); // "Hello, I'm Bob"
```

---

## Example 2 — Intermediate

```js
// Object destructuring
const user = { name: "Alice", age: 25, city: "Mumbai" };

const { name, age } = user;
console.log(name, age); // "Alice" 25

// Rename during destructuring
const { name: userName, city: userCity } = user;
console.log(userName, userCity); // "Alice" "Mumbai"

// Default values in destructuring
const { country = "India" } = user;
console.log(country); // "India" (user has no 'country', so default is used)

// Spread operator — copy/merge objects
const defaults = { theme: "light", lang: "en", timeout: 3000 };
const userSettings = { theme: "dark", lang: "fr" };
const finalSettings = { ...defaults, ...userSettings }; // userSettings overrides
console.log(finalSettings);
// { theme: 'dark', lang: 'fr', timeout: 3000 }

// Object.keys, Object.values, Object.entries
const scores = { Alice: 90, Bob: 75, Charlie: 85 };

console.log(Object.keys(scores));    // ['Alice', 'Bob', 'Charlie']
console.log(Object.values(scores));  // [90, 75, 85]
console.log(Object.entries(scores)); // [['Alice', 90], ['Bob', 75], ['Charlie', 85]]

// Loop through object
for (const [student, score] of Object.entries(scores)) {
  console.log(`${student}: ${score}`);
}
```

---

## Example 3 — Advanced

```js
// Computed property names — dynamic keys
function createUser(key, value) {
  return { [key]: value };
}
console.log(createUser("name", "Alice")); // { name: 'Alice' }
console.log(createUser("role", "admin")); // { role: 'admin' }

// Object.freeze vs Object.seal
//  freeze → no add, no delete, no update  (fully immutable)
//  seal  → no add, no delete, BUT updates allowed

const frozen = Object.freeze({ name: "Alice", age: 25 });
frozen.age = 99;      // silently fails — no change
frozen.city = "Delhi"; // silently fails — no add
console.log(frozen);  // { name: 'Alice', age: 25 }

const sealed = Object.seal({ name: "Bob", age: 30 });
sealed.age = 99;      // ✅ update allowed
sealed.city = "Mumbai"; // silently fails — no add to sealed object
console.log(sealed);  // { name: 'Bob', age: 99 }

console.log(Object.isFrozen(frozen)); // true
console.log(Object.isSealed(sealed)); // true

// ⚠️ Both are SHALLOW — nested objects are still mutable
const config = Object.freeze({ db: { host: "localhost" } });
config.db.host = "remotehost"; // ✅ still changes! (freeze is shallow)
console.log(config.db.host);   // "remotehost"

// Nested object destructuring
const order = {
  id: 101,
  customer: {
    name: "Bob",
    address: {
      city: "Delhi",
      zip: "110001",
    },
  },
  total: 999,
};

const {
  customer: {
    name: customerName,
    address: { city, zip },
  },
  total,
} = order;

console.log(customerName, city, zip, total); // "Bob" "Delhi" "110001" 999

// Factory function pattern
function createProduct(name, price, category) {
  return {
    name,           // shorthand property (same as name: name)
    price,
    category,
    getFormattedPrice() {
      return `₹${this.price.toLocaleString()}`;
    },
    applyDiscount(percent) {
      return { ...this, price: this.price * (1 - percent / 100) };
    },
  };
}

const laptop = createProduct("MacBook Air", 99999, "Electronics");
console.log(laptop.getFormattedPrice()); // "₹99,999"

const discountedLaptop = laptop.applyDiscount(10);
console.log(discountedLaptop.price); // 89999.1
```

---

## Object Copying

When you assign an object to a new variable, you are **not** creating a new object — you are copying the **reference** (the memory address). Both variables now point to the exact same object in memory, so changing one affects the other. To truly copy an object, you need to use one of the methods below.

There are two kinds of copies:

- **Shallow copy** — creates a new object and copies only the **top-level** properties. If any value is itself an object (nested), the copy still holds a reference to the same nested object — not a clone of it.
- **Deep copy** — creates a completely independent object, recursively cloning every nested level. Changing anything in the copy has zero effect on the original.

### Shallow Copy

Two standard ways to do a shallow copy:

**1. Spread operator `{ ...obj }`** — most readable, preferred in modern JS.

**2. `Object.assign({}, obj)`** — older API, does the same thing. Pass an empty `{}` as the first argument so you get a fresh object instead of mutating an existing one.

Both work fine for flat objects. The problem surfaces when the object has nested objects — because the nested reference is still shared.

```js
const original = { name: "Alice", age: 25 };

// spread copy — top-level properties are independent
const copy1 = { ...original };
copy1.name = "Bob";
console.log(original.name); // "Alice" — unaffected ✅

// Object.assign copy — same behaviour as spread for flat objects
const copy2 = Object.assign({}, original);
copy2.age = 99;
console.log(original.age); // 25 — unaffected ✅

// ⚠️ nested object problem — address is still a shared reference
const user = { name: "Alice", address: { city: "Delhi" } };
const shallowCopy = { ...user };
shallowCopy.address.city = "Mumbai"; // modifies the shared nested object
console.log(user.address.city);      // "Mumbai" — original changed! ⚠️
```

### Deep Copy

When your object has nested objects or arrays, you need a deep copy.

**1. `JSON.parse(JSON.stringify(obj))`** — converts the object to a JSON string, then parses it back into a brand-new object. Every level is cloned. Simple and widely supported, but it has hard limitations: it **silently drops** `undefined` values, functions, `Date` objects (converted to strings), `Symbol` keys, and `RegExp`.

**2. `structuredClone(obj)`** — a built-in browser/Node API (introduced in 2022). It performs a true deep clone and correctly handles `Date`, `Map`, `Set`, `RegExp`, `ArrayBuffer`, and circular references. It cannot clone functions. This is the **recommended** approach in modern code.

```js
const user = { name: "Alice", address: { city: "Delhi" } };

// JSON deep copy — works but has limitations
const deepCopy1 = JSON.parse(JSON.stringify(user));
deepCopy1.address.city = "Chennai";
console.log(user.address.city); // "Delhi" — original safe ✅
// ⚠️ if user had a Date or function property, it would be lost/broken

// structuredClone — modern recommended approach
const deepCopy2 = structuredClone(user);
deepCopy2.address.city = "Pune";
console.log(user.address.city); // "Delhi" — original safe ✅
// ✅ handles Date, Map, Set, RegExp — but still cannot clone functions
```

| Method | Type | Clones nested? | Keeps functions? | Notes |
|---|---|---|---|---|
| `{ ...obj }` | Shallow | ❌ | ✅ | Cleanest syntax for flat objects |
| `Object.assign({}, obj)` | Shallow | ❌ | ✅ | Older API, same result as spread |
| `JSON.parse(JSON.stringify(obj))` | Deep | ✅ | ❌ lost | Drops `undefined`, Date, Symbol |
| `structuredClone(obj)` | Deep | ✅ | ❌ lost | Modern standard, handles most types |

---

## Built-in Object Methods

JavaScript's `Object` constructor ships with several static methods you'll use constantly. Understanding what each one does and when to use it is essential.

### `Object.keys` / `Object.values` / `Object.entries`

These three iterate over an object's **own enumerable** properties (inherited prototype properties are excluded).

- `Object.keys(obj)` — returns an array of the object's **keys** (strings).
- `Object.values(obj)` — returns an array of the object's **values**.
- `Object.entries(obj)` — returns an array of **`[key, value]` pairs**. Most useful when you need both at the same time, e.g., in a loop or a `map`.

```js
const person = { name: "Alice", age: 25, city: "Delhi" };

Object.keys(person);    // ["name", "age", "city"]
Object.values(person);  // ["Alice", 25, "Delhi"]
Object.entries(person); // [["name","Alice"], ["age",25], ["city","Delhi"]]

// loop using entries — clean and readable
for (const [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`);
}
```

### `Object.fromEntries`

The **inverse** of `Object.entries`. Takes an iterable of `[key, value]` pairs and builds an object from them. Most useful when you've transformed an entries array and want to convert it back into an object.

```js
const entries = [["a", 1], ["b", 2]];
Object.fromEntries(entries); // { a: 1, b: 2 }

// practical: double only the numeric values in an object
const person = { name: "Alice", age: 25, city: "Delhi" };
const transformed = Object.fromEntries(
  Object.entries(person).map(([k, v]) => [k, typeof v === "number" ? v * 2 : v])
);
console.log(transformed); // { name: "Alice", age: 50, city: "Delhi" }
```

### `Object.assign`

Copies all **own enumerable** properties from one or more source objects into a **target** object, and returns the target. It **mutates** the target — this is the most common mistake. Always pass `{}` as the first argument when you want a fresh copy rather than merging into an existing object.

```js
const target = { a: 1 };
Object.assign(target, { b: 2 }, { c: 3 }); // target is mutated
console.log(target); // { a: 1, b: 2, c: 3 }

// safe pattern — use {} so you don't touch the originals
const merged = Object.assign({}, { a: 1 }, { b: 2 });
console.log(merged); // { a: 1, b: 2 }
```

### `Object.create`

Creates a **new object** and sets its prototype to the object you pass in. This means the new object inherits all methods from the prototype but doesn't own them — they live on the prototype chain. This is the foundation of prototypal inheritance in JavaScript.

```js
const proto = {
  greet() {
    return `Hello, I am ${this.name}`;
  },
};

const obj = Object.create(proto); // obj's prototype is proto
obj.name = "Alice";               // own property added directly
console.log(obj.greet());         // "Hello, I am Alice"

// obj doesn't own greet — it's inherited
console.log(obj.hasOwnProperty("greet")); // false
console.log(obj.hasOwnProperty("name"));  // true
```

### `hasOwnProperty` vs `Object.hasOwn`

Both check whether a key belongs **directly** to the object (not inherited via prototype). The difference is that `hasOwnProperty` is a method on the object itself, so it can be accidentally shadowed if someone adds a property literally named `"hasOwnProperty"`. `Object.hasOwn` is a static method on `Object` that can never be shadowed — prefer it in new code.

```js
const person = { name: "Alice" };

person.hasOwnProperty("name");      // true — own property
person.hasOwnProperty("toString");  // false — inherited from Object.prototype
Object.hasOwn(person, "name");      // true — same result, safer API

// why Object.hasOwn is safer
const tricky = { hasOwnProperty: () => "hacked!" };
tricky.hasOwnProperty("x");   // "hacked!" — shadowed! ⚠️
Object.hasOwn(tricky, "x");   // false — works correctly ✅
```

### `Object.is`

Performs **strict equality** like `===`, but correctly handles two edge cases that `===` gets wrong:
- `NaN === NaN` is `false` in JS (broken by spec), but `Object.is(NaN, NaN)` is `true`.
- `0 === -0` is `true` in JS, but `Object.is(0, -0)` is `false` (they are mathematically distinct).

```js
Object.is(NaN, NaN); // true  — unlike ===
Object.is(0, -0);    // false — unlike ===
Object.is(1, 1);     // true  — same as ===
Object.is("a", "b"); // false — same as ===
```

---

## Interview Tips

- **Shallow vs deep copy** is the single most common object interview question — know all 4 methods and their exact trade-offs.
- `JSON.parse/stringify` silently **drops** `undefined`, functions, `Date` objects (turned to strings), and `Symbol` keys — always mention this limitation.
- `structuredClone` is the modern answer for deep copy; it handles `Date`, `Map`, `Set` but not functions.
- `Object.assign` **mutates** the target — a classic bug source. Always pass `{}` first when you want a non-destructive merge.
- `Object.keys/values/entries` only return **own enumerable** properties — prototype-inherited ones are excluded.
- Prefer `Object.hasOwn` over `hasOwnProperty` because `hasOwnProperty` can be shadowed as an object property.
- `Object.freeze` is **shallow** — nested objects inside a frozen object are still fully mutable.
- `Object.is` exists specifically for the `NaN` and `-0` edge cases that `===` gets wrong.
