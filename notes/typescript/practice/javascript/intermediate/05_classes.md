# Classes in JavaScript

Classes are a clean way to create **objects with shared structure and behavior**. They are built on top of JavaScript's prototype system.

```
class ClassName {
  constructor() { ... }  // runs when new object is created
  method() { ... }       // shared by all instances
}
```

---

## Example 1 — Basic

```js
class Animal {
  constructor(name, sound) {
    this.name = name;    // instance property
    this.sound = sound;
  }

  speak() {
    return `${this.name} says ${this.sound}`;
  }

  toString() {
    return `Animal: ${this.name}`;
  }
}

const dog = new Animal("Dog", "Woof");
const cat = new Animal("Cat", "Meow");

console.log(dog.speak());  // "Dog says Woof"
console.log(cat.speak());  // "Cat says Meow"
console.log(dog.name);     // "Dog"

// instanceof check
console.log(dog instanceof Animal); // true

// Static method — belongs to the class, not instances
class MathHelper {
  static add(a, b) { return a + b; }
  static square(n) { return n * n; }
}

console.log(MathHelper.add(3, 4));   // 7
console.log(MathHelper.square(5));   // 25
// new MathHelper().add() ← don't need an instance for static methods
```

---

## Example 2 — Intermediate

```js
// Inheritance — extends and super
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // MUST call super() before using 'this'
    this.breed = breed;
  }

  speak() {
    return `${this.name} barks! 🐕`;  // override parent method
  }

  describe() {
    return `${super.speak()} and is a ${this.breed}`; // call parent method
  }
}

const myDog = new Dog("Rex", "Labrador");
console.log(myDog.speak());    // "Rex barks! 🐕"
console.log(myDog.describe()); // "Rex makes a sound and is a Labrador"
console.log(myDog instanceof Dog);    // true
console.log(myDog instanceof Animal); // true — inherits chain

// Getters and Setters
class Person {
  constructor(firstName, lastName) {
    this._firstName = firstName;
    this._lastName = lastName;
  }

  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }

  set fullName(value) {
    const parts = value.split(" ");
    this._firstName = parts[0];
    this._lastName = parts[1];
  }
}

const p = new Person("John", "Doe");
console.log(p.fullName);  // "John Doe"
p.fullName = "Jane Smith";
console.log(p.fullName);  // "Jane Smith"
```

---

## Example 3 — Advanced

```js
// Private fields (# prefix — truly private in modern JS)
class BankAccount {
  #balance;      // private field
  #owner;

  constructor(owner, initialBalance) {
    this.#owner = owner;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.#balance += amount;
    return this;  // return 'this' to allow chaining
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
    return this;
  }

  get balance() {
    return this.#balance;
  }

  toString() {
    return `Account[${this.#owner}]: ₹${this.#balance}`;
  }
}

const acc = new BankAccount("Alice", 1000);
acc.deposit(500).deposit(200).withdraw(300); // chaining
console.log(acc.balance); // 1400
// console.log(acc.#balance); // ❌ SyntaxError: private field

// Abstract-like base class pattern
// new.target — inside a constructor, refers to the class that was called with 'new'.
// If someone calls 'new Shape()' directly, new.target === Shape → we block it.
// If a subclass calls super(), new.target === Circle (the subclass) → allowed.
class Shape {
  constructor(color) {
    if (new.target === Shape) {
      throw new Error("Shape is abstract — cannot instantiate directly");
    }
    this.color = color;
  }

  area() {
    throw new Error("area() must be implemented by subclass");
  }

  toString() {
    return `${this.constructor.name} [color=${this.color}, area=${this.area().toFixed(2)}]`;
  }
}

class Circle extends Shape {
  constructor(radius, color) {
    super(color);
    this.radius = radius;
  }
  area() { return Math.PI * this.radius ** 2; }
}

class Rectangle extends Shape {
  constructor(width, height, color) {
    super(color);
    this.width = width;
    this.height = height;
  }
  area() { return this.width * this.height; }
}

const shapes = [new Circle(5, "red"), new Rectangle(4, 6, "blue")];
shapes.forEach(s => console.log(s.toString()));
// Circle [color=red, area=78.54]
// Rectangle [color=blue, area=24.00]
```
