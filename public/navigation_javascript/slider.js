//code chat
let widthItem = null;
let i = 1;
let intervalId = null;

function loadAgain(){
    setTimeout(() => {
        const widthSixone = document.querySelector('.six.one').offsetWidth;
        widthItem = widthSixone;

        // console.log('ok')    

        let tong = widthItem;
        intervalId = setInterval(() => {
            const widthSixone = document.querySelector('.six.one').offsetWidth;
            widthItem = widthSixone;
            // console.log(tong)
            // console.log(i)
            if(i<3){
                i++;
                tong += widthItem;
                cuontrai();
            } else{
                cuonphai(tong)
                i = 1;
                tong = widthItem;
            }
        }, 3000);

    }, 2000);
};

function cuonphai(widthItem) {
    document.getElementById('sliderlist').scrollLeft -= widthItem;
};

function cuontrai() {
    document.getElementById('sliderlist').scrollLeft += widthItem;
};

document.getElementById('nextblog').onclick = function() {
    clearInterval(intervalId);
    cuontrai();
    loadAgain();
};
document.getElementById('preblog').onclick = function() {
    clearInterval(intervalId);
    cuonphai();
    loadAgain();
};

loadAgain();












// code tay

// let widthItem = null;
// let i = 1;

// function loadAgain(){
//     setTimeout(() => {
//         const widthSixone = document.querySelector('.six.one').offsetWidth;
//         widthItem = widthSixone;

//         console.log('ok')    


//         let tong = widthItem;
//         setInterval(() => {
//             const widthSixone = document.querySelector('.six.one').offsetWidth;
//             widthItem = widthSixone;
//             console.log(tong)
//             console.log(i)
//             if(i<3){
//                 i++;
//                 tong += widthItem;
//                 cuontrai();
//             } else{
//                 cuonphai(tong)
//                 i = 1;
//                 tong = widthItem;
//             }
//         }, 4000);

//     }, 2000);
// };

// function cuonphai(widthItem) {
//     document.getElementById('sliderlist').scrollLeft -= widthItem;
// };

// function cuontrai() {
//     document.getElementById('sliderlist').scrollLeft += widthItem;
// };

// document.getElementById('nextblog').onclick = cuontrai;
// document.getElementById('preblog').onclick = cuonphai;

// loadAgain();









// window.addEventListener('resize', function() {
//     const widthSixone = document.querySelector('.six.one').offsetWidth;
//     widthItem = widthSixone;
// });
