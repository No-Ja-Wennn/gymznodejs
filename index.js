const modalElement = document.querySelector(".modal");

// === CACULATOR BMI=== //
const heightElement = document.getElementById("height")
const weightElement = document.getElementById("weight")
const ageElement = document.getElementById("age")
const fullnameElement = document.getElementById("fullname")
const genderElement = document.getElementById("gender")
const phoneElement = document.getElementById("phone")
const changeSubmitElement = document.querySelector(".change__submit")
const elements = document.querySelectorAll(".BMI__value__row__data");

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
    for (var i = 0; i < elements.length; i++) {
        switch (i) {
            case 0:
                elements[i].innerHTML = `${height}m`; // Chiều cao
                break;
            case 1:
                elements[i].innerHTML = `${weight}kg`; // Cân nặng
                break;
            case 2:
                elements[i].innerHTML = old; // Tuổi
                break;
            case 3:
                elements[i].innerHTML = gender; // Giới tính
                break;
            case 4:
                elements[i].innerHTML = BMINumber; // Chỉ số BMI
                break;
            case 5:
                elements[i].innerHTML = statusOfHeath; // Chỉ số BMI
                break;
            case 6:
                elements[i].innerHTML = message; // Chỉ số BMI
                break;
            default:
                break;
        }
    }
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
    console.log(BMI)
    if (BMI == -1) {
        console.log("Vui lòng nhập cân nặng và chiều cao lớn hơn 0")
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
    innerValueToForm(heightValue, weightValue, ageValue, genderValue, BMI, statusOfHeath, message)
    modalElement.style.display = "flex";
})

const bmiIconExit = document.querySelector(".BMI__title__icon");

bmiIconExit.addEventListener("click", function(){
    modalElement.style.display = "none";
})


