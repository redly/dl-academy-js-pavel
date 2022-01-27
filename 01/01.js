let defaultUser = {name: 'My name is...', surname:'My surname is...', age: 18};

function userToConsole() {
    let userName = prompt('Hello, dear User! Please answer, what is your name?', defaultUser.name);

    while (userName === '' || userName === defaultUser.name) {
        alert('Please, enter your name');
        userName = prompt('Hello, dear User! Please answer, what is your name?', defaultUser.name);
    }

    if (userName === null) {
        return;
    }

    let userSurname = prompt(`OK, ${userName}, what is your surname?`, defaultUser.surname);

    while (userSurname === '' || userSurname === defaultUser.surname) {
        alert('Please, enter your surname');
        userSurname = prompt(`OK, ${userName}, what is your surname?`, defaultUser.surname);
    }

    if (userSurname === null) {
        return;
    }

    let userAge = prompt(`Very well, ${userName} ${userSurname}, what is your age?`, defaultUser.age);

    while (userAge === '' || userAge <= 0) {
        alert('Please, enter your age');
        userAge = prompt(`Very well, ${userName} ${userSurname}, what is your age?`, defaultUser.age);
    }

    if (userAge === null) {
        return;
    }

    let user = {userName, userSurname, userAge};

    console.log(user);
}

userToConsole();
