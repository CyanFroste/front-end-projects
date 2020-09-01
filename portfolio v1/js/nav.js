const navOpen = document.querySelector('.menu');
const navClose = document.querySelector('.menu-close');

let mainNav = document.querySelector('#main-nav');

navOpen.addEventListener('click', _ => {
    mainNav.classList.add('nav-open');
    navOpen.style.opacity = '0';

});

navClose.addEventListener('click', _ => {
    mainNav.classList.remove('nav-open');
    setTimeout( _ => {
        navOpen.style.opacity = '1';
    }, 200);
    
});

navOpen.addEventListener('blur', _ => {
    mainNav.classList.remove('nav-open');
    setTimeout( _ => {
        navOpen.style.opacity = '1';
    }, 200);
    
});

window.addEventListener('scroll', _ => {
    if(window.pageYOffset > 0){
        mainNav.classList.remove('nav-open');
        setTimeout( _ => {
            navOpen.style.opacity = '1';
        }, 200);
        navOpen.blur();
    };
}, {passive: true}); 