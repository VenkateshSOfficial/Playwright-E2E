const person={
    name: "Alice",
    age: 30,
    greet(){
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
};

console.log(person.name); // Output: Alice
console.log(person.age); // Output: 30  
console.log(person.greet()); // Output: Hello, my name is Alice and I am 30 years old.