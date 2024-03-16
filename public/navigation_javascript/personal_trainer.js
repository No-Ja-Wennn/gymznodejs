var slickSlider = $('.image__slider');


// Lưu trữ các id trước khi khởi tạo Slick Slider
// var ids = slickSlider.find('[id]').map(function () {
//     return this.id;
// });

$(document).ready(function () {
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
        prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa-solid fa-chevron-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa-solid fa-chevron-right'></i></button>"
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

    // Đặt lại các id sau khi Slick Slider đã được khởi tạo
    // slickSlider.find('[id]').each(function (index) {
    //     this.id = ids[index];
    // });
    active()
});





var button1 = document.querySelector('#button1');
var button2 = document.querySelector('#button2');
var cancel = document.querySelector('.cancel');
var form = document.querySelector('.form');

if (button1)
    button1.addEventListener('click', function () {
        form.style.display = 'flex';
    });

if (cancel)
    cancel.addEventListener('click', function () {
        form.style.display = 'none';
    })

function active() {
    let button3 = document.querySelector('.button3');
    let button4 = document.querySelector('.button4');
    let button5 = document.querySelector('.button5');
    let button6 = document.querySelector('.button6');
    let button7 = document.querySelector('.button7');
    let if3 = document.querySelector('#if3');
    let if4 = document.querySelector('#if4');
    let if5 = document.querySelector('#if5');
    let if6 = document.querySelector('#if6');
    let if7 = document.querySelector('#if7');
    var cancel3 = document.querySelector('#cancel3 i');
    var cancel4 = document.querySelector('#cancel4 i');
    var cancel5 = document.querySelector('#cancel5 i');
    var cancel6 = document.querySelector('#cancel6 i');
    var cancel7 = document.querySelector('#cancel7 i');

    var a_button3 = document.querySelectorAll(".button3");
    a_button3 = Array.from(a_button3);
    a_button3.map(value => {
        value.addEventListener('click', function () {
            if3.style.display = 'flex';
            body.style.overflow = 'hidden';
        });
    })

    if (cancel3)
        cancel3.addEventListener('click', function () {
            if3.style.display = 'none';
            body.style.overflow = 'auto';
        })

    var a_button4 = document.querySelectorAll(".button4");
    a_button4 = Array.from(a_button4);
    a_button4.map(value => {
        value.addEventListener('click', function () {
            if4.style.display = 'flex';
            body.style.overflow = 'hidden';
            console.log("ehllo")
        });
    })

    if (cancel4)
        cancel4.addEventListener('click', function () {
            if4.style.display = 'none';
            body.style.overflow = 'auto';
        })

    var a_button5 = document.querySelectorAll(".button5");
    a_button5 = Array.from(a_button5);
    a_button5.map(value => {
        value.addEventListener('click', function () {
            if5.style.display = 'flex';
            body.style.overflow = 'hidden';
        });
    })

    if (cancel5)
        cancel5.addEventListener('click', function () {
            if5.style.display = 'none';
            body.style.overflow = 'auto';
        })

    var a_button6 = document.querySelectorAll(".button6");
    a_button6 = Array.from(a_button6);
    a_button6.map(value => {
        value.addEventListener('click', function () {
            if6.style.display = 'flex';
            body.style.overflow = 'hidden';
        });
    })

    if (cancel6)
        cancel6.addEventListener('click', function () {
            if6.style.display = 'none';
            body.style.overflow = 'auto';
        })

    var a_button7 = document.querySelectorAll(".button7");
    a_button7 = Array.from(a_button7);
    a_button7.map(value => {
        value.addEventListener('click', function () {
            if7.style.display = 'flex';
            body.style.overflow = 'hidden';
        });
    })

    if (cancel7)
        cancel7.addEventListener('click', function () {
            if7.style.display = 'none';
            body.style.overflow = 'auto';
        })

}