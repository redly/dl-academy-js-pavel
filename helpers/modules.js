export function isNumber(num) {
    if (isNaN(num) || num === '' || num <= 0) {
        return false;
    }

    return true;
}

export function isNull(num) {
    if (num === null) {
        return true;
    }
    
    return false;
}

export function getUserInput(msg) {
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
