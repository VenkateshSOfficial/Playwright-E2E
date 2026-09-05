# Object-Oriented Programming (OOP) in TypeScript

## What is OOP?

OOP is a way of organizing code around **objects** — bundles of data (properties) and behavior (methods) that model real-world things.

> Think of a `Car` — it has properties like `color` and `speed`, and behaviors like `accelerate()` and `brake()`. OOP lets you model that naturally in code.

TypeScript has full OOP support on top of JavaScript, with added type safety.

---

## 1. Classes

A **class** is a blueprint for creating objects. You define properties and methods once, then create as many objects (instances) as you need.

```ts
class Car {
  brand: string;
  speed: number;

  constructor(brand: string, speed: number) {
    this.brand = brand;
    this.speed = speed;
  }

  describe(): string {
    return `${this.brand} is going at ${this.speed} km/h`;
  }
}

const myCar = new Car("Toyota", 80);
console.log(myCar.describe()); // "Toyota is going at 80 km/h"
```

- `constructor` runs automatically when you create a new instance with `new`.
- `this` refers to the current object instance.

---

## 2. Access Modifiers

TypeScript provides three access modifiers to control who can read or change properties and methods.

| Modifier    | Accessible from                        |
|-------------|----------------------------------------|
| `public`    | Anywhere (default)                     |
| `private`   | Only inside the class                  |
| `protected` | Inside the class and its subclasses    |

```ts
class BankAccount {
  public owner: string;
  private balance: number;

  constructor(owner: string, initialBalance: number) {
    this.owner = owner;
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance; // controlled access via a method
  }
}

const account = new BankAccount("Alice", 1000);
account.deposit(500);
console.log(account.getBalance()); // 1500

// account.balance = 9999; // ❌ Error! 'balance' is private
```

### Shorthand Constructor

TypeScript lets you declare and assign properties directly in the constructor parameters — a very common pattern:

```ts
class BankAccount {
  constructor(
    public owner: string,
    private balance: number
  ) {}

  getBalance(): number {
    return this.balance;
  }
}
```

This is identical to the longer version above.

---

## 3. Readonly Properties

Use `readonly` to make a property assignable only once (in the constructor), and immutable after that.

```ts
class Config {
  readonly appName: string;

  constructor(name: string) {
    this.appName = name;
  }
}

const config = new Config("MyApp");
console.log(config.appName); // "MyApp"

// config.appName = "OtherApp"; // ❌ Error! Cannot assign to 'appName' because it is a read-only property
```

---

## 4. Inheritance

**Inheritance** lets one class (the child) acquire properties and methods from another class (the parent), enabling code reuse.

```ts
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): string {
    return `${this.name} makes a sound.`;
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name); // calls the parent constructor
    this.breed = breed;
  }

  // Overrides the parent's speak()
  speak(): string {
    return `${this.name} barks!`;
  }
}

const dog = new Dog("Rex", "Labrador");
console.log(dog.speak());  // "Rex barks!"
console.log(dog.name);     // "Rex" — inherited from Animal
console.log(dog.breed);    // "Labrador" — own property
```

- `extends` sets up the parent–child relationship.
- `super()` must be called in the child's constructor before using `this`.
- Methods in the child **override** methods with the same name in the parent.

---

## 5. Polymorphism

**Polymorphism** means "many forms". Different classes can share the same method name but behave differently.

```ts
class Shape {
  area(): number {
    return 0;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }
}

// Same method call — different behavior depending on the object
const shapes: Shape[] = [new Circle(5), new Rectangle(4, 6)];

shapes.forEach((shape) => {
  console.log(shape.area());
});
// 78.53...
// 24
```

You can treat all shapes uniformly, but each one computes area in its own way.

---

## 6. Abstraction

An **abstract class** defines a blueprint that other classes must follow. You cannot instantiate an abstract class directly — it exists only to be extended.

```ts
abstract class Vehicle {
  abstract fuelType(): string; // subclasses MUST implement this

  describe(): string {
    return `This vehicle runs on ${this.fuelType()}.`;
  }
}

class ElectricCar extends Vehicle {
  fuelType(): string {
    return "electricity";
  }
}

class PetrolBike extends Vehicle {
  fuelType(): string {
    return "petrol";
  }
}

const ev = new ElectricCar();
console.log(ev.describe()); // "This vehicle runs on electricity."

// const v = new Vehicle(); // ❌ Error! Cannot create an instance of an abstract class
```

- `abstract` methods have no body — they define *what* must exist, not *how*.
- Non-abstract methods in the abstract class (like `describe`) are shared freely.

---

## 7. Interfaces vs Abstract Classes

Both describe a contract, but there is a key difference:

| Feature                  | Interface              | Abstract Class               |
|--------------------------|------------------------|------------------------------|
| Can have method bodies   | No                     | Yes                          |
| Can have constructors    | No                     | Yes                          |
| A class can implement    | Multiple interfaces    | Only one abstract class      |
| Use when                 | Defining a shape/contract | Sharing partial implementation |

```ts
interface Printable {
  print(): void;
}

interface Saveable {
  save(): void;
}

// A class can implement multiple interfaces
class Document implements Printable, Saveable {
  print(): void {
    console.log("Printing document...");
  }

  save(): void {
    console.log("Saving document...");
  }
}
```

---

## 8. Encapsulation

**Encapsulation** means hiding internal details and exposing only what's necessary. You've already seen this with `private` — here's a more complete example using **getters** and **setters**:

```ts
class Temperature {
  private _celsius: number;

  constructor(celsius: number) {
    this._celsius = celsius;
  }

  // getter — read the value in a controlled way
  get fahrenheit(): number {
    return this._celsius * 1.8 + 32;
  }

  // setter — validate before changing the value
  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Temperature below absolute zero is not possible.");
    }
    this._celsius = value;
  }

  get celsius(): number {
    return this._celsius;
  }
}

const temp = new Temperature(100);
console.log(temp.fahrenheit); // 212
temp.celsius = 0;
console.log(temp.fahrenheit); // 32

// temp.celsius = -300; // ❌ Throws an error
```

---

## 9. Static Members

`static` properties and methods belong to the **class itself**, not to any instance. Useful for utilities or shared counters.

```ts
class MathHelper {
  static PI: number = 3.14159;

  static circleArea(radius: number): number {
    return MathHelper.PI * radius * radius;
  }
}

// Call directly on the class — no `new` needed
console.log(MathHelper.PI);               // 3.14159
console.log(MathHelper.circleArea(5));    // 78.53...
```

```ts
class Counter {
  static count: number = 0;

  constructor() {
    Counter.count++;
  }
}

new Counter();
new Counter();
new Counter();
console.log(Counter.count); // 3 — shared across all instances
```

---

## 10. Generics in Classes

**Generics** let you write a class that works with any type while remaining type-safe.

```ts
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const numberBox = new Box<number>(42);
console.log(numberBox.getValue()); // 42

const stringBox = new Box<string>("Hello");
console.log(stringBox.getValue()); // "Hello"
```

`T` is a placeholder that gets replaced with a real type when you use the class. You get full type-checking without duplicating the class for every type.

---

## Quick Reference

| Concept         | Keyword(s)                      | What it does                                          |
|-----------------|---------------------------------|-------------------------------------------------------|
| Class           | `class`                         | Blueprint for objects                                 |
| Instance        | `new`                           | Creates an object from a class                        |
| Inheritance     | `extends`, `super`              | Child class reuses parent class code                  |
| Encapsulation   | `private`, `get`/`set`          | Hides internal state, exposes controlled access       |
| Abstraction     | `abstract`                      | Defines a contract without full implementation        |
| Polymorphism    | Method overriding               | Same method name, different behavior per class        |
| Interface       | `implements`                    | Enforces a shape/contract on a class                  |
| Static          | `static`                        | Belongs to the class, not any instance                |
| Generics        | `<T>`                           | Type-safe class that works with any type              |
| Access modifier | `public` / `private` / `protected` | Controls visibility of class members              |
