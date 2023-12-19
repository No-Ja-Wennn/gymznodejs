// chatbox
const chatBoxMessage = document.querySelector('.chatbox__message');
const chatBoxList = chatBoxMessage.querySelector('.chatbox__message__list');





const inputBox = document.querySelector('.chatbox__bottom__input');
const inputElement = inputBox.querySelector('input')
const sendButton = inputBox.querySelector('i');

sendButton.addEventListener('click', () => {
    var valueInput = inputElement.value;
    if (valueInput) {
        const chatBoxItem = document.createElement('li');
        chatBoxItem.className = 'chatbox__message__item chatbox__message__item__right';

        const textMessage = document.createElement('span');
        textMessage.className = 'chatbox__message__item__text';

        textMessage.innerText = valueInput;

        chatBoxItem.appendChild(textMessage);
        
        chatBoxList.appendChild(chatBoxItem);

        inputElement.value = ''
    }
});


inputElement.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
        
    }
});