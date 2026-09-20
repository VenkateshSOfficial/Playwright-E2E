/* Learn arrays */
/* array declaration and store data in array */

// approach 1: using literal
let allNames: string[] = [] /* simple declaration */
allNames = ["Sachin", "Dhoni", "Yuvraj", "Dravid", "Srinath"]; /* array initialization */
allNames.forEach(eachName => {
    console.log(eachName);
})

// alernative declation and initialization
let players: string[] = ["Gill", "Samson", "Abishek", "Arsdeep"]; /* declaration and initialization */
console.log(players);

// approach 2: using generic way
let empNames: Array<string> = ["Anand", "Ravi", "Shyam", "Gokul", "Bogan"];
let empIds: Array<number> = [12, 32, 123, 45, 98]
let data: Array<string | number> = ["John", 23, 456, "Ravi", "Apple", 45]
let mixedData: any = [1, "Howard", true, null];

console.log(`The array size : ${empNames.length}`);

for (let i = 0; i < empNames.length; i++) {
    console.log(empNames[i]);
}

/* two different for loops 
1. for-in loop => (i) will always act as index
2. for-of loop
*/

// for in loop
console.log("employee IDs.....");
for (let id in empIds) {
    console.log(empIds[id]);
}

// for of loop
console.log("mixed data.........");
for (let value of mixedData) {
    console.log(value);
}

/* 
arrays with functions
how o pass array variables to a function
*/
function searchValue(num: number, val: number[]): boolean {
    for (let v of val) {
        if (v === num) {
            return true;
        }
    }
    return false;
}
let ans = searchValue(10, [2, 3, 5, 10, 12]);
let ans1=searchValue(455, [2, 3, 5, 10, 12,13,41,456,342,123]);
console.log(`Value exists : ${ans}`);
console.log(`Value exists : ${ans1}`);