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
var formselect = document.querySelector('.form ul');
var body = document.querySelector('body');

if (button1)
    button1.addEventListener('click', function () {
        form.style.display = 'flex';
        formselect.style.animation = 'fly-to-top .5s ease-in-out forwards';
        body.style.overflow = 'hidden';
    });

if (cancel)
    cancel.addEventListener('click', function () {
        formselect.style.animation = 'fly-to-bot .5s ease-in-out';
        setTimeout(function(){
        form.style.display = 'none';
        body.style.overflow = 'auto';
        }, 500);
    })




    function active() {
        const buttons = ['button3', 'button4', 'button5', 'button6', 'button7'];
        const ifs = ['if3', 'if4', 'if5', 'if6', 'if7'];
        const cancels = ['cancel3', 'cancel4', 'cancel5', 'cancel6', 'cancel7'];
        const grselect = document.querySelector('.group-colum');
        const body = document.body;
    
        buttons.forEach((button, index) => {
            const buttonElements = Array.from(document.querySelectorAll(`.${button}`));
            const ifElement = document.querySelector(`#${ifs[index]}`);
            const cancelElement = document.querySelector(`#${cancels[index]} i`);
    
            buttonElements.forEach(buttonElement => {
                buttonElement.addEventListener('click', function () {
                    ifElement.style.display = 'flex';
                    ifElement.style.animation = 'fly-top .5s ease-in-out forwards';
                    body.style.overflow = 'hidden';
                });
            });
    
            if (cancelElement) {
                cancelElement.addEventListener('click', function () {
                    ifElement.style.animation = 'fly-bot .5s ease-in-out forwards';
                    body.style.overflow = 'auto';
                    setTimeout(function(){
                        ifElement.style.display = 'none';
                    }, 500);
                });
            }
        });
    }