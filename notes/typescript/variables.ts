/* 
variables
=============
1) what is a variable ?
   variable is a container which can contain any form of data
   x=10;
   x is a variable or a container which can hold data 10
   name="Vijay"
   name is a container which can hold data called "Vijay"

In Typescript we can use 3 keywords to declare a variable.
var, let, const
Specifying the datatype is also very important as Typscript is strictly typed
programming language

Syntax to declare a variable :
==============================
keyword           variableName : datatype(optional) = value
var/let/const      age         : number(optional)   = 35

*/

var age: number = 30;
console.log(`Age : ${age}`);

/*

var (vs) let (vs) const (differences)
=====================================
1) scope
   var => function scope, let & const => block scope
   cannot access the let and const variables outside of any block

2) declaration / assignment
   var & let can be first declared and then initialized later
   const cannot be declared, during the declaration the initialization should also be done
   refer examples and error messages below

3) re-declaration
   var can be re-declared , let & const cannot be re-declared.
   refer examples and error messages below

4) re-initialization / re-assignment
   var & let can be re-initialized
   const cannot be re-initialized, its always a constat value

5) hoisting
   var => hoisted, will return undefined
   let & const => also hoisted, but due to block scope it enters temporal dead zone
   and returns reference error.
   refer examples and error message below


var -> we do not use in modern js/ts.Avoid var because it has function scope
       leading to unexpected behaviour.

let -> use let when we want to change the value of the variable

const -> use const when we don't want to change the value of the variable

*/

/* 

1) scope
===========
Scope is the accessable area.
In Typescript we have 2 different scopes a) functional scope, b) block scope

Functional scope :
==================
any variables declared within a function then it holds the functional scope
function foo(){
var a=10;
}

Block scope :
==================
any variable declared within a block is blocked scoped
if(){
var a=20;
}

var => functional scope
let & const => block scope

*/

function varScope(){
    if(true){
        var msg="hello";
        // console.log(`MSG : ${msg}`);
        /* 
        msg scope is function scope so even if we call the variable outside of the 
        block it will work 
        */
    }
    console.log(`MSG : ${msg}`);
    /* accessing the var variable outside of the block if and it still works */
}

varScope();

function letScope(){
    if(true){
        let greet="hello world"
        console.log(`Message : ${greet}`);
    }
    /*console.log(`Message : ${greet}`); => trying to access the variable declared as let
    outside of the block will throw the below error
    Error : Cannot find name 'greet'.
      */
}

letScope();

function constScope(){
    if(true){
        const val="hi how are u"
        console.log(`val : ${val}`);
    }
  //console.log(`val : ${val}`);  
  /* Error : Cannot find name 'val'. Did you mean 'eval'?
  The above error is observed while try  */
}

constScope();

/* 
2) Declaration / value assignment :
==================================
var can be declared and then later be initialized
let can be declared and then later be initialized
const has to initialized on declaration, so only declaration not possible
var x;
x=10;
*/

var x; /* variable declaration */
x=10; /* variable initialization */
console.log(`X : ${x}`);

var y; /* only declaration */
console.log(`Y : ${y}`);

var z=100; /* both declaration and initialization */
console.log(`Z : ${z}`);

let a;
a=12;
console.log(`A : ${a}`);

let b;
console.log(`B : ${b}`);

let c=200;
console.log(`C : ${c}`);

/* 
const val; 
const must be initialized at the time of declaration
error : 'const' declarations must be initialized.
*/

const data=10;
console.log(`Data : ${data}`);

/* 

3) Re-declaration
===================
var allows the re-declaration
let & const does not allow re-declaration

*/

var city="Chennai";
var city="Trichy";
console.log(`CITY : ${city}`);

let place="Madurai";
// let place="Chennai";
/* error => Cannot redeclare block-scoped variable 'place'. */

const country="India";
// const country='Russia';
/* error => Cannot redeclare block-scoped variable 'country'. */

/* 

4) re-initialization or re-assignment 
=====================================
var and let can be re-initialized 
const cannot be reinityialized with a new value as it is only constant

*/

var foo=10;
foo=20;
console.log(`Foo : ${foo}`);

let value="Vijay"
value="Dhoni"
console.log(`VALUE : ${value}`);

/* 
5) Hoisting
=============
calling a variable before declaring and initializing it is called hoisting
var => var is hoisted and will returned as "undefined"
let & const => are also hoisted but due to block scope ith will land into temporal dead zone
returning "reference error"
 */

console.log(`V => ${v}`);
var v=10;
/* 
o/p 
===
V => undefined 
*/

console.log(`ZZ => ${zz}`);
let zz=20;
/* 
o/p
===
ReferenceError: Cannot access 'zz' before initialization 
*/