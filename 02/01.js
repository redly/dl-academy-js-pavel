// Пока не получается импортировать функцию из другого js файла без сборщика
// import { isNumber, isNull } from '../helpers/modules.js';

function isNumber(num) {
    if (isNaN(num) || num === '' || num <= 0) {
        return false;
    }

    return true;
}

function isNull(num) {
    if (num === null) {
        return true;
    }
    
    return false;
}

function getUserInput(msg) {
    let userNum = prompt(msg);

    while (isNumber(userNum) === false) {
        if (isNull(userNum) === true) {
            return;
        }
        alert('Введите корректное число');
        userNum = prompt(msg);
    }

    return userNum;
}

const userInput = getUserInput('Введите любое целое число');

for (i = 1; i <= userInput; i++) {
    if (i % 4 !== 0) {
        console.log(i);
    }
}

// Этот код почему-то не работает
const userInputArr = [...Array(userInput).keys()];

console.log(userInputArr.map(number => ++number).filter((number) => number % 4 !== 0));

console.log([...Array(userInput).keys()].map(number => ++number).filter((number) => number % 4 !== 0)); // [1]

// Если вместо переменной userNum или userInput подставить число, то все ок
console.log([...Array(12).keys()].map(number => ++number).filter((number) => number % 4 !== 0)); // [1, 2, 3, 5, 6, 7, 9, 10, 11]
