var menu = document.querySelector('.bt_dropdown');
var content = document.querySelector('.content');
var body = document.querySelector('body');
var overlay = document.querySelector(".nen_mo");
var logo = document.querySelector(".header__inner__logo a")
document.addEventListener('DOMContentLoaded', function() {
    menu.addEventListener('click', function(event) {
        event.stopPropagation();
        var isDisplay = getComputedStyle(content).display;
        
        console.log(getComputedStyle(content).display)
        if (isDisplay === 'none') {
            
            content.style.animation = 'slide_right 0.4s ease-in-out forwards';
            content.style.display = 'block';
            overlay.style.animation = "in_opacity 0.4s ease-in forwards";
            overlay.style.display = 'block';
            logo.style.display = 'none';
            
        } else {
            // } if (isDisplay === 'block') {
                content.style.animation = 'slide_left 0.4s ease-in-out forwards';
                // content.style.display = 'none';
                overlay.style.animation = 're_opacity 0.4s ease-in forwards';
            // overlay.style.display = 'none';
            logo.style.display = 'block';
        } 
    });
    // menu.addEventListener('touchstart', function(event) {
    //     event.stopPropagation();
    //     var isDisplay = getComputedStyle(content).display;
    
    //     if (isDisplay === 'none') {
    //         content.style.animation = 'slide_right 0.4s ease-in-out forwards';
    //         content.style.display = 'block';
    //         overlay.style.animation = "in_opacity 0.4s ease-in forwards";
    //         overlay.style.display = 'block';
    //         logo.style.display = 'none';
    //     } else {
    //         content.style.animation = 'slide_left 0.4s ease-in-out forwards';
    //         // content.style.display = 'none';
    //         overlay.style.animation = 're_opacity 0.4s ease-in forwards';
    //         // overlay.style.display = 'none';
    //         logo.style.display = 'block';
    //     }
    // });
    body.addEventListener('click', function() {
        content.style.animation = 'slide_left 0.4s ease-in-out forwards';
        // content.style.display = 'none';
        overlay.style.animation = 're_opacity 0.4s ease-in forwards';
        // overlay.style.display = 'none';
        logo.style.display = 'block';
    });
});
function yourFunction(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
    // Xử lý các công việc khác của bạn ở đây
}