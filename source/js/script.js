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

// Валидация форм

const forms = document.querySelectorAll('.js-contactForm');

forms?.forEach((form) => {
    form.noValidate = true;

    // Валидация чекбоксов

    const approvedCheckboxes = form.querySelectorAll('.js-approvedCheckbox');

    approvedCheckboxes?.forEach((checkbox) => {
        checkbox.addEventListener('click', () => {
            const submitBtn = form.querySelector('.js-submitBtn');

            checkbox.checked ? submitBtn?.removeAttribute('disabled') : submitBtn?.setAttribute('disabled', true);
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

// Полноценная логика работы фильтра и его несброс при перезагрузке страницы

(function() {
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

    const BASE_URL = 'https://academy.directlinedev.com';
    const preloader = document.querySelector('.js-preloader');

    // Общая функция для xhr запроса
    const sendRequest = ({ method, url, searchParams, headers, body = null, onload, onerror }) => {
        const xhr = new XMLHttpRequest();

        preloader?.classList.remove('preloader--is-hidden');

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

                preloader?.classList.add('preloader--is-hidden');

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
            preloader?.classList.add('preloader--is-hidden');
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

                    preloader?.classList.add('preloader--is-hidden');

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
                preloader?.classList.add('preloader--is-hidden');
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
            btnPrev.removeAttribute('disabled');
        }

        if (params.page < (pageCount - 1)) {
            btnNext.removeAttribute('disabled');
        }

        if (params.page === 0) {
            btnPrev.setAttribute('disabled', '');
        }

        if (params.page === (pageCount - 1) || pageCount === 0) {
            btnNext.setAttribute('disabled', '');
        }
    }

    // Рендер одного тега в форме
    function createTagCheckbox({
        id,
        color,
        name,
    }) {
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
    function createPost({
        title,
        text,
        tags,
        date,
        views,
        commentsCount,
        photo,
    }) {
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
})();
