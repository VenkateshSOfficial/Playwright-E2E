let nums: number[] = [1, 2, 3, 4, 5];

let fruits:string[]=["Apple","Orange","Mango","Grapes","Gauva","Banana"]

console.log("Numbers : ", nums)

// length-> array attribute to find the length or size of an array

console.log(`Size of nums array : ${nums.length}`);

/* array methods in typrescript */

/* 
push() -> add single/multiple elements at the end of the array 
syntax : array.push(ele1.....eleN);
*/

nums.push(10);
console.log("nums after 1st push : ", nums);

nums.push(23, 45);
console.log("nums after 2nd push : ", nums);

/* 
pop() -> removes last element from an array 
syntax : array.pop()
returns the removed element
*/

let removedFruits=fruits.pop();
console.log("fruits after pop() -> removed fruit : ",removedFruits," : ",fruits);

/* 
shift() -> removes the first element from an array
syntax : array.shift()
*/
console.log("without shift : ",fruits)
let shiftRemoved=fruits.shift();
console.log("without shift : ",fruits)
// will return the first removed element
console.log("shift removed : ",shiftRemoved);

/* 
unshift() -> adds single / multiple elements at the start of an array
syntax : array.unshift();
unshift() will not return any value
*/

fruits.unshift("kiwi");
console.log("fruits added using unshift : ",fruits)
fruits.unshift("berries","strawberry");
console.log("fruits added using unshift : ",fruits)

/* 
concat() -> combines 2 or more arrays of the same type
syntax : array.concat(array1,array2....arrayN) 
returns a new array
*/
console.log("Nums before concat : ",nums);
let concatArrays:number[]=nums.concat([7,8],[12]);
console.log("Nums after concat : ",concatArrays);

/* slice() -> extract a section of an array
 */
console.log("Fruits before slicing : ",fruits)
let extractedArray=fruits.slice(2,5 /* the last value 5 is exclusive -> 5-1=4 */);
console.log("Extracted array using slice : ",extractedArray);

/* 
splice() ->  add / removes array from everywhere in an array
syntax : array.splice(start, deletCount,add item1,....itemN);
returns the deleted elements
*/
let teams=["India","Australia","New Zealand","South Africa","England","Sri Lanka"]
console.log("without splice() : ",teams);

/* ex 1 : only removing elements */
let removedEle=teams.splice(1,2);
console.log("after splice : ",removedEle);
console.log(teams);

/* ex 2 : only adding elements */
let onlyAdded=teams.splice(1,0,"Pakistan","Ireland")
console.log("splice add : ",teams);

/* ex 3 : both remove and add */
teams.splice(1,2,"Nepal","Afganistan");
console.log("After splice() again : ",teams)

/* 
indexOf() ->  finds the index of an element, If element not found then returns -1
syntax : array.indexOf(searchElement) or array.indexOf(searchElement,start index)
*/

/* return the element index */
let southAfricaTeamIndex=teams.indexOf("South Africa");
console.log("Index of South Africa : " + southAfricaTeamIndex);

/* return -1 when element not found */
let noBangladeshIndex=teams.indexOf("Bangladesh");
console.log("Bangladesh index : ", noBangladeshIndex," means Bangladesh team not available in the teams array");

/* index range search */
let findEngland=teams.indexOf("England",2)
console.log("England found in index ",findEngland)

/* 
includes() -> will check if elments exists in array or not.
returns true or false
syntax : array.includes(searchElement,fromIndex)
*/

let teamName="India"
let isTeamNameExists=teams.includes(teamName);
console.log("Does ",teamName," exist in the teams array ? ",isTeamNameExists);

/* 
toString() -> converts array to string 
syntax : array.toString()
*/
let numbers:Number[]=[1,2,3,4,5]
console.log(typeof(numbers));
let numsToString=numbers.toString();
console.log(typeof(numsToString));
console.log("Converted array to string : ",numsToString);

let arr=['w','e','l','c','o','m','e']
console.log(typeof(arr));
console.log("original ",arr);
let strArray=arr.toString();
console.log(typeof(strArray));
console.log("Converted string : ",strArray);