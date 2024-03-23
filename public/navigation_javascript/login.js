import { showErrorToast } from '../src/toast.js';
import { validateCreateAccount, validateLoginValue } from '../src/validate.js';

const modalBox = document.querySelector(".modal");
const overlayBox = modalBox.querySelector(".modal-overlay");
const loginBox = modalBox.querySelector(".login-box");
const createAccountBox = modalBox.querySelector(".create-account-box");
const forgotPassBox = modalBox.querySelector(".forgot-pass-box");
const registerCartBox = document.getElementById("form-register");
const cancelRECartBox = document.getElementById("form-cancel");
const changeNameBox = modalBox.querySelector(".change-name-box");
const changePassBox = modalBox.querySelector(".change-pass-box");

/* ACTIVE NECESSARY FORM  */
export function activeNecessaryForm() {
    modalBox.style.display = "flex";
    overlayBox.style.display = "block";
}
/* DISPLAY NONE ALL */
export function displayNoneAll() {
    modalBox.style.display = "none";
    overlayBox.style.display = "none";
    var a_modalBodyBox = modalBox.querySelectorAll(".modal__body__box");
    a_modalBodyBox = Array.from(a_modalBodyBox);
    a_modalBodyBox.map(value => value.style.display = "none");
}

export function removeAllInputValue() {
    var a_inputElement = modalBox.querySelectorAll("input");
    a_inputElement = Array.from(a_inputElement);
    a_inputElement.map(element => element.value = "");
}

/* MODAL OVERLAY EVENT */
overlayBox.addEventListener("click", displayNoneAll);

/* LOGIN BTN */
const loginBTN1 = document.querySelector(".loginstatus");
if (loginBTN1)
    loginBTN1.addEventListener("click", f_loginBTN);
const loginBTN2 = document.getElementById("menu2-infor");
if (loginBTN2)
    loginBTN2.addEventListener("click", f_loginBTN);
export function f_loginBTN() {
    activeNecessaryForm();
    showLoginForm();
}
/* LOGOUT BTN */


/* SHOW CREATE ACCOUNT FORM */
function showCreateAccountForm() {
    createAccountBox.style.display = "block";
}

/* SHOW LOGIN FORM */
function showLoginForm() {
    loginBox.style.display = "block";
}

/* SHOW FORGOT PASSWORD FORM */
function showForgotPasswordForm() {
    forgotPassBox.style.display = "block";
}

/* CLICK CREATE ACCOUNT LINK FORM LOGIN FORM */
const createAccountLink = loginBox.querySelector(".link-create-account");
createAccountLink.addEventListener("click", () => {
    displayNoneAll();
    activeNecessaryForm();
    showCreateAccountForm();
});

/* CLICK LOGIN LINK FORM CREATE ACCOUNT FORM */
const loginLinkCreate = createAccountBox.querySelector(".link-login");
loginLinkCreate.addEventListener("click", () => {
    displayNoneAll();
    activeNecessaryForm();
    showLoginForm();
});

/* CLICK LOGIN LINK FORM FORGOT PASSWORD FORM */
const loginLinkPassword = forgotPassBox.querySelector(".link-login");
loginLinkPassword.addEventListener("click", () => {
    displayNoneAll();
    activeNecessaryForm();
    showLoginForm();
});

/* CLICK FORGOT PASS LINK FORM LOGIN FORM */
const forgotPasswordLink = loginBox.querySelector(".forgot--account--link");
forgotPasswordLink.addEventListener("click", () => {
    displayNoneAll();
    activeNecessaryForm();
    showForgotPasswordForm();
});

export function eventNotActiveRE() {
    showErrorToast("Lỗi", "Bạn đã đăng ký lịch tập trước đó");
}
export function eventNotActiveCA() {
    showErrorToast("Lỗi", "Bạn chưa đăng ký dịch vụ");
}
// CLICK REGISTER CALENDAR
const registerBTN = document.getElementById("button1");
export function f_registerBTN() {
    displayNoneAll();
    // activeNecessaryForm();
    registerCartBox.style.display = "block";
}
// registerBTN.addEventListener("click", f_registerBTN);


// EXIT REGISTER FORM
const exitRegister = registerCartBox.querySelector(".x__cancel");
exitRegister.addEventListener("click", function () {
    registerCartBox.style.display = "none";
})

// CLICK CANCEL CALENDAR
const cancelREBTN = document.getElementById("button2");
cancelREBTN.addEventListener("click", f_cancel)
export function f_cancel() {
    displayNoneAll();
    // activeNecessaryForm();
    cancelRECartBox.style.display = "block";
}

// EXIT CANCEL FORM
const exitCancel = cancelRECartBox.querySelector(".x__cancel2");
exitCancel.addEventListener("click", function () {
    cancelRECartBox.style.display = "none";
})

// EXIT CANCEL FORM
const exitCancel2 = cancelRECartBox.querySelector(".button__form__exit");
exitCancel2.addEventListener("click", function () {
    cancelRECartBox.style.display = "none";
})

