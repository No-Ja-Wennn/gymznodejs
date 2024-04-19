const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$('.tab button')
const contents = $$('.content')

tabs.forEach((tab, index) => {

    const content = contents[index]

    tab.onclick = function () {

        $('.tab button.active').classList.remove('active');
        $('.content.active').classList.remove('active');

        this.classList.add('active');
        content.classList.add('active');
    }
})


const searchInput = $('.search-input');
setInterval(() => {
    searchInput.placeholder = "whey";
    setTimeout(() => {
        searchInput.placeholder = "dầu cá omega3";
        setTimeout(() => {
            searchInput.placeholder = "sữa tăng cân";
        }, 3000);
    }, 3000);
}, 6000);

const home = $('.home-button')
home.onclick = function () {
    window.location.href = 'wheyshop.html'
}

const editAccount = $('.user-account-edit');
editAccount.onclick = function () {
    window.location.href = 'information_account.html'
}

const orders = $$('.order')
orders.forEach(order => {

    order.onclick = function(){
        console.log(this)
        // $('.content.active').classList.remove('active');
        $('.order-details').classList.add('active');
        
    }
})
const closeDetails = $('.close-details')
closeDetails.onclick = function(){
    $('.order-details.active').classList.remove('active');
 }




function setStyle(elements, color) {
    elements.forEach(element => {
        element.style.backgroundColor = color;
        element.style.borderColor = color;
    });
}

const processShipping = $('.transportation-process');
const circles = $$('.circle');
const wrapperCircles = $$('.wrapper-circle');
const lines = $$('.line');

if (processShipping.classList.contains('orderSuccess')) {
    setStyle([circles[0], wrapperCircles[0], circles[1], wrapperCircles[1], lines[0]], '#2196F3');
} else if (processShipping.classList.contains('transport')) {
    setStyle([circles[0], wrapperCircles[0], circles[1], wrapperCircles[1], lines[0], circles[2], wrapperCircles[2], lines[1]], '#2196F3');
} else if (processShipping.classList.contains('complete')) {
    setStyle([circles[0], wrapperCircles[0], circles[1], wrapperCircles[1], lines[0], circles[2], wrapperCircles[2], circles[3], wrapperCircles[3], lines[1], lines[2]], '#2196F3');
}



// const processShipping = $('.transportation-process');
// const circle0 = $('.circle.zero')
// const circle1 = $('.circle.one')
// const circle2 = $('.circle.two')
// const circle3 = $('.circle.three')
// const wcircle0 = $('.wrapper-circle.zero')
// const wcircle1 = $('.wrapper-circle.one')
// const wcircle2 = $('.wrapper-circle.two')
// const wcircle3 = $('.wrapper-circle.three')
// const line0 = $('.line.zero')
// const line1 = $('.line.one')
// const line2 = $('.line.two')

// if (processShipping.classList.contains('oderSuccess')) {
//     circle0.style.backgroundColor = '#2196F3';
//     wcircle0.style.borderColor = '#2196F3';
//     circle1.style.backgroundColor = '#2196F3';
//     wcircle1.style.borderColor = '#2196F3';
//     line0.style.backgroundColor = '#2196F3';
// } else if (processShipping.classList.contains('transport')) {
//     circle0.style.backgroundColor = '#2196F3';
//     wcircle0.style.borderColor = '#2196F3';
//     circle1.style.backgroundColor = '#2196F3';
//     wcircle1.style.borderColor = '#2196F3';
//     line0.style.backgroundColor = '#2196F3';
//     circle2.style.backgroundColor = '#2196F3';
//     wcircle2.style.borderColor = '#2196F3';
//     line1.style.backgroundColor = '#2196F3';
// } else if (processShipping.classList.contains('complete')) {
//     circle0.style.backgroundColor = '#2196F3';
//     wcircle0.style.borderColor = '#2196F3';
//     circle1.style.backgroundColor = '#2196F3';
//     wcircle1.style.borderColor = '#2196F3';
//     line0.style.backgroundColor = '#2196F3';
//     circle2.style.backgroundColor = '#2196F3';
//     wcircle2.style.borderColor = '#2196F3';
//     circle2.style.backgroundColor = '#2196F3';
//     wcircle2.style.borderColor = '#2196F3';
//     line1.style.backgroundColor = '#2196F3';
//     circle3.style.backgroundColor = '#2196F3';
//     wcircle3.style.borderColor = '#2196F3';
//     line2.style.backgroundColor = '#2196F3';
// }
