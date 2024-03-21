const btshow = document.querySelectorAll('.navigation-display-button');
const bthide = document.querySelector('.navigation-hide-button');
const navigation = document.querySelector('.container__bar');
const shadow = document.querySelector('.shadow');
const chat = document.querySelector('.chatbox');

shadow.addEventListener('click', function(event) {
    console.log('hide2');
    navigation.style.animation = 'fly-out-left .35s ease-in-out forwards';
    shadow.style.animation = 'shadow-out .35s ease-in-out forwards';
    setTimeout(function() {
        navigation.style.display = 'none';
        btshow.innerHTML = '<i class="fa-solid fa-bars"></i>';
        shadow.style.display = 'none';
    }, 500);
})
btshow.forEach(button => {
    button.addEventListener('click', function(event) {
        console.log('show');
        navigation.style.animation = 'fly-in-left .35s ease-in-out forwards';
        navigation.style.display = 'flex';
        shadow.style.animation = 'shadow-in .35s ease-in-out forwards';
        shadow.style.display = 'flex';
    })
});



bthide.addEventListener('click', function(event) {
    console.log('hide');
    navigation.style.animation = 'fly-out-left .35s ease-in-out forwards';
    shadow.style.animation = 'shadow-out .35s ease-in-out forwards';
    setTimeout(function() {
        navigation.style.display = 'none';
        btshow.innerHTML = '<i class="fa-solid fa-bars"></i>';
        shadow.style.display = 'none';
    }, 500);
})
    



let bttrash = document.querySelectorAll('.more-option i');
let displaytrash = document.querySelector('.message__user__box__affter');
let displaylist = document.querySelector('.message__user__box__affter__list');

// bttrash.forEach(button => {
//     button.addEventListener('click', function(){

//         event.stopPropagation();
    
//         if (displaytrash.style.display === 'none' || displaytrash.style.display === ''){
//             console.log('show trash1')
//             displaytrash.style.display = 'flex';
//             displaytrash.style.animation = 'showtrash .35s ease-in-out forwards';
//             setTimeout(function(){
//                 displaylist.style.animation = 'showlist .1s ease-in-out forwards';
//             }, 250)
//         }else{
//             console.log('hide trash2')
//             displaylist.style.animation = 'hidelist .1s ease-in-out forwards';
//             setTimeout(function(){
//                 displaytrash.style.animation = 'hidetrash .35s ease-in-out forwards';
//                 setTimeout(function(){
//                     displaytrash.style.display = 'none';
//                 }, 350)
//             }, 50)
//         }
//     });
// })


// xu ly khi click ra ngoai nut 3 cham
document.addEventListener('click', function(){
    if(displaytrash)
    if(displaytrash.style.display === 'flex'){
        console.log('hide click tum lum')
        displaylist.style.animation = 'hidelist .1s ease-in-out forwards';
        setTimeout(function(){
            displaytrash.style.animation = 'hidetrash .35s ease-in-out forwards';
            setTimeout(function(){
                displaytrash.style.display = 'none';
            }, 350)
        }, 50)
    }
});






//animation xoa tin nhan
const deletechat = document.querySelector('.message__user__box__affter__item');
if(deletechat)
deletechat.addEventListener('click', function(){
    const chat_active = document.querySelector('.message__user--active1');
    chat_active.style.animation = 'side-to-left .25s ease-in-out forwards';
    setTimeout(function(){
        chat_active.style.animation = 'de-height .25s ease-in-out forwards';
        setTimeout(function(){
            chat_active.style.display = 'none';
        }, 250)
    }, 250)
    console.log('delete');
});



// document.getElementById('next').onclick = function(){
//     const widthItem = document.querySelector('.chatbox').offsetWidth;
//     document.getElementById('groupList').scrollLeft += widthItem;
// };
// document.getElementById('prve').onclick = function(){
//     const widthItem = document.querySelector('.chatbox').offsetWidth;
//     document.getElementById('groupList').scrollLeft -= widthItem;
// };



function scrollRight() {
    const widthItem = document.querySelector('.chatbox').offsetWidth;
    document.getElementById('groupList').scrollLeft += widthItem;
}

function scrollLeft() {
    const widthItem = document.querySelector('.chatbox').offsetWidth;
    document.getElementById('groupList').scrollLeft -= widthItem;
}

document.getElementById('next').onclick = scrollRight;
document.getElementById('prve').onclick = scrollLeft;



// // Biến để theo dõi trạng thái của vòng lặp
// let isScrollingRight = true;
// // Thiết lập vòng lặp vô tận để gọi hàm
// setInterval(function() {
//     if (isScrollingRight) {
//         scrollRight();
//     } else {
//         scrollLeft();
//     }
//     isScrollingRight = !isScrollingRight; // Đảo ngược trạng thái sau mỗi lần gọi hàm
// }, 2000); // Thực hiện sau mỗi 3 giây




// let touchTimer; // Biến để lưu trữ thời gian giữ touch
// const element = document.querySelectorAll('.message__user');

// element.forEach(button => {
//     button.addEventListener('touchstart', function(event) {
//         touchTimer = setTimeout(function() {
//             // Thực hiện hành động khi giữ touch trong thời gian mong muốn
//             // console.log('Touch and hold event detected!');
//             console.log('show trash1')
//                 displaytrash.style.display = 'flex';
//                 displaytrash.style.animation = 'showtrash .35s ease-in-out forwards';
//                 setTimeout(function(){
//                     displaylist.style.animation = 'showlist .1s ease-in-out forwards';
//                 }, 250)
//         }, 600); // 1000 miliseconds = 1 giây (thay đổi thời gian tùy ý)
//     });
    
// })




// element.addEventListener('touchend', function(event) {
//     clearTimeout(touchTimer); // Hủy timer nếu người dùng nhấc tay ra trước khi hết thời gian
//     console.log('cancel Touch and hold');
// });
