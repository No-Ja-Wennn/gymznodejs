import {
    f_loginBTN,
    f_registerCalendarBTN,
    f_cancel,
    eventNotActiveRECalendar,
    f_cubeBTN,
    eventNotActiveCalendar,
    eventNotActiveRECard
} from "../navigation_javascript/login.js";
import {
    displayNoneAll,
    activeNecessaryForm,
    removeAllInputValue,
    innerMesageBox,
    removeMessageBox,
    loginSocket,
    logoutSocket,
    displayLeftMessageHide,
    displayRightMessageHide,
    scrollToBottom,
    loadHideMessage,
    sendMessage,
    activeLoginBox,
    removeHideMessage,
    editDate,
    replaceNullUndefinedWithEmptyString,
    setIntervalChangePage,
    intervalId,
    createCalendarBox
} from "./function.js";
import { showSuccessToast, showErrorToast } from "./toast.js";
import { validateCreateAccount, validateLoginValue, validateChangePass, isValidChangePass, isFormCompleteCard, isFormCompleteCalendar } from './validate.js';
import {
    innerTextOfInformation,
    removeTextOfInformation,
    activeClickChange,
    unActiveClickChange,
    removeAllValueChange,
    innerTextOfCard,
    removeTextOfCard,
} from '../navigation_javascript/infomation_account.js';

const modalBox = document.querySelector(".modal");
const overlayBox = modalBox.querySelector(".modal-overlay");
const loginBox = modalBox.querySelector(".login-box");
const createAccountBox = modalBox.querySelector(".create-account-box");
const forgotPassBox = modalBox.querySelector(".forgot-pass-box");
const registerCartBox = document.getElementById("form-register-card");
const registerCalendarBox = document.getElementById("form-register-calendar");
const changeNameBox = modalBox.querySelector(".change-name-box");
const changePassBox = modalBox.querySelector(".change-pass-box");
const loadBox = modalBox.querySelector(".loader");

let sendCodeBTN = document.getElementById("send-code");
const timeLeftElement = document.getElementById("timeLeft");
const logoutBTN2 = document.querySelector(".content__logout__btn");
const logoutBTN = document.querySelector(".logoutstatus");
const loginBTN1 = document.querySelector(".loginstatus");
const loginBTN2 = document.getElementById("menu2-infor");

const calendarShow = document.querySelector(".training__schedule--calendar");

const registerCalendarBTN = document.getElementById("button1");
const cancelRECalendarBTN = document.getElementById("button2");
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

//logout
let cookieSave = null;
function f_logoutBTN() {
    var userNameElement1 = document.querySelector(".loginstatus");
    var userNameElement2 = document.querySelector(".account-fullname");
    var accountCodeElement2 = document.querySelector(".account-code");
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
                    getValueInformationForm(path);
                    if (cancelRECalendarBTN)
                        cancelRECalendarBTN.removeEventListener("click", eventNotActiveCalendar);
                    f_getValidCard();
                    cookieSave = null;
                    logoutSocket();
                    removeHideMessage();
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
    var userNameElement2 = document.querySelector(".account-fullname");
    var accountCodeElement2 = document.querySelector(".account-code");
    if (userNameElement1) {
        userNameElement1.innerText = userName;
    }
    if (userNameElement2 && userNameElement1) {
        userNameElement2.innerText = userName;
        accountCodeElement2.innerText = code;
        logoutBTN2.style.display = "flex";
        logoutBTN2.addEventListener("click", f_logoutBTN);
        if (loginBTN2)
            loginBTN2.addEventListener("click", () => {
                window.location.href = './navigation/information_account.html';
            })
    }

    const userAccountTraking = document.querySelector(".user-account-name");
    if (userAccountTraking) {
        userAccountTraking.innerText = userName;
    }
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
                    showErrorToast("Lỗi", "Địa chỉ email chưa được đăng ký");
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
                var myData = data.value;
                if (type == "account") {
                    myData.dateOfBirth = editDate(myData.dateOfBirth)
                    innerTextOfInformation(
                        myData.name,
                        myData.dateOfBirth,
                        myData.email,
                        myData.phoneNumber);
                }
                else if (type == "card") {
                    myData = replaceNullUndefinedWithEmptyString(myData);
                    innerTextOfCard(
                        myData
                    );
                    
                    var calendars = data.calendars;
                    calendars.forEach(calendar=>{
                        var weekdays = calendar.weekday.split(', ');
                        weekdays.forEach(day => {
                            calendar.day = day;
                            var caElement = createCalendarBox(calendar);
                            calendarShow.appendChild(caElement);
                        });
                    })

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
                    // displayNoneAll();
                    // activeNecessaryForm();
                    // loginBox.style.display = "block";
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
                    if (registerCalendarBTN && cancelRECalendarBTN) { // đã đky
                        registerCalendarBTN.removeEventListener("click", f_registerCalendarBTN);
                        registerCalendarBTN.addEventListener("click", eventNotActiveRECalendar);
                        cancelRECalendarBTN.removeEventListener("click", eventNotActiveCalendar);
                        cancelRECalendarBTN.addEventListener("click", f_cancel);

                    } else if (a_cubeBTN) {
                        a_cubeBTN = Array.from(a_cubeBTN);
                        a_cubeBTN.map(value => {
                            value.removeEventListener("click", f_cubeBTN);
                            value.addEventListener("click", eventNotActiveRECard);
                        })
                    }
                } else {
                    if (registerCalendarBTN && cancelRECalendarBTN) { // chưa dky
                        registerCalendarBTN.addEventListener("click", f_registerCalendarBTN);
                        registerCalendarBTN.removeEventListener("click", eventNotActiveRECalendar);
                        cancelRECalendarBTN.addEventListener("click", eventNotActiveCalendar);
                        cancelRECalendarBTN.removeEventListener("click", f_cancel);

                    } else if (a_cubeBTN) {
                        a_cubeBTN = Array.from(a_cubeBTN);
                        a_cubeBTN.map(value => {
                            value.addEventListener("click", f_cubeBTN);
                            value.removeEventListener("click", eventNotActiveRECard);
                        })
                    }
                }
            } else {
                if (registerCalendarBTN && cancelRECalendarBTN) { // chưa dky
                    registerCalendarBTN.removeEventListener("click", f_registerCalendarBTN);
                    registerCalendarBTN.removeEventListener("click", eventNotActiveRECalendar);
                    cancelRECalendarBTN.removeEventListener("click", eventNotActiveCalendar);
                    cancelRECalendarBTN.removeEventListener("click", f_cancel);

                } else if (a_cubeBTN) {
                    a_cubeBTN = Array.from(a_cubeBTN);
                    a_cubeBTN.map(value => {
                        value.removeEventListener("click", f_cubeBTN);
                        value.removeEventListener("click", eventNotActiveRECard);
                    })
                } else if (a_cubeBTN) {
                    a_cubeBTN = Array.from(a_cubeBTN);
                    a_cubeBTN.map(value => {
                        value.removeEventListener("click", f_cubeBTN);
                        value.removeEventListener("click", eventNotActiveRECard);
                    })
                }
            }
        },
        error: function (err) {

        }
    })
}

const chatHideBox = document.querySelector(".chat-box");

let sendHideMsgBTN = null;
let inputHideE = null;
if (chatHideBox) {
    sendHideMsgBTN = chatHideBox.querySelector(".send");
    inputHideE = chatHideBox.querySelector('.input-text');
}

function f_affterLoginCus(data) {
    loadHideMessage();
    loginSocket(data.maKH);
    innerValueAfterLogin(data.name, data.maKH);
    removeAllInputValue();
    displayNoneAll();
    if (loginBTN1)
        loginBTN1.removeEventListener("click", f_loginBTN);
    if (loginBTN2)
        loginBTN2.removeEventListener("click", f_loginBTN);
    cookieSave = data;
    getValueInformationForm(path);
    activeClickChange();
    f_getValidCard();
    innerMesageBox(data.name);
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
                        f_affterLoginCus(data);
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
                url: '/create-account-url-cus',
                type: 'POST',
                data: $(this).serialize(),
                success: function (data) {
                    if (data.active == true) {
                        removeAllInputValue();
                        displayNoneAll();
                        f_affterLoginCus(data.acc);
                        showSuccessToast("Đăng ký tài khoản thành công", "Đã đăng nhập vào hệ thống");
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
        if (emailValue && codeValue) {
            $.ajax({
                url: '/your-forgot-password-url',
                type: 'POST',
                data: { email: emailValue, code: codeValue },
                success: function (response) {
                    if (response.active == false) {
                        if (!response.register)
                            showErrorToast("Địa chỉ email chưa được đăng ký");
                        else
                            showErrorToast("Mã khôi phục không đúng", "Vui lòng nhập lại mã khôi phục");
                    } else {
                        removeAllInputValue();
                        displayNoneAll();
                        activeNecessaryForm();
                        changePassBox.style.display = "block";
                    }
                }
            });
        } else {
            if (!emailValue)
                showErrorToast("Vui lòng điền địa chỉ email");
            else if (!codeValue)
                showErrorToast("Vui lòng điền mã khôi phục");
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
                        f_affterLoginCus(response.user);
                        showSuccessToast("Đổi mật khẩu thành công", "Đã đăng nhập vào hệ thống");
                        timeLeftElement.textContent = 60 + "s";
                        sendCodeBTN.addEventListener("click", f_sendCodeBTN);
                        if (typeof countdownTimer !== 'undefined') {
                            clearInterval(countdownTimer);
                        }
                        emailChangePass = null;
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
                    // setTimeout(()=>{
                    loginSocket(value.maKH);
                    // }, 9000);
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
            const [password, newPass, confirmPass] = a_input;
            if (isValidChangePass(password, newPass, confirmPass)) {
                f_changeServer(this, url);
            }
        } else {
            f_changeServer(this, url);
        }

    });

    $('#form-register-card').submit(function (e) {
        e.preventDefault();
        if (isFormCompleteCard()) {
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
                        } else if (!data.haveCard) {
                            showErrorToast("Bạn chưa đăng ký thẻ thành viên");

                        }
                    }
                },
                err: function (err) {

                }
            })
        }
    })
    $('#form-register-calendar').submit(function (e) {
        e.preventDefault();
        if (isFormCompleteCalendar()) {
            $.ajax({
                url: '/register-calendar-url',
                type: "POST",
                data: $(this).serialize(),
                success: function (data) {
                    if (data.success) {
                        showSuccessToast("Đăng ký lịch tập thành công", "Hẹn một ngày gần nhất tới với lễ tân để thanh toán");
                        registerCalendarBox.style.display = "none";
                        getValueInformationForm(path);
                        f_getValidCard();
                        displayNoneAll();
                    } else {
                        if (data.reason == "login") {
                            f_loginBTN();
                            showErrorToast("Chưa đăng nhập");
                        } else if (!data.haveCard) {
                            showErrorToast("Bạn chưa đăng ký thẻ thành viên");
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
                    if (data.success) {
                        f_getValidCard();
                        showSuccessToast("Đã hủy lịch tập");
                        cancelRECartBox.style.display = "none";
                        getValueInformationForm(path);
                        calendarShow.innerHTML = '';
                    } else {
                        showErrorToast("LỖi")
                    }
                },
                error: function (err) {

                }
            })
        })
    f_getValidCard();

    if (chatHideBox)
        loadHideMessage();

    if (sendHideMsgBTN)
        sendHideMsgBTN.addEventListener("click", function () {
            var valueInput = inputHideE.value.trim();
            if (valueInput != '') {
                var flag = sendMessage(valueInput);
                if (flag)
                    inputHideE.value = '';
                else {
                    displayNoneAll();
                    activeNecessaryForm();
                    activeLoginBox();
                }
            }
        })
    if (inputHideE)
        inputHideE.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                sendHideMsgBTN.click();
            }
        });
});

const exitChangePageRegisterCard = document.getElementById("submitChangePage");
if (exitChangePageRegisterCard)
    exitChangePageRegisterCard.addEventListener("click", (e) => {
        e.preventDefault();
        clearInterval(intervalId)
        displayNoneAll();
    })