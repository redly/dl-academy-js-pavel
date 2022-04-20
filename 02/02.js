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

function calcFactorial(num) {
    let result = 1;
    let i = 1;
    
    while (i <= num) {
        result = result * i;
        i++;
    }

    if (result != 1) {
        return result;
    }

    return;
}

const userInput = getUserInput('Введите любое целое число');
const userFactorial = calcFactorial(userInput);

console.log(userFactorial);
