# Error Handling in JavaScript

Proper error handling prevents your app from crashing and gives meaningful feedback when things go wrong.

### Tools
- `try / catch / finally` — handle runtime errors
- `throw` — manually throw an error
- `Error` types: `Error`, `TypeError`, `RangeError`, `SyntaxError`, `ReferenceError`

---

## Example 1 — Basic

```js
// try / catch / finally
try {
  const result = 10 / 0;    // no error — Infinity
  console.log(result);      // Infinity

  null.toString();          // ❌ TypeError thrown here
  console.log("This never runs");
} catch (error) {
  console.log("Error caught:", error.message); // "Cannot read properties of null"
  console.log("Error type:", error.name);      // "TypeError"
} finally {
  console.log("Finally runs no matter what");  // always executes
}

// throw — manually throw an error
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

try {
  console.log(divide(10, 2));  // 5
  console.log(divide(10, 0));  // throws
} catch (e) {
  console.log(e.message); // "Cannot divide by zero"
}

// Built-in error types
try {
  undefined.property;  // TypeError
} catch (e) {
  console.log(e instanceof TypeError); // true
}
```

---

## Example 2 — Intermediate

```js
// Custom Error class
class ValidationError extends Error {
  constructor(message, field) {
    super(message);          // set error message
    this.name = "ValidationError";
    this.field = field;
  }
}

class NotFoundError extends Error {
  constructor(resource, id) {
    super(`${resource} with id '${id}' not found`);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

function getUser(id) {
  if (typeof id !== "number") throw new ValidationError("ID must be a number", "id");
  if (id <= 0) throw new ValidationError("ID must be positive", "id");
  if (id > 100) throw new NotFoundError("User", id);

  return { id, name: "Alice" };
}

try {
  const user = getUser(200);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Validation failed on field '${error.field}': ${error.message}`);
  } else if (error instanceof NotFoundError) {
    console.log(`${error.statusCode}: ${error.message}`); // 404: User with id '200' not found
  } else {
    console.log("Unknown error:", error.message);
  }
}

// Error handling with async/await
async function fetchUser(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!response.ok) {
    throw new NotFoundError("User", id);
  }
  return response.json();
}
```

---

## Example 3 — Advanced

```js
// Global error handling
window.onerror = function (message, source, line, col, error) {
  console.log("Global error caught:", message);
  return true; // prevents default browser error handling
};

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  event.preventDefault();
});

// Error boundary pattern (functional style)
function tryCatch(fn, fallback = null) {
  try {
    return { value: fn(), error: null };
  } catch (e) {
    return { value: fallback, error: e };
  }
}

const { value, error } = tryCatch(() => JSON.parse('{ invalid json }'));
if (error) {
  console.log("Parse failed:", error.message);
} else {
  console.log("Parsed:", value);
}

// Async version
async function tryCatchAsync(fn, fallback = null) {
  try {
    return { value: await fn(), error: null };
  } catch (e) {
    return { value: fallback, error: e };
  }
}

const { value: user, error: fetchError } = await tryCatchAsync(
  () => fetch("https://api.example.com/user/999").then(r => r.json())
);

if (fetchError) {
  console.log("Failed to load user:", fetchError.message);
} else {
  console.log("User:", user);
}

// Stack trace and error chaining
function level3() { throw new Error("Deep error"); }
function level2() { level3(); }
function level1() { level2(); }

try {
  level1();
} catch (e) {
  console.log(e.stack);
  // Error: Deep error
  //     at level3 (...)
  //     at level2 (...)
  //     at level1 (...)
}
```
