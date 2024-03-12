$(document).ready(function(){
    $('.image__slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        draggable: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa-solid fa-chevron-left' aria-hidden='true'></i></button>",
        nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa-solid fa-chevron-right'></i></button>"
      });
});
$(document).ready(function(){
    var slickSlider = $('.image__slider');
    
    function updateSlider() {
        if (window.innerWidth <= 428) { // Kiểm tra kích thước màn hình
            slickSlider.slick('slickSetOption', 'slidesToShow', 1); // Giảm số slide hiển thị xuống 1 cho các kích thước nhỏ hơn hoặc bằng 428
        } else if (window.innerWidth <= 768) { // Kiểm tra kích thước màn hình
            slickSlider.slick('slickSetOption', 'slidesToShow', 2); // Giảm số slide hiển thị xuống 2 cho các kích thước nhỏ hơn hoặc bằng 768
        } else if (window.innerWidth <= 1024) { // Kiểm tra kích thước màn hình
            slickSlider.slick('slickSetOption', 'slidesToShow', 3); // Giảm số slide hiển thị xuống 3 cho các kích thước nhỏ hơn hoặc bằng 1024
        } else {
            slickSlider.slick('slickSetOption', 'slidesToShow', 4); // Khôi phục lại số slide hiển thị mặc định là 4 cho các kích thước lớn hơn 1024
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
