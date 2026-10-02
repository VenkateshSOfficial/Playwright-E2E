/* 
tuples in typescript
tuple is a fixed-length array where each element has a specific type 
it helps in storing multiple fields of difference data types together
*/

// tuple with 2 values
let person: [string, number] = ["Venkatesh", 1991]
console.log(`Person details : ${person[0]}`);
console.log(`Person details : ${person[1]}`);
console.log(`Person details : ${person}`);

// tuple with multiple values
let user: [number, string, boolean, number, string] = [23, "Kaushik", true, 1991, "Babbi"]
console.log(`user : ${user}`);

for (let userEach in user) {
    console.log(user[userEach]);
}

console.log("********************************");

for (let u of user) {
    console.log(u);
}

console.log("********************************");

for (let i = 0; i < user.length; i++) {
    console.log(user[i]);
}

/* combination of array of tuples */
let students: [string, number][] = [["Kaushik", 101],
["Babbi", 102],
["Venkatesh", 103]]