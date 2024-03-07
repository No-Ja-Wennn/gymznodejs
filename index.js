import { loadData } from './navigation_javascript/loadData.js';

loadData();

var modalElement = document.querySelector(".modal");
var activePage = "home";

// === CACULATOR BMI=== //
const heightElement = document.getElementById("height")
const weightElement = document.getElementById("weight")
const ageElement = document.getElementById("age")
const fullnameElement = document.getElementById("fullname")
const genderElement = document.getElementById("gender")
const phoneElement = document.getElementById("phone")
const changeSubmitElement = document.querySelector(".change__submit")
const BMIDataArray = document.querySelectorAll(".BMI__value__row__data");
const errorMessageOfBMIE = document.querySelector(".change__input__error");

function calculateBMI(heightCm, weight) {
    if (heightCm > 0 && weight > 0) {
        let heightM = heightCm / 100; // Chuyển đổi chiều cao từ cm sang m
        let bmi = weight / (heightM * heightM);
        return bmi;
    } else {
        return -1;
    }
}

function innerValueToForm(height = 0, weight = 0, old = 0, gender = "khác", BMINumber = 0, statusOfHeath = "", message = "") {
    height = height / 100;
    for (var i = 0; i < BMIDataArray.length; i++) {
        switch (i) {
            case 0:
                BMIDataArray[i].innerHTML = `${height}m`; // Chiều cao
                break;
            case 1:
                BMIDataArray[i].innerHTML = `${weight}kg`; // Cân nặng
                break;
            case 2:
                BMIDataArray[i].innerHTML = old; // Tuổi
                break;
            case 3:
                BMIDataArray[i].innerHTML = gender; // Giới tính
                break;
            case 4:
                BMIDataArray[i].innerHTML = BMINumber; // Chỉ số BMI
                break;
            case 5:
                BMIDataArray[i].innerHTML = statusOfHeath; // Chỉ số BMI
                break;
            case 6:
                BMIDataArray[i].innerHTML = message; // Chỉ số BMI
                break;
            default:
                break;
        }
    }
}


function validatePhoneNumber(phoneNumber) {
    var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regex.test(phoneNumber);
}

function errorNotification(heightElement, weightElement, ageElement, phoneElement) {
    var heightValue = heightElement.value;
    var weightValue = weightElement.value;
    var ageValue = ageElement.value;
    var phoneValue = phoneElement.value;

    heightElement.style.borderColor = "#000";
    weightElement.style.borderColor = "#000";
    ageElement.style.borderColor = "#000";
    phoneElement.style.borderColor = "#000";
    if (heightValue < 0 || heightValue == "" || isNaN(heightValue)) {
        errorMessageOfBMIE.innerText = "Vui lòng nhập chiều cao của bạn"
        heightElement.style.borderColor = "#ff0436";
        return false;
    }
    if (weightValue < 0 || weightValue == "" || isNaN(weightValue)) {
        errorMessageOfBMIE.innerText = "Vui lòng nhập cân nặng của bạn"
        weightElement.style.borderColor = "#ff0436";
        return false;
    }
    if (ageValue < 0 || ageValue == "" || isNaN(ageValue)) {
        errorMessageOfBMIE.innerText = "Vui lòng nhập tuổi của bạn"
        ageElement.style.borderColor = "#ff0436";
        return false;
    }
    if (phoneValue < 0 || phoneValue == "" || isNaN(phoneValue) || !validatePhoneNumber(phoneValue)) {
        errorMessageOfBMIE.innerText = "Vui lòng nhập đúng số điện thoại"
        phoneElement.style.borderColor = "#ff0436";
        return false;
    }
    return true;
}

// hasvalue


changeSubmitElement.addEventListener("click", function () {
    var heightValue = heightElement.value;
    var weightValue = weightElement.value;
    var ageValue = ageElement.value;
    var fullnameValue = fullnameElement.value;
    var genderValue = genderElement.value;
    var phoneValue = phoneElement.value;
    var statusOfHeath = "";
    var message = "";
    var greeting = "Hello";
    if (genderValue == "male") {
        genderValue = "Nam";
        greeting = "Anh";
    } else if (genderValue == "female") {
        female = "Nữ";
        greeting = "Chị";
    }


    var BMI = calculateBMI(heightValue, weightValue);

    if (errorNotification(heightElement, weightElement, ageElement, phoneElement)) {
        if (BMI == -1) {
        } else if (BMI < 16) {
            statusOfHeath = "Gầy độ III";
            message = `Chào ${greeting}, ${greeting} đang ở mức gầy độ III, điều này có thể ảnh hưởng đến sức khỏe của ${greeting}. Hãy thử bổ sung thêm các loại thực phẩm giàu dinh dưỡng và tập luyện để tăng cân một cách lành mạnh.`;
        } else if (BMI >= 16 && BMI < 17) {
            statusOfHeath = "Gầy độ II";
            message = `Chào ${greeting}, ${greeting} đang ở mức gầy độ II, điều này có thể gây ra một số vấn đề về sức khỏe. Hãy thử tăng cường chế độ ăn uống và tập thể dục để tăng cơ.`;
        } else if (BMI >= 17 && BMI < 18.5) {
            statusOfHeath = "Gầy độ I";
            message = `Chào ${greeting}, ${greeting} đang ở mức gầy độ I, điều này có thể gây ra một số vấn đề về sức khỏe. Hãy thử tăng cường chế độ ăn uống và tập thể dục để tăng cơ.`;
        } else if (BMI >= 18.5 && BMI < 23) {
            statusOfHeath = "Cân nặng bình thường";
            message = `Chúc mừng! ${greeting} đang ở mức cân nặng bình thường. Hãy tiếp tục duy trì chế độ ăn uống lành mạnh và tập thể dục đều đặn.`;
        } else if (BMI >= 23 && BMI < 25) {
            statusOfHeath = "Thừa cân";
            message = `Chào ${greeting}, ${greeting} đang ở mức thừa cân, điều này có thể gây ra một số vấn đề về sức khỏe. Hãy thử giảm lượng calo hàng ngày và tăng cường hoạt động thể chất.`;
        } else if (BMI >= 25 && BMI < 30) {
            statusOfHeath = "Béo phì độ I";
            message = `Chào ${greeting}, ${greeting} đang ở mức béo phì độ I, điều này có thể gây ra một số vấn đề về sức khỏe. Hãy thử giảm lượng calo hàng ngày và tăng cường hoạt động thể chất.`;
        } else if (BMI >= 30 && BMI < 35) {
            statusOfHeath = "Béo phì độ II";
            message = `Chào ${greeting}, ${greeting} đang ở mức béo phì độ II, điều này có thể gây ra một số vấn đề về sức khỏe. Hãy thử giảm lượng calo hàng ngày và tăng cường hoạt động thể chất.`;
        } else if (BMI >= 35) {
            statusOfHeath = "Béo phì độ III";
            message = `Chào ${greeting}, ${greeting} đang ở mức béo phì độ III, điều này có thể gây ra một số vấn đề về sức khỏe. Hãy thử giảm lượng calo hàng ngày và tăng cường hoạt động thể chất.`;
        }
        BMI = BMI.toFixed(2);
        if (BMI != -1) {
            innerValueToForm(heightValue, weightValue, ageValue, genderValue, BMI, statusOfHeath, message)
            modalElement.style.display = "flex";
        }
    }
})

const bmiIconExit = document.querySelector(".BMI__title__icon");
const inputBox = document.querySelector(".change__input");
const inputArray = inputBox.getElementsByTagName("input");
bmiIconExit.addEventListener("click", function () {
    modalElement.style.display = "none";
    for (i = 0; i < inputArray.length; i++) {
        inputArray[i].value = "";
    }

})
// hidden bên base.css
$(document).ready(function () {
    $(window).scroll(function () {
        $('.hidden').each(function (i) {
            var top_of_object = $(this).offset().top;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if (bottom_of_window > top_of_object) {
                $(this).addClass('visible');
            }
        });
    });
});

// slide show
var modalShow = document.getElementById("myModalShow");
modalShow.style.display = "none";
var img1 = document.querySelector(".img_change1");
var img2 = document.querySelector(".img_change2");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img1.addEventListener("click", function () {
    modalShow.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
})
img2.addEventListener("click", function () {
    modalShow.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
})

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modalShow.style.display = "none";
}
