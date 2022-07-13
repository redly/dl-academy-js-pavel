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

mediaQueryList.addEventListener('change', evt => {
    const menu = document.querySelector('.menu--visible');

    if (evt.matches) {
        menu?.classList.remove('menu--visible');
    }
});

/* Инициализация swiper js */

const mainSlider = document.querySelector('.swiper-main-slider');

if (mainSlider) {
    const mainSwiper = new Swiper('.swiper-main-slider', {
        pagination: {
            el: '.swiper-pagination',
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
