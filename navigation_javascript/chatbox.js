// chatbox
const chatBoxMessage = document.querySelector('.chatbox__message');
const chatBoxList = chatBoxMessage.querySelector('.chatbox__message__list');

const inputBox = document.querySelector('.chatbox__bottom__input');
const inputElement = inputBox.querySelector('input')
const sendButton = inputBox.querySelector('i');

function makeLi(value = "", option = "chatbox__message__item__right"){
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

sendButton.addEventListener('click', () => {
    var valueInput = inputElement.value;
    if (valueInput) {
        const chatBoxItemUser = makeLi(valueInput, "chatbox__message__item__right")
        
        chatBoxList.appendChild(chatBoxItemUser);
        

        loadKnowledgeBase(function (knowledgeBase) {
            var bestMatch = findBestMatch(valueInput, knowledgeBase.questions);
            var answer = null;
            if (bestMatch[0] !== null)
                answer = bestMatch[0].answer;
            if (answer === null) 
                answer = "Sorry, Hiện tại chưa thể trả lời câu hỏi này.";

            console.log(answer)
            const chatBoxItemBot = makeLi(answer, "chatbox__message__item__left")
            chatBoxList.appendChild(chatBoxItemBot);
        }); 
        
        inputElement.value = ''
    }
});


inputElement.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
        
    }
});


function getCloseMatches(userInput, questions, n, cutoff) {
    var matches = [];
    for (var i = 0; i < questions.length; i++) {
        var question = questions[i];
        var similarity = calculateSimilarity(userInput, question.question);
        if (similarity >= cutoff) {
            matches.push(question);
            if (matches.length >= n) {
                break;
            }
        }
    }
    return matches;
}

function calculateSimilarity(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') {
        return 0;
    }

    var pairs1 = getLetterPairs(a.toUpperCase());
    var pairs2 = getLetterPairs(b.toUpperCase());
    var union = pairs1.length + pairs2.length;
    var intersection = 0;
    for (var i = 0; i < pairs1.length; i++) {
        for (var j = 0; j < pairs2.length; j++) {
            if (pairs1[i] === pairs2[j]) {
                intersection++;
                pairs2.splice(j, 1);
                break;
            }
        }
    }
    return (2.0 * intersection) / union;
}

function getLetterPairs(str) {
    var pairs = [];
    for (var i = 0; i < str.length - 1; i++) {
        pairs.push(str.slice(i, i + 2));
    }
    return pairs;
}

function loadKnowledgeBase(callback) {
    $.getJSON("../data/knowledge_base.json", function (data) {
        callback(data);
    });
}

function saveKnowledgeBase(data) {
    var jsonData = JSON.stringify(data, null, 2);
    var blob = new Blob([jsonData], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "knowledge_base.json";
    a.click();
}

function findBestMatch(userQuestion, questions) {
    var matches = getCloseMatches(userQuestion, questions, 1, 0.7);
    if (matches.length > 0) {
        var score = calculateSimilarity(userQuestion, matches[0].question);
        return [matches[0], score];
    } else {
        return [null, null];
    }
}

function getAnswerForQuestion(question, knowledgeBase) {
    for (var i = 0; i < knowledgeBase.questions.length; i++) {
        var q = knowledgeBase.questions[i];
        if (q.question === question) {
            return q.answer;
        }
    }
    return null;
}

function sendMessage(userInput) {
    // var userInput = document.getElementById("user-input").value.trim();
    if (userInput.toLowerCase() === "quit") {
        return;
    }

    // var chatContainer = document.getElementById("chat-container");
    // var userMessage = document.createElement("p");
    // userMessage.innerText = "You: " + userInput;
    // chatContainer.appendChild(userMessage);  
}




/*


*/