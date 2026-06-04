/* Typescript is statically typed progarmming language */

let dta: number = 10;
console.log(`Data : ${dta}`);

/* 

1) primitive datatypes (built in)
a) number
b) string
c) boolean
d) null
e) undefined
f) any
g) union type
h) void

2) non-primitive datatypes
a) array
b) class
c) function
d) interface
e) tuple

*/

/* primitive datatypes */

/* 1. number type */
let aggee: number = 34;
console.log(`AGE : ${aggee}`);

/* 
string type 
declaration types as below :
1. single quote ('')
2. double quote ("")
3. back tick (``)
*/
let firstName: string = "John";
let lastName: string = "Kennedy";

let greet: string = "Hello " + firstName + " " + lastName
let greet1:string=`hello ${firstName} ${lastName}`
console.log(greet);
console.log(greet1);

/* boolean type */
let isStudent:boolean=true;
let isteacher:boolean=false;

/* null & undefined */
let emptyValue:null=null;
let undefValue:undefined=undefined;

/* 
any 
any will violate the rules of typscript , the type safety
basically if we use any we are telling typescript to avoid the type check
*/

let valval:any=100;
console.log(`type of valval : ${typeof valval}`);
valval="Hello";
console.log(`type of valval : ${typeof valval}`);

/* Union type */

let id:number | string | boolean=10
console.log(`Id is of type ${typeof id}`)
id="Vijay";
console.log(`Id is of type ${typeof id}`)
id=true;
console.log(`Id is of type ${typeof id}`)

/* void => specifically used for function's return type */

function ffoo(a:number,b:number):void{
    console.log(`The SUM : ${a+b}`);
}

ffoo(2,3);

function galgada(a:number,b:number):number{
    return a+b;
}

let sum:number=galgada(10,21);
console.log(`The actual SUM : ${sum}`);