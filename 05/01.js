// Fixed кнопка

let scrollBtn = document.querySelector('.js-scrollToUpBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 1000) {
        scrollBtn.classList.add('body-scroll-btn--is-active');
    } else {
        scrollBtn.classList.remove('body-scroll-btn--is-active');
    };
});

scrollBtn.addEventListener('click', () => { 
    window.scrollTo(0, 0); 
});

// Модальные окна

const popups = document.querySelectorAll('.js-showPopup');
const submitBtns = document.querySelectorAll('.header__btn');
const closeBtns = document.querySelectorAll('.popup__btn-close');

function showPopup (indexOf) {
    submitBtns[indexOf].addEventListener('click', (evt) => {
        evt.preventDefault();
        popups[indexOf].classList.add('popup--is-active');
    });

    closeBtns[indexOf].addEventListener('click', (evt) => {
        evt.preventDefault();
        popups[indexOf].classList.remove('popup--is-active');
    });

    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            popups[indexOf].classList.remove('popup--is-active');
        };
    });
}

showPopup(0);
showPopup(1);
showPopup(2);

// Валидация форм

const form = document.querySelectorAll('.js-contactForm');

const regExp = {
    email: /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i,
    phone: /^(\s*)?(\+)?([-_():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
    password: /^[0-9a-z]+/i,
    name: /^([a-zа-яё]+[\s]{0,1}[a-zа-яё]+[\s]{0,1}[a-zа-яё]+)$/i,
    location: /^[a-zа-яё\-]+/i,
    subject: /^(?=[a-zа-яё0-9])[a-zа-яё0-9\s]{0,49}[a-zа-яё0-9]$/i,
    message: /^(?=[a-zа-яё0-9])[a-zа-яё0-9\s]{0,299}[a-zа-яё0-9]$/i
};

function validateForm (indexOfForm) {

    /* Сброс встроенной браузерной валидации */

    form[indexOfForm].noValidate = true;

    /* Валидация чекбокса */

    const checkbox = form[indexOfForm].querySelector('.custom-checkbox');

    if (checkbox) {
        const submitBtn = form[indexOfForm].querySelector('.js-submit');

        checkbox.addEventListener('click', () => {
            if (checkbox.checked) {
                submitBtn.removeAttribute('disabled');
            } else {
                submitBtn.setAttribute('disabled', true);
            }
        });
    }

    /* Валидация инпутов */

    const inputs = form[indexOfForm].querySelectorAll('.contacts-form__field');

    function addElement (className, color, text) {
        const element = document.createElement('span');
        element.className = className;
        element.style.color = color;
        element.style.fontSize  = '14px';
        element.innerText = text;
        return element;
    }

    function delElement () {
        const errorElement = form[indexOfForm].querySelectorAll('.error');
        const rightElement = form[indexOfForm].querySelectorAll('.right');

        errorElement.forEach((element) => {
            element.remove();
        });

        rightElement.forEach((element) => {
            element.remove();
        });

        inputs.forEach((element) => {
            element.classList.remove('contacts-form__field--error');
            element.classList.remove('contacts-form__field--right');
        });
    }

    form[indexOfForm].addEventListener('submit', (evt) => {
        evt.preventDefault();

        delElement();

        inputs.forEach((input) => {
            function restyleInputToError () {
                input.classList.add('contacts-form__field--error');
            }

            function restyleInputToRight () {
                input.classList.add('contacts-form__field--right');
            }

            function validFunc () {
                const element = addElement('right', 'green', 'All right');
                input.parentElement.insertAdjacentElement('beforeend', element);
                restyleInputToRight();
            }

            if (!input.value) {
                const element = addElement('error', 'red', 'This field is required');
                input.parentElement.insertAdjacentElement('beforeend', element);
                restyleInputToError();
            } else if (input.name === 'email') {
                const validEmail = regExp.email.test(input.value);

                if (validEmail == false) {
                    const element = addElement('error', 'red', 'Please enter a valid email address (your entry is not in the format "somebody@example.com")');
                    input.parentElement.insertAdjacentElement('beforeend', element);
                    restyleInputToError();
                } else if (validEmail == true) {
                    validFunc();
                }
            } else if (input.name === 'password') {
                const validPassword = regExp.password.test(input.value);

                if (validPassword == false) {
                    const element = addElement('error', 'red', 'Your password must contain letters and numbers');
                    input.parentElement.insertAdjacentElement('beforeend', element);
                    restyleInputToError();
                } else if (validPassword == true) {
                    validFunc();
                }

                /* Валидация совпадения паролей */

                const password = form[indexOfForm].querySelector('.password');
                const passwordRepeat = form[indexOfForm].querySelector('.password-repeat');

                if (passwordRepeat.value !== password.value && passwordRepeat.value !== '') {
                    const element = addElement('error', 'red', 'Passwords do not match. Please check the identity of the passwords in both fields');
                    passwordRepeat.parentElement.insertAdjacentElement('beforeend', element);
                    passwordRepeat.classList.add('contacts-form__field--error');
                } else if (passwordRepeat.value === password.value && passwordRepeat.value !== '') {
                    const element = addElement('right', 'green', 'All right');
                    passwordRepeat.parentElement.insertAdjacentElement('beforeend', element);
                    passwordRepeat.classList.add('contacts-form__field--right');
                }
            } else if (input.name === 'name') {
                const validName = regExp.name.test(input.value);

                if (validName == false) {
                    const element = addElement('error', 'red', 'Your name must contain only letters');
                    input.parentElement.insertAdjacentElement('beforeend', element);
                    restyleInputToError();
                } else if (validName == true) {
                    validFunc();
                }
            } else if (input.name === 'location') {
                const validLocation = regExp.location.test(input.value);

                if (validLocation == false) {
                    const element = addElement('error', 'red', 'Please enter a valid location address (your entry is not in the format "Saint-Petersburg" or "Moscow")');
                    input.parentElement.insertAdjacentElement('beforeend', element);
                    restyleInputToError();
                } else if (validLocation == true) {
                    validFunc();
                }
            } else if (input.name === 'age') {
                if (input.value <= 0) {
                    const element = addElement('error', 'red', 'Please enter a correct age');
                    input.parentElement.insertAdjacentElement('beforeend', element);
                    restyleInputToError();
                } else if (input.value > 0) {
                    validFunc();
                }
            } else if (input.name === 'phone') {
                const validPhone = regExp.phone.test(input.value);

                if (validPhone == false) {
                    const element = addElement('error', 'red', 'Please enter a valid phone number (your entry is not in the format "+7 977 777 77 77")');
                    input.parentElement.insertAdjacentElement('beforeend', element);
                    restyleInputToError();
                } else if (validPhone == true) {
                    validFunc();
                }
            } else if (input.name === 'subject') {
                const validSubject = regExp.subject.test(input.value);

                if (validSubject == false) {
                    const element = addElement('error', 'red', 'Your subject should not contain more than 50 characters');
                    input.parentElement.insertAdjacentElement('beforeend', element);
                    restyleInputToError();
                } else if (validSubject == true) {
                    validFunc();
                }
            } else if (input.name === 'message') {
                const validMessage = regExp.message.test(input.value);

                if (validMessage == false) {
                    const element = addElement('error', 'red', 'Your message should not contain more than 300 characters');
                    input.parentElement.insertAdjacentElement('beforeend', element);
                    restyleInputToError();
                } else if (validMessage == true) {
                    validFunc();
                }
            };
        });
    });
}

validateForm(0);
validateForm(1);
validateForm(2);
