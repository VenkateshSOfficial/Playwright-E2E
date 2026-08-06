const a_person: { name: string; age: number; greetings: () => void } = {
    name: "John",
    age: 30,
    greetings() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
};

console.log(a_person.name); // Output: John
console.log(a_person.age);  // Output: 30
console.log(a_person.greetings()); // Output: Hello, my name is John and I am 30 years old.