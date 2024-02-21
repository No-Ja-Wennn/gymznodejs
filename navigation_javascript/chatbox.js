// const stringSimilarity = require('string-similarity'); //
var activePage = "userMessage";
const chatBoxMessage = document.querySelector('.chatbox__message');
const chatBoxList = chatBoxMessage.querySelector('.chatbox__message__list');

const inputBox = document.querySelector('.chatbox__bottom__input');
const inputElement = inputBox.querySelector('input')
const sendButton = inputBox.querySelector('i');

// let userActive = "other"

window.addEventListener('load', function() {
    var cookie = document.cookie.split('; ').find(row => row.startsWith('loggedInUser'));
    if (cookie) {
        var loggedInUser = JSON.parse(cookie.split('=')[1]); // Lấy thông tin người dùng từ cookie và chuyển nó thành đối tượng
        if (loggedInUser) {
            userActive = loggedInUser.id;
        }
    }
    var historyMessage = JSON.parse(localStorage.getItem('historyMessage'));
    if (historyMessage) {
        for (var i = 0; i < historyMessage.messages.length; i++) {
            if (historyMessage.messages[i].id == userActive) {
                historyMessage.messages[i].msg.map((value) => {
                    if (value.sender == 'User') {
                        displayUserMessage(value.message)
                    }
                    if (value.sender == 'Admin') {
                        displayBotMessage(value.message)
                    }
                })
            }
        }
    }
})

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

async function getPromiseResult(valueInput) {
    return "Tư vấn viên sẽ sớm trả lời câu hỏi của bạn."; // Xử lý lỗi nếu có
}

let responseMessage = false;
sendButton.addEventListener('click', async () => { // Thêm async vào đây
    const valueInput = inputElement.value.trim();
    if (valueInput) {
        displayUserMessage(valueInput);

        // loadKnowledgeBase(async function (knowledgeBase) { // Thêm async vào đây
        //     const bestMatch = findBestMatch(valueInput, knowledgeBase.questions);
        //     let response = false;
        //     let answer = "Tư vấn viên sẽ liên hệ với bạn sớm nhất";
        //     if (bestMatch && bestMatch.answer) {
        //         answer = bestMatch.answer;
        //         response = true;
        //         displayBotMessage("bot: " + answer);
        //     }
        //     if (response == false) {
        //         // answer = await getPromiseResult(valueInput); // Thêm await vào đây
        //         setTimeout(() => {
        //             if (responseMessage == false) {
        //                 displayBotMessage("bot: " + answer);
        //                 chatBoxMessage.scrollTop = chatBoxMessage.scrollHeight + 100;
        //             }
        //             responseMessage == false;
        //         }, 20000);
        //     }
        // });

        sendMessage(valueInput)
        chatBoxMessage.scrollTop = chatBoxMessage.scrollHeight + 100;
        inputElement.value = '';
    }
});


function isQuestionContained(userInput, questionWords, percentageRequired = 0.8) {
    var userInputWords = userInput.toLowerCase().split(/\s+/);
    questionWords = questionWords.toLowerCase().split(/\s+/);
    var matchingWords = questionWords.filter(word => userInputWords.includes(word)).length;
    var percentage = matchingWords / questionWords.length;
    if (percentage >= percentageRequired) {
        return true;
    }
    return false;
}

function displayUserMessage(message) {
    const chatBoxItemUser = makeLi(message, "chatbox__message__item__right");
    chatBoxList.appendChild(chatBoxItemUser);
}
function displayBotMessage(message) {
    const chatBoxItemBot = makeLi(message, "chatbox__message__item__left");
    chatBoxList.appendChild(chatBoxItemBot);
}

inputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
});

function getCloseMatches(userInput, questions, n, cutoff) {
    var matches = [];
    // convert all to lower
    userInput = userInput.toLowerCase();
    questions.forEach(question => {
        question.question = question.question.toLowerCase();
    });
    // compear
    for (var i = 0; i < questions.length; i++) {
        var question = questions[i];
        var similarity1 = stringSimilarity.compareTwoStrings(userInput, question.question); // Sử dụng stringSimilarity để tính toán độ tương đồng
        var similarity2 = isQuestionContained(userInput, question.question, cutoff);
        if (similarity1 >= cutoff && similarity1 < 1) {
            console.log("đã lưu userInput = ", userInput, "matches.answer= ", matches.answer)
        }
        if (similarity1 >= cutoff || similarity2 == true) {
            matches.push(question);
            if (matches.length >= n) {
                break;
            }
        }
    }
    return matches;
}

function loadKnowledgeBase(callback) {
    $.getJSON("../data/knowledge_base.json", function (data) {
        callback(data);
    });
}

function findBestMatch(userQuestion, questions) {
    const matches = getCloseMatches(userQuestion, questions, 1, 0.8);
    if (matches.length > 0) {
        return matches[0];
    } else {
        return null;
    }
}

// send message to admin
function sendMessage(message) {
    localStorage.setItem('userMessage', JSON.stringify({"id": userActive, "message": message}));
    // Lưu tin nhắn vào lịch sử
    var historyMessage = JSON.parse(localStorage.getItem('historyMessage')) || { "messages": [{ "id": userActive, "msg": [] }] };
    var have = false;
    for (var i = 0; i < historyMessage.messages.length; i++) {
        if (historyMessage.messages[i].id == userActive) {
            historyMessage.messages[i].msg.push({ sender: 'User', message: message });
            have = true;
        }
    }
    if (!have) {
        historyMessage.messages.push({ "id": userActive, "msg": [{ sender: 'Admin', message: message }] })
    }
    localStorage.setItem('historyMessage', JSON.stringify(historyMessage));
}

// Kiểm tra tin nhắn mới từ admin sau mỗi giây
setInterval(function () {
    var adminMessage = localStorage.getItem('adminMessage');
    if (adminMessage) {
        responseMessage = true;
        // Hiển thị tin nhắn từ admin
        displayBotMessage(adminMessage)
        localStorage.removeItem('adminMessage');

        chatBoxMessage.scrollTop = chatBoxMessage.scrollHeight + 100;
        // Lưu tin nhắn vào lịch sử
        // var historyMessage = JSON.parse(localStorage.getItem('historyMessage')) || [];
        // historyMessage.push({ sender: 'Admin', message: adminMessage });
        // localStorage.setItem('historyMessage', JSON.stringify(historyMessage));
    }
}, 1000);
