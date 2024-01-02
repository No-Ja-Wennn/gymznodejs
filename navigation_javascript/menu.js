var menu = document.querySelector('.menuroi');
var content = document.querySelector('.noidung');
var body = document.querySelector('body');
var overlay = document.querySelector(".nen_mo");
var logo = document.querySelector(".header__inner__logo a")
document.addEventListener('DOMContentLoaded', function() {

    menu.addEventListener('click', function(event) {
        event.stopPropagation();
        var isDisplay = getComputedStyle(content).display;

        if (isDisplay === 'none') {
            content.style.animation = 'side_right 0.4s ease-in-out forwards';
            content.style.display = 'block';
            overlay.style.display = 'block';
            overlay.style.animation = "overlay 0.5s ease-in forwards";
            logo.style.display = 'none';
            
        } if (isDisplay == 'block') {
            content.style.display = 'none';
            overlay.style.display = 'none';
            logo.style.display = 'block';
        } 
    });

    body.addEventListener('click', function() {
        content.style.display = 'none';
        overlay.style.display = 'none';
        logo.style.display = 'block';
    });
});
