# Conditionals in JavaScript

Conditionals let your code make decisions and run different blocks based on conditions.

### Types
- `if / else if / else`
- `switch`
- Ternary operator (`? :`)
- Short-circuit (`&&`, `||`, `??`)

---

## Example 1 — Basic

```js
// if / else if / else
let temperature = 35;

if (temperature > 40) {
  console.log("Very hot!");
} else if (temperature > 30) {
  console.log("Hot day");   // ✅ this runs
} else if (temperature > 20) {
  console.log("Pleasant");
} else {
  console.log("Cold");
}

// switch — good when comparing one variable to many values
let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of work week"); // ✅ this runs
    break;
  case "Friday":
    console.log("End of work week");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend!");
    break;
  default:
    console.log("Midweek");
}
```

---

## Example 2 — Intermediate

```js
// Truthy and Falsy in conditions
// Falsy values: false, 0, "", null, undefined, NaN
// Everything else is truthy

let username = "";

if (username) {
  console.log("Welcome, " + username);
} else {
  console.log("Please enter your name"); // ✅ runs because "" is falsy
}

// Nested conditions
let age = 22;
let hasID = true;

if (age >= 18) {
  if (hasID) {
    console.log("Entry allowed");  // ✅ runs
  } else {
    console.log("Need ID");
  }
} else {
  console.log("Too young");
}

// Ternary for simple if/else
let score = 75;
let grade = score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : "F";
console.log(grade); // "B"
```

---

## Example 3 — Advanced

```js
// Guard clauses — early return pattern (cleaner than nested if/else)
function processOrder(order) {
  if (!order) return "No order provided";
  if (!order.items || order.items.length === 0) return "Cart is empty";
  if (!order.payment) return "Payment method required";

  // Main logic only runs if all conditions pass
  return `Order processed: ${order.items.length} item(s)`;
}

console.log(processOrder(null));                          // "No order provided"
console.log(processOrder({ items: [] }));                 // "Cart is empty"
console.log(processOrder({ items: ["book"], payment: "card" })); // "Order processed: 1 item(s)"

// Switch with return in a function
function getDayType(day) {
  switch (day.toLowerCase()) {
    case "saturday":
    case "sunday":
      return "Weekend";
    case "monday":
    case "tuesday":
    case "wednesday":
    case "thursday":
    case "friday":
      return "Weekday";
    default:
      return "Invalid day";
  }
}

console.log(getDayType("Saturday")); // "Weekend"
console.log(getDayType("Tuesday"));  // "Weekday"

// Object lookup — alternative to switch for mapping values
const statusMessages = {
  200: "OK",
  404: "Not Found",
  500: "Internal Server Error",
};

function getStatusMessage(code) {
  return statusMessages[code] ?? "Unknown status";
}

console.log(getStatusMessage(200)); // "OK"
console.log(getStatusMessage(403)); // "Unknown status"
```
