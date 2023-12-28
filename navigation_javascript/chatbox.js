// import React from 'react' // nạp thư viện react
// import ReactDOM from 'react-dom' // nạp thư viện react-dom

// chatbox
const stringSimilarity = require('string-similarity'); //

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


const OpenAI = require("openai");
// const openai = new OpenAI({
//   apiKey: "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"
// });
const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
});
  
const openFun=async(valueInput)=>{
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": `${valueInput}`,}],
        max_tokens:100
    });
    return chatCompletion.choices[0].message.content;
}


async function getPromiseResult(valueInput) {
    try {
      const result = await openFun(valueInput);
    //   console.log(result)
      return result;

    } catch (error) {
      return "Xin lỗi, tôi chưa thể trả lời câu hỏi này."; // Xử lý lỗi nếu có
    }
  }
  


sendButton.addEventListener('click', async () => { // Thêm async vào đây
    const valueInput = inputElement.value.trim();
    if (valueInput) {
        displayUserMessage(valueInput);

        loadKnowledgeBase(async function (knowledgeBase) { // Thêm async vào đây
            const bestMatch = findBestMatch(valueInput, knowledgeBase.questions);
            let response = false;
            let answer = "Xin lỗi, tôi chưa thể trả lời câu hỏi này.";
            if (bestMatch && bestMatch.answer) {
                answer = bestMatch.answer;
                response = true
                displayBotMessage(answer);
            }
            if(response == false){
                answer = await getPromiseResult(valueInput); // Thêm await vào đây
                displayBotMessage(answer);
            }
        }); 
        inputElement.value = '';
    }
});


function isQuestionContained(userInput, questionWords, percentageRequired = 0.8) {
    var userInputWords = userInput.toLowerCase().split(/\s+/);

    // for (var i = 0; i < questionArray.length; i++) {
        questionWords = questionWords.toLowerCase().split(/\s+/);
        var matchingWords = questionWords.filter(word => userInputWords.includes(word)).length;
        var percentage = matchingWords / questionWords.length;
        if (percentage >= percentageRequired) {
            return true;
        }
    // }

    // Chỉ in ra 'false' nếu không tìm thấy câu hỏi nào khớp
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

inputElement.addEventListener("keypress", function(event) {
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
        // console.log(question, ": ",similarity1)
        if (similarity1 >= cutoff || similarity2 == true) {
            matches.push(question);
            if (matches.length >= n) {
                break;
            }
        }
    }
    return matches;
}

// function jaccardSimilarity(question, userInput) {
//     let questionSet = new Set(question.split(' '));
//     let userInputSet = new Set(userInput.split(' '));
//     let intersection = new Set([...questionSet].filter(x => userInputSet.has(x)));
//     return intersection.size / (questionSet.size + userInputSet.size - intersection.size);
// }

// function getCloseMatches(userInput, questions, n, cutoff) {
//     var matches = [];
//     // convert all to lower
//     userInput = userInput.toLowerCase();
//     questions.forEach(question => {
//         question.question = question.question.toLowerCase();
//     });
//     // compare
//     for (var i = 0; i < questions.length; i++) {
//         var question = questions[i];
//         var similarity = jaccardSimilarity(userInput, question.question);
//         if (similarity >= cutoff) {
//             matches.push(question);
//             if (matches.length >= n) {
//                 break;
//             }
//         }
//     }
//     return matches;
// }


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

const fs = require('fs');
function saveUserInputQuestion(userInput, question) {
    // Lấy dữ liệu đã lưu từ trước (nếu có)
    var data = JSON.parse(fs.readFileSync('data/knowledge_base.json')) || [];
    // Thêm câu hỏi mới vào dữ liệu
    data.push({
        userInput: userInput,
        question: question
    });
    // Lưu lại dữ liệu
    fs.writeFileSync('data/knowledge_base.json', JSON.stringify(data));
}


function findBestMatch(userQuestion, questions) {
    const matches = getCloseMatches(userQuestion, questions, 1, 0.8);
    if (matches.length > 0) {
        return matches[0];
    } else {
        return null;
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
