// import { scrollToBottom } from "../src/function.js";

const purple = document.querySelector('.color.purple');
const pink = document.querySelector('.color.pink');
const red = document.querySelector('.color.red');

purple.style.animation = 'color 3s ease-in-out infinite';
setTimeout(() => {
    red.style.animation = 'color 3s ease-in-out infinite';
    setTimeout(() => {
        pink.style.animation = 'color 3s ease-in-out infinite';
    }, 500);
}, 500);


$(document).ready(function(){
    
    const html = document.querySelector('html');
    const buttonOpenChat = document.querySelector('.button-open-chat');
    const buttonCloseChat = document.querySelector('.chat-minimize');
    const chatBox = document.querySelector('.chat-box');
    const chatBoxWrapper = document.querySelector('.chat-box-wrapper');
    
    buttonOpenChat.onclick = function () {
        chatBox.style.display = 'flex';
        chatBoxWrapper.style.animation = 'flyToTopChatBox .3s ease-in-out forwards';
        html.style.overflow = 'hidden';
        // scrollToBottom();
    }
    buttonCloseChat.onclick = function () {
        chatBoxWrapper.style.animation = 'fadeOutChatBox .3s ease-in-out forwards';
        setTimeout(() => {
            chatBox.style.display = 'none';
            html.style.overflow = 'auto';
        }, 300);
    }
    
    const showButtonImage = document.querySelector('.plus');
    const buttonImageWrapper = document.querySelector('.button-image-wrapper');
    
    showButtonImage.onclick = function() {
        let widthButtonImageWrapper = document.querySelector('.button-image-wrapper').offsetWidth;
        if (widthButtonImageWrapper === 30) {
            console.log('hihi');
            buttonImageWrapper.style.animation = 'hideButtonImage .3s ease-in-out forwards';
            showButtonImage.style.transform = 'rotate(0deg)';
        } else {
            console.log('hiha');
            buttonImageWrapper.style.animation = 'showButtonImage .3s ease-in-out forwards';
            showButtonImage.style.transform = 'rotate(45deg)';
        }
    }
});