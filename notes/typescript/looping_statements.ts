/* while loop */



let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

let num = 2;
while (num <= 10) {
    if (num % 2 == 0) {
        num += 2;
    }
}

/* 

do while loop :
-------------------
a do-while loop always executes at least once before checking the condition

do{

}while(condition);

*/

/* console.log("***************************");
let val: number = 1;
do {
    val++;
    console.log(val);

} while (val <= 5);
 */

/* for loop */

console.log("***** for loop ******");
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}

console.log("***** for loop without condition ******");
for (let i = 2; i <= 10; i+=2) {
    console.log(i);
}

/* print in descending order */

console.log("*** descending order ***");
for(let i=10;i>=1;i--){
    console.log(i);
}
/*  break */
console.log("***** break ******");
for(let i=0;i<=5;i++){
    if(i===3){
        break;
    }
    console.log(i);
}

console.log("***** continue ******");

for(let i=0;i<=5;i++){
    if(i===3){
        continue;
    }
    console.log(i);
}



