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

for (i = 1; i <= userInt; i++) {
    if (i % 4 !== 0) {
        console.log(i);
    }
}
