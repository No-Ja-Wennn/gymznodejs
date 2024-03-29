import {
    activeEventClickBox,
    activeNecessaryForm,
    createMessageBox,
    displayLeftMessage,
    displayNoneAll,
    displayRightMessage,
    innerBoxMsg,
    maKHActive
} from "./src/function.js";
import { showErrorToast, showSuccessToast } from "./src/toast.js";


/*====== LOGIN =====*/
const modalBox = document.querySelector(".modal");
const overlayBox = document.querySelector(".modal-overlay");
const loginBox = document.querySelector(".login-box");



function affterLogin(data) {
    adminName.innerText = data.username;
    showSuccessToast("Đăng nhập thành công")
    displayNoneAll();
}

let accessRights = null;

function checkCookieAdmin(){
    $.ajax({
        url: '/get-login-admin',
        type: 'get',
        success: function (data) {
            if(data){
                return data.success;
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}
console.log(checkCookieAdmin())

$.ajax({
    url: '/get-login-admin',
    type: 'get',
    success: function (data) {
        console.log(data);
        if (data.success) {
            affterLogin(data);

        } else {
            displayNoneAll();
            activeNecessaryForm();
            loginBox.style.display = "block";
        }
    },
    error: function (err) {

    }
})

function validValueAdminLogin() {
    return true;
}

const adminName = document.querySelector(".nav-admin-ifm-name");

$('#login-admin-form').submit(function (e) {
    e.preventDefault();
    if (validValueAdminLogin())
        $.ajax({
            url: '/login-admin-url',
            type: 'POST',
            data: $(this).serialize(),
            success: function (data) {
                if (data.success) {
                    affterLogin(data)
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
})




/* ===== CHAT ===== */
const socket = io();
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('response-message-admin', (message) => {
    displayRightMessage(message);
});

socket.on('clientMessage', (data) => {
    // console.log(maKHActive)
    if (data.maKH == maKHActive)
        displayLeftMessage(data.message);
    activeNewMessage(data.maKH, data.name, data.senderRole, data.message);
});

function sendMessage(message) {
    socket.emit('adminMessage', { text: message, id: maKHActive });
}



const inputBox = document.querySelector('.chatbox__bottom__input');
const inputElement = inputBox.querySelector('textarea');
const sendButton = document.querySelector('.chatbox__bottom__send i');

sendButton.addEventListener('click', async () => {
    const valueInput = inputElement.value.trim();
    if (valueInput != '') {
        sendMessage(valueInput);
        inputElement.value = '';
    }
});

inputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
});

$(document).ready(function () {
    $.ajax({
        url: '/get-box-message',
        type: "GET",
        success: function (data) {
            // console.log(data);
            innerBoxMsg(data.value);
        },
        error: function (err) {

        }
    });
})

function updateNewMessage(element, message) {
    var newMessageE = element.querySelector(".user-ifm-card-number2");
    newMessageE.innerText = message;
}

const msgList = document.querySelector(".msg-list");

function activeNewMessage(maKH, name, role, message) {
    var newClient = true;
    var a_listMessage = document.querySelectorAll(".msg-box");
    a_listMessage = Array.from(a_listMessage);
    a_listMessage.forEach(value => {
        var valueMaKH = value.querySelector(".user-ifm-card-number").innerText;
        if (valueMaKH == maKH && maKHActive != maKH) {
            var parentElement = value.parentNode;
            parentElement.insertBefore(value, parentElement.firstChild);
            var nameElement = value.querySelector(".user-ifm-name");
            nameElement.style.fontWeight = 700;
            updateNewMessage(value, message);
        } else if (maKH == valueMaKH) {
            var parentElement = value.parentNode;
            parentElement.insertBefore(value, parentElement.firstChild);
            updateNewMessage(value, message);
        }
        if (valueMaKH == maKH) {
            newClient = false;
        }
    });
    if (newClient) {
        var newMsgItem = createMessageBox(maKH, name, role, message);
        activeEventClickBox(newMsgItem);
        msgList.appendChild(newMsgItem);
        var parentElement = newMsgItem.parentNode;
        parentElement.insertBefore(newMsgItem, parentElement.firstChild);
        var nameElement = newMsgItem.querySelector(".user-ifm-name");
        nameElement.style.fontWeight = 700;
    }
}



// find chatbox

const boxList = document.querySelector('.msg-list');

var searchChatInput = document.getElementById("searchInput");
if (searchChatInput)
    searchChatInput.addEventListener("input", function () {
        var inputValue = this.value.toLowerCase();
        var a_chatbox = boxList.querySelectorAll(".msg-box");
        a_chatbox = Array.from(a_chatbox);
        a_chatbox.forEach(element => {
            element.style.display = "flex";
            var name = element.querySelector(".user-ifm-name").innerText.toLowerCase();
            var id = element.querySelector(".user-ifm-card-number").innerText.toLowerCase();
            if (!(name.includes(inputValue) || id.includes(inputValue))) {
                element.style.display = "none";
            }
        })
    })

/* REMOVE CHAT MESSAGE */

export function f_removeChat(maKH, liElement) {
    console.log("ehllo")
    $.ajax({
        url: '/remove-chat',
        type: "POST",
        data: { maKH },
        success: function (data) {
            var success = data.success;
            if (success) {
                liElement.remove();
                showSuccessToast("Thành công", "đã xóa đoạn chat");
            } else {
                showErrorToast("Lỗi");
            }
        },
        error: function (err) {

        }
    })
}


/* ====== SHOW ACCOUNT ====== */

// save old click
const a_nav = [
    msgNav = document.getElementById("QLMessage"),
    accountNav = document.getElementById("QLAccount"),
    cardNav = document.getElementById("QLCard"),
    calendarNav = document.getElementById("QLCalendar"),
]

// test jwt
$.ajax({
    url: "/get-book",
    type: 'GET',
    success: function(data){
        console.log(data);
    },
    error: function(err){
        console.log(err);
    }
})

$.ajax({
    url: '/login-test',
    type: 'POST',
    data: {}
})