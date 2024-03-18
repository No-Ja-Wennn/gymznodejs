import { displayNoneAll, removeAllInputValue, f_loginBTN, activeNecessaryForm } from "../navigation_javascript/login.js"
import { showSuccessToast, showErrorToast } from "./toast.js";
import { validateCreateAccount, validateLoginValue, validateChangePass } from './validate.js';

const modalBox = document.querySelector(".modal");
const overlayBox = modalBox.querySelector(".modal-overlay");
const loginBox = modalBox.querySelector(".login-box");
const createAccountBox = modalBox.querySelector(".create-account-box");
const forgotPassBox = modalBox.querySelector(".forgot-pass-box");
const registerCartBox = modalBox.querySelector(".register-cart");
const changeNameBox = modalBox.querySelector(".change-name-box");
const changePassBox = modalBox.querySelector(".change-pass-box");
let sendCodeBTN = document.getElementById("send-code");



let cookieSave = null;
const logoutBTN = document.querySelector(".logoutstatus");
const loginBTN1 = document.querySelector(".loginstatus");
const loginBTN2 = document.getElementById("menu2-infor");
function f_logoutBTN() {
    var userNameElement1 = document.querySelector(".loginstatus");
    var userNameElement2 = document.querySelector(".account__name");
    var accountCodeElement2 = document.querySelector(".account__code");
    userNameElement1.innerText = "ĐĂNG NHẬP";
    userNameElement2.innerText = "USERNAME";
    accountCodeElement2.innerText = "USERCODE";
    $.ajax({
        url: '/logout-url',
        type: 'POST',
        // data: $(this).serialize(),
        success: function (data) {
            if (data) {
                if (cookieSave) {
                    loginBTN1.addEventListener("click", f_loginBTN);
                    showSuccessToast("Đã đăng xuất", "Cảm ơn bạn đã sử dụng dịch vụ");
                    cookieSave = null;
                    loginBTN2.addEventListener("click", f_loginBTN);
                }
                else
                    showErrorToast("Thất bại", "Quý khách chưa đăng nhập vào hệ thống")
            }
        },
        error: function (err) {
            console.log('Error:', err);
        }
    });
}
function innerValueAfterLogin(userName, code) {
    var userNameElement1 = document.querySelector(".loginstatus");
    var userNameElement2 = document.querySelector(".account__name");
    var accountCodeElement2 = document.querySelector(".account__code");
    userNameElement1.innerText = userName;
    userNameElement2.innerText = userName;
    accountCodeElement2.innerText = code;
}

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
            url: '/your-send-code-url', // URL mà bạn muốn gửi yêu cầu đến
            type: 'POST',
            data: { email: email }, // Dữ liệu gửi lên server
            success: function (response) {
                if (response.active) {
                    showSuccessToast("Mã khôi phục đã gửi tới email của bạn");
                    sendCodeBTN.removeEventListener("click", f_sendCodeBTN);
                    sendCodeBTN.removeEventListener("click", f_sendCodeBTN);
                    // setTimeout(() => {
                    //     sendCodeBTN.addEventListener("click", f_sendCodeBTN);
                    // }, 6000);
                    var timeLeftElement = document.getElementById("timeLeft");
                    let timeLeft = 60;
                    let countdownTimer = setInterval(function () {
                        timeLeft--;
                        timeLeftElement.textContent = timeLeft + "s";
                        // Khi thời gian còn lại là 0, dừng đếm ngược
                        if (timeLeft <= 0) {
                            sendCodeBTN.addEventListener("click", f_sendCodeBTN);
                            clearInterval(countdownTimer);
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
                    if (data) {
                        innerValueAfterLogin(data.name, data.maKH);
                        removeAllInputValue();
                        displayNoneAll();
                        showSuccessToast("Đăng nhập thành công", "Chào mừng bạn quay lại với hệ thống");
                        loginBTN1.removeEventListener("click", f_loginBTN);
                        loginBTN2.removeEventListener("click", f_loginBTN);
                        cookieSave = data;
                    } else {
                        showErrorToast("Thất bại", "Email hoặc mật khẩu không đúng");
                    }
                },
                error: function (err) {
                    console.log('Error:', err);
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
                    console.log(data.active);
                    if (data.active == true) {
                        removeAllInputValue();
                        displayNoneAll();
                        showSuccessToast("Đăng ký tài khoản thành công", "Hãy đăng nhập bằng tài khoản vừa tạo");
                    } else {
                        showSuccessToast("Địa chỉ email đã được sử dụng", "Vui lòng thử địa chỉ email khác");
                    }
                },
                error: function (err) {
                    console.log('Error:', err);
                }
            });
        }
    });
    // logout
    logoutBTN.addEventListener("click", f_logoutBTN);
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
                    loginBTN1.removeEventListener("click", f_loginBTN);
                    loginBTN2.removeEventListener("click", f_loginBTN);
                }
            }
        },
        error: function (err) {
            console.log('Error:', err);
        }
    });

    // forgot pass submit
    // Sử dụng jQuery để xử lý sự kiện click
    sendCodeBTN.addEventListener("click", f_sendCodeBTN);

    $('#forgot-btn').click(function (e) {
        e.preventDefault();

        // Lấy dữ liệu từ form
        var emailValue = forgotPassBox.querySelector(".login-email").value;
        var codeValue = forgotPassBox.querySelector(".code-pass").value;

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
    });
    $('#changepass-btn').click(function (e) {
        e.preventDefault();

        // Lấy dữ liệu từ form
        let newPass = changePassBox.querySelector(".new-pass").value;
        let confirmPass = changePassBox.querySelector(".confirm-pass").value;
        console.log(newPass, confirmPass);
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
                    }
                }
            });
        }
    });

});

