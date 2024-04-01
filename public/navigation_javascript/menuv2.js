var menu = document.querySelector('.bt_dropdown');
var content = document.querySelector('.content');
var body = document.querySelector('body');
var overlay = document.querySelector(".nen_mo");
var logo = document.querySelector(".header__inner__logo a");
var bt = document.querySelector(".header__inner__menu__bt i");
document.addEventListener('DOMContentLoaded', function() {
    menu.addEventListener('click', function(event) {
        event.stopPropagation();
        var isDisplay = getComputedStyle(content).display;
        
        if (isDisplay === 'none') {
            
            content.style.animation = 'slide_right 0.3s ease-in-out forwards';
            content.style.display = 'flex';
            overlay.style.animation = "in_opacity 0.3s ease-in forwards";
            overlay.style.display = 'block';
            logo.style.display = 'none';
            bt.style.color = 'goldenrod';

        } else {
        
            content.style.animation = 'slide_left 0.3s ease-in-out forwards';
            overlay.style.animation = 're_opacity 0.3s ease-in forwards';
            setTimeout(function()
            {

                content.style.display = 'none';
                overlay.style.display = 'none';

            }, 300);
            
            logo.style.display = 'flex';
            bt.style.color = 'white'
        } 
    });
   
    body.addEventListener('click', function() {
        content.style.animation = 'slide_left 0.3s ease-in-out forwards';
        overlay.style.animation = 're_opacity 0.3s ease-in forwards';
        setTimeout(function(){
            content.style.display = 'none';
            overlay.style.display = 'none';
        }, 300);
        logo.style.display = 'flex';
        bt.style.color = 'white'
    });
});

function yourFunction(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
    // Xử lý các công việc khác của bạn ở đây
    // console.log("ehllo")
}


var service = document.querySelector("b.content__inner");
var sub = document.querySelector(".submenu b");
var subtext = document.querySelector(".submenu .bx");
var subbgr = document.querySelector(".content__inner");
var noidung222 = document.querySelector('.noidung222');
function toggleNoidung222(event) {
    // Ngăn chặn sự kiện click lan ra các phần tử cha
    event.stopPropagation();

    // Ngăn chặn sự kiện mặc định của thẻ <a>
    // event.preventDefault();

    

    // Toggle hiển thị/ẩn
    if (noidung222.style.display === 'none' || noidung222.style.display === '') {
        noidung222.style.display = 'flex';
        noidung222.style.animation = 'fadeInFromTop 0.4s ease-out forwards';
        subtext.style.animation = 'service_slide_right 0.3s ease-in-out forwards';
        service.style.animation = 'change_bgr 0.3s ease-in-out forwards'
        // sub.style.color = 'goldenrod';
        // sub.style.background = 'rgba(0, 0, 0, 0.2)';
    } else {
        noidung222.style.animation = 'fadeOutToTop 0.3s ease-out forwards';
        setTimeout(function(){
            noidung222.style.display = 'none';
        }, 300);
        subtext.style.animation = 'service_slide_left 0.35s ease-in-out forwards';
        service.style.animation = 're_bgr 0.3s ease-in-out forwards'
        // sub.style.background = 'none';
    }
}

// Bổ sung sự kiện click để ẩn noidung222 khi click bất kỳ đâu trên trang
document.addEventListener('click', function () {
    noidung222.style.animation = 'fadeOutToTop 0.5s ease-out forwards';
        setTimeout(function(){
            noidung222.style.display = 'none';
        }, 500);
        subtext.style.animation = 'service_slide_left 0.3s ease-in-out forwards';
        service.style.animation = 're_bgr 0.3s ease-in-out forwards'
});

