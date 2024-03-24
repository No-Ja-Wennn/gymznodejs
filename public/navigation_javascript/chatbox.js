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
} from "./login.js"
import { showSuccessToast, showErrorToast } from "../src/toast.js";

function autoResizeTextarea() {
    const textarea = document.getElementById('myTextarea');
    textarea.style.height = '17px';
    textarea.style.height = `${textarea.scrollHeight}px`;
}

document.getElementById('myTextarea').addEventListener('input', autoResizeTextarea);

// const stringSimilarity = require('string-similarity'); //
const chatBoxMessage = document.querySelector('.chatbox__message');
const chatBoxList = chatBoxMessage.querySelector('.chatbox__message__list');

const inputBox = document.querySelector('.chatbox__bottom__input');
const inputElement = inputBox.querySelector('textarea');
const sendButton = document.querySelector('.chatbox__bottom__send i');

function makeLi(value = "", option = "chatbox__message__item__right") {
    const chatBoxItem = document.createElement('li');
    if (value) {
        chatBoxItem.className = `chatbox__message__item ${option}`;
        const textMessage = document.createElement('span');
        textMessage.className = 'chatbox__message__item__text';
        textMessage.innerText = value;
        chatBoxItem.appendChild(textMessage);
    }
    return chatBoxItem;
}

function displayRightMessage(message) {
    const chatBoxItemUser = makeLi(message, "chatbox__message__item__right");
    chatBoxList.appendChild(chatBoxItemUser);
}
function displayLeftMessage(message) {
    const chatBoxItemBot = makeLi(message, "chatbox__message__item__left");
    chatBoxList.appendChild(chatBoxItemBot);
}

let socket = io();

// send message to admin
function sendMessage(message) {
    var data = {
        senderRole: "customer",
        message: message
    }
    socket.emit('chatMessage', data);
}
const titleNameE = document.querySelector(".chatbox__head__title");
socket.on('messageData', function (data, name) {
    if (titleNameE)
        titleNameE.innerText = name;
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            // console.log("messageID:", data[i].messageID);
            // console.log("maKH:", data[i].maKH);
            if (data[i].senderRole == "admin") {
                displayLeftMessage(data[i].message);
            } else if (data[i].senderRole == "customer") {
                displayRightMessage(data[i].message);
            }
            // console.log("senderRole:", data[i].senderRole);
            console.log("message:", data[i].message);
            // console.log("-------------------------------");
        }
    } else {
        console.log("Không có dữ liệu phù hợp.");
    }
});


socket.on('chatMessage', function (msg) {
    if (msg) {
        displayRightMessage(msg);
    } else {
        showErrorToast("Quý khách chưa đăng nhập", "Vui lòng đăng nhập vào hệ thống");
        displayNoneAll();
        activeNecessaryForm();
        f_loginBTN();
    }
    // // Đóng kết nối socket hiện tại
    // socket.close();

    // // Tạo một kết nối socket mới
    // socket = io();
});
sendButton.addEventListener('click', async () => {
    const valueInput = inputElement.value.trim();
    sendMessage(valueInput);

    inputElement.value = "";
});

inputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
});


