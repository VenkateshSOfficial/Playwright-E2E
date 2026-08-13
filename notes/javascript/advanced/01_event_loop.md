# Event Loop in JavaScript

JavaScript is **single-threaded** — it runs one piece of code at a time. The **Event Loop** is the mechanism that allows JS to handle async operations without blocking.

### How it works:
```
Call Stack  →  Web APIs  →  Task Queue / Microtask Queue  →  Event Loop picks up tasks
```

| Queue | What goes in | Priority |
|-------|-------------|----------|
| **Microtask Queue** | Promise `.then`, `queueMicrotask`, `MutationObserver` | ⬆️ Higher |
| **Task Queue** (Macrotask) | `setTimeout`, `setInterval`, DOM events, `fetch` callbacks | ⬇️ Lower |

> **Rule:** All microtasks run before the next task from the task queue.

---

## Visual Overview — Event Loop Architecture

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    subgraph engine["⚙️ JavaScript Engine"]
        style engine fill:#e3f2fd,stroke:#1565c0,color:#000
        CS["📦 Call Stack\nRuns one thing at a time"]
        style CS fill:#ff6b6b,color:#fff,stroke:#c0392b
        HEAP["🗃️ Memory Heap\nObjects live here"]
        style HEAP fill:#ce93d8,color:#fff,stroke:#6a1b9a
    end
    subgraph apis["🌐 Web APIs (Browser provides)"]
        style apis fill:#e8f5e9,stroke:#2e7d32,color:#000
        WT["setTimeout\nsetInterval"]
        WF["fetch / XHR"]
        WE["DOM Events"]
    end
    subgraph queues["📬 Queues"]
        style queues fill:#fff3e0,stroke:#e65100,color:#000
        MQ["⚡ Microtask Queue\nPromise.then\nqueueMicrotask\n🔺 HIGHER PRIORITY"]
        style MQ fill:#4caf50,color:#fff,stroke:#2e7d32
        TQ["📮 Task Queue\nsetTimeout callbacks\nDOM events\n🔻 LOWER PRIORITY"]
        style TQ fill:#ff9800,color:#fff,stroke:#e65100
    end
    EL(["🔄 Event Loop\nIs stack empty?\n1. Drain ALL microtasks\n2. Run ONE task"])
    style EL fill:#9c27b0,color:#fff,stroke:#6a1b9a

    CS -->|"async call"| apis
    WT -->|"timer done"| TQ
    WF -->|"response"| TQ
    WE -->|"user action"| TQ
    CS -.->|"Promise resolves"| MQ
    EL -->|"push to stack"| CS
    MQ -->|"feeds first"| EL
    TQ -->|"feeds after microtasks"| EL
```

## Visual Overview — Execution Order

```mermaid
%%{init: {'theme': 'base'}}%%
sequenceDiagram
    participant S as 📦 Call Stack
    participant M as ⚡ Microtask Queue
    participant T as 📮 Task Queue
    participant EL as 🔄 Event Loop

    S->>S: console.log("Start") ✅
    S->>T: setTimeout(cb, 0) → scheduled
    S->>M: Promise.resolve().then(cb) → queued
    S->>S: console.log("End") ✅
    Note over S: Stack is now EMPTY
    EL->>M: any microtasks?
    M->>S: run Promise callback ✅
    Note over M: Microtask queue empty
    EL->>T: any tasks?
    T->>S: run setTimeout callback ✅
    Note right of S: Output order:\n1. Start\n2. End\n3. Promise\n4. setTimeout
```

---

## Example 1 — Basic

```js
// Execution order demonstration
console.log("1 - Start");            // sync → call stack

setTimeout(() => {
  console.log("2 - setTimeout");     // macrotask → task queue
}, 0);

Promise.resolve().then(() => {
  console.log("3 - Promise");        // microtask → microtask queue
});

console.log("4 - End");              // sync → call stack

// Output order:
// 1 - Start
// 4 - End
// 3 - Promise     ← microtask runs before setTimeout
// 2 - setTimeout  ← macrotask runs last
```

---

## Example 2 — Intermediate

```js
// Microtasks vs Macrotasks in detail
console.log("Script start");

setTimeout(() => console.log("setTimeout 1"), 0);
setTimeout(() => console.log("setTimeout 2"), 0);

Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2")); // chained microtask

queueMicrotask(() => console.log("queueMicrotask"));

console.log("Script end");

// Output:
// Script start
// Script end
// Promise 1          ← microtasks first
// Promise 2          ← chained microtask
// queueMicrotask     ← microtask
// setTimeout 1       ← macrotasks after ALL microtasks
// setTimeout 2

// Blocking the event loop — bad practice!
function blockingTask() {
  const start = Date.now();
  while (Date.now() - start < 2000) {}  // blocks for 2 seconds
  console.log("Done blocking");
}

// This prevents any UI updates or other tasks for 2 seconds
// blockingTask(); // ❌ never do this

// Non-blocking alternative using chunked processing
function processInChunks(data, chunkSize = 100) {
  let index = 0;

  function processNextChunk() {
    const chunk = data.slice(index, index + chunkSize);
    chunk.forEach(item => { /* process */ });
    index += chunkSize;

    if (index < data.length) {
      setTimeout(processNextChunk, 0); // yield to event loop between chunks
    }
  }

  processNextChunk();
}
```

---

## Example 3 — Advanced

```js
// async/await and the event loop
async function asyncExample() {
  console.log("A - async start");

  await Promise.resolve(); // yields here — rest goes to microtask queue

  console.log("B - after await"); // runs as microtask
}

console.log("1 - before async call");
asyncExample();
console.log("2 - after async call (sync continues)");

// Output:
// 1 - before async call
// A - async start       ← sync inside async runs immediately
// 2 - after async call  ← calling code continues
// B - after await       ← microtask resumes

// setImmediate vs setTimeout vs process.nextTick (Node.js)
// process.nextTick → runs before any I/O, before promises
// Promise.then     → microtask queue
// setImmediate     → check phase of event loop
// setTimeout(0)    → timer phase

// Task starvation — too many microtasks can block macrotasks
function createMicrotaskLoop() {
  let count = 0;
  function recurse() {
    if (count++ < 1000000) {
      Promise.resolve().then(recurse); // creates 1 million microtasks
    }
  }
  recurse();
}
// ⚠️ This would delay all setTimeout callbacks for a long time

// Real-world pattern: batching DOM updates with microtasks
class BatchUpdater {
  #updates = [];
  #scheduled = false;

  add(updateFn) {
    this.#updates.push(updateFn);

    if (!this.#scheduled) {
      this.#scheduled = true;
      // Run all updates in the same microtask flush (before next render)
      queueMicrotask(() => {
        this.#updates.forEach(fn => fn());
        this.#updates = [];
        this.#scheduled = false;
      });
    }
  }
}

const updater = new BatchUpdater();
updater.add(() => console.log("Update 1"));
updater.add(() => console.log("Update 2"));
updater.add(() => console.log("Update 3"));
// All 3 run together in one microtask flush
```
