# Destructuring in JavaScript

Destructuring lets you **unpack values from arrays or properties from objects** into separate variables in one clean line.

---

## Example 1 — Basic

```js
// Array Destructuring
const colors = ["red", "green", "blue"];

const [first, second, third] = colors;
console.log(first);  // "red"
console.log(second); // "green"
console.log(third);  // "blue"

// Skip elements using commas
const [, , last] = colors;
console.log(last); // "blue"

// Default values
const [a = "pink", b = "yellow", c, d = "white"] = ["red", "green"];
console.log(a); // "red"   (provided)
console.log(b); // "green" (provided)
console.log(c); // undefined (not provided)
console.log(d); // "white" (default used)

// Object Destructuring
const person = { name: "Alice", age: 25, city: "Mumbai" };

const { name, age } = person;
console.log(name, age); // "Alice" 25

// Rename while destructuring
const { name: fullName, city: location } = person;
console.log(fullName, location); // "Alice" "Mumbai"
```

---

## Example 2 — Intermediate

```js
// Rest in destructuring
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

const { name, ...rest } = { name: "Bob", age: 30, role: "admin" };
console.log(name); // "Bob"
console.log(rest); // { age: 30, role: 'admin' }

// Nested object destructuring
const order = {
  id: 42,
  user: {
    name: "Charlie",
    address: {
      city: "Delhi",
      zip: "110001",
    },
  },
};

const {
  id,
  user: {
    name: userName,
    address: { city, zip },
  },
} = order;

console.log(id, userName, city, zip); // 42 "Charlie" "Delhi" "110001"

// Destructuring in function parameters
function displayUser({ name, age, role = "user" }) {
  console.log(`${name} (${age}) — Role: ${role}`);
}

displayUser({ name: "Alice", age: 25, role: "admin" }); // Alice (25) — Role: admin
displayUser({ name: "Bob", age: 30 });                  // Bob (30) — Role: user

// Swap variables without temp variable
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1
```

---

## Example 3 — Advanced

```js
// Destructuring in loops
const users = [
  { id: 1, name: "Alice", scores: [85, 90, 78] },
  { id: 2, name: "Bob", scores: [70, 88, 95] },
];

for (const { id, name, scores: [first, ...others] } of users) {
  console.log(`User ${id} (${name}): first score = ${first}, rest = ${others}`);
}
// User 1 (Alice): first score = 85, rest = 90,78
// User 2 (Bob): first score = 70, rest = 88,95

// Destructuring with computed property names
const key = "username";
const { [key]: value } = { username: "alice123" };
console.log(value); // "alice123"

// Practical: extract data from API response
const apiResponse = {
  status: 200,
  data: {
    user: {
      id: 101,
      profile: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      },
    },
    meta: { total: 1 },
  },
};

const {
  status,
  data: {
    user: {
      id: userId,
      profile: { firstName, lastName, email },
    },
    meta: { total },
  },
} = apiResponse;

console.log(status, userId, firstName, lastName, email, total);
// 200 101 "John" "Doe" "john@example.com" 1
```
