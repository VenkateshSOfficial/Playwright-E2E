import { employee } from "./type";

let employeeDetails: {
    employeeName: string;
    employeeAge: number;
    isMajor: boolean
} = {
    employeeName: "Venkatesh",
    employeeAge: 34,
    isMajor: true
}

console.log(employeeDetails);

let emps: { name: string; age: number; isMajor: boolean }[] = [
    { name: "Anto", age: 34, isMajor: true },
    { name: "Vijay", age: 52, isMajor: true }
]

console.log(emps);

/* defining a type seperately */

/* type employee={
    name:string,
    age:number,
    isValue:boolean
} */

let allEmployees: employee[] = [
    { name: "Arjun", age: 34, isValue: true },
    { name: "anandan", age: 54, isValue: false }
]

console.log(allEmployees);