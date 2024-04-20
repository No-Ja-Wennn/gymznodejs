import { activeNecessaryForm, displayNoneAll, removeAllInputValue } from '../src/function.js';
import { showErrorToast } from '../src/toast.js';
import { validateCreateAccount, validateLoginValue } from '../src/validate.js';

const modalBox = document.querySelector(".modal");
const overlayBox = modalBox.querySelector(".modal-overlay");
const loginBox = modalBox.querySelector(".login-box");
const createAccountBox = modalBox.querySelector(".create-account-box");
const forgotPassBox = modalBox.querySelector(".forgot-pass-box");
const registerCartBox = document.getElementById("form-register");
const registerCartBoxModal = modalBox.querySelector(".register-cart");
const cancelRECartBox = document.getElementById("form-cancel");
const changeNameBox = modalBox.querySelector(".change-name-box");
const changePassBox = modalBox.querySelector(".change-pass-box");


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
if(createAccountLink)
createAccountLink.addEventListener("click", () => {
    displayNoneAll();
    activeNecessaryForm();
    showCreateAccountForm();
});

/* CLICK LOGIN LINK FORM CREATE ACCOUNT FORM */
if(createAccountBox){
    const loginLinkCreate = createAccountBox.querySelector(".link-login");
    loginLinkCreate.addEventListener("click", () => {
        displayNoneAll();
        activeNecessaryForm();
        showLoginForm();
    });
}

/* CLICK LOGIN LINK FORM FORGOT PASSWORD FORM */
if(forgotPassBox){
    const loginLinkPassword = forgotPassBox.querySelector(".link-login");
    loginLinkPassword.addEventListener("click", () => {
        displayNoneAll();
        activeNecessaryForm();
        showLoginForm();
    });
}

/* CLICK FORGOT PASS LINK FORM LOGIN FORM */
if(loginBox){
    const forgotPasswordLink = loginBox.querySelector(".forgot--account--link");
    forgotPasswordLink.addEventListener("click", () => {
        displayNoneAll();
        activeNecessaryForm();
        showForgotPasswordForm();
    });
}

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
if(registerCartBox){
    const exitRegister = registerCartBox.querySelector(".x__cancel");
    exitRegister.addEventListener("click", function () {
        registerCartBox.style.display = "none";
        displayNoneAll();
    })
}

// CLICK CANCEL CALENDAR
const cancelREBTN = document.getElementById("button2");
if (cancelREBTN)
    cancelREBTN.addEventListener("click", f_cancel)
export function f_cancel() {
    displayNoneAll();
    // activeNecessaryForm();
    cancelRECartBox.style.display = "flex";
}

// EXIT CANCEL FORM
if (cancelRECartBox) {
    var exitCancel = cancelRECartBox.querySelector(".x__cancel2");
    exitCancel.addEventListener("click", function () {
        cancelRECartBox.style.display = "none";
    })
    
    // EXIT CANCEL FORM
    const exitCancel2 = cancelRECartBox.querySelector(".button__form__exit");
    exitCancel2.addEventListener("click", function () {
        cancelRECartBox.style.display = "none";
    })
    
    //CLICK View Terms of use
    const ruleBox = document.querySelector(".rules__group__content");
    const useBTN = document.querySelector(".rules__group__title__content");
    useBTN.addEventListener("click", function () {
        ruleBox.style.display = "flex";
    })
    
    const hideUserBTN = document.querySelector(".button__hide__terms__of__use");
    hideUserBTN.addEventListener("click", () => {
        ruleBox.style.display = "none";
    })
}

// resiger card in card page
let a_cubeBTN = document.querySelectorAll(".cube");
a_cubeBTN = Array.from(a_cubeBTN);
a_cubeBTN.map(value => {
    value.addEventListener("click", f_cubeBTN)
})
export function f_cubeBTN(){
    displayNoneAll();
    activeNecessaryForm();
    registerCartBoxModal.style.display = "block";
    registerCartBox.style.display = "block";
}