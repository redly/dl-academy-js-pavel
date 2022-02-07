function checkUserAge() {
    const age = prompt("Укажите ваш возраст...");
    if (isNaN(age) || age === '' || age === ' ') {
        alert(`Вы ввели " ${age} "! Пожалуйста введите корректный возраст!`);
        checkUserAge();
    } else if (age < 18 && age !== null) {
        alert(`Если ваш возраст ${age} лет, то вы не можете продолжить!`);
        checkUserAge();
    } else if (age === null) {
        return;
    } else {
        alert('Отлично, можете продолжать!');
    }
}

checkUserAge();
