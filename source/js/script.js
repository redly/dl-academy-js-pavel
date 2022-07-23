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

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    mainSwiper?.on('activeIndexChange', function () {
        localStorage.setItem('activeSlide', mainSwiper.realIndex);
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

    const formMsgClassNames = {
        msg: 'contacts-form__message',
        errorMsg: 'contacts-form__message--error',
        rightMsg: 'contacts-form__message--right',
    };

    const formMsg = formMsgClassNames.msg;
    const error = formMsgClassNames.errorMsg;
    const right = formMsgClassNames.rightMsg;

    function addElement(className, text) {
        const element = document.createElement('span');

        element.className = `${formMsg} ${className}`;
        element.innerText = text;

        return element;
    }

    function delElement() {
        const removeElement = form.querySelectorAll('.contacts-form__message, .contacts-form__message--error, .contacts-form__message--right');

        removeElement?.forEach((element) => {
            element.remove();
        });

        inputs?.forEach((element) => {
            element.classList.remove('contacts-form__field--error', 'contacts-form__field--right');
        });
    }

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        delElement();

        inputs?.forEach((input) => {
            function addClassToInput(className) {
                input.classList.add(className);
            }

            function validateField(className, text) {
                const element = addElement(className, text);

                input.parentElement?.insertAdjacentElement('beforeend', element);

                if (className === error) {
                    addClassToInput('contacts-form__field--error');
                } else  if (className === right) {
                    addClassToInput('contacts-form__field--right');
                }
            }

            function validateInput(regExp, text) {
                if (regExp === false) {
                    validateField(error, text);
                } else {
                    validateField(right, messages.right);
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
                validateField(error, messages.empty);
            } else if (input.name === 'email') {
                validateInput(regExpTest.validEmail, messages.email);
            } else if (input.name === 'password') {
                validateInput(regExpTest.validPassword, messages.password.isFalse);
            } else if (input.name === 'password-repeat') {
                const password = form.querySelector('.password');
                const passwordRepeat = form.querySelector('.password-repeat');

                if (passwordRepeat?.value !== password?.value && passwordRepeat?.value !== '') {
                    validateField(error, messages.password.repeat);
                } else if (passwordRepeat?.value === password?.value && passwordRepeat?.value !== '') {
                    validateField(right, messages.right);
                }
            } else if (input.name === 'name') {
                validateInput(regExpTest.validName, messages.name);
            } else if (input.name === 'location') {
                validateInput(regExpTest.validLocation, messages.location);
            } else if (input.name === 'age') {
                if (isNumber(input.value) === false) {
                    validateField(error, messages.age);
                } else {
                    validateField(right, messages.right);
                }
            } else if (input.name === 'phone') {
                validateInput(regExpTest.validPhone, messages.phone);
            } else if (input.name === 'subject') {
                validateInput(regExpTest.validSubject, messages.subject);
            } else if (input.name === 'message') {
                validateInput(regExpTest.validMessage, messages.message);
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
