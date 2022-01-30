let rand = Math.floor(1 + Math.random() * 10);
let userNum = prompt('Угадайте число от 1 до 10');

function checkUserNum() {
    while (isNaN(userNum) || userNum === '' || userNum === ' ' || userNum <= 0) {
        if (userNum === null) {
            return;
        }
        alert('Введите корректное число');
        userNum = prompt('Угадайте число от 1 до 10');
    }
}

checkUserNum();

function guessNum() {
    while (userNum != rand) {
        if (userNum === null) {
            return;
        }
        if (userNum < rand) {
            alert('Вы ввели число меньше загаданного');
            userNum = prompt('Угадайте число от 1 до 10');
        }

        if (userNum > rand) {
            alert('Вы ввели число больше загаданного');
            userNum = prompt('Угадайте число от 1 до 10');
        } 
    }
    return alert(`Вы угадали, это число - ${rand}!`);
}

guessNum();
