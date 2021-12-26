let defaultName = 'My name is...';
let userName = prompt('Hello, dear User! Please answer, what is your name?', defaultName);

while (userName === '' || userName === null || userName === defaultName) {
    alert('Please, enter your name');
    userName = prompt('Hello, dear User! Please answer, what is your name?', defaultName);
}

let defaultSurname = 'My surname is...';
let userSurname = prompt(`OK, ${userName}, what is your surname?`, defaultSurname);

while (userSurname === '' || userSurname === null || userSurname === defaultSurname) {
    alert('Please, enter your surname');
    userSurname = prompt(`OK, ${userName}, what is your surname?`, defaultSurname);
}

let defaultAge = 18;
let userAge = prompt(`Very well, ${userName} ${userSurname}, what is your age?`, defaultAge);

while (userAge === '' || userAge === null || userAge <= 0) {
    alert('Please, enter your age');
    userAge = prompt(`Very well, ${userName} ${userSurname}, what is your age?`, defaultAge);
}

let user = {userName, userSurname, userAge};

console.log(user);
