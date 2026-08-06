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
    for(const valuee of val){
        if(typeof valuee==='number'){
            summ += valuee;
        }else{
            allData = valuee.toUpperCase();
        }
    }
    return summ || allData;
}

const resultFinal=allperforms(1, 2, 3, 4, 5);
const res=allperforms("hello , world");
console.log(`Final Result : ${resultFinal}`);
console.log(`String Result : ${res}`);

function getAllData(a:number, b:string, c?:boolean):void{
    if(c){
       console.log(`a : ${a} b : ${b} c : ${c}`); 
    }else{
        console.log(`a : ${a} b : ${b}`)
    }
}

getAllData(10,"Kaushik",true);

function defaultDiscount(value : number,div:number=2){
    let ans=value/div;
    return ans;
}

const ansans=defaultDiscount(3);
console.log(`The answer : ${ansans}`);