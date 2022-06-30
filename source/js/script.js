/* Скрипт для открытия меню в мобильной версии */

const menuOpenBtn = document.querySelector('.js-menuOpen');
const menuCloseBtn = document.querySelector('.js-menuClose');

if (menuOpenBtn) {
    menuOpenBtn.addEventListener('click', (evt) => {
        const menuId = evt.currentTarget.dataset.menu;
        const menu = document.getElementById(menuId);

        if (menu) {
            menu.classList.add('menu--visible');
        }
    });
}

if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', (evt) => {
        const menu = evt.currentTarget.parentNode;

        if (menu) {
            menu.classList.remove('menu--visible');
        }
    });
}

window.addEventListener('resize', () => {
    const mmObj = window.matchMedia("(min-width: 768px)");
    const menu = document.querySelector('.menu--visible');

    if (mmObj.matches) {
        if (menu) {
            menu.classList.remove('menu--visible');
        }
    }
});

/* Инициализация swiper js */

const sliders = document.querySelectorAll('.swiper');

if (sliders) {

    sliders.forEach((item, index) => {
        item.classList.add('swiper' + index);
    })

    const mainSwiper = new Swiper('.swiper0', {
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

/* Добавление индикатора процентов для progress-bar */

const progress = document.querySelectorAll('.js-createPercent');

if (progress) {
    progress.forEach(item => {
        const value = item.value;
        const element = document.createElement('span');
        element.className = 'progress-bar__percent';
        element.innerText = `${value}%`;
        item.parentElement.insertAdjacentElement('afterbegin', element);
    });
}
