/* 

Three types of functions : 
=========================
1) named functions
2) anaonymous functions
3) arrow functions

*/

/* 

named functions :
=================
function functionName(parameter):return type{
// block of code
}

calling the function => functionName()

*/

/* Example 1 : named function with no params and no return type */
function display(): void {
    console.log("Welcome to typescript");
}

display();

/* Example 2 : named function with params and return value */

function addNumbers(x: number, y: number): number {
    return x + y;
}

let sum: number = addNumbers(2, 3);
console.log(`SUM : ${sum}`);

/* Example 3 : named  function with rest params */

function addMultipleNumbers(...nums: number[]): number {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum = sum + nums[i];
    }
    return sum;
}

let result: number = addMultipleNumbers(2, 3, 4, 5);
console.log(`Result : ${result}`);

let result1: number = addMultipleNumbers(1, 2);
console.log(`RESULT : ${result1}`);


function perform(...val: (number[] | string[])): number | string {
    let sum: number = 0;
    let data: string = ''
    for (let i = 0; i < val.length; i++) {
        if (typeof val[i] === 'number') {
            sum = sum + (val[i] as number);
        } else if (typeof val[i] === 'string') {
            data = (val[i] as string).toUpperCase();
        }
    }
    return sum || data;
}

let numSum = perform(10, 20, 30, 40, 50);
console.log(`NUM_SUM : ${numSum}`);

let nameString = perform("kaushik");
console.log(`NAME : ${nameString}`);

/* Example 4 : function with optional params (make optional using ?)*/

function details(id: number, name: string, mailId?: string): void {
    if (mailId) {
        console.log(`Id : ${id}`);
        console.log(`Name : ${name}`);
        console.log(`Email : ${mailId}`);
    } else {
        console.log(`Id : ${id}`);
        console.log(`Name : ${name}`);

    }
}

details(23, "Kaushik", "abc@hotmail.com");

/* Example 5 : named function with default params */

function discount(price: number, rate: number = 0.30): void {
    let discount = price * rate;
    console.log(`Discount : ${discount}`);
}
discount(100);

/* anonymous function (or) nameless function */

/* Example 1 : Anonymous function */

let msg = function (): string {
    return "hello";
}
console.log(`Msg : ${msg()}`);

/* Example 2 : anaonymous function with parameters */

let multipleValue = function (a: number, b: number): number {
    return a * b;
}
console.log(`Multiply val  : ${multipleValue(2, 3)}`);

/* Arrow functions or lambda functions */

/* example 1 : arrow funct with no params no return value */

let greetArrow = (): void => {
    console.log("hello ts");
}
greetArrow();

/* example 2 : arrow function with parameters and return value */
let adding = (a: number, b: number): number => {
    return a + b;
}
console.log(`the sum is : ${adding(2, 3)}`);

let addition = (x: number, y: number): number => x + y;
console.log(`The add  : ${addition(2, 3)}`);

/* arrow function with optional params */

(val1: number, val2?: number): number => {
    if (val2) {
        return val1 * val2;
    } else {
        return val1;
    }
}

/* Arrow functions with default params */

let calc = (data1: number, data2: number = .5): number => {
    return data1 * data2;
}
console.log(`Calc : ${calc(10)}`);

/* arrow function with REST params */
let answer = (...val: number[]): number => {
    let sum = 0;
    for (let i = 0; i < val.length; i++) {
        sum = sum + val[i];
    }
    return sum;
}
console.log(`Answer : ${answer(1, 2, 3)}`);
