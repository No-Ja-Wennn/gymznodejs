import {
    displayNoneAll,
    removeAllInputValue,
    f_loginBTN,
    activeNecessaryForm,
    f_registerBTN,
    f_cancel,
    eventNotActiveRE,
    eventNotActiveCA,
    f_cubeBTN
} from "../navigation_javascript/login.js"
import { showSuccessToast, showErrorToast } from "./toast.js";
import { validateCreateAccount, validateLoginValue, validateChangePass, isValidChangePass, isFormComplete } from './validate.js';
import {
    innerTextOfInformation,
    removeTextOfInformation,
    activeClickChange,
    unActiveClickChange,
    removeAllValueChange,
    innerTextOfCard,
    removeTextOfCard,
} from '../navigation_javascript/infomation_account.js'
import { innerMesageBox, loginSocket, logoutSocket, removeMessageBox } from "../navigation_javascript/chatbox.js";

const modalBox = document.querySelector(".modal");
const overlayBox = modalBox.querySelector(".modal-overlay");
const loginBox = modalBox.querySelector(".login-box");
const createAccountBox = modalBox.querySelector(".create-account-box");
const forgotPassBox = modalBox.querySelector(".forgot-pass-box");
const registerCartBox = document.getElementById("form-register");
const changeNameBox = modalBox.querySelector(".change-name-box");
const changePassBox = modalBox.querySelector(".change-pass-box");
const loadBox = modalBox.querySelector(".loader");

let sendCodeBTN = document.getElementById("send-code");
const timeLeftElement = document.getElementById("timeLeft");
const logoutBTN2 = document.querySelector(".content__logout__btn");
const logoutBTN = document.querySelector(".logoutstatus");
const loginBTN1 = document.querySelector(".loginstatus");
const loginBTN2 = document.getElementById("menu2-infor");


const registerBTN = document.getElementById("button1");
const cancelREBTN = document.getElementById("button2");
let a_cubeBTN = document.querySelectorAll(".cube");

const path = window.location.pathname;


// INFOR ACCOUNT PAGE
const nameClientElement = document.getElementById("name-client");
const dateOfBirthClientElement = document.getElementById("dateofbirth-client");
const emailClientElement = document.getElementById("email-client");
const phoneClientElement = document.getElementById("phone-client");
const changeBox = document.querySelector(".change-box");

const cancelRECartBox = document.getElementById("form-cancel");

/////


const informationCardTitle = document.getElementById("information__card__title");

let cookieSave = null;
function f_logoutBTN() {
    var userNameElement1 = document.querySelector(".loginstatus");
    var userNameElement2 = document.querySelector(".account__name");
    var accountCodeElement2 = document.querySelector(".account__code");
    if (userNameElement1)
        userNameElement1.innerText = "ĐĂNG NHẬP";
    userNameElement2.innerText = "USERNAME";
    accountCodeElement2.innerText = "USERCODE";
    removeMessageBox();
    $.ajax({
        url: '/logout-url',
        type: 'POST',
        success: function (data) {
            if (data) {
                if (cookieSave) {
                    if (loginBTN1)
                        loginBTN1.addEventListener("click", f_loginBTN);
                    loginBTN2.addEventListener("click", f_loginBTN);
                    if (loginBTN2)
                        logoutBTN2.removeEventListener("click", f_logoutBTN);
                    removeTextOfInformation();
                    unActiveClickChange();
                    console.log("path: ", path)
                    getValueInformationForm(path);
                    if (cancelREBTN)
                        cancelREBTN.removeEventListener("click", eventNotActiveCA);
                    f_getValidCard();
                    cookieSave = null;
                    logoutSocket();
                    showSuccessToast("Đã đăng xuất", "Cảm ơn bạn đã sử dụng dịch vụ");
                }
                else
                    showErrorToast("Thất bại", "Quý khách chưa đăng nhập vào hệ thống")
            }
        },
        error: function (err) {
            // console.log('Error:', err);
        }
    });
}
function innerValueAfterLogin(userName, code) {
    var userNameElement1 = document.querySelector(".loginstatus");
    var userNameElement2 = document.querySelector(".account__name");
    var accountCodeElement2 = document.querySelector(".account__code");
    if (userNameElement1) {
        userNameElement1.innerText = userName;
    }
    userNameElement2.innerText = userName;
    accountCodeElement2.innerText = code;
    logoutBTN2.style.display = "flex";
    logoutBTN2.addEventListener("click", f_logoutBTN);
    if (loginBTN2)
        loginBTN2.addEventListener("click", () => {
            window.location.href = './navigation/information_account.html';
        })
}


let countdownTimer;
let emailSentCode;
// SUBMIT FORGOT PASSWORD
function f_sendCodeBTN(e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
    var email = forgotPassBox.querySelector(".login-email").value;
    emailChangePass = email;
    if (!email) {
        showErrorToast("Vui lòng điền email", "");
    } else {
        // Gửi yêu cầu POST đến server
        $.ajax({
            url: '/your-send-code-url',
            type: 'POST',
            data: { email: email }, // Dữ liệu gửi lên server
            success: function (response) {
                if (response.active) {
                    showSuccessToast("Mã khôi phục đã gửi tới email của bạn");
                    sendCodeBTN.removeEventListener("click", f_sendCodeBTN);
                    sendCodeBTN.addEventListener("click", function (e) { e.preventDefault() })
                    let timeLeft = 60;
                    countdownTimer = setInterval(function () {
                        timeLeft--;
                        timeLeftElement.textContent = timeLeft + "s";
                        // Khi thời gian còn lại là 0, dừng đếm ngược
                        if (timeLeft <= 0) {
                            sendCodeBTN.addEventListener("click", f_sendCodeBTN);
                            if (typeof countdownTimer !== 'undefined') {
                                clearInterval(countdownTimer);
                            }
                        }
                    }, 1000);
                }
                else
                    showErrorToast("Lỗi", "Tài khoản không tồn tại trong hệ thống");
            }
        });
    }
}
let emailChangePass = null;

function getValueInformationForm(path) {
    var type;
    if (path == "/navigation/information_account.html") {
        type = "account";
    } else if (path == "/navigation/information_card_TS.html") {
        type = "card";
    } else {
        type = "other";
    }
    let loaderTimeout = setTimeout(function () {
        activeNecessaryForm();
        overlayBox.removeEventListener("click", displayNoneAll);
        loadBox.style.display = "flex";
    }, 1000);
    $.ajax({
        url: '/get-value-information-form',
        type: 'POST',
        data: { type: type },
        success: function (data) {
            clearTimeout(loaderTimeout);
            if (data.success) {
                console.log("Type: ", type);
                var myData = data.value;
                if (type == "account") {
                    innerTextOfInformation(
                        myData.name,
                        myData.dateOfBirth,
                        myData.email,
                        myData.phoneNumber);
                }
                else if (type == "card") {
                    innerTextOfCard(
                        myData.name,
                        myData.maThe,
                        myData.cardType,
                        myData.dateStart,
                        myData.dateEnd
                    );
                }
            } else {
                if (type == "account") {
                    innerTextOfInformation(
                        "...",
                        "...",
                        "...",
                        "...");
                }
                else if (type == "card") {
                    innerTextOfCard(
                        "...",
                        "...",
                        "...",
                        "...",
                        "..."
                    );
                }
                if (!data.login) {
                    displayNoneAll();
                    activeNecessaryForm();
                    loginBox.style.display = "block";
                }
            }
        },
        error: function (err) {
            // console.log('Error:', err);
        }
    });
}

function f_changeServer(element, url) {
    $.ajax({
        url: url.pathname,
        type: 'POST',
        data: $(element).serialize() + "&maKH=" + encodeURIComponent(cookieSave.maKH),
        success: function (data) {
            if (data.success) {
                if (data.type == "name") {
                    showSuccessToast("Đổi tên thành công");
                    var nameValue = changeBox.querySelector(".new1").value;
                    nameClientElement.innerText = nameValue;
                } else if (data.type == "profile") {
                    showSuccessToast("Đổi thông tin hồ sơ thành công");
                    var nameValue = changeBox.querySelector(".new1").value;
                    dateOfBirthClientElement.innerText = nameValue;
                } else if (data.type == "account") {
                    showSuccessToast("Đổi thông tin tài khoản thành công");
                    var nameValue = changeBox.querySelector(".new1").value;
                    emailClientElement.innerText = nameValue;
                    var nameValue = changeBox.querySelector(".new2").value;
                    phoneClientElement.innerText = nameValue;
                } else if (data.type == "pass") {
                    showSuccessToast("Đổi mật khẩu thành công");
                }
                displayNoneAll();
                removeAllValueChange();
            } else {
                if (data.type == "pass")
                    showErrorToast("Đổi mật khẩu không thành công", "Mật khẩu cũ không chính xác");
                else
                    showSuccessToast("Lỗi", "Vui lòng liên hệ với nhân viên lễ tân qua số 099899003");
            }
        },
        error: function (err) {
            // console.log('Error:', err);
        }
    });
}

function f_getValidCard() {
    $.ajax({
        url: "/get-valid-card",
        type: "GET",
        success: function (data) {
            if (data.login) {
                if (data.have) {
                    if (registerBTN && cancelREBTN) { // đã đky
                        registerBTN.removeEventListener("click", f_registerBTN);
                        registerBTN.addEventListener("click", eventNotActiveRE);
                        cancelREBTN.removeEventListener("click", eventNotActiveCA);
                        cancelREBTN.addEventListener("click", f_cancel);

                    } else if (a_cubeBTN) {
                        a_cubeBTN = Array.from(a_cubeBTN);
                        a_cubeBTN.map(value => {
                            value.removeEventListener("click", f_cubeBTN);
                            value.addEventListener("click", eventNotActiveRE);
                        })
                    }
                } else {
                    if (registerBTN && cancelREBTN) { // chưa dky
                        registerBTN.addEventListener("click", f_registerBTN);
                        registerBTN.removeEventListener("click", eventNotActiveRE);
                        cancelREBTN.addEventListener("click", eventNotActiveCA);
                        cancelREBTN.removeEventListener("click", f_cancel);

                    } else if (a_cubeBTN) {
                        a_cubeBTN = Array.from(a_cubeBTN);
                        a_cubeBTN.map(value => {
                            value.addEventListener("click", f_cubeBTN);
                            value.removeEventListener("click", eventNotActiveRE);
                        })
                    }
                }
            } else {
                console.log("huy");
                if (registerBTN && cancelREBTN) { // chưa dky
                    registerBTN.removeEventListener("click", f_registerBTN);
                    registerBTN.removeEventListener("click", eventNotActiveRE);
                    cancelREBTN.removeEventListener("click", eventNotActiveCA);
                    cancelREBTN.removeEventListener("click", f_cancel);

                } else if (a_cubeBTN) {
                    a_cubeBTN = Array.from(a_cubeBTN);
                    a_cubeBTN.map(value => {
                        value.removeEventListener("click", f_cubeBTN);
                        value.removeEventListener("click", eventNotActiveRE);
                    })
                } else if (a_cubeBTN) {
                    a_cubeBTN = Array.from(a_cubeBTN);
                    a_cubeBTN.map(value => {
                        value.removeEventListener("click", f_cubeBTN);
                        value.removeEventListener("click", eventNotActiveRE);
                    })
                }
            }
        },
        error: function (err) {

        }
    })
}




// client.js
$(document).ready(function () {
    $('#login-form').submit(function (e) {
        e.preventDefault();
        if (validateLoginValue()) {
            $.ajax({
                url: '/login-url',
                type: 'POST',
                data: $(this).serialize(),
                success: function (data) {
                    if (data.success) {
                        innerValueAfterLogin(data.name, data.maKH);
                        removeAllInputValue();
                        displayNoneAll();
                        loginBTN1.removeEventListener("click", f_loginBTN);
                        if (loginBTN2)
                        loginBTN2.removeEventListener("click", f_loginBTN);
                    cookieSave = data;
                    getValueInformationForm(path);
                    activeClickChange();
                    f_getValidCard();
                    loginSocket(data.maKH);
                    innerMesageBox(data.name);
                    showSuccessToast("Đăng nhập thành công", "Chào mừng bạn quay lại với hệ thống");
                    } else {
                        showErrorToast("Thất bại", "Email hoặc mật khẩu không đúng");
                    }
                },
                error: function (err) {
                    // console.log('Error:', err);
                }
            });
        }
    });
    $('#create-account-form').submit(function (e) {
        e.preventDefault();
        if (validateCreateAccount()) {
            $.ajax({
                url: '/create-account-url',
                type: 'POST',
                data: $(this).serialize(),
                success: function (data) {
                    if (data.active == true) {
                        removeAllInputValue();
                        displayNoneAll();
                        showSuccessToast("Đăng ký tài khoản thành công", "Hãy đăng nhập bằng tài khoản vừa tạo");
                    } else {
                        showSuccessToast("Địa chỉ email đã được sử dụng", "Vui lòng thử địa chỉ email khác");
                    }
                },
                error: function (err) {
                    // console.log('Error:', err);
                }
            });
        }
    });
    // logout
    if (logoutBTN)
        logoutBTN.addEventListener("click", f_logoutBTN);

    // forgot pass submit
    // Sử dụng jQuery để xử lý sự kiện click
    sendCodeBTN.addEventListener("click", f_sendCodeBTN);

    $('#forgot-btn').click(function (e) {
        e.preventDefault();

        // Lấy dữ liệu từ form
        var emailValue = forgotPassBox.querySelector(".login-email").value;
        var codeValue = forgotPassBox.querySelector(".code-pass").value;
        if (emailValue == emailChangePass) {
            if (emailValue && codeValue) {
                // Gửi yêu cầu POST đến server
                $.ajax({
                    url: '/your-forgot-password-url',
                    type: 'POST',
                    data: { email: emailValue, code: codeValue },
                    success: function (response) {
                        if (response.active == false) {
                            showErrorToast("Mã khôi phục không đúng", "Vui lòng nhập lại mã xác thực")
                        } else {
                            removeAllInputValue();
                            displayNoneAll();
                            activeNecessaryForm();
                            changePassBox.style.display = "block";
                        }
                    }
                });
            } else {
                showErrorToast("Thất bại", "Vui lòng điền đầy đủ thông tin")
            }
        } else {
            showErrorToast("Lỗi", "Địa chỉ email đã thay đổi");
        }
    });

    $('#changepass-btn').click(function (e) {
        e.preventDefault();

        // Lấy dữ liệu từ form
        let newPass = changePassBox.querySelector(".new-pass").value;
        let confirmPass = changePassBox.querySelector(".confirm-pass").value;
        if (validateChangePass(newPass, confirmPass)) {
            // Gửi yêu cầu POST đến server
            $.ajax({
                url: '/your-change-password-url',
                type: 'POST',
                data: { email: emailChangePass, pass: newPass },
                success: function (response) {
                    if (response.active == false) {
                        showErrorToast("Lỗi", "Lỗi hệ thống")
                    } else {
                        removeAllInputValue();
                        displayNoneAll();
                        showSuccessToast("Đổi mật khẩu thành công", "Vui lòng đăng nhập bằng mật khẩu mới")
                        timeLeftElement.textContent = 60 + "s";
                        sendCodeBTN.addEventListener("click", f_sendCodeBTN);
                        if (typeof countdownTimer !== 'undefined') {
                            clearInterval(countdownTimer);
                        }
                    }
                }
            });
        }
    });

    // cookie
    $.ajax({
        url: '/get-cookie',
        type: 'GET',
        success: function (data) {
            if (data) {
                var value = data.cookieValue;
                if (value) {
                    cookieSave = value;
                    innerValueAfterLogin(value.name, value.maKH);
                    if (loginBTN1)
                        loginBTN1.removeEventListener("click", f_loginBTN);
                    if (loginBTN2)
                        loginBTN2.removeEventListener("click", f_loginBTN);
                    activeClickChange();
                    innerMesageBox(value.name);
                    loginSocket(value.maKH);
                } else {
                    unActiveClickChange();
                }
            }
        },
        error: function (err) {
            // console.log('Error:', err);
        }
    });
    // get value for information form
    getValueInformationForm(path)

    // SUBMIT CHANGE
    $('#change-form').submit(function (e) {
        e.preventDefault();
        const formElement = this.closest('form');
        const actionValue = formElement.action;
        const url = new URL(actionValue);
        if (url.pathname == '/change-password-url') {
            var a_input = changeBox.querySelectorAll("input");
            a_input = Array.from(a_input, input => input.value);
            console.log(a_input)
            const [password, newPass, confirmPass] = a_input;
            if (isValidChangePass(password, newPass, confirmPass)) {
                f_changeServer(this, url);
            }
        } else {
            f_changeServer(this, url);
        }

    });

    $('#form-register').submit(function (e) {
        e.preventDefault();
        if (isFormComplete()) {
            $.ajax({
                url: '/register-card-url',
                type: "POST",
                data: $(this).serialize(),
                success: function (data) {
                    if (data.success) {
                        showSuccessToast("Đăng ký lịch tập thành công", "Hẹn một ngày gần nhất tới với lễ tân để thanh toán");
                        registerCartBox.style.display = "none";
                        getValueInformationForm(path);
                        f_getValidCard();
                        displayNoneAll();
                    } else {
                        if (data.reason == "login") {
                            f_loginBTN();
                            showErrorToast("Chưa đăng nhập");
                        } else {

                        }
                    }
                },
                err: function (err) {

                }
            })
        }
    })

    // CANCEL CALENDAR
    const cancelSubmit = document.querySelector(".button__form__cancel");
    if (cancelSubmit)
        cancelSubmit.addEventListener("click", function () {
            $.ajax({
                url: "/get-cancel-submit",
                type: "GET",
                success: function (data) {
                    console.log(data);
                    if (data.success) {
                        f_getValidCard();
                        showSuccessToast("Đã hủy lịch tập");
                        cancelRECartBox.style.display = "none";
                        getValueInformationForm(path);
                    } else {
                        showErrorToast("LỖi")
                    }
                },
                error: function (err) {

                }
            })
        })
    f_getValidCard();

});
