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

function factorial(userInt) {
    let result = 1;
    let i = 1;
    
    while (i <= userInt) {
        result = result * i;
        i++;
    }
    if (result != 1) {
        console.log(result);
    } else {
        return;
    }
}

checkUserInt();
factorial(userInt);
