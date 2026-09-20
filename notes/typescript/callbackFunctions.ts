// call back function
// Example 1 : 
function greet(name: string, msg: (message: string)=> void) {
    console.log(`Kaushik !!! ${msg("Welcome")}`);
}

function showMessage(message: string): string {
    return message;
}

greet("John", showMessage);

// Example 2 : 

function sum(a:number,b:number,callback:(result:number)=>number):number{
    let result:number=a+b;
    return callback(result);
}
function displayResult(result:number):number{
    return result;
}

let ans=sum(2,3,displayResult);
console.log(`ANS : ${ans}`);
