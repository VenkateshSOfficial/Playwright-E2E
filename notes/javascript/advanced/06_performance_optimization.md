# Performance Optimization in JavaScript

Writing fast JS is about **doing less work** and **doing it at the right time**. Key techniques: debounce, throttle, lazy loading, and avoiding unnecessary computation.

---

## Example 1 — Basic (Debounce & Throttle)

```js
// The Problem: firing too many events
// e.g. search input fires on every keystroke — too many API calls!

// DEBOUNCE — wait until user STOPS typing, then fire once
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);              // reset timer on every call
    timer = setTimeout(() => {
      fn.apply(this, args);           // only fires after 'delay' ms of silence
    }, delay);
  };
}

const searchInput = document.querySelector("#search");
const search = debounce((query) => {
  console.log("Searching for:", query);
  // API call goes here
}, 300); // fires 300ms after user stops typing

searchInput.addEventListener("input", e => search(e.target.value));

// THROTTLE — fire at most once every N milliseconds
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

const onScroll = throttle(() => {
  console.log("Scroll position:", window.scrollY);
}, 100); // fires at most every 100ms while scrolling

window.addEventListener("scroll", onScroll);
```

---

## Example 2 — Intermediate (Lazy Loading & Caching)

```js
// Lazy initialization — compute only when first accessed
class ExpensiveResource {
  #data = null;

  get data() {
    if (!this.#data) {
      console.log("Computing expensive data...");
      this.#data = Array.from({ length: 1000 }, (_, i) => i * i); // heavy calc
    }
    return this.#data;
  }
}

const resource = new ExpensiveResource();
// Nothing computed yet
console.log(resource.data.length); // computed now: 1000
console.log(resource.data.length); // from cache: 1000 (no recomputation)

// WeakMap for memory-efficient caching
// WeakMap allows GC to collect keys when no other references exist
const cache = new WeakMap();

function processElement(element) {
  if (cache.has(element)) {
    return cache.get(element);
  }
  const result = { id: element.id, rect: element.getBoundingClientRect() };
  cache.set(element, result);
  return result;
}

// Virtual list — only render visible items (handle 10,000+ items)
function createVirtualList(container, items, itemHeight = 40) {
  const visibleCount = Math.ceil(container.clientHeight / itemHeight) + 2;
  let scrollTop = 0;

  function render() {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(start + visibleCount, items.length);
    const visibleItems = items.slice(start, end);

    container.style.position = "relative";
    container.style.height = `${items.length * itemHeight}px`;

    container.innerHTML = visibleItems.map((item, i) => `
      <div style="position:absolute;top:${(start + i) * itemHeight}px;height:${itemHeight}px">
        ${item}
      </div>
    `).join("");
  }

  container.addEventListener("scroll", () => {
    scrollTop = container.scrollTop;
    render();
  });

  render();
}
```

---

## Example 3 — Advanced (Web Workers & requestAnimationFrame)

```js
// Web Worker — run heavy computation off the main thread
// ---- worker.js ----
self.onmessage = function (e) {
  const { data, chunkSize } = e.data;

  // Heavy computation (e.g., sorting 1 million items)
  const sorted = data.slice().sort((a, b) => a - b);

  self.postMessage(sorted);
};

// ---- main.js ----
const worker = new Worker("worker.js");
const bigArray = Array.from({ length: 1_000_000 }, () => Math.random());

worker.postMessage({ data: bigArray });
worker.onmessage = (e) => {
  console.log("Sorted first 5:", e.data.slice(0, 5));
  worker.terminate();
};
// Main thread stays responsive while worker runs!

// requestAnimationFrame — smooth animations (60fps)
function animateProgress(element, from, to, duration) {
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1); // 0 to 1
    const eased = 1 - Math.pow(1 - progress, 3);     // ease-out-cubic

    element.style.width = `${from + (to - from) * eased}%`;

    if (progress < 1) {
      requestAnimationFrame(update); // schedule next frame
    }
  }

  requestAnimationFrame(update);
}

// animateProgress(document.querySelector(".progress-bar"), 0, 75, 1000);

// Performance measurement
function measurePerformance(label, fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${label}: ${(end - start).toFixed(3)}ms`);
  return result;
}

measurePerformance("map + filter", () => {
  return Array.from({ length: 100_000 }, (_, i) => i)
    .filter(n => n % 2 === 0)
    .map(n => n * 2);
});
```

---

## Memory Leaks — What They Are and How to Fix Them

A **memory leak** happens when your code holds references to objects that are no longer needed, preventing the garbage collector from freeing that memory. Over time this causes the app to slow down or crash.

### Common Memory Leak Sources

```js
// ❌ LEAK 1: Event listeners never removed
function setupPage() {
  const data = new Array(100_000).fill("heavy data");

  // This listener holds a closure reference to 'data' forever
  document.addEventListener("click", () => {
    console.log(data.length);
  });
}
// Even after setupPage() finishes, 'data' stays in memory because the listener holds it

// ✅ Fix: remove the listener when no longer needed
function setupPage() {
  const data = new Array(100_000).fill("heavy data");

  function handleClick() {
    console.log(data.length);
  }

  document.addEventListener("click", handleClick);

  return () => document.removeEventListener("click", handleClick); // cleanup
}
const cleanup = setupPage();
cleanup(); // call when page/component is destroyed

// ❌ LEAK 2: setInterval never cleared
function startPolling() {
  setInterval(() => {
    fetch("/api/status").then(r => r.json()).then(updateUI);
  }, 5000);
  // If startPolling() is called multiple times, intervals stack up!
}

// ✅ Fix: always store and clear interval/timeout IDs
let pollingId = null;

function startPolling() {
  if (pollingId) return; // prevent duplicates
  pollingId = setInterval(() => {
    fetch("/api/status").then(r => r.json()).then(updateUI);
  }, 5000);
}

function stopPolling() {
  clearInterval(pollingId);
  pollingId = null;
}

// ❌ LEAK 3: Detached DOM nodes kept in JS variables
let detachedNode;

function createLeak() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  detachedNode = div; // JS holds reference
  document.body.removeChild(div); // removed from DOM, but NOT garbage collected!
}

// ✅ Fix: null out references when done
function cleanup() {
  document.body.removeChild(detachedNode);
  detachedNode = null; // now GC can collect it
}
```

### WeakMap & WeakRef — Memory-Friendly References

```js
// WeakMap — keys are held WEAKLY (GC can collect them if no other reference exists)
// Use for: caching data associated with DOM elements or objects without preventing GC

const elementCache = new WeakMap();

function processElement(el) {
  if (elementCache.has(el)) return elementCache.get(el); // cached

  const result = { computedStyle: getComputedStyle(el), rect: el.getBoundingClientRect() };
  elementCache.set(el, result);
  return result;
}

// When 'el' is removed from the DOM and no JS variable holds it,
// the WeakMap entry is automatically garbage collected — no manual cleanup needed!

// WeakRef — hold a weak reference to an object
let bigObject = { data: new Array(1_000_000).fill(0) };
const ref = new WeakRef(bigObject);

bigObject = null; // remove strong reference

// GC may collect it now. Check if it's still alive before using:
const obj = ref.deref();
if (obj) {
  console.log("Still alive:", obj.data.length);
} else {
  console.log("Garbage collected");
}
```
