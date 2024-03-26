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
import { innerBoxMsg } from "../src/function.js";
import { addEventListenersAfterLogin } from "../src/client.js";

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

export let state = {
    connected3: false
};

$(document).ready(function () {
    $.ajax({
        url: '/get-login',
        type: 'GET',
        success: function (data) {
            // Kiểm tra trạng thái kết nối
            if (data.success) {
                addEventListenersAfterLogin();
            } else {
                f_loginBTN();
            }
        },
        error: function (err) {

        }
    });
})



function f_getLogin() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/get-login',
            type: 'GET',
            success: function (data) {
                console.log(state.connected3)
                // Kiểm tra trạng thái kết nối
                if (data.success) {
                    resolve(true);
                }
                else {
                    f_loginBTN();
                    resolve(false);
                }
            },
            error: function (err) {
                reject(err);
            }
        });
    });
}


sendButton.addEventListener('click', async () => {
    try {
        const loggedIn = await f_getLogin();
        if (loggedIn) {
            console.log(loggedIn);
            const valueInput = inputElement.value.trim();
            console.log(valueInput);
            sendMessage(valueInput);
            inputElement.value = "";
        }
    } catch (error) {
        console.error(error);
    }
});


inputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
});


export const socket = io();

// Hàm gửi tin nhắn từ khách hàng đến server
export function sendMessage(message) {
    socket.emit('client-message', { message });
}

socket.on('response-message', (message) => {
    displayRightMessage(message);
});

// Định nghĩa hàm clientMessageHandler
export const clientMessageHandler = (data) => {
    console.log(data);
    // Xử lý tin nhắn ở đây
    displayLeftMessage(data.message);
};

// Thêm hàm lắng nghe cho sự kiện 'client-message'
socket.on('client-message', clientMessageHandler);


// Sự kiện nhận tin nhắn từ server và hiển thị nó
socket.on('admin-message', (data) => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<p>Admin: ${data.message}</p>`;
});
