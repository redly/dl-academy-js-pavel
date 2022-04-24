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
