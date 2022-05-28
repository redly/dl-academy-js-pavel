// Fixed кнопка

const scrollBtn = document.querySelector('.js-scrollToUpBtn');

if (scrollBtn) {
    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('body-scroll-btn--is-active', (window.scrollY > 1000));
    });

    scrollBtn.addEventListener('click', () => { 
        window.scrollTo(0, 0); 
    });
}

// Модальные окна

const btns = document.querySelectorAll('.js-modalOpen');
const closeBtns = document.querySelectorAll('.js-modalClose');

if (btns) {
    btns.forEach((btn) => {
        btn.addEventListener('click', (evt) => {
            evt.preventDefault();

            const modalId = evt.target.dataset.modal;
            const $modal = document.getElementById(modalId);

            if ($modal) {
                $modal.classList.add('modal--is-open');
            }
        });
    });
}

if (closeBtns) {
    closeBtns.forEach((btn) => {
        btn.addEventListener('click', (evt) => {
            evt.preventDefault();

            const $modal = document.querySelector('.modal--is-open');

            if ($modal) {
                $modal.classList.remove('modal--is-open');
            }
        });
    });
}

document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        const $modal = document.querySelector('.modal--is-open');

        if ($modal) {
            $modal.classList.remove('modal--is-open');
        }
    }
});

// Валидация форм

const forms = document.querySelectorAll('.js-contactForm');

if (forms) {
    forms.forEach((form) => {
        form.noValidate = true;

        // Валидация чекбокса

        const approvedCheckboxes = form.querySelectorAll('.js-approvedCheckbox');

        if (approvedCheckboxes) {
            approvedCheckboxes.forEach((checkbox) => {
                const submitBtn = form.querySelector('.js-submitBtn');

                if (submitBtn) {
                    checkbox.addEventListener('click', () => {

                        // Не сработало
                        // submitBtn.setAttribute('disabled', !checkbox.checked);

                        if (checkbox.checked) {
                            submitBtn.removeAttribute('disabled');
                        } else {
                            submitBtn.setAttribute('disabled', true);
                        }
                    });
                }
            });    
        }

        // Валидация инпутов

        const inputs = form.querySelectorAll('.js-validFormField');

        function addElement(className, text) {
            const element = document.createElement('span');

            if (element) {
                element.className = `form-message ${className}`;
                element.innerText = text;

                return element;
            }
        }
    
        function delElement() {
            const removeElement = form.querySelectorAll('.form-message, .error, .right');
    
            if (removeElement) {
                removeElement.forEach((element) => {
                    element.remove();
                });
            }    
    
            if (inputs) {
                inputs.forEach((element) => {
                    element.classList.remove('contacts-form__field--error', 'contacts-form__field--right');
                });
            }
        }

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
    
            delElement();

            if (inputs) {
                inputs.forEach((input) => {
                    function addClassToInput(className) {
                        input.classList.add(className);
                    }

                    function validateField(className, text) {
                        const element = addElement(className, text);
                        
                        input.parentElement.insertAdjacentElement('beforeend', element);

                        if (className === 'error') {
                            addClassToInput('contacts-form__field--error');
                        } else  if (className === 'right') {
                            addClassToInput('contacts-form__field--right');
                        }
                    }

                    function validateInput(regExp, text) {    
                        if (regExp === false) {
                            validateField('error', text);
                        } else {
                            validateField('right', messages.right);
                        }
                    }

                    const messages = {
                        right: 'All right',
                        empty: 'This field is required',
                        email: 'Please enter a valid email address (your entry is not in the format "somebody@example.com")',
                        password: {
                            isFalse: 'Your password must contain letters and numbers',
                            repeat: 'Passwords do not match. Please check the identity of the passwords in both fields',
                        },
                        name: 'Your name must contain only letters',
                        phone: 'Please enter a valid phone number (your entry is not in the format "+7 977 777 77 77")',
                        location: 'Please enter a valid location address (your entry is not in the format "Saint-Petersburg" or "Moscow")',
                        age: 'Please enter a correct age',
                        subject: 'Your subject should not contain more than 50 characters',
                        message: 'Your message should not contain more than 300 characters',
                    };

                    // В функцию validateField() не получается добавить деструктурированные объекты
                    // в качестве параметров

                    /*
                    const errorMessages = {
                        emptyInput: invalidFields.empty,
                        invalidEmail: invalidFields.email,
                        invalidPassword: {
                            falsePassword: invalidFields.password.isFalse,
                            repeatPassword: invalidFields.password.repeat,
                        },
                        invalidName: invalidFields.name,
                        invalidPhone: invalidFields.phone,
                        invalidLocation: invalidFields.location,
                        invalidAge: invalidFields.age,
                        invalidSubject: invalidFields.subject,
                        invalidMessage: invalidFields.message,
                    };
                    */

                    const regExp = {
                        email: /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i,
                        phone: /^(\s*)?(\+)?([-_():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                        password: /^[0-9a-z]+/i,
                        name: /^([a-zа-яё]+[\s]{0,1}[a-zа-яё]+[\s]{0,1}[a-zа-яё]+)$/i,
                        location: /^[a-zа-яё\-]+/i,
                        subject: /^(?=[a-zа-яё0-9])[a-zа-яё0-9\s]{0,49}[a-zа-яё0-9]$/i,
                        message: /^(?=[a-zа-яё0-9])[a-zа-яё0-9\s]{0,299}[a-zа-яё0-9]$/i,
                    };

                    const regExpTest = {
                        validEmail: regExp.email.test(input.value),
                        validPhone: regExp.phone.test(input.value),
                        validPassword: regExp.password.test(input.value),
                        validName: regExp.name.test(input.value),
                        validLocation: regExp.location.test(input.value),
                        validSubject: regExp.subject.test(input.value),
                        validMessage: regExp.message.test(input.value),
                    };

                    if (!input.value) {
                        validateField('error', messages.empty);
                    } else if (input.name === 'email') {

                        // Правильно ли передавать в параметры функции вызов свойства объекта?
                        validateInput(regExpTest.validEmail, messages.email);
                    } else if (input.name === 'password') {
                        validateInput(regExpTest.validPassword, messages.password.isFalse);                    
                    } else if (input.name === 'password-repeat') {
                        const password = form.querySelector('.password');
                        const passwordRepeat = form.querySelector('.password-repeat');
        
                        if (passwordRepeat) {
                            if (passwordRepeat.value !== password.value && passwordRepeat.value !== '') {
                                validateField('error', messages.password.repeat);
                            } else if (passwordRepeat.value === password.value && passwordRepeat.value !== '') {
                                validateField('right', messages.right);
                            }
                        }
                    } else if (input.name === 'name') {
                        validateInput(regExpTest.validName, messages.name);
                    } else if (input.name === 'location') {
                        validateInput(regExpTest.validLocation, messages.location);
                    } else if (input.name === 'age') {
                        if (isNumber(input.value) === false) {
                            validateField('error', messages.age);
                        } else {
                            validateField('right', messages.right);
                        }
                    } else if (input.name === 'phone') {
                        validateInput(regExpTest.validPhone, messages.phone);
                    } else if (input.name === 'subject') {
                        validateInput(regExpTest.validSubject, messages.subject);
                    } else if (input.name === 'message') {
                        validateInput(regExpTest.validMessage, messages.message);
                    }
                });
            }
        });
    });
}
