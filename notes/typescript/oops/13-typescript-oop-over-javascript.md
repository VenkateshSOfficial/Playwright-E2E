# TypeScript OOP Features Over JavaScript

JavaScript already supports runtime OOP features such as classes, inheritance, `super`, static members, getters/setters, and `#private` fields. TypeScript keeps those features and adds **compile-time checks and contracts**.

> Important: TypeScript types are removed when the code is compiled. Most TypeScript OOP features prevent mistakes during development; they do not add runtime behavior by themselves.

---

## JavaScript vs TypeScript

| Concept | JavaScript | TypeScript adds |
|---|---|---|
| Class properties | Can be created dynamically | Declared property types |
| Method arguments | Any value can be passed | Parameter and return types |
| Access control | Runtime `#private` fields | `public`, `private`, and `protected` checking |
| Shared contract | Informal convention | Interfaces and abstract classes |
| Overrides | Allowed even with incompatible signatures | `override` verification |
| Generic classes | No built-in type parameters | Reusable, type-safe classes |

---

## 1. Typed Properties and Methods

TypeScript validates the shape of an object created from a class.

```ts
class Product {
  constructor(
    public name: string,
    public price: number
  ) {}

  applyDiscount(percent: number): number {
    return this.price - (this.price * percent) / 100;
  }
}

const book = new Product("TypeScript Handbook", 500);
book.applyDiscount(10); // valid

// book.applyDiscount("10"); // Error: string is not assignable to number
```

In JavaScript, the invalid call runs unless your code checks it at runtime.

---

## 2. Access Modifiers

TypeScript can restrict where members are used.

```ts
class Employee {
  public name: string;
  private salary: number;
  protected department: string;

  constructor(name: string, salary: number, department: string) {
    this.name = name;
    this.salary = salary;
    this.department = department;
  }

  getSalary(): number {
    return this.salary;
  }
}

class Manager extends Employee {
  introduceTeam(): string {
    return `Manager of ${this.department}`; // protected is available here
  }
}

const employee = new Employee("Asha", 60000, "Engineering");
console.log(employee.name);
console.log(employee.getSalary());

// employee.salary;     // Error: private member
// employee.department; // Error: protected member
```

`private` and `protected` are checked by TypeScript. For runtime-enforced privacy in JavaScript, use a `#privateField`.

---

## 3. Interfaces: A Contract Without Implementation

An interface describes what a class must provide. Unlike an abstract class, it does not contain implementation code.

```ts
interface Printable {
  print(): string;
}

interface Serializable {
  toJSON(): string;
}

class Invoice implements Printable, Serializable {
  constructor(private total: number) {}

  print(): string {
    return `Invoice total: ${this.total}`;
  }

  toJSON(): string {
    return JSON.stringify({ total: this.total });
  }
}
```

- A class can `extend` only one base class.
- A class can `implement` multiple interfaces.
- Interfaces disappear after compilation and do not exist at runtime.

---

## 4. Abstract Classes

JavaScript has no `abstract` keyword. TypeScript can require child classes to implement specific members.

```ts
abstract class PaymentMethod {
  abstract pay(amount: number): boolean;

  receipt(amount: number): string {
    return `Paid ${amount}`;
  }
}

class CardPayment extends PaymentMethod {
  pay(amount: number): boolean {
    return amount > 0;
  }
}

// new PaymentMethod(); // Error: cannot create an abstract class instance
```

---

## 5. Safer Method Overrides

The `override` keyword makes TypeScript confirm that the parent class actually has the method being replaced.

```ts
class Notification {
  send(message: string): void {
    console.log(message);
  }
}

class EmailNotification extends Notification {
  override send(message: string): void {
    console.log(`Email: ${message}`);
  }
}
```

This catches misspellings such as `sennd()` before the code runs. Enable `noImplicitOverride` in `tsconfig.json` to require `override` for every override.

---

## 6. Generic Classes

Generics let one class work with many data types while keeping each use type-safe.

```ts
class Box<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }
}

const numberBox = new Box<number>(42);
const textBox = new Box<string>("hello");

const total = numberBox.getValue() + 8;
const greeting = textBox.getValue().toUpperCase();
```

`T` is a placeholder type. TypeScript remembers the concrete type for each instance.

---

## 7. Structural Typing

TypeScript checks whether an object has the required shape, rather than requiring a particular class name.

```ts
interface HasName {
  name: string;
}

function welcome(person: HasName): string {
  return `Welcome, ${person.name}`;
}

class User {
  constructor(public name: string, public id: number) {}
}

console.log(welcome(new User("Ravi", 1)));
console.log(welcome({ name: "Meera", role: "admin" }));
```

Both values work because they have a `name: string` property.

---

## Key Takeaway

Use JavaScript classes for runtime behavior. Use TypeScript OOP features to make that behavior easier to understand and harder to misuse:

- Types document valid data and method calls.
- Interfaces define flexible contracts.
- Abstract classes define shared base behavior plus required members.
- Access modifiers and `override` catch invalid class usage early.
- Generics preserve type safety in reusable classes.