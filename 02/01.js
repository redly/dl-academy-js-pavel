const userInput = getUserInput('Введите любое целое число');
const userInputArr = [...Array(Number(userInput)).keys()];

console.log(userInputArr.map(number => ++number).filter((number) => number % 4 !== 0));
