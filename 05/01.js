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
