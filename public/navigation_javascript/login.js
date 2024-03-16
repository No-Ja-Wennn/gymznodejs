const modalBox = document.querySelector(".modal");
const overlayBox = modalBox.querySelector(".modal-overlay");
const loginBox = modalBox.querySelector(".login-box");
const createAccountBox = modalBox.querySelector(".create-account-box");
const forgotPassBox = modalBox.querySelector(".forgot-pass-box");
const registerCartBox = modalBox.querySelector(".register-cart");
const changeNameBox = modalBox.querySelector(".change-name-box");

/* ACTIVE NECESSARY FORM  */
function activeNecessaryForm(){
    modalBox.style.display = "flex";
    overlayBox.style.display = "block";
}

/* DISPLAY NONE ALL */
function displayNoneAll(){
    modalBox.style.display = "none";
    overlayBox.style.display = "none";
    var a_modalBodyBox = modalBox.querySelectorAll(".modal__body__box");
    a_modalBodyBox = Array.from(a_modalBodyBox);
    a_modalBodyBox.map(value=>value.style.display = "none");
}

/* LOGIN BTN */

const loginBTN = document.querySelector(".loginstatus");
loginBTN.addEventListener("click", function(){
    loginBox.style.display = "block";
    activeNecessaryForm();
})

/* MODAL OVERLAY EVENT */
overlayBox.addEventListener("click", displayNoneAll);