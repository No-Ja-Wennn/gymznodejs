var menu = document.querySelector('.menuroi');
var content = document.querySelector('.noidung');
var body = document.querySelector('body');
var overlay = document.querySelector(".nen_mo");
document.addEventListener('DOMContentLoaded', function() {

    menu.addEventListener('click', function(event) {
        event.stopPropagation();
        var isDisplay = getComputedStyle(content).display;

        if (isDisplay === 'none') {
            content.style.animation= 'side_right 3s ease-in-out forwards';
            content.style.display = 'block';
            overlay.style.display = 'block';
            overlay.style.animation = "overlay 1s ease-in forwards";
            
        } if (isDisplay == 'block') {
            content.style.display = 'none';
            overlay.style.display = 'none';
        }
    });

    body.addEventListener('click', function() {
        content.style.display = 'none';
        overlay.style.display = 'none';
    });
});
