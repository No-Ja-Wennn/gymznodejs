
import { customerID, displayLeftMessage, displayRightMessage, socket } from "../src/function.js";
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
if (chatBoxMessage){
    const chatBoxList = chatBoxMessage.querySelector('.chatbox__message__list');
}

const inputBox = document.querySelector('.chatbox__bottom__input');
// const inputElement = inputBox.querySelector('textarea');
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



const titleNameE = document.querySelector(".chatbox__head__title");





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