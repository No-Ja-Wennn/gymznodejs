// Thêm mã này vào đầu file
const formInput = document.querySelector(".form__input");
const buttonRequest = document.querySelector(".button__request");
const inputs = document.querySelectorAll(".fullname__input__box");
formInput.style.display = "none";

// Hàm kiểm tra định dạng dữ liệu nhập vào
function validateInput() {
    let isValid = true;
    inputs.forEach(input => {
        if (input.value.trim() === "") {
            isValid = false;
        }
    });
    return isValid;
}

// Hiển thị form khi quay trúng phần thưởng
// function determineGift(deg) {
//     let giftIndex = Math.floor(deg / 45) % 8;
//     console.log("Bạn đã quay vào: " + giftArray[giftIndex].giftName);
//     formInput.style.display = "flex"; // Hiển thị form
// }

// Ẩn form khi nhấp vào nút xác nhận
buttonRequest.addEventListener("click", (e) => {
    e.stopPropagation();
    if (validateInput()) {
        formInput.style.display = "none"; // Ẩn form
    } else {
        alert("Vui lòng nhập đúng định dạng");
    }
});

// Ẩn form khi nhấp bất kì đâu ngoài form
window.addEventListener("click", () => {
    formInput.style.display = "none"; // Ẩn form
});

// Ngăn không cho form bị ẩn khi nhấp vào bên trong form
formInput.addEventListener("click", (e) => {
    e.stopPropagation();
});






const dropDown = document.querySelector(".header__inner__navigation__sevice")
const menuroiE = document.querySelector(".menuroi");

const noidungE = document.querySelector(".noidung");

dropDown.addEventListener("click", () => {
    if (noidungE.style.display == "block") {
        noidungE.style.display = "none";
        console.log("block");
    } else {
        noidungE.style.display = "block";
        console.log("none");

    }
})


// 45 ngày free ship đỏ => 1
// bình nước => 2
// 45 ngày free ship xám => 3
// 1 chỉ vàng => 4
// 1 túi du lịch => 5
// 2 voucher => 6
// 1 ly nước => 7
// 1 túi da => 8

let deg = 0;
let imgTransform = document.querySelector('.container__colum1__inner2__img');
let isSpinning = false; // Biến trạng thái mới
let giftArray = [
    { "giftName": "45 ngày free ship đỏ", "giftRates": 0.0 },
    { "giftName": "bình nước", "giftRates": 0.0 },
    { "giftName": "45 ngày free ship xám", "giftRates": 0.0 },
    { "giftName": "1 chỉ vàng", "giftRates": 0.10 },
    { "giftName": "1 túi du lịch", "giftRates": 0.0 },
    { "giftName": "2 voucher", "giftRates": 0.0 },
    { "giftName": "1 ly nước", "giftRates": 0.0 },
    { "giftName": "1 túi da", "giftRates": 0.0 }
];
let timeSping = 10;
function rotateImage(randomNum, addRound) {
    isSpinning = true; // Bắt đầu quay
    let rounds = 8; // Số vòng quay
    deg += (randomNum * 45) + (rounds * 360); // Thêm số vòng quay vào deg

    imgTransform.style.transform = 'rotate(' + deg + 'deg)';
    imgTransform.style.transition = `transform ${timeSping}s`;
    setTimeout(function() {
        isSpinning = false; // Kết thúc quay sau 2 giây
        determineGift(deg); // Xác định phần quà sau khi quay xong
    }, timeSping * 1000);
}

function startClick(){
    if (!isSpinning) { // Chỉ cho phép nhấp khi không quay
        var randomNum = getRandomGift(giftArray);
        var addRounds = Math.floor(Math.random() * 10);
        rotateImage(randomNum,addRounds);
    }
}

function determineGift(deg) {
    let giftIndex = Math.floor(deg / 45) % 8;
    console.log("Bạn đã quay vào: " + giftArray[giftIndex].giftName);
    formInput.style.display = "flex"; // Hiển thị form
}

function getRandomGift(gifts) {
    let sum = gifts.reduce((a, b) => a + b.giftRates, 0);
    let rand = Math.random() * sum;
    let rateSum = 0;
    for (let i = 0; i < gifts.length; i++) {
        rateSum += gifts[i].giftRates;
        if (rand < rateSum) {
            return i;
        }
    }
    return gifts.length - 1;
}



