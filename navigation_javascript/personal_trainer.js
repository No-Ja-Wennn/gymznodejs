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
