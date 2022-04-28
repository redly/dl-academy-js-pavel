function calcFactorial(num) {
    let result = 1;
    let i = 1;
    
    while (i <= num) {
        result = result * i;
        i++;
    }

    return result;
}

const userInput = getUserInput('Введите любое целое число');
const userFactorial = calcFactorial(userInput);

console.log(userFactorial);
