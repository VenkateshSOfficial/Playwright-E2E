# Strings in JavaScript

A string is a sequence of characters used to represent text.

```js
const str1 = 'single quotes';
const str2 = "double quotes";
const str3 = `template literal`;  // supports expressions inside ${}
```

> **Prefer template literals** for string formatting and multi-line strings.

---

## Example 1 — Basic

```js
const name = "Alice";
const greeting = `Hello, ${name}!`; // template literal
console.log(greeting); // "Hello, Alice!"

// Common string properties and methods
const message = "  Hello World  ";

console.log(message.length);         // 15
console.log(message.trim());         // "Hello World"
console.log(message.toUpperCase());  // "  HELLO WORLD  "
console.log(message.toLowerCase());  // "  hello world  "

const sentence = "JavaScript is awesome";
console.log(sentence.includes("awesome"));    // true
console.log(sentence.startsWith("Java"));     // true
console.log(sentence.endsWith("some"));       // true
console.log(sentence.indexOf("is"));          // 11
console.log(sentence.replace("awesome", "great")); // "JavaScript is great"

// Split string into array
const csv = "apple,banana,mango";
const fruits = csv.split(",");
console.log(fruits); // ["apple", "banana", "mango"]

// Access characters
console.log("hello"[0]);       // "h"
console.log("hello".charAt(1)); // "e"
```

---

## Example 2 — Intermediate

```js
// slice — extract substring (non-destructive)
const str = "Hello, World!";
console.log(str.slice(0, 5));   // "Hello"
console.log(str.slice(7));      // "World!"
console.log(str.slice(-6));     // "World!" (negative = from end)

// padStart and padEnd — pad string to a length
const num = "42";
console.log(num.padStart(5, "0")); // "00042"
console.log(num.padEnd(5, "-"));   // "42---"

// repeat
console.log("ha".repeat(3)); // "hahaha"

// replaceAll
const typo = "teh cat sat on teh mat";
console.log(typo.replaceAll("teh", "the")); // "the cat sat on the mat"

// Template literals — multi-line and expressions
const items = ["pen", "book", "ruler"];
const receipt = `
Order Summary:
${items.map((item, i) => `  ${i + 1}. ${item}`).join("\n")}
Total items: ${items.length}
`;
console.log(receipt);

// String to number and back
console.log(parseInt("42px"));     // 42
console.log(parseFloat("3.14abc")); // 3.14
console.log(Number("99"));         // 99
console.log(String(100));          // "100"
console.log((255).toString(16));   // "ff" (to hexadecimal)
```

---

## Example 3 — Advanced

```js
// Regular expressions with strings
const email = "user@example.com";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(emailRegex.test(email)); // true

// Extract matches
const log = "Error at line 42, warning at line 88";
const lineNumbers = log.match(/\d+/g);
console.log(lineNumbers); // ["42", "88"]

// Named capture groups
const dateStr = "2024-08-15";
const { groups: { year, month, day } } = dateStr.match(
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
);
console.log(year, month, day); // "2024" "08" "15"

// Tagged template literals — custom string processing
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    return result + `[${value}]` + str;
  });
}

const product = "MacBook";
const price = 99999;
console.log(highlight`Product: ${product} costs ₹${price}`);
// "Product: [MacBook] costs ₹[99999]"

// String.raw — raw string (ignores escape sequences)
console.log(String.raw`Hello\nWorld`); // "Hello\nWorld" (not a newline)

// Practical: truncate long text
function truncate(str, maxLength = 50) {
  return str.length <= maxLength ? str : str.slice(0, maxLength - 3) + "...";
}
console.log(truncate("This is a very long sentence that needs to be shortened", 30));
// "This is a very long sentence t..."
```
