document.addEventListener('DOMContentLoaded', function() {
    var menu = document.querySelector('.menuroi');
    var content = document.querySelector('.noidung');
    var body = document.querySelector('body');

    menu.addEventListener('click', function(event) {
        event.stopPropagation();
        var isDisplay = getComputedStyle(content).display;

        if (isDisplay === 'none') {
            content.style.animation= 'side_right 3s ease-in-out forwards';
            content.style.display = 'block';
            
        } if (isDisplay == 'block') {
            content.style.display = 'none';
        }
    });

    body.addEventListener('click', function() {
        content.style.display = 'none';
    });
});
