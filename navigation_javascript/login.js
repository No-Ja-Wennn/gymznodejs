import { toast, showSuccessToast, showErrorToast } from './toast.js';
let userActive = "other";
const jsonPathCard = '../data/carddata.json';
const jsonPathCalendar = '../data/calendarData.json';
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
if (createAccountBox)
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
                deleteCookie("loggedInUser");
                accountName.innerText = value.name;
                accountCode.innerText = value.id;
                var date = new Date();
                date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000)); // Set expires to 3 days from now
                var expires = "; expires=" + date.toUTCString();
                document.cookie = "loggedInUser=" + JSON.stringify(value) + expires; // Lưu thông tin người dùng vào cookie
                var modalElement = document.querySelector(".modal").style.display = "none";
                userActive = value.id;
                inputLoginEmail.value = "";
                inputLoginPass.value = "";
                loginMenu1.innerText = value.name;
                logoutMobile.style.display = "flex";
                showSuccessToast("Đăng nhập thành công", "Chào mừng bạn đã tới với dịch vụ của chúng tôi")
                test = true;
                if (activePage == "card")
                    showCard();
            }
        })
        if (!test) {
            showErrorToast("Đăng nhập thất bại", "Email hoặc mật khẩu không chính xác")
        }
    } else {
        showErrorToast("Vui lòng điền đầy đủ thông tin")
    }
}
function deleteCookie(cname) {
    console.log("da xoa");
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/navigation;";
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
                var newID = generateId(dataLogin)
                var data = {
                    id: newID,
                    name: nameValue,
                    email: emailValue,
                    password: passValue
                }
                myData.accounts.push(data);
                localStorage.setItem('loginData', JSON.stringify(myData));
                let cardData = {};
                if (!localStorage.getItem('cardData')) {
                    fetch(jsonPathCard)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            cardData = data;
                            localStorage.setItem('cardData', JSON.stringify(cardData));
                        })
                        .catch(error => {
                            console.error('Fetch error:', error);
                        });
                } else {
                    // Nếu dữ liệu đã tồn tại trong localStorage, sử dụng nó
                    cardData = JSON.parse(localStorage.getItem('cardData'));
                }
                var data = {
                    "id": newID,
                    "name": nameValue,
                    "age": "",
                    "phoneNumber": "",
                    "cardType": "",
                    "dateStart": "",
                    "dateEnd": ""
                }
                cardData.cards.push(data);
                localStorage.setItem('cardData', JSON.stringify(cardData));
                let calendarData = {}
                if (!localStorage.getItem('calendarData')) {
                    fetch(jsonPathCalendar)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            calendarData = data;
                            // Lưu dữ liệu vào localStorage
                            localStorage.setItem('calendarData', JSON.stringify(calendarData));
                        })
                        .catch(error => {
                            console.error('Fetch error:', error);
                        });
                } else {
                    // Nếu dữ liệu đã tồn tại trong localStorage, sử dụng nó
                    calendarData = JSON.parse(localStorage.getItem('calendarData'));
                }
                var data = {
                    "id": newID,
                    "name": nameValue,
                    "date": "",
                    "timeStart": "",
                    "timeEnd": "",
                    "type": "",
                    "ptName": "",
                    "note": ""
                }
                calendarData.calendars.push(data);
                localStorage.setItem('calendarData', JSON.stringify(calendarData));
                showSuccessToast("Tạo tài khoản thành công", "Vui lòng đăng nhập tài khoản vừa tạo");
                inputLoginName.value = "";
                inputLoginEmail.value = "";
                inputLoginPass.value = "";
                inputLoginPassConfirm.value = "";
                modal__body__box.map(value => {
                    value.style.display = "none";
                })
                modalOverLay.click();
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

if (buttonLogin)
    buttonLogin.addEventListener("click", () => buttonLoginFunction())
if (buttonCreate)
    buttonCreate.addEventListener("click", () => buttonCreateAccountFunction())

window.onload = function () {
    var cookie = document.cookie.split('; ').find(row => row.startsWith('loggedInUser'));
    if (cookie) {
        var loggedInUser = JSON.parse(cookie.split('=')[1]); // Lấy thông tin người dùng từ cookie và chuyển nó thành đối tượng
        if (loggedInUser) {
            accountName.innerText = loggedInUser.name;
            accountCode.innerText = loggedInUser.id;
            if (loginMenu1)
                loginMenu1.innerText = loggedInUser.name;
            userActive = loggedInUser.id;
            // console.log(userActive)
        }
        logoutMobile.style.display = "flex";
    }
}


let modalOverLay = document.querySelector('.modal-overlay');
modalOverLay.addEventListener("click", () => {
    modalElement.style.display = "none";
})
// click on avt
let loginMenu1 = document.querySelector(".loginstatus");
if (createAccountBox)
    var linkLogin = createAccountBox.querySelector(".link-login");
if (loginMenu1)
    loginMenu1.addEventListener("click", () => {
        if (loginMenu1.innerText == "ĐĂNG NHẬP") {
            modalElement.style.display = "flex";
            modal__body__box.map(value => {
                value.style.display = "none";
            })
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
// logout function
function logout() {
    deleteCookie("loggedInUser");
    accountName.innerText = "USERNAME";
    accountCode.innerText = "GYMZ001";
    loginMenu1.innerText = "ĐĂNG NHẬP";
    logoutMobile.style.display = "none";
    showSuccessToast("Đã đăng xuất", "")
}
let logoutMenu1 = document.querySelector(".logoutstatus");
if (loginMenu1)
    logoutMenu1.addEventListener("click", logout)

let logoutMobile = document.querySelector(".content__logout__btn");
if (logoutMobile) {
    logoutMobile.addEventListener("click", logout)
}

// click on avt mini
var accountLoginaInner = document.querySelector(".account__login__inner");
accountLoginaInner.addEventListener("click", loginMobile)

function loginMobile() {
    var cookie = document.cookie.split('; ').find(row => row.startsWith('loggedInUser'));
    if (cookie) {
        var loggedInUser = JSON.parse(cookie.split('=')[1]); // Lấy thông tin người dùng từ cookie và chuyển nó thành đối tượng
        if (loggedInUser) {
            window.location.href = '/navigation/information_account.html';
        }
    } else {
        modalElement.style.display = "flex";
        modal__body__box.map(value => {
            value.style.display = "none";
        })
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
}

var logoElement = document.querySelector(".logo");
logoElement.addEventListener("click", loginMobile)



document.addEventListener('keypress', function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    // enter key
    if (keycode == '13') {
        if (modalElement.style.display == "flex") {
            if (loginBox) {
                var inputLoginEmail = loginBox.querySelector(".login-email");
                var inputLoginPass = loginBox.querySelector(".login-pass");
                var emailValue = inputLoginEmail.value;
                var passValue = inputLoginPass.value;
                if (emailValue && passValue) {
                    buttonLoginFunction();
                }
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
                let A_radioBtnPackageElement = registerCartForm.querySelectorAll(".radio-option");
                let A_radioBtnExElement = registerCartForm.querySelectorAll(".radio-option2");
                A_radioBtnPackageElement = Array.from(A_radioBtnPackageElement);
                A_radioBtnExElement = Array.from(A_radioBtnExElement);
                let hopeDateElement = registerCartForm.querySelector(".hope-date");
                let A_hopeTimeElement = registerCartForm.querySelectorAll(".time-input");
                let selectPT = registerCartForm.querySelector(".select-pt");

                let valueType;
                let valueExercise;
                var parentInputType = A_radioBtnPackageElement[0].parentElement;
                var parentInputExercise = A_radioBtnExElement[0].parentElement;
                valueType = parentInputType.querySelector(".radio-label").innerText;
                valueExercise = parentInputExercise.querySelector(".radio-label").innerText;
                for (var i = 0; i < A_radioBtnPackageElement.length; i++) {
                    A_radioBtnPackageElement[i].addEventListener('change', function () {
                        var parentInput = this.parentElement;
                        valueType = parentInput.querySelector(".radio-label").innerText;
                    });
                }
                for (var i = 0; i < A_radioBtnExElement.length; i++) {
                    A_radioBtnExElement[i].addEventListener('change', function () {
                        var parentInput = this.parentElement;
                        valueExercise = parentInput.querySelector(".radio-label").innerText;
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
                        valueExercise,
                        hopeDateValue,
                        hopeTimeValue,
                        optionPTValue
                    }
                    if (checkValidRegisterValue(data)) {
                        console.log(data)
                        var userId = loggedInUser.id;
                        myData = JSON.parse(localStorage.getItem('cardData'));
                        var dataCompear = myData.cards;
                        var today = new Date();
                        var day = today.getDate();
                        var month = today.getMonth() + 1;
                        var yearNow = today.getFullYear();
                        var dateStart = day + '/' + month + '/' + yearNow;
                        var monthEnd = (month + 1) % 12;
                        if (monthEnd == 0) {
                            monthEnd = 12;
                        }
                        var yearEnd = yearNow;
                        if ((month + 1) - 12 > 0)
                            var yearEnd = yearNow + 1;

                        var dateEnd = day + '/' + monthEnd + '/' + yearEnd;
                        var date = new Date(data.dateOfBirthValue);
                        var yearAge = date.getFullYear();
                        for (var i = 0; i < myData.cards.length; i++) {
                            if (myData.cards[i].id == userId) {
                                myData.cards[i].age = yearNow - yearAge;
                                myData.cards[i].phoneNumber = data.phoneNumberValue
                                myData.cards[i].cardType = data.valueType;
                                myData.cards[i].dateStart = dateStart;
                                myData.cards[i].dateEnd = dateEnd;
                            }
                        }
                        localStorage.setItem('cardData', JSON.stringify(myData));
                        myData = JSON.parse(localStorage.getItem('calendarData'));
                        var a_time = hopeTimeValue.split("-")
                        for (var i = 0; i < myData.calendars.length; i++) {
                            if (myData.calendars[i].id == userId) {
                                myData.calendars[i].date = data.hopeDateValue;
                                myData.calendars[i].timeStart = a_time[0];
                                myData.calendars[i].timeEnd = a_time[1];
                                myData.calendars[i].type = data.valueExercise
                                myData.calendars[i].ptName = data.optionPTValue
                                myData.calendars[i].note = "Chưa thanh toán"

                            }
                        }
                        console.log(myData.calendars)
                        localStorage.setItem('calendarData', JSON.stringify(myData));
                        showSuccessToast("Thành công", "Quý khách vui lòng tới quầy lễ tân tại phòng gym để thanh toán")
                        modal__body__box.map(value => {
                            value.style.display = "none";
                        })
                        modalOverLay.click();
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
    } else if (data.valueExercise == "") {
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

