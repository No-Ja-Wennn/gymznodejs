var slickSlider = $('.image__slider');

$(document).ready(function(){
    // Khởi tạo Slick Slider ban đầu
    slickSlider.slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        draggable: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa-solid fa-chevron-left' aria-hidden='true'></i></button>",
        nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa-solid fa-chevron-right'></i></button>"
    });

    function updateSlider() {
        if (window.innerWidth <= 428) {
            slickSlider.slick('slickSetOption', 'slidesToShow', 1);
        } else if (window.innerWidth <= 768) {
            slickSlider.slick('slickSetOption', 'slidesToShow', 2);
        } else if (window.innerWidth <= 1024) {
            slickSlider.slick('slickSetOption', 'slidesToShow', 3);
        } else {
            slickSlider.slick('slickSetOption', 'slidesToShow', 4);
        }
    }

    // Gọi hàm cập nhật khi tải trang và khi thay đổi kích thước màn hình
    $(window).on('load resize', updateSlider);
});





var button1 = document.querySelector('#button1');
var button2 = document.querySelector('#button2');
var cancel = document.querySelector('.cancel');
var form = document.querySelector('.form');

if(button1)
button1.addEventListener('click', function(){
    form.style.display = 'flex';
});

if(cancel)
cancel.addEventListener('click', function(){
    form.style.display = 'none';
})


var button3 = document.getElementById('button3');
var button4 = document.getElementById('button4');
var button5 = document.getElementById('button5');
var button6 = document.getElementById('button6');
var button7 = document.getElementById('button7');
var if3 = document.querySelector('#if3');
var if4 = document.querySelector('#if4');
var if5 = document.querySelector('#if5');
var if6 = document.querySelector('#if6');
var if7 = document.querySelector('#if7');
var cancel3 = document.querySelector('#cancel3 i');
var cancel4 = document.querySelector('#cancel4 i');
var cancel5 = document.querySelector('#cancel5 i');
var cancel6 = document.querySelector('#cancel6 i');
var cancel7 = document.querySelector('#cancel7 i');
var body = document.querySelector('body');

if(button3)
button3.addEventListener('click', function(){
    if3.style.display = 'flex';
    body.style.overflow = 'hidden';
});

if(cancel3)
cancel3.addEventListener('click', function(){
    if3.style.display = 'none';
    body.style.overflow = 'auto';
})


if(button4)
button4.addEventListener('click', function(){
    if4.style.display = 'flex';
    body.style.overflow = 'hidden';
});

if(cancel4)
cancel4.addEventListener('click', function(){
    if4.style.display = 'none';
    body.style.overflow = 'auto';
})


if(button5)
button5.addEventListener('click', function(){
    if5.style.display = 'flex';
    body.style.overflow = 'hidden';
});

if(cancel5)
cancel5.addEventListener('click', function(){
    if5.style.display = 'none';
    body.style.overflow = 'auto';
})


if(button6)
button6.addEventListener('click', function(){
    if6.style.display = 'flex';
    body.style.overflow = 'hidden';
});

if(cancel6)
cancel6.addEventListener('click', function(){
    if6.style.display = 'none';
    body.style.overflow = 'auto';
})


if(button7)
button7.addEventListener('click', function(){
    if7.style.display = 'flex';
    body.style.overflow = 'hidden';
});

if(cancel7)
cancel7.addEventListener('click', function(){
    if7.style.display = 'none';
    body.style.overflow = 'auto';
})