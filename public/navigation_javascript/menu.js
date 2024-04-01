const openmenu = document.querySelector('.button-menu');
const closemenu = document.querySelector('.button-menu-close');
const html = document.querySelector('html');
const navmenu = document.querySelector('.content');
const nenmo = document.querySelector('.nen_mo');

openmenu.onclick = function(){
    if (navmenu.style.display === 'none' || navmenu.style.display === '') {
        html.style.overflow = 'hidden';
        navmenu.style.display = 'flex';
        navmenu.style.animation = 'slideRight .3s ease-in-out forwards';
        nenmo.style.display = 'flex';
        nenmo.style.animation = 'inOpacity .3s ease-in-out forwards';
    } else {
        html.style.overflowY = 'scroll';
        navmenu.style.animation = 'slideLeft .3s ease-in-out forwards';
        nenmo.style.animation = 'outOpacity .3s ease-in-out forwards';
        setTimeout(() => {
            navmenu.style.display = 'none';
            nenmo.style.display = 'none';
        }, 300);
    }
}
closemenu.onclick = function(){
    html.style.overflowY = 'scroll';
    navmenu.style.animation = 'slideLeft .3s ease-in-out forwards';
    nenmo.style.animation = 'outOpacity .3s ease-in-out forwards';
    setTimeout(() => {
        navmenu.style.display = 'none';
        nenmo.style.display = 'none';
    }, 300);
}
nenmo.onclick = function(){
    html.style.overflowY = 'scroll';
    navmenu.style.animation = 'slideLeft .3s ease-in-out forwards';
    nenmo.style.animation = 'outOpacity .3s ease-in-out forwards';
    setTimeout(() => {
        navmenu.style.display = 'none';
        nenmo.style.display = 'none';
    }, 300);
}

const user = document.querySelector('.user');
const submenuLogin = document.querySelector('.submenu-login');

user.onclick = function(){
    if (submenuLogin.style.display === 'none' || submenuLogin.style.display === '') {
        submenuLogin.style.display = 'flex';
    } else {
        submenuLogin.style.display = 'none';
    }
}