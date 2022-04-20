function isNumber(num) {
    if (isNaN(num) || num === '' || num <= 0) {
        return false;
    };

    return true;
}

function isNull(num) {
    if (num === null) {
        return true;
    };
    
    return false;
}

function checkUserAge() {
    let userAge = prompt("Укажите ваш возраст...");

    if (isNull(userAge) === true) {
        return;
    } else if (isNumber(userAge) === false) {
        alert(`Вы ввели "${userAge}"! Пожалуйста введите корректный возраст!`);
        checkUserAge();
    } else if (userAge < 18) {
        alert(`Если ваш возраст ${userAge} лет, то вы не сможете продолжить!`);
        checkUserAge();
    } else if (userAge >= 18) {
        alert('Отлично, можете продолжать!');
    };
}

checkUserAge();
