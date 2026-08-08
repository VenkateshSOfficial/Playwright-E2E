# Objects in JavaScript & TypeScript

> An object is a collection of **key-value pairs** used to group related data and behavior.

---

## Objects in JavaScript

```js
const person = {
    name: "Alice",
    age: 30,
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
};

console.log(person.name);   // Alice
console.log(person.age);    // 30
person.greet();             // Hello, my name is Alice and I am 30 years old.
```

---

## Objects in TypeScript

```ts
const person: { name: string; age: number; greetings: () => void } = {
    name: "John",
    age: 30,
    greetings() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
};

console.log(person.name);      // John
console.log(person.age);       // 30
person.greetings();             // Hello, my name is John and I am 30 years old.
```

---

## JS vs TS — Key Differences

| Operation                 | JavaScript                              | TypeScript                                |
|---------------------------|------------------------------------------|-------------------------------------------|
| Reassign property type    | ✅ `person.age = "thirty"` — no error   | ❌ Error: string not assignable to number |
| Add new property          | ✅ `person.city = "NY"` — fine          | ❌ Error: 'city' does not exist on type   |
| Delete required property  | ✅ `delete person.age` — fine           | ❌ Error: can't delete a required property|

```js
// JavaScript — very flexible
const person = { name: "Alice", age: 30 };
person.age = "thirty"; // ✅ no error
person.city = "NY";    // ✅ fine
delete person.age;     // ✅ fine
```

```ts
// TypeScript — strict and safe
const person: { name: string; age: number } = { name: "Alice", age: 30 };
person.age = "thirty"; // ❌ Error: Type 'string' is not assignable to type 'number'
person.city = "NY";    // ❌ Error: Property 'city' does not exist on type
delete person.age;     // ❌ Error: The operand of a 'delete' operator must be optional
```

---

## Using `interface` for Objects (TS Best Practice)

```ts
interface User {
    name: string;
    age: number;
    email?: string;    // optional property
    readonly id: number; // cannot be changed after creation
}

const user: User = { id: 1, name: "Alice", age: 30 };
user.name = "Bob";    // ✅ allowed
user.id = 99;         // ❌ Error: cannot assign to 'id' — it is read-only
```

---

## Accessing Object Properties

```ts
const car = { brand: "Toyota", model: "Camry" };

// Dot notation
console.log(car.brand);       // Toyota

// Bracket notation (useful for dynamic keys)
const key = "model";
console.log(car[key]);        // Camry
```

---

## Destructuring

```ts
const person = { name: "Alice", age: 25, city: "NY" };

// Extract properties into variables
const { name, age } = person;
console.log(name); // Alice
console.log(age);  // 25

// Rename while destructuring
const { name: personName, age: personAge } = person;
console.log(personName); // Alice

// Default values
const { city = "Unknown" } = person;
```

---

## Spread Operator (`...`)

```ts
const defaults = { color: "red", size: "M", qty: 1 };
const custom = { ...defaults, color: "blue", qty: 3 };
// { color: "blue", size: "M", qty: 3 } — later values override

// Merging two objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }
```

---

## Optional Chaining (`?.`)

Safely access nested properties without crashing if an intermediate value is `null`/`undefined`.

```ts
const user = { profile: { address: { city: "NY" } } };

console.log(user?.profile?.address?.city); // "NY"
console.log(user?.settings?.theme);        // undefined (no error)
```

---

## Nullish Coalescing (`??`)

Returns the right-hand side if the left is `null` or `undefined` (not for `0` or `""`).

```ts
const city = user?.address?.city ?? "Default City";
console.log(city); // "Default City" if city is null/undefined
```

---

## Useful Object Methods

```ts
const person = { name: "Alice", age: 30, city: "NY" };

Object.keys(person);    // ["name", "age", "city"]
Object.values(person);  // ["Alice", 30, "NY"]
Object.entries(person); // [["name","Alice"], ["age",30], ["city","NY"]]

// Iterate entries
for (const [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}

// Check if property exists
console.log("name" in person); // true

// Shallow clone
const clone = Object.assign({}, person);
const clone2 = { ...person }; // preferred spread syntax
```

---

## Nested Objects

```ts
interface Address {
    street: string;
    city: string;
}

interface Employee {
    name: string;
    address: Address;
}

const emp: Employee = {
    name: "Alice",
    address: {
        street: "123 Main St",
        city: "NY"
    }
};

console.log(emp.address.city); // NY
```

---

## `this` in Object Methods

```ts
const counter = {
    count: 0,
    increment() {
        this.count++;           // 'this' refers to the object
        console.log(this.count);
    }
};

counter.increment(); // 1
counter.increment(); // 2
```

> ⚠️ Arrow functions do NOT have their own `this` — avoid them as object methods when you need `this`.

---

## Interview Tips

- Objects are **reference types** — assigning an object to a new variable copies the reference, not the data.
- Use `interface` in TypeScript to define object shapes — it's more readable and extensible.
- `readonly` prevents property modification after creation.
- Optional chaining `?.` avoids `Cannot read property of undefined` errors.
- `Object.assign()` and spread `{...obj}` both do **shallow copies** — nested objects are still shared by reference.
- Use `JSON.parse(JSON.stringify(obj))` for a simple deep clone (works for plain data, not functions/dates).
