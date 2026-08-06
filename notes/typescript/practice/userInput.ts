import promptSync from 'prompt-sync';

const prompt = promptSync();

const name = prompt('Enter your name: ');
const age = prompt('Enter your age: ');

console.log(`Hello ${name}, you are ${age} years old`);