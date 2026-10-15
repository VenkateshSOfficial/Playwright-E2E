/* 

Below listed are the advanced array methods :
=============================================
1. forEach() 
2. map()
3. filter() 
4. reduce() 
5. some()
6. every()

*/

/* 

forEach() -> method 
syntax : array.forEach(function(currentValue, index, array){
code here
})

parameters explanation :
========================
currentValue - The current element being processed in the array
index (optional) - The index of the current element being processed in the array
array (optional) - The array the current element belongs to.

*/

/* Example 1 : */
let fruits: string[] = ["apple", "mango", "banana", "orange", "pineapple"]

for (let i in fruits) {
    console.log(i, fruits[i]);
}

console.log("using normal function.....");
fruits.forEach(function (element, index) {
    console.log(`Index : ${index} - element : ${element}`)
})

console.log("using arrow function......");
fruits.forEach((element, index) => {
    console.log(`${index}. ${element}`);
})

/* Example 2 : converting the element to uppercase */
console.log("Upper case characters .....")

fruits.forEach((element, index) => {
    console.log(`${index} : ${element.toUpperCase()}`)
})

/* 

1. map() -> creates a new array with the result of calling the function on every
element of an array
2. It takes function as a parameter
3. Returns the same number of elements that we have in original array
syntax : array.map(function(currentValue,index,array){})

*/

/* example : sqr of each number */
let nums: number[] = [1, 2, 3, 4, 5]
let sqrdValue = nums.map(function (element) {
    return element * element;
})

console.log("Squared numbers : ",sqrdValue);

/* arrow function */
let multipliedByTwo=nums.map((element)=>{
    return element*2;
})
console.log("Multiplied by 2 : ",multipliedByTwo);

/* simplified arrow function */
let multipliedByThree=nums.map((element)=>element*3)
console.log("Multiplied by 3 : ",multipliedByThree);

/* 
filter() -> creates a new array with all the elements that pass/satisfy the condition
It takes function as a parameter
Returns either same or fewer number of elements compared to original array
*/

let evenNums=nums.filter(function(element){
    return element%2===0;
})
console.log("even nums from ", nums , "is",evenNums);

let evenNumbers=nums.filter((element)=>element%2===0);
console.log("even nums from ", nums , "is",evenNumbers);

/* numbers should be > 3 */
let numsGreaterThanThree=nums.filter((element)=>element>=3);
console.log("Number > 3 in ",nums, " -> ",numsGreaterThanThree);

/* reduce() -> applies a function on every element of an array and returns 
a single value
syntax : array.reduce(function(accumulator,currentValue,index,array){}) */

let totalSum=nums.reduce((value ,sum)=>value+sum,0);
console.log("total sum : ",totalSum);