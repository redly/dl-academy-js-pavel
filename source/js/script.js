// Скрипт для открытия меню в мобильной версии

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

// Инициализация swiper js

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

// Fixed кнопка scroll-btn-up

const scrollBtn = document.querySelector('.js-scrollToUpBtn');

window.addEventListener('scroll', () => {
    scrollBtn?.classList.toggle('scroll-btn-up--is-active', (window.scrollY > 1000));
});

scrollBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

// Валидация форм на стороне клиента

const forms = document.querySelectorAll('.js-contactForm');
const formMsgClassNames = {
    msg: 'contacts-form__message',
    errorMsg: 'contacts-form__message--error',
    rightMsg: 'contacts-form__message--right',
};
const formMsg = formMsgClassNames.msg;
const error = formMsgClassNames.errorMsg;
const right = formMsgClassNames.rightMsg;
const fieldClassNames = {
    error: 'custom-form-field--error',
    right: 'custom-form-field--right',
};
const errorField = fieldClassNames.error;
const rightField = fieldClassNames.right;
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

// Исходное значения счетчика для невалидных input
let errorsCounter = 0;

// Удаление элемента(подписи) и цвета рамки поля перед следующей валидацией
function delElement(form, inputs) {
    const removeElement = form.querySelectorAll('.contacts-form__message, .contacts-form__message--error, .contacts-form__message--right');

    removeElement?.forEach((element) => {
        element.remove();
    });

    inputs?.forEach((element) => {
        element.classList.remove('custom-form-field--error', 'custom-form-field--right');
    });

    // Возврат счетчика в исходное значение при удалении элементов невалидных input
    errorsCounter = 0;
}

// Создание подписи для input
function validateField(input, className, text) {
    const element = document.createElement('span');

    element.className = `${formMsg} ${className}`;
    element.innerText = text;

    input?.parentElement?.insertAdjacentElement('beforeend', element);

    // Окрашивание рамки input в зависимости от подписи
    if (className === error) {
        input?.classList.add(errorField);

        // Каждый невалидный input увеличивает счетчик
        errorsCounter += 1;
    } else  if (className === right) {
        input?.classList.add(rightField);
    }
}

forms?.forEach((form) => {
    form.noValidate = true;

    const inputs = form.querySelectorAll('.js-validFormField');
    const approvedCheckboxes = form.querySelectorAll('.js-approvedCheckbox');

    // Disabled для submit кнопки если чекбокс не выбран
    approvedCheckboxes?.forEach((checkbox) => {
        checkbox.addEventListener('click', () => {
            const submitBtn = form.querySelector('.js-submitBtn');

            checkbox.checked ? submitBtn?.removeAttribute('disabled') : submitBtn?.setAttribute('disabled', true);
        });
    });

    // Валидация всех input в форме при клике на submit
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        delElement(form);

        inputs?.forEach((input) => {
            const regExpTest = {
                validEmail: regExp.email.test(input.value),
                validPhone: regExp.phone.test(input.value),
                validPassword: regExp.password.test(input.value),
            };

            // Валидация input в зависимости от регулярного выражения
            function validateInput(regExp, text) {
                if (!input.value) {
                    validateField(input, error, messages.empty);
                } else if (regExp === false) {
                    validateField(input, error, text);
                } else {
                    validateField(input, right, messages.right);
                }
            }

            // Проверка input на положительное число
            function isPositiveNumber(num) {
                if (isNaN(num) || num === '' || num <= 0) {
                    return false;
                }

                return true;
            }

            switch (input.type) {
                case 'email':
                    validateInput(regExpTest.validEmail, messages.email);
                    break;
                case 'password':
                    if (input.name === 'password' || input.name === 'oldPassword' || input.name === 'newPassword') {
                        validateInput(regExpTest.validPassword, messages.password.isFalse);
                    } else if (input.name === 'password-repeat' || input.name === 'newPasswordRepeat') {
                        const password = form.querySelector('.password');
                        const passwordRepeat = form.querySelector('.password-repeat');

                        if (!input.value) {
                            validateField(input, error, messages.empty);
                        } else if (passwordRepeat?.value !== password?.value && passwordRepeat?.value !== '') {
                            validateField(input, error, messages.password.repeat);
                        } else if (passwordRepeat?.value === password?.value && passwordRepeat?.value !== '') {
                            validateField(input, right, messages.right);
                        }
                    }

                    break;
                case 'tel':
                    validateInput(regExpTest.validPhone, messages.phone);
                    break;
                case 'number':
                    if (input.name === 'age') {
                        if (!input.value) {
                            validateField(input, error, messages.empty);
                        } else if (isPositiveNumber(input.value) === false) {
                            validateField(input, error, messages.age);
                        } else {
                            validateField(input, right, messages.right);
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

// Взаимодейсвтие с сервером

const BASE_URL = 'https://academy.directlinedev.com';

// const API_VERS = '?v=1.0';
const loaderTitle = {
    load: 'Loading',
    send: 'Sending',
};
const loader = loaderTitle.load;
const sender = loaderTitle.send;

// Показ/скрытие preloader
function toggleLoader(title) {
    const loader = document.querySelector('.js-preloader');

    setTitleToLoader(loader, title);
    loader?.classList.toggle('preloader--is-hidden');
}

// Установка заголовка для loader в зависимости от типа операции (load / send)
function setTitleToLoader(loader, title) {
    if (loader) {
        const loaderTitle = loader?.querySelector('.js-setPreloaderTitle');
        loaderTitle.innerText = title;
    }
}

// Отправка формы регистрации пользователя с последующей валидацией на сервере

const registerForm = document.forms.registerForm;
const registerModal = document.getElementById('registerModal');
const onSuccessModal = document.querySelector('.js-toggleModalSuccessfully');
const onErrorModal = document.querySelector('.js-toggleModalError');

// Открытие/закрытие модального окна
function interactionModal(modal) {
    modal?.classList.toggle('modal--is-open');
}

// Запуск setTimeout() для модалок со статусом отправки формы
function scheduleCall(modal) {
    setTimeout(() => {
        interactionModal(modal);
    }, 2000);
}

// Функция обработки серверных запросов
function sendData({ url, method, headers, body }) {
    const settings = {
        method,
        body,
        headers
    };

    // return fetch(`${BASE_URL}/${url}${API_VERS}`, settings);
    return fetch(`${BASE_URL}/${url}`, settings);
}

// Логика регистрации пользователя
function register(evt) {
    evt.preventDefault();
    const body = formFieldProcessing({ form: registerForm });

    sendData({
        url: 'api/users',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((response) => {
        if (response.success) {
            toggleLoader(sender);
            interactionModal(registerModal);
            interactionModal(onSuccessModal);
            scheduleCall(onSuccessModal);
        } else {
            throw response;
        }
    })
    .catch((err, response) => {
        if (err.errors) {
            toggleLoader(sender);
            errorHandler(err.errors, registerForm);
        } else {
            errorModalHandler({ response });
            toggleLoader(sender);
            interactionModal(onErrorModal);
            scheduleCall(onErrorModal);
        }
    });
}

// Вставка текста ошибки в окно уведомления о результате отправки на сервер
function errorModalHandler({ response }, text) {
    const modalErrorTitle = onErrorModal?.querySelector('.modal__title');

    if (response) {
        modalErrorTitle.innerText = `The form was sent but the server transmits an error: ${response.status} ${response.statusText}`;
    } else if (text) {
        modalErrorTitle.innerText = `The form was sent but the server transmits an error "${text}"`;
    } else {
        modalErrorTitle.innerText = 'The form was sent but the server transmits an error';
    }
}

// Валидация input на стороне сервера
function errorHandler(errors, formNode) {
    if (Object.keys(errors).length) {
        const inputsForm = formNode.querySelectorAll('.js-validFormField');
        delElement(formNode, inputsForm);

        Object.keys(errors).forEach((key) => {
            const messageError = errors[key];
            const input = formNode.elements[key];

            validateField(input, error, messageError);
        });
    }
}

// Обработка полей форм
function formFieldProcessing({ form, type = 'json' }) {
    switch (type) {
        case 'json': {
            const formInputs = form.querySelectorAll('.custom-form-field');

            switch (form) {
                case registerForm: {
                    const body = {};

                    formInputs.forEach((input) => {
                        body[input.name] = input.value;
                    });

                    return body;

                    break;
                }

                case sendMsgForm: {
                    const data = {};
                    data.to = form.to.value;

                    const body = {};

                    formInputs.forEach((input) => {
                        if (input.name !== 'to') {
                            body[input.name] = input.value;
                        }
                    });

                    data.body = JSON.stringify(body);

                    return data;

                    break;
                }

                default: {
                    const body = {};

                    formInputs.forEach((input) => {
                        body[input.name] = input.value;
                    });

                    return body;
                }
            }

            break;
        }
        case 'formData':
            return new FormData(form);
            break;
        default:
            return 'Вы передали неверные данные!';
    }
}

// Сбор данных из формы
function serializeForm(formNode) {
    const { elements } = formNode;

    Array.from(elements)
        .filter((item) => !!item.name)
        .map((element) => {
            const { name, value } = element;

            return { name, value };
        });

    // Сбор данных если нужно учесть значение checkbox
    // const data = Array.from(elements)
    //     .map((element) => {
    //         const { name, type } = element;
    //         const value = type === 'checkbox' ? element.checked : element.value;

    //         return { name, value };
    //     })
    //     .filter((item) => !!item.name);
}

// Отправка данных формы registerForm на сервер
registerForm?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (errorsCounter === 0) {
        serializeForm(registerForm);
        toggleLoader(sender);
        register(evt);
    }
});

// Отправка сообщения пользователя

const sendMsgForm = document.forms.sendMsgForm;
const sendMsgModal = document.getElementById('sendMsgModal');

function sendMsg(evt) {
    evt.preventDefault();
    const body = formFieldProcessing({ form: sendMsgForm });

    sendData({
        url: 'api/emails',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((response) => {
        if (response.success) {
            toggleLoader(sender);
            interactionModal(sendMsgModal);
            interactionModal(onSuccessModal);
            scheduleCall(onSuccessModal);
        } else {
            throw response;
        }
    })
    .catch((err, response) => {
        if (err.errors) {
            toggleLoader(sender);
            errorHandler(err.errors, sendMsgForm);
        } else {
            errorModalHandler({ response });
            toggleLoader(sender);
            interactionModal(onErrorModal);
            scheduleCall(onErrorModal);
        }
    });
}

// Отправка данных формы sendMsgForm на сервер
sendMsgForm?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (errorsCounter === 0) {
        serializeForm(sendMsgForm);
        toggleLoader(sender);
        sendMsg(evt);
    }
});

// Логика авторизации пользователя по токену

const signInForm = document.forms.signInForm;
const signInModal = document.getElementById('signInModal');
const menuItems = document.querySelectorAll('.js-toggleMenuItem');

// Обновление токена
function updateToken() {
    const token = localStorage.getItem('token');

    toggleMenuItems(token);
}

// Скрыть/показать ссылки из меню
function toggleMenuItems(token) {
    if (token) {
        menuItems?.forEach((item) => item.classList.toggle('u-hidden'));
    }

    return;
}

// Обновление токена и перерисовка кнопок меню
(function () {
    updateToken();
}());

function signIn(evt) {
    evt.preventDefault();
    const body = formFieldProcessing({form: signInForm});

    sendData({
        url: 'api/users/login',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((response) => {
        if (response.success) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            interactionModal(signInModal);
            toggleLoader(sender);
            updateToken();
        } else {
            throw response;
        }
    })
    .catch((err, response) => {
        if (err._message) {
            toggleLoader(sender);

            const errorMessage = {
                'email': err._message,
            };

            errorHandler(errorMessage, signInForm);
        } else {
            errorModalHandler({ response });
            toggleLoader(sender);
            interactionModal(onErrorModal);
            scheduleCall(onErrorModal);
        }
    });
}

// Отправка данных формы signInForm на сервер
signInForm?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (errorsCounter === 0) {
        serializeForm(signInForm);
        toggleLoader(sender);
        signIn(evt);
    }
});

// Логика отрисовки информации о пользователе на странице профиля

// Временное ограничение для работы кода только на странице профиля
if (location.pathname === '/profile.html') {
    let currentProfileData = {};

    toggleLoader(loader);
    getProfileData();

    // Получение данных пользователя с сервера
    function getProfileData() {
        sendData ({
            url: `api/users/${localStorage.getItem('userId')}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.success) {
                currentProfileData  = response.data;

                setProfileData(currentProfileData);
                toggleLoader(loader);
            } else {
                location.pathname = '/';
            }
        })
        .catch((err) => {
            console.error(err)
            interactionModal(onErrorModal);
            toggleLoader(loader);
        });
    }

    // Установка данных с сервера в информацию на странице профиля
    function setProfileData({ photoUrl, name, surname, email, password, location, age }) {
        const profileData = document.querySelector('.profile__content');
        const profileDataList = profileData?.querySelectorAll('.js-setProfileData');

        profileDataList?.forEach((item) => {
            switch (item.dataset.profile) {
                case 'photoUrl':
                    item.src = `${BASE_URL}${photoUrl}`;
                    break;
                case 'name':
                    item.innerText = name;
                    break;
                case 'surname':
                    item.innerText = surname;
                    break;
                case 'email':
                    item.innerText = email;
                    break;
                case 'password':
                    // for (let i = 0; i < password.length; i++) {
                    //     item.innerText += '*';
                    // }

                    item.innerText = password.replaceAll(/./gm, '*');
                    break;
                case 'location':
                    item.innerText = location;
                    break;
                case 'age':
                    item.innerText = age;
                    break;
                default:
                    item.innerText = '';
                    break;
            }
        });
    }

    // Логика смены пароля в профиле

    const changePasswordForm = document.forms.changePasswordForm;
    const changePasswordModal = document.getElementById('changePasswordModal');

    // Удалание токена и ID пользователя из localStorage и сброс на главную страницу
    function removeItemsFromStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        location.pathname = '/';
    }

    function changePassword(evt) {
        evt.preventDefault();
        const body = formFieldProcessing({ form: changePasswordForm, type: 'formData' });

        sendData({
            url: 'api/users',
            method: 'PUT',
            body: body,
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })
        .then((response) => {
            if (response.status === 401 || response.status === 403) {
                removeItemsFromStorage();

                return;
            }

            return response.json()
        })
        .then((response) => {
            if (response.success) {
                getProfileData();
                interactionModal(changePasswordModal);
                interactionModal(onSuccessModal);
                scheduleCall(onSuccessModal);
            } else {
                throw response;
            }
        })
        .catch((err, response) => {
            if (err.errors) {
                toggleLoader(sender);
                errorHandler(err.errors, changePasswordForm);
            } else if (err._message) {
                toggleLoader(sender);
                errorHandler(err._message, changePasswordForm);
            } else {
                const errorMessage = 'Check the correctness of the entered data';

                toggleLoader(sender);
                errorModalHandler({ response }, errorMessage);
                interactionModal(onErrorModal);
                scheduleCall(onErrorModal);
            }
        });
    }

    // Отправка данных формы changePasswordForm на сервер
    changePasswordForm?.addEventListener('submit', (evt) => {
        evt.preventDefault();

        if (errorsCounter === 0) {
            serializeForm(changePasswordForm);
            toggleLoader(sender);
            changePassword(evt);
        }
    });

    // Логика изминения данных профиля

    const changeDataForm = document.forms.changeDataForm;
    const changeDataModal = document.getElementById('changeDataModal');
    const changeDataBtn = document.querySelector('.js-setProfileDataToForm');

    changeDataBtn?.addEventListener('click', () => {
        setFormValuesFromProfileData(changeDataForm, currentProfileData);
    });

    function setFormValuesFromProfileData(form, { email, name, surname, location, age }) {
        form.email.value = email;
        form.name.value = name;
        form.surname.value = surname;
        form.location.value = location;
        form.age.value = age;
    }

    function changeData(evt) {
        evt.preventDefault();
        const body = formFieldProcessing({ form: changeDataForm, type: 'formData' });

        sendData({
            url: 'api/users',
            method: 'PUT',
            body: body,
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })
        .then((response) => {
            if (response.status === 401 || response.status === 403) {
                removeItemsFromStorage();

                return;
            }

            return response.json()
        })
        .then((response) => {
            if (response.success) {
                getProfileData();
                interactionModal(changeDataModal);
                interactionModal(onSuccessModal);
                scheduleCall(onSuccessModal);
            } else {
                throw response;
            }
        })
        .catch((err, response) => {
            if (err.errors) {
                toggleLoader(sender);
                errorHandler(err.errors, changeDataForm);
            } else if (err._message) {
                toggleLoader(sender);
                errorHandler(err._message, changeDataForm);
            } else {
                const errorMessage = 'Check the correctness of the entered data';

                toggleLoader(sender);
                errorModalHandler({ response }, errorMessage);
                interactionModal(onErrorModal);
                scheduleCall(onErrorModal);
            }
        });
    }

    // Отправка данных формы changePasswordForm на сервер
    changeDataForm?.addEventListener('submit', (evt) => {
        evt.preventDefault();
        toggleLoader(sender);
        changeData(evt);
    });

    // Логика удаления аккаунта

    const deleteAccountForm = document.forms.deleteAccountForm;

    function deleteAccount() {
        sendData({
            url: `api/users/${localStorage.getItem('userId')}`,
            method: 'DELETE',
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })
        .then((response) => {
            if (response.status === 401 || response.status === 403) {
                removeItemsFromStorage();

                return;
            }

            return response.json()
        })
        .then((response) => {
            if (response.success) {
                interactionModal(onSuccessModal);
                removeItemsFromStorage();

                return;
            } else {
                throw response;
            }
        })
        .catch((response) => {
            errorModalHandler({ response });
            interactionModal(onErrorModal);
        });
    }

    deleteAccountForm?.addEventListener('submit', (evt) => {
        evt.preventDefault();
        deleteAccount();
    });

    // Логика выхода из профиля

    const signOutBtn = document.querySelector('.js-signOut');

    signOutBtn.addEventListener('click', () => {
        removeItemsFromStorage();
    });
}

// Кнопка смены видимости пароля

const passwordInputs = document.querySelectorAll('.js-showPasswordViewBtn');

// Скрыть/показать кнопку раскрытия пароля
passwordInputs.forEach((input) => {
    input.addEventListener('input', (evt) => {
        const dataValue = evt.currentTarget.id;
        const passwordBtn = document.querySelector(`[data-password="${dataValue}"`);

        !input.value.length
            ? passwordBtn?.classList.add('u-hidden')
            : passwordBtn?.classList.remove('u-hidden');
    });
});

const passwordViewBtn = document.querySelectorAll('.js-togglePasswordView');

// Скрыть/показать пароль в input
function togglePasswordView(evt) {
    evt.target.classList.toggle('contacts-form__password-control-btn--view');

    const passwordInputId = evt.currentTarget.dataset.password;
    const passwordInput = document.getElementById(passwordInputId);

    passwordInput?.getAttribute('type') === 'password'
        ? passwordInput?.setAttribute('type', 'text')
        : passwordInput?.setAttribute('type', 'password');
}

passwordViewBtn?.forEach((btn) => {
    btn?.addEventListener('click', togglePasswordView);
});

// Логика кастомизации input type="file" и отображения имени файла

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
                const shortName = `${name.slice(0, 15)}...${name.split('.').pop()}`;

                return shortName;
            }

            return name;
        }

        fileNameElement.innerText = checkName(fileName) || sliceName(fileName);
    });
});

// Полноценная логика работы фильтра постов и его несброс при перезагрузке страницы

// Временное ограничение для работы кода только на странице блога
if (location.pathname === '/blog.html') {
    (function () {
        // Получение search параметров из location
        function getParamsFromLocation() {
            let searchParams = new URLSearchParams(location.search);

            return {
                page: Number(searchParams.get('page')) || 0,
                comments: searchParams.getAll('comments'),
                views: searchParams.get('views'),
                sortBy: searchParams.get('sortBy'),
                howShow: searchParams.get('howShow'),
                tags: searchParams.getAll('tags'),
                search: searchParams.get('search') || '',
            };
        }

        // Установка данных в форму
        function setDataToFilter(data) {
            const form = document.forms.filter;

            form?.elements.comments?.forEach((checkbox) => {
                if (data.comments.includes(checkbox.value)) {
                    checkbox.checked = true;
                }
            });

            form?.elements.views?.forEach((radio) => {
                if (data.views === radio.value) {
                    radio.checked = true;
                }
            });

            form?.elements.sortBy?.forEach((radio) => {
                if (data.sortBy === radio.value) {
                    radio.checked = true;
                }
            });

            form?.elements.howShow?.forEach((radio) => {
                if (data.howShow === radio.value) {
                    radio.checked = true;
                }
            });

            form?.elements.tags?.forEach((checkbox) => {
                if (data.tags.includes(checkbox.value)) {
                    checkbox.checked = true;
                }
            });

            if (form) {
                form.elements.search.value = data.search;
            }
        }

        // Установка search параметров
        function setSearchParams(data) {
            let searchParams = new URLSearchParams();

            if (data.page) {
                searchParams.set('page', data.page);
            } else {
                searchParams.set('page', 0);
            }

            data.comments?.forEach((item) => {
                searchParams.append('comments', item);
            });

            if (data.views) {
                searchParams.set('views', data.views);
            }

            if (data.sortBy) {
                searchParams.set('sortBy', data.sortBy);
            }

            if (data.howShow) {
                searchParams.set('howShow', data.howShow);
            }

            data.tags?.forEach((item) => {
                searchParams.append('tags', item);
            });

            searchParams.set('search', data.search);

            history.replaceState(null, document.title, '?' + searchParams.toString());
            localStorage.setItem('searchParams', searchParams.toString());
        }

        const form = document.forms.filter;

        // Рендер постов при событии submit
        form?.addEventListener('submit', (evt) => {
            evt.preventDefault();

            let data = {
                page: 0,
            };

            data.search = form.elements.search.value;
            data.tags = [...form.elements.tags].filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
            data.views = ([...form.elements.views].find((radio) => radio.checked) || { value: null }).value;
            data.comments = [...form.elements.comments].filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
            data.howShow = ([...form.elements.howShow].find((radio) => radio.checked) || { value: null }).value;
            data.sortBy = ([...form.elements.sortBy].find((radio) => radio.checked) || { value: null }).value;

            getFilteredPosts(data);
            setSearchParams(data);
        });

        // Общая функция для xhr запроса
        const sendRequest = ({ method, url, searchParams, headers, body = null, onload, onerror }) => {
            const xhr = new XMLHttpRequest();

            toggleLoader(loader);

            xhr.open(method, `${BASE_URL}/${url}?${searchParams}`);

            if (headers) {
                xhr.setRequestHeader(headers.key, headers.value);
            }

            xhr.send(body);
            xhr.onload = () => onload({ xhr });
            xhr.onerror = () => onerror();
        };

        // Загрузка и рендер тегов в форме
        sendRequest({
            method: 'GET',
            url: 'api/tags',
            onload: ({ xhr }) => {
                if (xhr.status === 200) {
                    const serverResponse = JSON.parse(xhr.response);
                    const serverData = serverResponse.data;
                    const tagsList = document.querySelector('.blog-filters__list--tags');

                    toggleLoader(loader);

                    serverData.forEach((tag) => {
                        const tagItem = createTagCheckbox(tag);
                        tagsList?.insertAdjacentHTML('beforeend', tagItem);
                    });

                    if (!location.search.length && localStorage.getItem('searchParams')) {
                        location.search = localStorage.getItem('searchParams');
                    }

                    let params = getParamsFromLocation();

                    setDataToFilter(params);
                    getFilteredPosts(params);
                } else {
                    // TODO: Добавить обработчик ошибок
                    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
                }
            },
            onerror: () => {
                toggleLoader(loader);
                console.error('The data has arrived with error');
            },
        });

        // Переключение страниц пагинации
        function changeCurrentPage(page) {
            const links = document.querySelectorAll('.blog-pagination__link');
            let searchParams = new URLSearchParams(location.search);
            let params = getParamsFromLocation();

            links[params.page].classList.remove('blog-pagination__link--current');
            searchParams.set('page', page);
            links[page].classList.add('blog-pagination__link--current');

            history.replaceState(null, document.title, '?' + searchParams.toString());

            let updateParams = getParamsFromLocation();
            getFilteredPosts(updateParams);
        }

        // Смена активной страницы при клике на стрелку пагинации
        const paginationBtns = document.querySelectorAll('.js-paginationBtn');

        paginationBtns.forEach((btn) => {
            btn?.addEventListener('click', (evt) => {
                const direction = evt.currentTarget.dataset.direction;
                let params = getParamsFromLocation();

                direction === 'left' ? changeCurrentPage(params.page - 1) : changeCurrentPage(params.page + 1);
            });
        });

        const postsLimit = 5;

        // Рендер отфильтрованных постов
        function getFilteredPosts(params) {
            let searchParams = new URLSearchParams();

            searchParams.set('v', '1.0.0');

            if (params.tags && Array.isArray(params.tags) && params.tags.length) {
                searchParams.set('tags', JSON.stringify(params.tags));
            }

            let filter = {};

            if (params.search) {
                filter.title = params.search;
            }

            let currentPostsLimit = postsLimit;

            if (Number(params.howShow)) {
                currentPostsLimit = Number(params.howShow);
            }

            searchParams.set('limit', currentPostsLimit);

            if (params.views) {
                const viewsRange = (params.views).split('-');

                filter.views = {
                    '$between': viewsRange,
                };
            }

            if (params.comments.length) {
                const commentsCountRange = [
                    params.comments[0].split('-')[0],
                    params.comments[params.comments.length - 1].split('-')[1],
                ];

                filter.commentsCount = {
                    '$between': commentsCountRange,
                };
            }

            searchParams.set('filter', JSON.stringify(filter));

            if (Number(params.page)) {
                searchParams.set('offset', (Number(params.page)) * currentPostsLimit)
            }

            if (params.sortBy) {
                searchParams.set('sort', JSON.stringify([params.sortBy, 'ASC']));
            }

            const paramsToString = searchParams.toString();

            sendRequest({
                method: 'GET',
                url: 'api/posts',
                searchParams: `${paramsToString}`,
                onload: ({ xhr }) => {
                    if (xhr.status === 200) {
                        const serverResponse = JSON.parse(xhr.response);
                        const serverData = serverResponse.data;

                        toggleLoader(loader);

                        let postItem = '';

                        serverData.forEach((post) => {
                            postItem = postItem + createPost(post);
                        });

                        const postsList = document.querySelector('.blog-articles__content');

                        if (postsList) {
                            postsList.innerHTML = postItem;
                        }

                        const links = document.querySelector('.blog-pagination__list');

                        if (links) {
                            links.innerHTML = '';
                        }

                        getPaginationLinks(links, serverResponse, currentPostsLimit);
                    } else {
                        alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
                    }
                },
                onerror: () => {
                    toggleLoader(loader);
                    console.error('The data has arrived with error');
                },
            });
        }

        // Получение ссылок пагинации
        function getPaginationLinks(links, response, currentPostsLimit) {
            const pageCount = Math.ceil(response.count / currentPostsLimit);

            for (let i = 0; i < pageCount; i++) {
                let link = сreatePaginationLink(i);
                links?.insertAdjacentElement('beforeend', link);
            }

            setDisebledForPaginationArrows(pageCount);
        }

        // Создание ссылок пагинации
        function сreatePaginationLink(page) {
            const item = document.createElement('li');
            item?.classList.add('blog-pagination__item');

            const link = document.createElement('a');

            link.href = `?page=${page}`;
            link.title = `To page ${(page + 1)}`;
            link.innerText = (page + 1);
            link.classList.add('blog-pagination__link', 'js-paginationLink');

            item.append(link);

            let params = getParamsFromLocation();

            if (page === Number(params.page)) {
                link?.classList.add('blog-pagination__link--current');
            }

            link?.addEventListener('click', (evt) => {
                evt.preventDefault();
                changeCurrentPage(page);
            });

            return item;
        }

        // Disabled для стрелок пагинации
        function setDisebledForPaginationArrows(pageCount) {
            const [btnPrev, btnNext] = paginationBtns;
            let params = getParamsFromLocation();

            if (params.page > 0) {
                btnPrev?.removeAttribute('disabled');
            }

            if (params.page < (pageCount - 1)) {
                btnNext?.removeAttribute('disabled');
            }

            if (params.page === 0) {
                btnPrev?.setAttribute('disabled', '');
            }

            if (params.page === (pageCount - 1) || pageCount === 0) {
                btnNext?.setAttribute('disabled', '');
            }
        }

        // Рендер одного тега в форме
        function createTagCheckbox({ id, color, name }) {
            let result = `
                <li class="blog-filters__item blog-filters__item--tag">
                    <input class="custom-checkbox custom-checkbox--tag"
                        type="checkbox"
                        id="color-${id}"
                        name="tags"
                        value="${id}">
                    <label for="color-${id}"
                        style="--bg-color: ${color}">
                        <span class="visually-hidden">${name}</span>
                    </label>
                </li>
            `;

            return result;
        }

        // Рендер одного поста
        function createPost({ title, text, tags, date, views, commentsCount, photo }) {
            const postTags = tags.map((tag) => {
                const tagColor = tag.color;
                return `<span class="blog-article__tags-item" style="background-color: ${tagColor}"></span>`;
            }).join('');
            const postDate = new Date(date);
            const getDate = postDate.getDate() < 10 ? `0${postDate.getDate()}` : postDate.getDate();
            const getMonth = postDate.getMonth() < 10 ? `0${(postDate.getMonth() + 1)}` : (postDate.getMonth() + 1);
            const getYear = postDate.getFullYear();
            const postDateToString = `${getDate}.${getMonth}.${getYear}`;
            const datetime = `${getYear}-${getMonth}-${getDate}`;
            const postViews = views === 1 ? `${views} view` : `${views} views`;
            const postComments = commentsCount === 1 ? `${commentsCount} comment` : `${commentsCount} comments`;

            let result = `
                <article class="blog-article">
                    <div class="blog-article__img">
                        <picture>
                            <source srcset="${BASE_URL + photo.mobilePhotoUrl} 1x, ${BASE_URL + photo.mobile2xPhotoUrl} 2x"
                                media="(max-width: 767px)">
                            <source srcset="${BASE_URL + photo.tabletPhotoUrl} 1x, ${BASE_URL + photo.tablet2xPhotoUrl} 2x"
                                media="(max-width: 1280px)">
                            <img src="${BASE_URL + photo.desktopPhotoUrl}"
                                srcset="${BASE_URL + photo.desktop2xPhotoUrl} 2x"
                                width="320"
                                height="236"
                                loading="lazy"
                                decoding="async"
                                alt="">
                        </picture>
                    </div>

                    <div class="blog-article__col">
                        <div class="blog-article__tags">
                            ${postTags}
                        </div>

                        <div class="blog-article__data">
                            <time class="blog-article__data-item" datetime="${datetime}">
                                ${postDateToString}
                            </time>
                            <span class="blog-article__data-item">
                                ${postViews}
                            </span>
                            <span class="blog-article__data-item">
                                ${postComments}
                            </span>
                        </div>

                        <h3 class="blog-article__title title-h3">
                            ${title}
                        </h3>

                        <p class="blog-article__text">
                            ${text}
                        </p>

                        <a class="blog-article__link underlined-link underlined-link--black" href="">
                            Go to this post
                        </a>
                    </div>
                </article>
            `;

            return result;
        }
    }());
}
