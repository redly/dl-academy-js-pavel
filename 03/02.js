function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

function multyply(a, b) {
    return a * b;
}

/* 
    Эти четыре функции чистые потому что, 
    возвращают одинаковый результат с одинаковыми аргументами, 
    без побочных эффектов и не используют глобальные переменные
*/    

console.log(add(1, 2));
console.log(add(1, 2));

console.log(add(1, 2) === add(1, 2));

console.log(subtract(4, 3));
console.log(subtract(4, 3));

console.log(subtract(4, 3) === subtract(4, 3));

console.log(divide(6, 5));
console.log(divide(6, 5));

console.log(divide(6, 5) === divide(6, 5));

console.log(multyply(7, 8));
console.log(multyply(7, 8));

console.log(multyply(7, 8) === multyply(7, 8));
