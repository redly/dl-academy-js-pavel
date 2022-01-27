let userInt = prompt('Введите любое целое число');

for (i = 1; i <= userInt; i++) {
    if (i % 4 !== 0) {
        console.log(i);
    }
}
