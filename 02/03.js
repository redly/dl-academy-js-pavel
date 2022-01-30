let userInt = prompt('Введите любое целое число');

function checkUserInt() {
    while (isNaN(userInt) || userInt === '' || userInt === ' ' || userInt <= 0) {
        if (userInt === null) {
            return;
        }
        alert('Введите корректное число');
        userInt = prompt('Введите любое целое число');
    }
    return userInt;
}

checkUserInt();

let userPow = prompt('Введите степень в которую нужно возвести число');

function checkUserPow() {
    while (isNaN(userPow) || userPow === '' || userPow === ' ' || userPow <= 0) {
        if (userPow === null) {
            return;
        }
        alert('Введите корректное число');
        userPow = prompt('Введите любое целое число');
    }
    return userPow;
}

checkUserPow();

function getPow(userInt, userPow) {
    let result = userInt;

    for (let i = 1; i < userPow; i++) {
        result *= userInt;
    }
    console.log(result);
}

getPow(userInt, userPow);
