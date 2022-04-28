const defaultUser = {
    name: 'My name is...', 
    surname:'My surname is...', 
    age: 'My age is...',
};

const questions = {
    userName: {
        question: 'Hello, dear User! Please answer, what is your name?',
        errorMessage: 'Please, enter your name',
        defaultAnswer: defaultUser.name
    },
    userSurname: {
        question: 'OK, what is your surname?',
        errorMessage: 'Please, enter your surname',
        defaultAnswer: defaultUser.surname
    },
    userAge: {
        question: 'Very well, what is your age?',
        errorMessage: 'Please, enter your age',
        defaultAnswer: defaultUser.age
    },
};

function customPrompt({ question, errorMessage, defaultAnswer }) {
    let answer = prompt(question, defaultAnswer);

    while (answer === '' || answer === defaultAnswer) {
        alert(errorMessage);
        answer = prompt(question, defaultAnswer);
    }

    return answer;
}

let answers = {};

Object.keys(questions).forEach((key) => {
    answers[key] = customPrompt(questions[key]);
    if (isNull(answers[key]) === true) {
        return;
    }
});

console.log(answers);
