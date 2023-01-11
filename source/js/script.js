/* Скрипт для открытия меню в мобильной версии */

const menuBtns = document.querySelectorAll('.js-toggleMenu');

menuBtns?.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
        const menuId = evt.currentTarget.dataset?.menu;
        const menu = document.getElementById(menuId);

        menu?.classList.toggle('menu--visible');
    });
});

const mediaQueryList = window.matchMedia('(min-width: 768px)');

mediaQueryList.addEventListener('change', (evt) => {
    const menu = document.querySelector('.menu--visible');

    if (evt.matches) {
        menu?.classList.remove('menu--visible');
    }
});

/* Инициализация swiper js */

const mainSlider = document.querySelector('.swiper-main-slider');

if (mainSlider) {
    const mainSwiper = new Swiper('.swiper-main-slider', {
        initialSlide: Number(localStorage.getItem('activeSlide')) || 0,

        on: {
            activeIndexChange: function () {
                localStorage.setItem('activeSlide', this.realIndex);
            },
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

const porfolioSlider = document.querySelector('.swiper-portfolio-slider');

if (porfolioSlider) {
    const portfolioSwiper = new Swiper('.swiper-portfolio-slider', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

// Модальные окна

const modalBtns = document.querySelectorAll('.js-toggleModal');

modalBtns?.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
        evt.preventDefault();

        const modalId = evt.currentTarget.dataset?.modal;
        const $modal = document.getElementById(modalId);

        $modal?.classList.toggle('modal--is-open');
    });
});

document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        const $modal = document.querySelector('.modal--is-open');

        $modal?.classList.remove('modal--is-open');
    }
});

// Валидация форм

const forms = document.querySelectorAll('.js-contactForm');

forms?.forEach((form) => {
    form.noValidate = true;

    // Валидация чекбоксов

    const approvedCheckboxes = form.querySelectorAll('.js-approvedCheckbox');

    approvedCheckboxes?.forEach((checkbox) => {
        checkbox.addEventListener('click', () => {
            const submitBtn = form.querySelector('.js-submitBtn');

            if (checkbox.checked) {
                submitBtn?.removeAttribute('disabled');
            } else {
                submitBtn?.setAttribute('disabled', true);
            }
        });
    });

    // Валидация инпутов

    const inputs = form.querySelectorAll('.js-validFormField');

    function delElement() {
        const removeElement = form.querySelectorAll('.contacts-form__message, .contacts-form__message--error, .contacts-form__message--right');

        removeElement?.forEach((element) => {
            element.remove();
        });

        inputs?.forEach((element) => {
            element.classList.remove('custom-form-field--error', 'custom-form-field--right');
        });
    }

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        delElement();

        inputs?.forEach((input) => {
            const formMsgClassNames = {
                msg: 'contacts-form__message',
                errorMsg: 'contacts-form__message--error',
                rightMsg: 'contacts-form__message--right',
            };

            const formMsg = formMsgClassNames.msg;
            const error = formMsgClassNames.errorMsg;
            const right = formMsgClassNames.rightMsg;

            const fieldClassNames = {
                error: 'contacts-form__field--error',
                right: 'contacts-form__field--right',
            };

            const errorField = fieldClassNames.error;
            const rightField = fieldClassNames.right;

            function validateField(className, text) {
                // Создание подписи под полем
                const element = document.createElement('span');

                element.className = `${formMsg} ${className}`;
                element.innerText = text;

                input.parentElement?.insertAdjacentElement('beforeend', element);

                // Окрашивание рамки поля в зависимости от подписи
                if (className === error) {
                    input.classList.add(errorField);
                } else  if (className === right) {
                    input.classList.add(rightField);
                }
            }

            function validateInput(regExp, text) {
                if (!input.value) {
                    validateField(error, messages.empty);
                } else if (regExp === false) {
                    validateField(error, text);
                } else {
                    validateField(right, messages.right);
                }
            }

            function isPositiveNumber(num) {
                if (isNaN(num) || num === '' || num <= 0) {
                    return false;
                }

                return true;
            }

            const messages = {
                right: 'All right',
                empty: 'This field is required',
                email: 'Please enter a valid email address (your entry is not in the format "somebody@example.com" or "somebody@local")',
                password: {
                    isFalse: 'Your password must contain letters and numbers',
                    repeat: 'Passwords do not match. Please check the identity of the passwords in both fields',
                },
                phone: 'Please enter a valid phone number (your entry is not in the format "+7 977 777 77 77")',
                age: 'Please enter a correct age',
            };

            const regExp = {
                email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                phone: /^(\s*)?(\+)?([-_():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                password: /^[0-9a-z]+/i,
            };

            const regExpTest = {
                validEmail: regExp.email.test(input.value),
                validPhone: regExp.phone.test(input.value),
                validPassword: regExp.password.test(input.value),
            };

            /*
                Попробовал поместить проверки в data атрибуты,
                но метод test() не работает с input.dataset.pattern например,
                т.к. он возвращает строку, а не объект.
            */

            switch (input.type) {
                case 'email':
                    validateInput(regExpTest.validEmail, messages.email);
                    break;
                case 'password':
                    if (input.name === 'password') {
                        validateInput(regExpTest.validPassword, messages.password.isFalse);
                    } else if (input.name === 'password-repeat') {
                        const password = form.querySelector('.password');
                        const passwordRepeat = form.querySelector('.password-repeat');

                        if (!input.value) {
                            validateField(error, messages.empty);
                        } else if (passwordRepeat?.value !== password?.value && passwordRepeat?.value !== '') {
                            validateField(error, messages.password.repeat);
                        } else if (passwordRepeat?.value === password?.value && passwordRepeat?.value !== '') {
                            validateField(right, messages.right);
                        }
                    }

                    break;
                case 'tel':
                    validateInput(regExpTest.validPhone, messages.phone);
                    break;
                case 'number':
                    if (input.name === 'age') {
                        if (!input.value) {
                            validateField(error, messages.empty);
                        } else if (isPositiveNumber(input.value) === false) {
                            validateField(error, messages.age);
                        } else {
                            validateField(right, messages.right);
                        }
                    }

                    break;
                default:
                    validateInput();
                    break;
            }
        });
    });
});

// Fixed кнопка scroll-btn-up

const scrollBtn = document.querySelector('.js-scrollToUpBtn');

window.addEventListener('scroll', () => {
    scrollBtn?.classList.toggle('scroll-btn-up--is-active', (window.scrollY > 1000));
});

scrollBtn?.addEventListener('click', () => {
    window.scrollTo(0, 0);
});

// Input file name

const fileInputs = document.querySelectorAll('.js-setFileName');

fileInputs?.forEach((input) => {
    input.addEventListener('change', (evt) => {
        const file = input.files[0];
        const fileName = file?.name;
        const fileNameElement = document.querySelector('.custom-file__name');

        function checkName(name) {
            if (!name) {
                const errorMsg = 'File is not chosen!';

                return errorMsg;
            }

            return;
        }

        function sliceName(name) {
            if (name.length > 20) {
                const shortName = name.slice(0, 15) + "..." + name.split('.').pop();

                return shortName;
            }

            return name;
        }

        fileNameElement.innerText = checkName(fileName) || sliceName(fileName);

        /*
        if (file) {
            const imageId = evt.currentTarget.dataset?.img;
            const image = document.getElementById(imageId);

            image.src = window.URL.createObjectURL(file);
        }
        */
    });
});
