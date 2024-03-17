import { displayNoneAll, removeAllInputValue, f_loginBTN } from "../navigation_javascript/login.js"
import { showSuccessToast, showErrorToast } from "./toast.js";
import { validateCreateAccount, validateLoginValue } from './validate.js';

const modalBox = document.querySelector(".modal");
const overlayBox = modalBox.querySelector(".modal-overlay");
const loginBox = modalBox.querySelector(".login-box");
const createAccountBox = modalBox.querySelector(".create-account-box");
const forgotPassBox = modalBox.querySelector(".forgot-pass-box");
const registerCartBox = modalBox.querySelector(".register-cart");
const changeNameBox = modalBox.querySelector(".change-name-box");


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
});