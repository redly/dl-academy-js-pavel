
// Функция возведения в степень для задания
// Но более простой и лучший вариант через Math.pow

function calculatePow(num, pow) {
    let result = num;

    for (let i = 1; i < pow; i++) {
        result *= num;
    }

    return result;
}

const userNum = getUserInput('Введите любое целое число');
const userPow = getUserInput('Введите степень в которую нужно возвести число');

const result = calculatePow(userNum, userPow);

console.log(result);

console.log(Math.pow(userNum, userPow)); // Если оба значения null то выводит NaN
