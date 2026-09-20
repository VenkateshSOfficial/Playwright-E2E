function getInfo(id: number): number;
function getInfo(name: string): string;

// function overloading
// Example 1 :

function getInfo(param: number | string): number | string {
    return (typeof param === "number") ? param * 2 : param.toUpperCase();

}

let info = getInfo(2);
console.log(`The info : ${info}`);

let info2 = getInfo("Kaushik");
console.log(`The info : ${info2}`);

// Example 2 :

function add(a: number, b: number): number;
function add(a: number, b: number, c: number): number;

function add(a: number, b: number, c?: number): number {
    let val = (c === undefined) ? a + b : a + b + c;
    return val;
}

let result = add(2, 3);
console.log(`RESULT : ${result}`);

let result2 = add(2, 3, 4);
console.log(`RESULT : ${result2}`);

// Example 3 :
function details(name: string): string;
function details(age: number): number;
function details(isMarried: boolean): boolean;

function details(input: string | number | boolean): string | number | boolean {
    return (typeof input === 'string') ? input.toUpperCase() : input;
}

let myName=details("Babbi");
let myAge=details(35);
let marriedStatus=details(true);
console.log(`NAME -> ${myName}`);
console.log(`AGE -> ${myAge}`);
console.log(`IS MARRIED ?  -> ${marriedStatus}`);