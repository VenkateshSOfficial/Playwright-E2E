function learn(): void {
    console.log("Learning typescript");
}

learn();

function calculateSum(x: number, y: number): number {
    return x + y;
}

const totalSum: number = calculateSum(10, 20);
console.log(`Total Sum : ${totalSum}`);

function addSums(...val: number[]): number {
    let initSum = 0;
    for (const value of val) {
        initSum += value;
    }
    return initSum;
}

function allperforms(...val: number[] | string[]): number | string {
    let summ: number = 0;
    let allData: string = '';
    for (const valuee of val) {
        if (typeof valuee === 'number') {
            summ += valuee;
        } else {
            allData = valuee.toUpperCase();
        }
    }
    return summ || allData;
}

const resultFinal = allperforms(1, 2, 3, 4, 5);
const res = allperforms("hello , world");
console.log(`Final Result : ${resultFinal}`);
console.log(`String Result : ${res}`);

function getAllData(a: number, b: string, c?: boolean): void {
    if (c) {
        console.log(`a : ${a} b : ${b} c : ${c}`);
    } else {
        console.log(`a : ${a} b : ${b}`)
    }
}

getAllData(10, "Kaushik", true);

function defaultDiscount(value: number, div: number = 2) {
    let ans = value / div;
    return ans;
}

const ansans = defaultDiscount(3);
console.log(`The answer : ${ansans}`);


/* anonymous functions */

let messages = function (): string {
    return "Kaushik how are you";
}

console.log(messages());

let allSums = function (x: number, y: number): number {
    return x + y;
}

console.log(allSums(2, 3));

let calcu = function (...vals: number[]): number {
    let sum = 0;
    for (const val of vals) {
        sum += val;
    }
    return sum;
}
console.log(calcu(1, 2, 3))

let checks = function (...val: number[] | string[]): number | string {
    let total: number = 0;
    let upperCase: string = "";
    for (let v of val) {
        if (typeof v === 'number') {
            total += v;
        } else {
            upperCase = v.toUpperCase();
        }
    }
    return total || upperCase;
}

console.log(checks("god is great"))
console.log(checks(10, 20, 30))

let checking = function (...datas: number[] | string[]): number | string {
    let calcDatas: number = 0;
    let cases: string = "";
    for (const data of datas) {
        (typeof data === 'number') ? (calcDatas += data) : (cases = data.toUpperCase());
    }
    return calcDatas || cases;
}

console.log(checking("kadavule kapathu"));
console.log(checking(1, 2, 3, 4, 5));

let opt = function (names: string, age: number, emails?: string) {
    return emails ? `name : ${names}, age : ${age}, email : ${emails}` : `name : ${names}, age : ${age}`
}
console.log(opt("Babbi", 35, "abc@mail.com"));

let helloArrow = (): void => {
    console.log("This is hello arrow function");
}
helloArrow();

let funcArrow = (a: number, b: number): number => {
    return a * b;
}
let functAnswer = funcArrow(2, 3);
console.log(`Ans : ${functAnswer}`);

let optArrow = (name: string, age?: number): number | string => {
    return age ? (`name : ${name} , age : ${age}`) : (`name : ${name}`)
}
let ans = optArrow("Karuppan");
console.log(`The arrow ans : ${ans}`)

let defaultArrowVal = (x: number, y: number = 2): number => x / y;
console.log(`The default : ${defaultArrowVal(1)}`)

let multiplyArray = (...value: number[]): number => {
    let mul: number = 1;
    for (let val of value) {
        mul *= val;
    }
    return mul;
}
console.log(`The multiply : ${multiplyArray(1, 2, 3)}`);

let arraysArrow = (...v: number[] | string[]): number | string => {
    let sums: number = 0;
    let naam: string = '';
    for (let vv of v) {
        (typeof vv === 'number') ? (sums += vv) : (naam = vv.toUpperCase());
    }
    return sums || naam;
}

console.log(arraysArrow("I am Venkatesh"));
console.log(arraysArrow(2,3,4,5));