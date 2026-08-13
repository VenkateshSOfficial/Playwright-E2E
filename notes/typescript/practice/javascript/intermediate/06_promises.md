# Promises in JavaScript

A **Promise** represents a value that will be available in the future (async operation). It has 3 states:

| State | Meaning |
|-------|---------|
| **Pending** | Operation in progress |
| **Fulfilled** | Operation succeeded → `.then()` |
| **Rejected** | Operation failed → `.catch()` |

---

## All Promise Types — Quick Reference

| Method | Resolves When | Rejects When | Use Case |
|--------|--------------|--------------|----------|
| `new Promise()` | You call `resolve()` | You call `reject()` | Wrap any async operation |
| `Promise.resolve()` | Immediately | Never | Wrap a known value in a promise |
| `Promise.reject()` | Never | Immediately | Wrap a known error in a promise |
| `Promise.all()` | **ALL** resolve | **ANY ONE** rejects | Parallel tasks — all must succeed |
| `Promise.allSettled()` | **ALL** finish (pass or fail) | Never | Parallel tasks — collect all results |
| `Promise.race()` | **FIRST** settles | **FIRST** settles | Timeout pattern, fastest wins |
| `Promise.any()` | **FIRST** resolves | **ALL** reject | First success wins |

---

## Example 1 — Basic

```js
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Operation succeeded!"); // fulfilled
  } else {
    reject("Operation failed!");     // rejected
  }
});

// Consuming a Promise
myPromise
  .then(result => console.log(result))   // "Operation succeeded!"
  .catch(error => console.error(error))
  .finally(() => console.log("Done!"));  // always runs

// Simulating async with setTimeout
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: "Alice" };
      resolve(data);
    }, 1000); // simulates 1 second network delay
  });
}

fetchData().then(data => console.log(data)); // { id: 1, name: 'Alice' }
```

---

## Example 2 — Intermediate

```js
// Promise chaining — each .then() receives the previous return value
function getUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Alice" }), 500);
  });
}

function getOrders(user) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ user: user.name, orders: ["book", "pen"] }), 500);
  });
}

getUser(1)
  .then(user => {
    console.log("Got user:", user.name);
    return getOrders(user);   // return promise to chain
  })
  .then(orderData => {
    console.log("Orders:", orderData.orders);
  })
  .catch(err => console.error("Error:", err));

// Promise.all — run multiple promises in PARALLEL, wait for ALL
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = new Promise(resolve => setTimeout(() => resolve(30), 500));

Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // [10, 20, 30]
  console.log("Sum:", values.reduce((a, b) => a + b, 0)); // 60
});

// If ANY rejects, Promise.all rejects immediately
Promise.all([
  Promise.resolve("ok"),
  Promise.reject("error!"),
  Promise.resolve("also ok"),
]).catch(err => console.log("Failed:", err)); // "Failed: error!"
```

---

## Example 3 — Advanced

```js
// Promise.allSettled — wait for ALL, even if some fail
const requests = [
  fetch("https://jsonplaceholder.typicode.com/posts/1"),
  fetch("https://invalid-url-that-fails.com/data"),
  fetch("https://jsonplaceholder.typicode.com/posts/2"),
];

Promise.allSettled(requests).then(results => {
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`Request ${i + 1}: success`);
    } else {
      console.log(`Request ${i + 1}: failed —`, result.reason);
    }
  });
});

// Promise.race — resolves/rejects with FIRST settled promise
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

const slowRequest = new Promise(resolve => setTimeout(() => resolve("data"), 3000));

withTimeout(slowRequest, 1000)
  .then(data => console.log("Got:", data))
  .catch(err => console.log(err.message)); // "Timed out after 1000ms"

// Promise.any — resolves with FIRST fulfilled promise
Promise.any([
  Promise.reject("fail 1"),
  new Promise(resolve => setTimeout(() => resolve("success!"), 500)),
  Promise.reject("fail 2"),
]).then(result => console.log(result)); // "success!"

// Creating a reusable delay utility
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

delay(1000)
  .then(() => {
    console.log("1 second passed");
    return delay(500);
  })
  .then(() => console.log("0.5 more seconds passed"));
```

---
---

# Deep Dive: All Promise Types

---

## 1. `new Promise()` — Create a Promise from scratch

Use this when you need to wrap any callback-based or custom async operation into a Promise.

### How it works — Step by Step:
1. Pass an **executor function** with `(resolve, reject)` parameters
2. Call `resolve(value)` when work succeeds
3. Call `reject(error)` when work fails
4. Consume it with `.then()`, `.catch()`, `.finally()`

```js
// Step 1: Create the promise
const fetchUser = (userId) => {
  return new Promise((resolve, reject) => {

    // Step 2: Simulate async work (e.g., DB call, API call)
    setTimeout(() => {
      const users = {
        1: { id: 1, name: "Alice", role: "admin" },
        2: { id: 2, name: "Bob", role: "user" },
      };

      const user = users[userId];

      // Step 3a: Success → call resolve
      if (user) {
        resolve(user);
      } else {
        // Step 3b: Failure → call reject
        reject(new Error(`User with id ${userId} not found`));
      }
    }, 800);
  });
};

// Step 4: Consume the promise
fetchUser(1)
  .then(user => {
    console.log("✅ Found user:", user.name); // Alice
    console.log("Role:", user.role);          // admin
  })
  .catch(err => {
    console.error("❌ Error:", err.message);
  })
  .finally(() => {
    console.log("🏁 Request complete");       // always runs
  });

fetchUser(99)
  .then(user => console.log(user))
  .catch(err => console.error("❌ Error:", err.message)); // User with id 99 not found
```

### Real-World Example — Wrapping `fs.readFile` (Node.js)

```js
const fs = require("fs");

// Old callback style
fs.readFile("data.json", "utf8", (err, data) => {
  if (err) console.error(err);
  else console.log(data);
});

// Wrap in a Promise (promisify)
function readFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// Now you can use .then() or async/await
readFileAsync("data.json")
  .then(content => JSON.parse(content))
  .then(json => console.log("Parsed:", json))
  .catch(err => console.error("Failed to read:", err.message));
```

---

## 2. `Promise.resolve()` & `Promise.reject()` — Instant Promises

Use when you already have a value but need to return a Promise (e.g., inside a function that must always return a Promise).

```js
// Promise.resolve(value) — creates an already-fulfilled promise
const p1 = Promise.resolve(42);
p1.then(val => console.log(val)); // 42

// Promise.reject(error) — creates an already-rejected promise
const p2 = Promise.reject(new Error("Something broke"));
p2.catch(err => console.error(err.message)); // "Something broke"

// Real-world use: function that sometimes hits cache, sometimes fetches
const cache = new Map();

function getProduct(id) {
  // If cached, return resolved promise immediately — no async needed
  if (cache.has(id)) {
    return Promise.resolve(cache.get(id));
  }

  // Otherwise, fetch from API
  return fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(product => {
      cache.set(id, product); // store in cache
      return product;
    });
}

getProduct(1).then(p => console.log(p.title));
getProduct(1).then(p => console.log(p.title)); // served from cache
```

---

## 3. `Promise.all()` — All Must Succeed

Runs all promises **in parallel**. Waits for **every single one** to resolve.
If **even one** rejects → the whole thing rejects immediately.

### Step by Step:
1. Pass an **array of promises**
2. All run **at the same time** (parallel)
3. Resolves with an **array of results** (in same order as input)
4. If ANY one fails → immediately rejects with that error

```js
// Simulated API calls
const getUser = () =>
  new Promise(resolve => setTimeout(() => resolve({ name: "Alice" }), 500));

const getOrders = () =>
  new Promise(resolve => setTimeout(() => resolve(["book", "pen", "bag"]), 800));

const getWallet = () =>
  new Promise(resolve => setTimeout(() => resolve({ balance: 5000 }), 300));

// ✅ All succeed — total wait = max(500, 800, 300) = ~800ms (parallel!)
Promise.all([getUser(), getOrders(), getWallet()])
  .then(([user, orders, wallet]) => {
    // Destructure results in same order as input
    console.log("User:", user.name);            // Alice
    console.log("Orders:", orders);             // ['book', 'pen', 'bag']
    console.log("Balance: ₹", wallet.balance);  // 5000
  })
  .catch(err => console.error("One failed:", err.message));

// ❌ One fails — entire Promise.all rejects
const failingPromise = () => Promise.reject(new Error("Payment service down"));

Promise.all([getUser(), failingPromise(), getWallet()])
  .then(results => console.log(results))
  .catch(err => console.error("❌ Failed:", err.message)); // "Payment service down"
```

### Real-World Example — Load dashboard data in parallel

```js
async function loadDashboard(userId) {
  console.time("dashboard-load");

  try {
    // All 3 API calls fire at the SAME time — much faster than sequential
    const [profile, notifications, stats] = await Promise.all([
      fetch(`/api/users/${userId}`).then(r => r.json()),
      fetch(`/api/users/${userId}/notifications`).then(r => r.json()),
      fetch(`/api/users/${userId}/stats`).then(r => r.json()),
    ]);

    console.timeEnd("dashboard-load"); // ~time of slowest request, not sum

    return { profile, notifications, stats };
  } catch (error) {
    // If ANY request fails, we end up here
    console.error("Dashboard failed to load:", error.message);
    throw error;
  }
}

loadDashboard(1).then(data => {
  console.log("Profile:", data.profile.name);
  console.log("Unread:", data.notifications.unread);
  console.log("Score:", data.stats.score);
});
```

---

## 4. `Promise.allSettled()` — Wait for All, Never Rejects

Runs all promises **in parallel**. Waits for **every single one** to finish (pass or fail).
**Never rejects** — always gives you results for everything.

Each result is either:
- `{ status: "fulfilled", value: ... }` — success
- `{ status: "rejected", reason: ... }` — failure

### Step by Step:
1. Pass an **array of promises**
2. All run in parallel
3. Waits for ALL to finish — no matter what
4. Returns array of result objects with `status` field
5. You check `.status` to handle each result

```js
const services = [
  new Promise(resolve => setTimeout(() => resolve("✅ Auth service OK"), 400)),
  new Promise((_, reject) => setTimeout(() => reject(new Error("❌ DB connection failed")), 600)),
  new Promise(resolve => setTimeout(() => resolve("✅ Cache service OK"), 200)),
  new Promise((_, reject) => setTimeout(() => reject(new Error("❌ Email service down")), 300)),
];

Promise.allSettled(services).then(results => {
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Service ${index + 1}: ${result.value}`);
    } else {
      console.log(`Service ${index + 1}: FAILED — ${result.reason.message}`);
    }
  });
});

// Output:
// Service 1: ✅ Auth service OK
// Service 2: FAILED — ❌ DB connection failed
// Service 3: ✅ Cache service OK
// Service 4: FAILED — ❌ Email service down
```

### Real-World Example — Send notifications, collect failures

```js
async function sendBulkNotifications(userIds, message) {
  const sendNotification = (userId) =>
    fetch(`/api/notify/${userId}`, {
      method: "POST",
      body: JSON.stringify({ message }),
    }).then(res => {
      if (!res.ok) throw new Error(`User ${userId}: HTTP ${res.status}`);
      return `User ${userId}: sent`;
    });

  // Use allSettled so one failure doesn't abort the rest
  const results = await Promise.allSettled(userIds.map(sendNotification));

  const succeeded = results
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);

  const failed = results
    .filter(r => r.status === "rejected")
    .map(r => r.reason.message);

  console.log(`✅ Sent: ${succeeded.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  if (failed.length) console.log("Failures:", failed);

  return { succeeded, failed };
}

sendBulkNotifications([1, 2, 3, 4, 5], "Your order has shipped!");
```

---

## 5. `Promise.race()` — First One Wins

Resolves or rejects with **whichever promise settles first** — regardless of pass or fail.

```js
// Basic race
const fast = new Promise(resolve => setTimeout(() => resolve("Fast!"), 200));
const slow = new Promise(resolve => setTimeout(() => resolve("Slow!"), 1000));

Promise.race([fast, slow]).then(result => {
  console.log(result); // "Fast!" — slow is ignored
});

// Real-World: Timeout pattern — cancel a slow request
function fetchWithTimeout(url, timeoutMs = 5000) {
  const fetchPromise = fetch(url).then(r => r.json());

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Request timed out after ${timeoutMs}ms`)), timeoutMs)
  );

  return Promise.race([fetchPromise, timeoutPromise]);
}

fetchWithTimeout("https://jsonplaceholder.typicode.com/posts/1", 3000)
  .then(data => console.log("✅ Got data:", data.title))
  .catch(err => console.error("❌", err.message));
```

---

## 6. `Promise.any()` — First Success Wins

Resolves with the **first fulfilled** promise. Only rejects if **ALL** promises reject.

```js
// Try multiple mirrors/servers — use whichever responds first
async function fetchFromFastestServer(endpoints) {
  try {
    const data = await Promise.any(
      endpoints.map(url => fetch(url).then(r => r.json()))
    );
    console.log("✅ Got data from fastest server:", data);
    return data;
  } catch (aggregateError) {
    // AggregateError — contains all individual errors
    console.error("❌ All servers failed:", aggregateError.errors);
  }
}

fetchFromFastestServer([
  "https://mirror1.example.com/data",
  "https://mirror2.example.com/data",
  "https://jsonplaceholder.typicode.com/posts/1", // this one works
]);
```

---

## Summary — When to Use What

```
┌──────────────────────────────────────────────────────────┐
│  I need to wrap a callback/custom async     → new Promise()       │
│  I need an instant resolved/rejected value  → Promise.resolve/reject() │
│  ALL must succeed, run in parallel          → Promise.all()       │
│  Run all, collect every result (pass/fail)  → Promise.allSettled()│
│  First to finish wins                       → Promise.race()      │
│  First to SUCCEED wins                      → Promise.any()       │
└──────────────────────────────────────────────────────────┘
```
