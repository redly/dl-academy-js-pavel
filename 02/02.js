let userInt = prompt('Введите любое целое число');

function factorial(userInt) {
    let result = 1;
    let i = 1;
    
    while (i <= userInt) {
        result = result * i;
        i++;
    }
    console.log(result);
}

factorial(userInt);
