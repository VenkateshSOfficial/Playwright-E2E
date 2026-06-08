/* 
statements
==============
1) conditional statements
2) looping statements
*/

/* 

conditional statements
=======================
if condition 
============
if(condition){
statements
}

*/

// Example 1: age greater than or equal to 18 "eligible to vote"

let age: number = 18;
if (age >= 18) {
    console.log("eligible for vote");
} else {
    console.log("not eligible for vote");
}

// example 2 : odd or even

let val: number = 12;
if (val % 2 === 0) {
    console.log(`${val} is even number`);
} else if (val === 1) {
    console.log(`${val} is neither even nor odd`);
} else {
    console.log(`${val} is odd number`);
}


/* 
switch case statements 
======================

switch(expression){
case value 1 : statements;
               break;
default : statements;               
}

*/

let day: number = 2;
const myName: string = "Venkat";

let dayName: string = "tuesday";

switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    default: console.log('Invald day of the week');
}

switch (dayName) {
    case "monday":
        console.log("Its Monday 1st day of the week");
        break;
    case "tuesday":
        console.log("Its Tuesday 2nd day of the week");
        break;
    default: console.log("Invalid day name");
}

