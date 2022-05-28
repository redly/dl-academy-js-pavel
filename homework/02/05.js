function guessNum(num) {
    let rand = Math.floor(1 + Math.random() * 10);

    while (isNumber(num) === false) {
        if (isNull(num) === true) {
            return;
        }
        alert(`Вы ввели "${num}"! Пожалуйста введите корректное число!`);
        num = prompt('Угадайте число от 1 до 10');
    }

    while (Number(num) !== rand) {
        if (isNull(num) === true) {
            return;
        }
        alert(`Вы ввели число ${num < rand ? 'меньше' : 'больше'} загаданного`);
        num = prompt('Угадайте число от 1 до 10');
    }

    return alert(`Вы угадали, это число - ${rand}!`);
}

// Странно что вроде бы переменная userInput должна принимать функцию getUserInput(),
// в которой уже есть проверка на isNumber, но она не срабатывает

// const userInput = getUserInput('Угадайте число от 1 до 10');

const userInput = prompt('Угадайте число от 1 до 10');

guessNum(userInput);
