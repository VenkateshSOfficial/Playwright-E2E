
/* standard for loop */
for(let i=0;i<=5;i++){
    console.log(i);
}

/* for of loop */
const fruits: string[] = ["apple", "banana", "mango", "grapes"];
for (const fruit of fruits) {
    console.log(fruit);
}

/* for in loop */
const person = { name: "John", age: 30, city: "New York" };
for (const key in person) {
    console.log(`${key}: ${person[key as keyof typeof person]}`);
}

/* for each */
const nums = [10, 20, 30];
nums.forEach((num, index) => {
    console.log(index, num); // 0 10, 1 20, 2 30
});