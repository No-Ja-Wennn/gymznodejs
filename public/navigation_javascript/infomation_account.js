import { showErrorToast } from '../src/toast.js';
import {
    // displayNoneAll, activeNecessaryForm,
    f_registerBTN, f_cancel,
    f_cubeBTN
} from './login.js';

import {
    activeNecessaryForm,
    displayNoneAll
} from '../src/function.js'

const loginForm = document.querySelector(".login-box");
const nameClientElement = document.getElementById("name-client");
const dateOfBirthClientElement = document.getElementById("dateofbirth-client");
const emailClientElement = document.getElementById("email-client");
const phoneClientElement = document.getElementById("phone-client");
const changeBox = document.querySelector(".change-box");

// CARD PAGE
const nameClientElementCard = document.getElementById("name-client");
const idClientElementCard = document.getElementById("id-card");
const typeClientElementCard = document.getElementById("type-card");
const dateStartClientElementCard = document.getElementById("date-start");
const dateEndClientElementCard = document.getElementById("date-end");

const registerBTN = document.getElementById("button1");
const cancelREBTN = document.getElementById("button2");

let a_cubeBTN = document.querySelectorAll(".cube");

export function innerTextOfInformation(name, date, email, phone) {
    if (nameClientElement, dateOfBirthClientElement, emailClientElement, phoneClientElement) {
        nameClientElement.innerText = name;
        dateOfBirthClientElement.innerText = date;
        emailClientElement.innerText = email;
        phoneClientElement.innerText = phone;
    }
}
export function removeTextOfInformation() {
    if (nameClientElement, dateOfBirthClientElement, emailClientElement, phoneClientElement) {
        nameClientElement.innerText = "";
        dateOfBirthClientElement.innerText = "";
        emailClientElement.innerText = "";
        phoneClientElement.innerText = "";
    }
}

export function formChangeName() {
    return `
        <p class="edit-title">Đổi tên khách hàng</p>
        <form action="/your-name-url" method="POST">
            <div class="user-box">
                <input class="new-name" required="" name="newName" type="text">
                <label class="edit-label">Tên mới</label>
            </div>
            <div class="submit__row">
                <button id="submitExit">
                    Thoát
                </button>
                <button id="submitChangeName" type="submit">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Xác nhận
                </button>
            </div>
        </form>
    `;
}

export function formChangeProfile() {
    return `
    <p class="edit-title">Sửa thông tin hồ sơ</p>
    <form action="/your-profile-url" method="POST">
        <div class="user-box">
            <input class="new-email" required="" name="newName" type="date">
            <label class="edit-label">Ngày sinh</label>
        </div>
        <div class="submit__row">
            <button id="submitExit">
                Thoát
            </button>
            <button id="submitChangeName" type="submit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Xác nhận
            </button>
        </div>
    </form>
    `;
}

export function formChangeInformation() {
    return `
            <p class="edit-title">Sửa thông tin tài khoản</p>
            <form action="/your-account-url" method="POST">
                <div class="user-box">
                    <input class="new-email" required="" name="newName" type="text">
                    <label class="edit-label">Email</label>
                </div>
                <div class="user-box">
                    <input class="new-phone-number" required="" name="newName" type="text">
                    <label class="edit-label">Số điện thoại</label>
                </div>
                <div class="submit__row">
                    <button id="submitExit">
                        Thoát
                    </button>
                    <button id="submitChangeName" type="submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Xác nhận
                    </button>
                </div>
            </form>
    `;
}

export function formChangePass() {
    return `
            <p class="edit-title">Đổi mật khẩu</p>
            <form action="/your-pass-account-url" method="POST">
                <div class="user-box">
                    <input class="new-old-pass" required="" name="newName" type="text">
                    <label class="edit-label">Mật khẩu cũ</label>
                </div>
                <div class="user-box">
                    <input class="new-pass" required="" name="newName" type="text">
                    <label class="edit-label">Mật khẩu mới</label>
                </div>
                <div class="user-box">
                    <input class="new-confirm-pass" required="" name="newName" type="text">
                    <label class="edit-label">Nhập lại mật khẩu</label>
                </div>
                <div class="submit__row">
                    <button id="submitExit">
                        Thoát
                    </button>
                    <button id="submitChange" type="submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Xác nhận
                    </button>
                </div>
            </form>`;
}

function createNewUserBox(className, textContent, name) {
    var newUserBox = document.createElement('div');
    newUserBox.className = 'user-box';
    var newInput = document.createElement('input');
    newInput.className = className;
    newInput.setAttribute('name', name);
    newInput.type = 'text';
    newInput.required = true;
    var newLabel = document.createElement('label');
    newLabel.className = 'edit-label';
    newLabel.textContent = textContent;
    newUserBox.appendChild(newInput);
    newUserBox.appendChild(newLabel);
    return newUserBox;
}

function addUserBox(className, textContent, name) {
    var form = changeBox.querySelector('form');
    var newUserBox = createNewUserBox(className, textContent, name);
    form.insertBefore(newUserBox, form.querySelector('.submit__row'));
}


const changeNameBTN = document.getElementById("edit-name");
const changeProfileBTN = document.getElementById("change-profile");
const changeInformationBTN = document.getElementById("change-information");
const changePassBTN = document.getElementById("change-password");

const imgCard = document.getElementById("card-img");


function f_submitExit(e) {
    e.preventDefault()
    displayNoneAll();
}

function changeTitle(
    titleValue,
    actionValue,
    lableInputValue,
    name,
    date = false,
    addRow = false,
    pass = false
) {
    var phoneDiv = changeBox.querySelector(".new2");
    if (phoneDiv) {
        phoneDiv.parentElement.remove();
    }
    var phoneDiv = changeBox.querySelector(".new3");
    if (phoneDiv) {
        phoneDiv.parentElement.remove();
    }
    var lableActived = document.getElementById("actived-label");
    if (lableActived) {
        lableActived.id = "";
    }
    var title = changeBox.querySelector(".edit-title");
    var form = changeBox.querySelector("form");
    var lable1 = changeBox.querySelector(".edit-label");
    var input1 = changeBox.querySelector("input");
    input1.setAttribute('name', name);
    title.innerText = titleValue;
    form.action = actionValue;
    lable1.innerText = lableInputValue;
    var input1 = changeBox.querySelector(".new1");
    if (date) {
        input1.type = "date";
    } else {
        input1.type = "text";
    }
    if (addRow) {
        addUserBox("new2", "Số điện thoại", "phoneNumber");
    }
    if (pass) {
        addUserBox("new2", "Mật khẩu mới", "newPass");
        addUserBox("new3", "Nhập lại mật khẩu", "confirmPass");
    }
}

export function removeAllValueChange() {
    var a_inputElement = changeBox.querySelectorAll("input");
    a_inputElement = Array.from(a_inputElement);
    a_inputElement.map(value => value.value = "");
}

const submitExit = document.getElementById("submitExit");
submitExit.addEventListener("click", f_submitExit)
function f_changeName() {
    displayNoneAll();
    activeNecessaryForm();
    removeAllValueChange();
    changeTitle("Đổi tên khách hàng", "/change-name-url", "Tên mới", "name")
    changeBox.style.display = "block";
}

function f_changeProfile() {
    displayNoneAll();
    activeNecessaryForm();
    removeAllValueChange();
    changeTitle("Sửa thông tin hồ sơ", "/change-profile-url", "Ngày sinh", "date", true)
    changeBox.querySelector(".edit-label").id = "actived-label";
    changeBox.style.display = "block";
}
function f_changeInfor() {
    displayNoneAll();
    activeNecessaryForm();
    removeAllValueChange();
    changeTitle("Sửa thông tin tài khoản", "/change-inforaccount-url", "Email", "email", false, true)
    changeBox.style.display = "block";
}

function f_changePass() {
    displayNoneAll();
    activeNecessaryForm();
    removeAllValueChange();
    changeTitle("Đổi mật khẩu", "/change-password-url", "Mật khẩu", "password", false, false, true)
    changeBox.style.display = "block";
    const submitExit = document.getElementById("submitExit");
    submitExit.addEventListener("click", f_submitExit)
}

export function activeClickChange() {
    if (changeNameBTN, changeProfileBTN, changeInformationBTN, changePassBTN) {
        changeNameBTN.addEventListener("click", f_changeName);
        changeProfileBTN.addEventListener("click", f_changeProfile);
        changeInformationBTN.addEventListener("click", f_changeInfor);
        changePassBTN.addEventListener("click", f_changePass);

        changeNameBTN.removeEventListener("click", noLogin);
        changeProfileBTN.removeEventListener("click", noLogin);
        changeInformationBTN.removeEventListener("click", noLogin);
        changePassBTN.removeEventListener("click", noLogin);
    } else if (registerBTN) {
        registerBTN.addEventListener("click", f_registerBTN);
        cancelREBTN.addEventListener("click", f_cancel);
        registerBTN.removeEventListener("click", noLogin);
        cancelREBTN.removeEventListener("click", noLogin);
    } else if (a_cubeBTN) {
        a_cubeBTN = Array.from(a_cubeBTN);
        a_cubeBTN.map(value => {
            value.addEventListener("click", f_cubeBTN);
            value.removeEventListener("click", noLogin);
        })
    }
}

function noLogin() {
    showErrorToast("Lỗi", "Vui lòng đăng nhập vào hệ thống");
    displayNoneAll();
    activeNecessaryForm();
    loginForm.style.display = "block";
}

export function unActiveClickChange() {
    if (changeNameBTN, changeProfileBTN, changeInformationBTN, changePassBTN) {
        changeNameBTN.removeEventListener("click", f_changeName);
        changeProfileBTN.removeEventListener("click", f_changeProfile);
        changeInformationBTN.removeEventListener("click", f_changeInfor);
        changePassBTN.removeEventListener("click", f_changePass);

        changeNameBTN.addEventListener("click", noLogin);
        changeProfileBTN.addEventListener("click", noLogin);
        changeInformationBTN.addEventListener("click", noLogin);
        changePassBTN.addEventListener("click", noLogin);
    } else if (registerBTN) {
        registerBTN.removeEventListener("click", f_registerBTN);
        cancelREBTN.removeEventListener("click", f_cancel);
        registerBTN.addEventListener("click", noLogin);
        cancelREBTN.addEventListener("click", noLogin);
    } else if (a_cubeBTN) {
        a_cubeBTN = Array.from(a_cubeBTN);
        a_cubeBTN.map(value => {
            value.removeEventListener("click", f_cubeBTN);
            value.addEventListener("click", noLogin);
        })
    }
}

// CARD PAGE
export function innerTextOfCard(name, id, type, dateStart, dateEnd) {
    if (nameClientElementCard
        && idClientElementCard
        && typeClientElementCard
        && dateStartClientElementCard
        && dateEndClientElementCard
    ) {
        nameClientElementCard.innerText = name;
        idClientElementCard.innerText = id;
        typeClientElementCard.innerText = type;
        dateStartClientElementCard.innerText = dateStart;
        dateEndClientElementCard.innerText = dateEnd;
        console.log(type)
        imgCard.style.display = "block";
        if (type == "BEGINNER")
            imgCard.setAttribute("src", "../img/card/beginner.png")
        else if (type == "BASIC")
            imgCard.setAttribute("src", "../img/card/basic.png")
        else if (type == "ADVANCE")
            imgCard.setAttribute("src", "../img/card/advance.png")
        else
            imgCard.style.display = "none";
    }
}

export function removeTextOfCard() {
    if (nameClientElementCard
        && idClientElementCard
        && typeClientElementCard
        && dateStartClientElementCard
        && dateEndClientElementCard
    ) {
        nameClientElementCard.innerText = "...";
        idClientElementCard.innerText = "...";
        typeClientElementCard.innerText = "...";
        dateStartClientElementCard.innerText = "...";
        dateEndClientElementCard.innerText = "...";
    }
}

