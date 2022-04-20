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

const regExp = {
    email: /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i,
    phone: /^(\s*)?(\+)?([-_():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
    password: /^[0-9a-z]+/i,
    name: /^([a-zа-яё]+[\s]{0,1}[a-zа-яё]+[\s]{0,1}[a-zа-яё]+)$/i,
    location: /^[a-zа-яё\-]+/i,
    subject: /^(?=[a-zа-яё0-9])[a-zа-яё0-9\s]{0,49}[a-zа-яё0-9]$/i,
    message: /^(?=[a-zа-яё0-9])[a-zа-яё0-9\s]{0,299}[a-zа-яё0-9]$/i,
};

const forms = document.querySelectorAll('.js-contactForm');

if (forms) {
    forms.forEach((form) => {
        form.noValidate = true;

        // Валидация чекбокса

        // Думаю здесь уместно добавить валидацию чекбоксов,
        // если их будет несколько в форме и учесть что они могут быть 
        // связаны с определенной кнопкой отправки данных
        const approvedCheckboxes = form.querySelectorAll('.js-approvedCheckbox');

        if (approvedCheckboxes) {
            approvedCheckboxes.forEach((checkbox) => {
                const submitBtn = form.querySelector('.js-submitBtn');

                if (submitBtn) {
                    checkbox.addEventListener('click', () => {
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

        function addElement (className, color, text) {
            const element = document.createElement('span');
            if (element) {
                element.className = className;
                element.style.color = color;
                element.style.fontSize  = '14px';
                element.innerText = text;

                return element;
            }
        }
    
        function delElement () {
            const errorElement = form.querySelectorAll('.error');
            const rightElement = form.querySelectorAll('.right');
    
            if (errorElement) {
                errorElement.forEach((element) => {
                    element.remove();
                });
            }

            if (rightElement) {
                rightElement.forEach((element) => {
                    element.remove();
                });
            }
    
            if (inputs) {
                inputs.forEach((element) => {
                    element.classList.remove('contacts-form__field--error');
                    element.classList.remove('contacts-form__field--right');
                });
            }
        }

        function isNumber(num) {
            if (isNaN(num) || num === '' || num <= 0) {
                return false;
            }
        
            return true;
        }

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
    
            delElement();

            if (inputs) {
                inputs.forEach((input) => {
                    function restyleInputToError () {
                        input.classList.add('contacts-form__field--error');
                    }
        
                    function restyleInputToRight () {
                        input.classList.add('contacts-form__field--right');
                    }
        
                    function validField () {
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
                            validField();
                        }
                    } else if (input.name === 'password') {
                        const validPassword = regExp.password.test(input.value);
        
                        if (validPassword == false) {
                            const element = addElement('error', 'red', 'Your password must contain letters and numbers');
                            input.parentElement.insertAdjacentElement('beforeend', element);
                            restyleInputToError();
                        } else if (validPassword == true) {
                            validField();
                        }
        
                        // Валидация совпадения паролей
        
                        const password = form.querySelector('.password');
                        const passwordRepeat = form.querySelector('.password-repeat');
        
                        if (passwordRepeat) {
                            if (passwordRepeat.value !== password.value && passwordRepeat.value !== '') {
                                const element = addElement('error', 'red', 'Passwords do not match. Please check the identity of the passwords in both fields');
                                passwordRepeat.parentElement.insertAdjacentElement('beforeend', element);
                                passwordRepeat.classList.add('contacts-form__field--error');
                            } else if (passwordRepeat.value === password.value && passwordRepeat.value !== '') {
                                const element = addElement('right', 'green', 'All right');
                                passwordRepeat.parentElement.insertAdjacentElement('beforeend', element);
                                passwordRepeat.classList.add('contacts-form__field--right');
                            }
                        }
                        
                    } else if (input.name === 'name') {
                        const validName = regExp.name.test(input.value);
        
                        if (validName == false) {
                            const element = addElement('error', 'red', 'Your name must contain only letters');
                            input.parentElement.insertAdjacentElement('beforeend', element);
                            restyleInputToError();
                        } else if (validName == true) {
                            validField();
                        }
                    } else if (input.name === 'location') {
                        const validLocation = regExp.location.test(input.value);
        
                        if (validLocation == false) {
                            const element = addElement('error', 'red', 'Please enter a valid location address (your entry is not in the format "Saint-Petersburg" or "Moscow")');
                            input.parentElement.insertAdjacentElement('beforeend', element);
                            restyleInputToError();
                        } else if (validLocation == true) {
                            validField();
                        }
                    } else if (input.name === 'age') {
                        if (isNumber(input.value) === false) {
                            const element = addElement('error', 'red', 'Please enter a correct age');
                            input.parentElement.insertAdjacentElement('beforeend', element);
                            restyleInputToError();
                        } else if (input.value > 0) {
                            validField();
                        }
                    } else if (input.name === 'phone') {
                        const validPhone = regExp.phone.test(input.value);
        
                        if (validPhone == false) {
                            const element = addElement('error', 'red', 'Please enter a valid phone number (your entry is not in the format "+7 977 777 77 77")');
                            input.parentElement.insertAdjacentElement('beforeend', element);
                            restyleInputToError();
                        } else if (validPhone == true) {
                            validField();
                        }
                    } else if (input.name === 'subject') {
                        const validSubject = regExp.subject.test(input.value);
        
                        if (validSubject == false) {
                            const element = addElement('error', 'red', 'Your subject should not contain more than 50 characters');
                            input.parentElement.insertAdjacentElement('beforeend', element);
                            restyleInputToError();
                        } else if (validSubject == true) {
                            validField();
                        }
                    } else if (input.name === 'message') {
                        const validMessage = regExp.message.test(input.value);
        
                        if (validMessage == false) {
                            const element = addElement('error', 'red', 'Your message should not contain more than 300 characters');
                            input.parentElement.insertAdjacentElement('beforeend', element);
                            restyleInputToError();
                        } else if (validMessage == true) {
                            validField();
                        }
                    }
                });
            }
        });
    });
}
