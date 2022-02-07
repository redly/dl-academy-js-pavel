function addCreator(a) {
    return function(b) {
        return a + b;
    };
}

/* 
    Поменял название переменной, 
    так как chrome ругается на add
*/

// const add = addCreator(5);
const addNum = addCreator(5);

console.log(addNum(5)); // 10
console.log(addCreator(1)(3)); // 4
