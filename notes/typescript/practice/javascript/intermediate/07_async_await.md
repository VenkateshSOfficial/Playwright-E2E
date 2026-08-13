# Async / Await in JavaScript

`async/await` is **syntactic sugar over Promises** — it makes asynchronous code look and read like synchronous code.

- `async` before a function → that function always returns a Promise
- `await` inside an async function → pauses execution until the Promise resolves

```js
async function myFunc() {
  const result = await somePromise(); // waits here
  return result;
}
```

---

## Example 1 — Basic

```js
// Basic async/await
function getUser(id) {
  return new Promise(resolve =>
    setTimeout(() => resolve({ id, name: "Alice" }), 1000)
  );
}

async function main() {
  console.log("Fetching user...");
  const user = await getUser(1);  // waits for promise to resolve
  console.log("Got user:", user); // { id: 1, name: 'Alice' }
}

main();

// async function always returns a Promise
async function greet(name) {
  return `Hello, ${name}!`; // automatically wrapped in Promise.resolve()
}

greet("Bob").then(msg => console.log(msg)); // "Hello, Bob!"

// Error handling with try/catch
async function riskyOperation() {
  try {
    const result = await Promise.reject(new Error("Something went wrong"));
    console.log(result);
  } catch (error) {
    console.error("Caught:", error.message); // "Caught: Something went wrong"
  } finally {
    console.log("Always runs");
  }
}

riskyOperation();
```

---

## Example 2 — Intermediate

```js
// Real-world: fetching data from an API
async function fetchPost(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const post = await response.json();
    return post;
  } catch (error) {
    console.error("Failed to fetch post:", error.message);
    return null;
  }
}

async function displayPost() {
  const post = await fetchPost(1);
  if (post) {
    console.log(`Title: ${post.title}`);
    console.log(`Body: ${post.body.substring(0, 50)}...`);
  }
}

displayPost();

// Sequential vs Parallel async operations
async function sequential() {
  console.time("sequential");
  const user = await fetchPost(1);     // waits 1st
  const post = await fetchPost(2);     // then waits
  const comment = await fetchPost(3);  // then waits
  console.timeEnd("sequential");       // ~3x longer
}

async function parallel() {
  console.time("parallel");
  const [user, post, comment] = await Promise.all([
    fetchPost(1),
    fetchPost(2),
    fetchPost(3),
  ]);
  console.timeEnd("parallel"); // all run at the same time — much faster
}
```

---

## Example 3 — Advanced

```js
// async/await with retry logic
async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.log(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt === maxRetries) throw error; // re-throw on last attempt

      // Exponential backoff: wait 1s, 2s, 4s before retrying
      await new Promise(resolve => setTimeout(resolve, 2 ** attempt * 500));
    }
  }
}

// Async generator — process data in chunks
async function* paginate(url) {
  let page = 1;
  while (true) {
    const response = await fetch(`${url}?page=${page}&limit=10`);
    const data = await response.json();
    if (data.length === 0) break;
    yield data;
    page++;
  }
}

async function processAll() {
  for await (const batch of paginate("https://api.example.com/items")) {
    console.log(`Processing ${batch.length} items...`);
    // process each batch
  }
}

// Concurrent tasks with error isolation
async function runAll(tasks) {
  const results = await Promise.allSettled(tasks.map(task => task()));

  return results.map((result, i) => ({
    task: i + 1,
    status: result.status,
    value: result.status === "fulfilled" ? result.value : null,
    error: result.status === "rejected" ? result.reason.message : null,
  }));
}

const tasks = [
  () => Promise.resolve("Task 1 done"),
  () => Promise.reject(new Error("Task 2 failed")),
  () => new Promise(res => setTimeout(() => res("Task 3 done"), 200)),
];

runAll(tasks).then(results => console.table(results));
```
