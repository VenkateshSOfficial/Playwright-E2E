/* types of operators in typescript */

let value_1: number = 2;
let value_2: number = 3;

/*     or    */
/* single statement */

let val_1: number = 10, val_2 = 20;

/* 

Arithmetic operations :
=========================================
(+) ==> Addition
(-) ==> Subtraction
(*) ==> Multiplication
(/) ==> division (returns quotient value)
(%) ==> Modular division (returns reminder)
(**)==> Exponential (calculating square)

*/
console.log("****** Arithmetic Operators ******");

console.log(`Addition : ${value_1 + value_2}`)
console.log(`Subtraction : ${value_1 - value_2}`)
console.log(`Multiplication : ${value_1 * value_2}`)
console.log(`Division : ${value_1 / value_2}`)
console.log(`Modular : ${value_1 % value_2}`)
console.log(`Exponential : ${value_1 ** value_2}`)

/* 
Assignment operators :
======================
= --> equal
*/
console.log("****** Assignment Operators ******");

val_1 = 100;
val_2 = 50;

val_1 = val_1 + val_2;
console.log(`New value of val_1 : ${val_1}`);
/*  or  */
val_1 += val_2;
console.log(`New value of val_1 : ${val_1}`);

/* 

Relational operators : 
====================================
will compare the values
1. >  ---> greater than
2. <  ---> less than
3. >= ---> greater than or equal to
4. <= ---> less than or equal to
5. == ---> equal to
6. != ---> not equal to
7. === --> strict equal to

*/
console.log("****** Relational Operators ******");
val_1 = 11;
val_2 = 14;

console.log(val_1 > val_2);
console.log(val_1 < val_2);
console.log(val_1 <= val_2);
console.log(val_1 >= val_2);
console.log(val_1 == val_2);

/* 

strict equality :
when using "==" we can see that the comparison happens only in the value level.
when using "===" we can see that the comparison happens at the type level as well.

*/

let num_1:any=10;
let num_2:any="10";

console.log(num_1 == num_2);
console.log(num_1 === num_2);

/* 

Logical operators
1. && => AND operator
2. || => OR operator
3. !  => NOT operator

*/

