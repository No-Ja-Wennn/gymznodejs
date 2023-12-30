const modalElement = document.querySelector(".modal");

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

changeSubmitElement.addEventListener("click", function () {
    var heightValue = heightElement.value;
    var weightValue = weightElement.value;
    var ageValue = ageElement.value;
    var fullnameValue = fullnameElement.value;
    var genderValue = genderElement.value;
    var phoneValue = phoneElement.value;
    var statusOfHeath = "";
    var message = "";
    var BMI = calculateBMI(heightValue, weightValue);

    if (errorNotification(heightElement, weightElement, ageElement, phoneElement)) {
        if (BMI == -1) {
            console.log("Hello")
        } else if (BMI < 18.5) {
            statusOfHeath = "Bình thường";
            message = "Bạn có một cơ thể tốt";
        } else if (BMI >= 18.5 && BMI < 25) {
            statusOfHeath = "Thiếu cân";
            message = "Bạn cần áp dụng chế độ ăn và thể thao để tăng cân";
        } else if (BMI >= 25 && BMI < 30) {
            statusOfHeath = "Thừa cân";
            message = "Bạn cần lên kế hoạch giảm cân";
        } else if (BMI >= 30) {
            statusOfHeath = "Béo phì";
            message = "Bạn cần tìm hiểu và áp dụng các biện pháp giảm cân mạnh mẽ hơn";
        }
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
    for(i = 0; i < inputArray.length; i++){
        inputArray[i].value = "";
    }

})


