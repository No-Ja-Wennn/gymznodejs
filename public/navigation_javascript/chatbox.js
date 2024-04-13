
import {
    activeLoginBox,
    activeNecessaryForm,
    customerID,
    displayLeftMessage,
    displayNoneAll,
    displayRightMessage,
    sendMessage,
    socket
} from "../src/function.js";
import { showSuccessToast, showErrorToast } from "../src/toast.js";
// import { innerBoxMsg } from "../src/function.js";

function autoResizeTextarea() {
    const textarea = document.getElementById('myTextarea');
    textarea.style.height = '17px';
    textarea.style.height = `${textarea.scrollHeight}px`;
}
const inputElement = document.getElementById('myTextarea');
if (inputElement)
    inputElement.addEventListener('input', autoResizeTextarea);

// const stringSimilarity = require('string-similarity'); //
const chatBoxMessage = document.querySelector('.chatbox__message');
if (chatBoxMessage) {
    const chatBoxList = chatBoxMessage.querySelector('.chatbox__message__list');
}

const inputBox = document.querySelector('.chatbox__bottom__input');
// const inputElement = inputBox.querySelector('textarea');
const sendButton = document.querySelector('.chatbox__bottom__send .send');

const titleNameE = document.querySelector(".chatbox__head__title");




sendButton.addEventListener('click', async () => {
    var valueInput = inputElement.value.trim();
    if (valueInput != '') {
        var flag = sendMessage(valueInput);
        if (flag)
            inputElement.value = '';
        else {
            showErrorToast("Gửi tin nhắn không thành công", "Vui lòng đăng nhập vào hệ thống");
            displayNoneAll();
            activeNecessaryForm();
            activeLoginBox();
        }
    }
});


inputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
});