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
