function getFibonator(){

    let innerArr=[0,1];
    let counter = true;

    return function inner() {
        
        let result;

        if (counter) {
            result = 1;
            counter=false;
            return result;
        }
        else result = innerArr[0]+innerArr[1];
        
        
        innerArr[0]=innerArr[1];
        innerArr[1]=result;
        return result;
    }

};



let fib = getFibonator()
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13
console.log(getFibonator()());
console.log(getFibonator()());
console.log(getFibonator()());
console.log(getFibonator()());
