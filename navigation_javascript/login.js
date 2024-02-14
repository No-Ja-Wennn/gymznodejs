import { toast, showSuccessToast, showErrorToast } from './toast.js';
var modalElement = document.querySelector(".modal");
var BMIForm = document.querySelector(".BMI-form");
modalElement.style.display = "none"

var jsonPath = '../data/loginData.json';
let modal__body__box = document.querySelectorAll(".modal__body__box");
modal__body__box = Array.from(modal__body__box);
modal__body__box.map(value => {
    value.style.display = "none";
})
//set defaut
let accountName = document.querySelector(".account__name");
let accountCode = document.querySelector(".account__code");
const createAccountBox = document.querySelector(".create-account-box");
createAccountBox.style.display = "none";
let dataLogin;
let myData = { "accounts": [] }


if (!localStorage.getItem('loginData')) {
    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            myData = data;
            localStorage.setItem('loginData', JSON.stringify(myData));
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
} else {
    // Nếu dữ liệu đã tồn tại trong localStorage, sử dụng nó
    myData = JSON.parse(localStorage.getItem('loginData'));
    dataLogin = myData.accounts;
}

var loginBox = document.querySelector(".login-box");
var buttonLogin = document.getElementById("login-btn");
function buttonLoginFunction() {
    myData = JSON.parse(localStorage.getItem('loginData'));
    dataLogin = myData.accounts;
    var inputLoginEmail = loginBox.querySelector(".login-email");
    var inputLoginPass = loginBox.querySelector(".login-pass");
    let accountName = document.querySelector(".account__name");
    let accountCode = document.querySelector(".account__code");
    var emailValue = inputLoginEmail.value.trim();
    var passValue = inputLoginPass.value.trim();
    var test = false;
    if (emailValue && passValue) {
        if (!isValidEmail(emailValue)) {
            showErrorToast("Địa chỉ email không hợp lệ", "Vui lòng nhập đúng địa chỉ email")
            return;
        }
        dataLogin.map((value) => {
            if (emailValue == value.email && passValue == value.password) {
                accountName.innerText = value.name;
                accountCode.innerText = value.id;
                var date = new Date();
                date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000)); // Set expires to 3 days from now
                var expires = "; expires=" + date.toUTCString();
                document.cookie = "loggedInUser=" + JSON.stringify(value) + expires; // Lưu thông tin người dùng vào cookie
                var modalElement = document.querySelector(".modal").style.display = "none";
                inputLoginEmail.value = "";
                inputLoginPass.value = "";
                loginMenu1.innerText = value.name;
                test = true;
            }
        })
        if (!test) {
            showErrorToast("Đăng nhập thất bại", "Email hoặc mật khẩu không chính xác")
        }
    } else {
        showErrorToast("Vui lòng điền đầy đủ thông tin")
    }
}
// is email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
// is phone number
function isValidPhoneNumber(phoneNumber) {
    var regex = /^\d{10,11}$/;
    return regex.test(phoneNumber);
}
// create account button
var buttonCreate = document.getElementById("create-btn");
function buttonCreateAccountFunction() {
    myData = JSON.parse(localStorage.getItem('loginData'));
    dataLogin = myData.accounts;
    var inputLoginName = createAccountBox.querySelector(".login-name");
    var inputLoginEmail = createAccountBox.querySelector(".login-email");
    var inputLoginPass = createAccountBox.querySelector(".login-pass");
    var inputLoginPassConfirm = createAccountBox.querySelector(".login-pass-confirm");
    var nameValue = inputLoginName.value.trim();
    var emailValue = inputLoginEmail.value.trim();
    var passValue = inputLoginPass.value.trim();
    var passConfirmValue = inputLoginPassConfirm.value.trim();
    var test = true;
    if (emailValue && passValue && nameValue && passConfirmValue) {
        if (!isValidEmail(emailValue)) {
            showErrorToast("Địa chỉ email không hợp lệ", "Vui lòng nhập lại")
            return;
        }
        dataLogin.map((value, index) => {
            if (emailValue == value.email) {
                test = false;
            }
        })
        if (test) {
            if (passValue == passConfirmValue) {
                // ok
                var data = {
                    id: generateId(dataLogin),
                    name: nameValue,
                    email: emailValue,
                    password: passValue
                }
                myData.accounts.push(data);
                localStorage.setItem('loginData', JSON.stringify(myData));
                showSuccessToast("Tạo tài khoản thành công", "Vui lòng đăng nhập tài khoản vừa tạo");
                inputLoginName.value = "";
                inputLoginEmail.value = "";
                inputLoginPass.value = "";
                inputLoginPassConfirm.value = "";
                linkLogin.click();
            } else {
                console.log("không trùng")
                showErrorToast("Mật khẩu không khớp", "Vui lòng nhập kiểm tra lại ")
            }
        } else {
            console.log("tài khoản đã tồn tại")
            showErrorToast("Địa chỉ email đã tồn tại", "Vui lòng sử dụng địa chỉ email khác")
        }

    } else {
        showErrorToast("Vui lòng điền đầy đủ thông tin")
    }
}

buttonLogin.addEventListener("click", () => buttonLoginFunction())
buttonCreate.addEventListener("click", () => buttonCreateAccountFunction())

window.onload = function () {
    var cookie = document.cookie.split('; ').find(row => row.startsWith('loggedInUser'));
    if (cookie) {
        var loggedInUser = JSON.parse(cookie.split('=')[1]); // Lấy thông tin người dùng từ cookie và chuyển nó thành đối tượng
        if (loggedInUser) {
            accountName.innerText = loggedInUser.name;
            accountCode.innerText = loggedInUser.id;
            loginMenu1.innerText = loggedInUser.name;
        }
    }
}


var modalOverLay = document.querySelector('.modal-overlay');
modalOverLay.addEventListener("click", () => {
    console.log("helloo")
    modalElement.style.display = "none";
})
// click on avt
let loginMenu1 = document.querySelector(".loginstatus");
var linkLogin = createAccountBox.querySelector(".link-login");
if (loginMenu1)
    loginMenu1.addEventListener("click", () => {
        if (loginMenu1.innerText == "ĐĂNG NHẬP") {
            modalElement.style.display = "flex";
            loginBox.style.display = "block";

            var linkCreateAccount = loginBox.querySelector(".link-create-account");
            linkCreateAccount.addEventListener("click", function (e) {
                e.preventDefault();
                loginBox.style.display = "none";
                createAccountBox.style.display = "block";

            })
            var linkLogin = createAccountBox.querySelector(".link-login");
            linkLogin.addEventListener("click", function (e) {
                e.preventDefault();
                loginBox.style.display = "block";
                createAccountBox.style.display = "none";

            })
        }
    })
let logoutMenu1 = document.querySelector(".logoutstatus");
if (loginMenu1)
    logoutMenu1.addEventListener("click", (e) => {
        e.preventDefault()
        document.cookie = "loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        accountName = "";
        accountCode = "";
        loginMenu1.innerText = "ĐĂNG NHẬP";
    })
// click on avt mini
var accountLoginaInner = document.querySelector(".account__login__inner");
accountLoginaInner.addEventListener("click", (e) => {
    e.preventDefault()
    modalElement.style.display = "flex";
})

var logoElement = document.querySelector(".logo");
logoElement.addEventListener("click", () => {
    modalElement.style.display = "flex";
})



document.addEventListener('keypress', function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    // enter key
    if (keycode == '13') {
        if (modalElement.style.display == "flex") {
            var inputLoginEmail = loginBox.querySelector(".login-email");
            var inputLoginPass = loginBox.querySelector(".login-pass");
            var emailValue = inputLoginEmail.value;
            var passValue = inputLoginPass.value;
            if (emailValue && passValue) {
                buttonLoginFunction();
            }
        }
    }
});


// create auto new id
function generateId(accounts) {
    let maxId = 0;
    for (let account of accounts) {
        let idNumber = parseInt(account.id.replace('MT', ''));
        if (idNumber > maxId) {
            maxId = idNumber;
        }
    }
    let newIdNumber = maxId + 1;
    let newId = 'MT' + String(newIdNumber).padStart(2, '0');
    return newId;
}

// cart form
let registerCart = modalElement.querySelector(".register-cart");
let cube = document.querySelectorAll(".cube");
cube = Array.from(cube);
cube.map(value => {
    value.addEventListener("click", () => {
        var cookie = document.cookie.split('; ').find(row => row.startsWith('loggedInUser'));
        if (cookie) {
            modal__body__box.map(value => {
                value.style.display = "none";
            })
            var loggedInUser = JSON.parse(cookie.split('=')[1]); // Lấy thông tin người dùng từ cookie và chuyển nó thành đối tượng
            if (loggedInUser) {
                // accountName.innerText = loggedInUser.name;
                // accountCode.innerText = loggedInUser.id;
                // loginMenu1.innerText = loggedInUser.name;
                modalElement.style.display = "flex";
                registerCart.style.display = "block";
                var modalOverLay = document.querySelector('.modal-overlay');
                modalOverLay.addEventListener("click", () => {
                    modalElement.style.display = "none";
                })

                let registerCartForm = document.querySelector(".register-cart");
                let phoneNumberElement = registerCartForm.querySelector(".phoneNumber");
                let dateOfBirthElement = registerCartForm.querySelector(".date-of-birth");
                let A_radioBtnElement = registerCartForm.querySelectorAll(".radio-option");
                A_radioBtnElement = Array.from(A_radioBtnElement)
                let hopeDateElement = registerCartForm.querySelector(".hope-date");
                let A_hopeTimeElement = registerCartForm.querySelectorAll(".time-input");
                let selectPT = registerCartForm.querySelector(".select-pt");

                let valueType;
                var parentInput = A_radioBtnElement[0].parentElement;
                valueType = parentInput.querySelector(".radio-label").innerText;
                for (var i = 0; i < A_radioBtnElement.length; i++) {
                    A_radioBtnElement[i].addEventListener('change', function () {
                        var parentInput = this.parentElement;
                        valueType = parentInput.querySelector(".radio-label").innerText;
                    });
                }
                let hopeTimeValue;
                var parentInput = A_hopeTimeElement[1].parentElement;
                hopeTimeValue = parentInput.querySelector(".name").innerText;
                for (var i = 0; i < A_hopeTimeElement.length; i++) {
                    A_hopeTimeElement[i].addEventListener('change', function () {
                        var parentInput = this.parentElement;
                        hopeTimeValue = parentInput.querySelector(".name").innerText;
                    });
                }


                let submmitBTN = registerCartForm.querySelector(".summit-btn");
                submmitBTN.addEventListener("click", function () {
                    var phoneNumberValue = phoneNumberElement.value;
                    var dateOfBirthValue = dateOfBirthElement.value;
                    var hopeDateValue = hopeDateElement.value;
                    var optionPTValue = selectPT.options[selectPT.selectedIndex].value;

                    var data = {
                        phoneNumberValue,
                        dateOfBirthValue,
                        valueType,
                        hopeDateValue,
                        hopeTimeValue,
                        optionPTValue
                    }
                    console.log(data)
                    if (checkValidRegisterValue(data)) {
                        var userId = loggedInUser.id;
                        myData = JSON.parse(localStorage.getItem('cardData'));
                        var dataCompear = myData.cards;
                        var today = new Date();
                        var day = today.getDate();
                        var month = today.getMonth() + 1;
                        var yearNow = today.getFullYear();
                        var dateStart = day + '/' + month + '/' + yearNow;

                        var date = new Date(data.dateOfBirthValue);
                        var yearAge = date.getFullYear();
                        for (var i = 0; i < dataCompear.length; i++) {
                            if (dataCompear[i].id == userId) {
                                dataCompear[i].age = yearNow - yearAge;
                                dataCompear[i].phoneNumber = data.phoneNumberValue
                                dataCompear[i].cardType = data.valueType;
                                dataCompear[i].dateStart = dateStart
                            }
                        }
                        console.log(dataCompear)
                    }
                })
            }
        } else {
            showErrorToast("Thất bại", "Vui lòng đăng nhập tài khoản")
        }


    })
})

function checkValidRegisterValue(data) {
    if (data.phoneNumberValue == "") {
        showErrorToast("Thất bại", "Vui lòng nhập số điện thoại");
        return false;
    } else if (!isValidPhoneNumber(data.phoneNumberValue)) {
        showErrorToast("Thất bại", "Vui lòng nhập đúng số điện thoại");
        return false;
    } else if (data.dateOfBirthValue == "") {
        showErrorToast("Thất bại", "Vui lòng nhập ngày sinh");
        return false;
    } else if (data.valueType == "") {
        showErrorToast("Thất bại", "Vui lòng chọn gói tập");
        return false;
    } else if (data.hopeDateValue == "") {
        showErrorToast("Thất bại", "Vui lòng nhập ngày tập mong muốn");
        return false;
    } else if (data.hopeTimeValue == "") {
        showErrorToast("Thất bại", "Vui lòng chọn thời gian tập mong muốn");
        return false;
    } else if (data.optionPTValue == "") {
        showErrorToast("Thất bại", "Vui lòng chọn huấn luyện viên");
        return false;
    }
    return true;
}