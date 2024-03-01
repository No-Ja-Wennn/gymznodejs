import { toast, showSuccessToast, showErrorToast } from './toast.js';
const modalOverlay = document.querySelector(".modal-overlay");
const nameElement = document.getElementById("name-client");
const dateOfBirthElement = document.getElementById("dateofbirth-client");
const emailElement = document.getElementById("email-client");
const phoneElement = document.getElementById("phone-client");
let typeChange = "";
let cardData = JSON.parse(localStorage.getItem('cardData'));
let accountData = JSON.parse(localStorage.getItem('loginData'));
let cookieID = null;
const cookie = document.cookie.split('; ').find(
    row => row.startsWith('loggedInUser'));
let loggedInUser;
if (cookie) {
    loggedInUser = JSON.parse(cookie.split('=')[1]); // Lấy thông tin người dùng từ cookie và chuyển nó thành đối tượng
    if (loggedInUser) {
        var nameAccount = loggedInUser.name;
        var idAccount = loggedInUser.id;
        cookieID = loggedInUser.id;
        // name 
        nameElement.innerText = nameAccount;


        if (cardData) {
            cardData.cards.map(value => {
                if (value.id == idAccount) {
                    // date of birth
                    if (value.age)
                        dateOfBirthElement.innerText = value.age;
                    else
                        dateOfBirthElement.innerText = "";

                    // phone number
                    if (value.phoneNumber)
                        phoneElement.innerText = value.phoneNumber;
                    else
                        phoneElement.innerText = "";

                }
            })
        }
        // email
        if (accountData) {
            accountData.accounts.map(value => {
                if (value.id == idAccount) {
                    if (value.email)
                        emailElement.innerText = value.email;
                    else
                        emailElement.innerText = "";
                }
            })
        }
    }
}

// avatar
const inputAvatar = document.getElementById("input-file-avt");
const avatarImage = document.getElementById("avt-img");
const iconUser = document.querySelector(".icon-user");
// localStorage.setItem('avtLink', JSON.stringify(myData));
let avtLink = JSON.parse(localStorage.getItem('avtLink'));
if (!avtLink) {
    avtLink = { links: [] };
    if (accountData) {
        accountData.accounts.map(value => {
            var data = {
                id: value.id,
                path: ""
            }
            avtLink.links.push(data);
        })
    }
    localStorage.setItem('avtLink', JSON.stringify(avtLink));
} else {
    if (cookie) {
        loggedInUser = JSON.parse(cookie.split('=')[1]);
        avtLink.links.map(value => {
            if (value.id == loggedInUser.id)
                avatarImage.src = value.path;
            iconUser.style.display = "none";
            avatarImage.style.display = "block";
        })
    }
}

inputAvatar.addEventListener("click", function () {
    if (cookie) {
        inputAvatar.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    avatarImage.src = e.target.result;
                    iconUser.style.display = "none";
                    avatarImage.style.display = "block";
                    // save
                    var loggedInUser = JSON.parse(cookie.split('=')[1]);
                    avtLink.links.map(value => {
                        if (value.id == loggedInUser.id)
                            value.path = e.target.result;
                    })
                    localStorage.setItem('avtLink', JSON.stringify(avtLink));
                };
                reader.readAsDataURL(file);
            }
        });
    } else {
        event.preventDefault()
        showErrorToast("Thất bại", "Vui lòng đăng nhập để sử dụng chức năng này!")
    }
})


// edit name

const modalBox = document.querySelector(".modal");
const editNameElement = document.getElementById("edit-name");
let submitForm;
editNameElement.addEventListener("click", function () {
    if (cookie) {
        typeChange = "name";

        deletePhoneInput();
        removeAllEvent();
        var editTitle = modalBox.querySelector(".edit-title");
        var editLabel = modalBox.querySelector(".edit-label");
        var changeNameBox = modalBox.querySelector(".change-name-box");
        submitForm = document.getElementById("submitChangeName");
        editTitle.innerText = 'Sửa tên khách hàng';
        editLabel.innerText = "Tên của bạn";
        editLabel.id = '';
        var inputElement = modalBox.querySelector(".new-name");
        inputElement.type = "text";

        modalBox.style.display = "flex";
        var changeNameBox = modalBox.querySelector(".change-name-box");
        changeNameBox.style.display = "block";
        submitForm = document.getElementById("submitChangeName")

        submitForm.addEventListener("click", clickHandlerName);
    } else {
        showErrorToast("Thất bại", "Vui lòng đăng nhập !");
    }
})

function clickHandlerName(event) {
    f_submitChangName();

    // Xóa sự kiện click sau khi đã thực hiện
    // submitForm.removeEventListener("click", clickHandlerName);
}

function f_submitChangName() {
    var changeNameBox = modalBox.querySelector(".change-name-box");
    var inputName = changeNameBox.querySelector(".new-name");
    var newValue = inputName.value;
    if (newValue && cookieID) {
        changeValue(cookieID, "name", newValue);
        inputName.value = "";

        // change value element
        nameElement.innerText = newValue;

        saveCookie("loggedInUser", loggedInUser);
        displayNone();
        showSuccessToast("Thành công!");

        removeAllEvent();
        typeChange = "";
    }
    else {
        showErrorToast("Thất bại", "Vui lòng nhập tên mới")
    }
}

function displayNone() {
    var changeNameBox = modalBox.querySelector(".change-name-box");
    changeNameBox.style.display = "none";
    modalBox.style.display = "none";
}

function changeValue(idUser, type, newValue) {
    // name, age, email, phone, password
    var loginData = JSON.parse(localStorage.getItem('loginData'));
    var cardData = JSON.parse(localStorage.getItem('cardData'));
    var calendarData = JSON.parse(localStorage.getItem('calendarData'));
    // name email
    loginData.accounts.map(value => {
        if (value.id == idUser) {
            if (type == "name") {
                value.name = newValue;
                loggedInUser.name = newValue;
            } else if (type == "email") {
                value.email = newValue;
                loggedInUser.email = newValue;
            } else if (type == "password") {
                value.password = newValue;
                loggedInUser.password = newValue;
            }
        }
    });


    // name age phone
    cardData.cards.map(value => {
        if (value.id == idUser) {
            if (type == "name") {
                value.name = newValue;
                loggedInUser.name = newValue;
            }
            else if (type == "age")
                value.age = newValue;
            else if (type == "phone")
                value.phoneNumber = newValue;
        }
    });

    // name
    calendarData.calendars.map(value => {
        if (value.id == idUser)
            if (type == "name") {
                value.name = newValue;
                loggedInUser.name = newValue;
            }
    });
    localStorage.setItem('loginData', JSON.stringify(loginData));
    localStorage.setItem('cardData', JSON.stringify(cardData));
    localStorage.setItem('calendarData', JSON.stringify(calendarData));
}

// save cookie
function saveCookie(type, value) {
    var date = new Date();
    date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000)); // Set expires to 3 days from now
    var expires = "; expires=" + date.toUTCString();
    document.cookie = `${type}=` + JSON.stringify(value) + expires; // Lưu thông tin người dùng vào cookie
}

// enter key
document.addEventListener('keypress', function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    // enter key
    if (keycode == '13') {
        var submitForm = document.getElementById("submitChangeName")

        if (typeChange == "name") {
            f_submitChangName();
        } else if (typeChange == "profile") {
            f_submitChangBirth();
        } else if (typeChange == "information") {
            f_submitChangInfor();
        }
    }
});


// change profile ===========
const changeProfileE = document.getElementById("change-profile");
changeProfileE.addEventListener("click", function () {
    if (cookie) {
        typeChange = "profile";

        deletePhoneInput();
        removeAllEvent();
        var editTitle = modalBox.querySelector(".edit-title");
        var editLabel = modalBox.querySelector(".edit-label");
        var changeNameBox = modalBox.querySelector(".change-name-box");
        submitForm = document.getElementById("submitChangeName")
        editLabel.id = 'actived-label';
        editTitle.innerText = 'Chỉnh sửa thông tin hồ sơ';
        editLabel.innerText = "Ngày sinh của bạn"
        var inputElement = modalBox.querySelector(".new-name");
        inputElement.type = "date";
        modalBox.style.display = "flex";
        changeNameBox.style.display = "block";
        submitForm.addEventListener("click", clickHandlerAge);
    } else {
        showErrorToast("Thất bại", "Vui lòng đăng nhập !");
    }
})
function clickHandlerAge(event) {
    f_submitChangBirth();
    // Xóa sự kiện click sau khi đã thực hiện
    // submitForm.removeEventListener("click", clickHandlerAge);
}

function f_submitChangBirth() {
    var changeNameBox = modalBox.querySelector(".change-name-box");
    var inputName = changeNameBox.querySelector(".new-name");
    var newValue = inputName.value;
    if (newValue) {
        if (typeChange == "profile") {
            newValue = convertDateFormat(newValue);
        }

        if (newValue && cookieID) {
            changeValue(cookieID, "age", newValue);
            inputName.value = "";
            // change value element
            dateOfBirthElement.innerText = newValue;
            saveCookie("loggedInUser", loggedInUser);
            displayNone();
            showSuccessToast("Thành công!");
            removeAllEvent();
        }
    }
    else {
        showErrorToast("Thất bại", "Vui lòng nhập dữ liệu");
    }
}

function convertDateFormat(str) {
    var parts = str.split("-");
    if (parts)
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return str;
}


// change infor account: email and phone number

const changeInforE = document.getElementById("change-information");
changeInforE.addEventListener("click", function () {
    if (cookie) {
        typeChange = "information";

        deletePhoneInput();
        removeAllEvent();
        var editTitle = modalBox.querySelector(".edit-title");
        var editLabel = modalBox.querySelector(".edit-label");
        var changeNameBox = modalBox.querySelector(".change-name-box");
        submitForm = document.getElementById("submitChangeName");
        editTitle.innerText = 'Chỉnh sửa thông tin tài khoản';
        editLabel.innerText = "email"
        editLabel.id = '';
        insertInputAfterUserBox();
        var inputElement = modalBox.querySelector(".new-name");
        // var phoneinputElement = modalBox.querySelector(".new-phone");
        inputElement.type = "email";
        modalBox.style.display = "flex";
        changeNameBox.style.display = "block";
        submitForm.addEventListener("click", clickHandlerInfor);
    } else {
        showErrorToast("Thất bại", "Vui lòng đăng nhập !");
    }
})
function clickHandlerInfor(event) {
    f_submitChangInfor();
    // Xóa sự kiện click sau khi đã thực hiện
    // submitForm.removeEventListener("click", clickHandlerInfor);
}

function f_submitChangInfor() {
    var changeNameBox = modalBox.querySelector(".change-name-box");
    var inputName = changeNameBox.querySelector(".new-name");
    var newValue = inputName.value;
    var inputPhone = changeNameBox.querySelector(".new-phone");
    var phoneValue = inputPhone.value;
    if (newValue && cookieID && phoneValue) {
        changeValue(cookieID, "email", newValue);
        changeValue(cookieID, "phone", phoneValue);
        inputName.value = "";
        // change value element
        emailElement.innerText = newValue;
        phoneElement.innerText = phoneValue;
        saveCookie("loggedInUser", loggedInUser);
        displayNone();
        showSuccessToast("Thành công!");

        removeAllEvent();
        // remove form DOM
        inputPhone.parentElement.remove();
    }
    else {
        showErrorToast("Thất bại", "Vui lòng nhập dữ liệu")
    }
}

function insertInputAfterUserBox() {
    var phoneInput = document.querySelector(".new-phone");
    if (!phoneInput) {

        var newUserBox = document.createElement("div");
        newUserBox.classList.add("user-box");

        const inputElement = document.createElement("input");
        inputElement.classList.add("new-phone");
        inputElement.setAttribute("required", "");
        inputElement.setAttribute("name", "");
        inputElement.setAttribute("type", "text");
        const labelElement = document.createElement("label");
        labelElement.classList.add("edit-label");
        labelElement.innerText = "Số điện thoại";
        newUserBox.appendChild(inputElement);
        newUserBox.appendChild(labelElement);

        const existingUserBox = modalBox.querySelector(".user-box");

        // Chèn thẻ <div> mới vào sau thẻ <div> có class là "user-box"
        existingUserBox.parentNode.insertBefore(newUserBox, existingUserBox.nextSibling);
    }
}

function deletePhoneInput() {
    var phoneInput = document.querySelector(".new-phone");
    if (phoneInput) {
        phoneInput.parentElement.remove();
    }
}


// remove all click event 
function removeAllEvent() {
    submitForm = document.getElementById("submitChangeName")
    submitForm.removeEventListener("click", clickHandlerName);
    submitForm.removeEventListener("click", clickHandlerAge);
    submitForm.removeEventListener("click", clickHandlerInfor);

}


// EXIT BTN

let submitExit = document.getElementById("submitExit");
submitExit.addEventListener("click", exitBTN);

function exitBTN() {
    displayNone();
    removeAllEvent();
}
modalOverlay.addEventListener("click", function () {
    exitBTN();
})




/// change password

const changePasswordElement = document.querySelector(".change__the__password__group__content");
changePasswordElement.addEventListener("click", function () {

    if (cookie) {
        typeChange = "password";
        deletePhoneInput();
        deletePhoneInputPass();
        removeAllEvent();
        var editTitle = modalBox.querySelector(".edit-title");
        var editLabel = modalBox.querySelector(".edit-label");
        var changeNameBox = modalBox.querySelector(".change-name-box");
        submitForm = document.getElementById("submitChangeName");
        editTitle.innerText = 'Thay đổi mật khẩu';
        editLabel.innerText = "Mật khẩu cũ";
        editLabel.id = '';
        insertInputAfterUserBoxPass(true);
        var inputElement = modalBox.querySelector(".new-name");
        inputElement.type = "text";
        modalBox.style.display = "flex";
        changeNameBox.style.display = "block";
        submitForm.addEventListener("click", clickHandlerPassword);
    } else {
        showErrorToast("Thất bại", "Vui lòng đăng nhập !");
    }
})
function clickHandlerPassword(event) {
    f_submitChangPassword();
    // Xóa sự kiện click sau khi đã thực hiện
    // submitForm.removeEventListener("click", clickHandlerPassword);
}

function f_submitChangPassword() {
    var changeNameBox = modalBox.querySelector(".change-name-box");
    // old password
    var inputName = changeNameBox.querySelector(".new-name");
    var oldValue = inputName.value;
    // new password
    var inputPhone = changeNameBox.querySelector(".new-password");
    var newpassValue = inputPhone.value;
    // confirm password
    var inputPhone = changeNameBox.querySelector(".confirm-pass");
    var confirmValue = inputPhone.value;

    if (checkValidChangePass(oldValue, newpassValue, confirmValue) && cookieID ) {
        changeValue(cookieID, "passwword", newValue);
        inputName.value = "";
        inputPhone.value = "";
        inputPhone.value = "";
        // change value element
        saveCookie("loggedInUser", loggedInUser);
        displayNone();
        showSuccessToast("Thành công!");

        removeAllEvent();
        // remove form DOM
        inputPhone.parentElement.remove();
    }
    // else {
    //     showErrorToast("Thất bại", "Vui lòng nhập dữ liệu")
    // }
}

function checkValidChangePass(oldPass, newPass, confirmPass){
    if(!oldPass){
        showErrorToast("Thất bại", "Vui lòng nhập mật khẩu cũ");
        return false;
    }else if(!newPass){
        showErrorToast("Thất bại", "Vui lòng nhập mật khẩu mới");
        return false
    } else if(!confirmPass){
        showErrorToast("Thất bại", "Vui lòng nhập mật khẩu");
        return false;
    }else{


        return true;
    }
}

function insertInputAfterUserBoxPass(flag = false) {
    console.log('flag', flag)
    var phoneInput = document.querySelector(".new-phone");
    if (!phoneInput) {

        
        if (flag == true) {
            var newUserBox = document.createElement("div");
            newUserBox.classList.add("user-box");
            // create input two
            var inputElement = document.createElement("input");
            inputElement.setAttribute("required", "");
            inputElement.setAttribute("name", "");
            inputElement.setAttribute("type", "text");
            inputElement.classList.add("confirm-pass");

            var labelElement = document.createElement("label");
            labelElement.classList.add("edit-label");
            labelElement.innerText = "Nhập lại mật khẩu";

            newUserBox.appendChild(inputElement);
            newUserBox.appendChild(labelElement);
            console.log(newUserBox)
            const existingUserBox = modalBox.querySelector(".user-box");

            // Chèn thẻ <div> mới vào sau thẻ <div> có class là "user-box"
            existingUserBox.parentNode.insertBefore(newUserBox, existingUserBox.nextSibling);

        }

        var newUserBox = document.createElement("div");
        newUserBox.classList.add("user-box");
        // create input one
        var inputElement = document.createElement("input");
        inputElement.classList.add("new-password");
        inputElement.setAttribute("required", "");
        inputElement.setAttribute("name", "");
        inputElement.setAttribute("type", "text");
        var labelElement = document.createElement("label");
        labelElement.classList.add("edit-label");
        labelElement.innerText = "Mật khẩu mới";
        newUserBox.appendChild(inputElement);
        newUserBox.appendChild(labelElement);

        const existingUserBox = modalBox.querySelector(".user-box");

        // Chèn thẻ <div> mới vào sau thẻ <div> có class là "user-box"
        existingUserBox.parentNode.insertBefore(newUserBox, existingUserBox.nextSibling);

    }
}

function deletePhoneInputPass() {
    var phoneInput = document.querySelector(".new-password");
    if (phoneInput) {
        phoneInput.parentElement.remove();
    }
    
    var emailInput = document.querySelector(".confirm-pass");
    if (emailInput) {
        emailInput.parentElement.remove();
    }
    
}