let userInt = prompt('Введите любое целое число');
let userPow = prompt('Введите степень в которую нужно возвести число');


function pow(userInt, userPow) {
    let result = userInt;

    for (let i = 1; i < userPow; i++) {
        result *= userInt;
    }
    console.log(result);
}

pow(userInt, userPow);
