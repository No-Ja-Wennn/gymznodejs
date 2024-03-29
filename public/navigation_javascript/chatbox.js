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
} from "./login.js";
import { showSuccessToast, showErrorToast } from "../src/toast.js";
// import { innerBoxMsg } from "../src/function.js";

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


const titleNameE = document.querySelector(".chatbox__head__title");

export function innerMesageBox(name) {
    const titleNameE = document.querySelector(".chatbox__head__title");
    if (titleNameE)
        titleNameE.innerText = name;
    if (chatBoxList)
        chatBoxList.innerHTML = "";
    $.ajax({
        url: '/get-customer-message',
        type: "GET",
        success: function (data) {
            if (data) {
                var a_value = data.value;
                a_value.forEach(value => {
                    var role = value.senderRole;
                    if (role == "admin") {
                        displayLeftMessage(value.message);
                    } else if (role == "customer") {
                        displayRightMessage(value.message);
                    }
                })
            }
        },
        error: function (err) {

        }
    });
}
export function removeMessageBox() {
    const titleNameE = document.querySelector(".chatbox__head__title");
    if (titleNameE)
        titleNameE.innerText = "....";
    if (chatBoxList)
        chatBoxList.innerHTML = "";
}


let socket = null;
let customerID = null;

export function loginSocket(maKH) {
    socket = io();
    customerID = maKH;
    socket.on('connect', () => {
        console.log('Connected to server');
    });
    showSuccessToast("kết lối");
    socket.on('adminMessage', (data) => {
        if (customerID == data.maKH)
            displayLeftMessage(data.message);
    });
    socket.on('response-message-client', (data) => {
        if (customerID == data.maKH)
            displayRightMessage(data.message);
    });

}

export function logoutSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
        customerID = null;
        showSuccessToast("hủy kết nối");
        console.log('Disconnected from server');
    }
}

function sendMessage(message) {
    if (socket) {
        socket.emit('clientMessage', { text: message, id: customerID });
    } else {
        console.log('You must be logged in to send a message');
    }
}

sendButton.addEventListener('click', async () => {
    var valueInput = inputElement.value.trim();
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