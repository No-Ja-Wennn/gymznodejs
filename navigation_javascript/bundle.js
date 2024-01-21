(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// import React from 'react' // nạp thư viện react
// import ReactDOM from 'react-dom' // nạp thư viện react-dom

// chatbox
const stringSimilarity = require('string-similarity'); //

const chatBoxMessage = document.querySelector('.chatbox__message');
const chatBoxList = chatBoxMessage.querySelector('.chatbox__message__list');

const inputBox = document.querySelector('.chatbox__bottom__input');
const inputElement = inputBox.querySelector('input')
const sendButton = inputBox.querySelector('i');

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


// const OpenAI = require("openai");
// const openai = new OpenAI({
//     apiKey: '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',
//     dangerouslyAllowBrowser: true
// });

// const openFun = async (valueInput) => {
//     const chatCompletion = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [{ "role": "user", "content": `${valueInput}`, }],
//         max_tokens: 1000
//     });
//     return chatCompletion.choices[0].message.content;
// }

// openFun(`
// chỉ được nói về gym, không được nói những điều khác, chỉ nói về chủ đề tập gym, những câu hỏi không liên quan đến gym không trả lời, gym là chủ đề nói, những vấn đề khác gym không trả lời:
// `
// )

async function getPromiseResult(valueInput) {
    // try {
    //     const result = await openFun(valueInput);
    //     //   console.log(result)
    //     return result;

    // } catch (error) {
        return "Xin lỗi, tôi chưa thể trả lời câu hỏi này."; // Xử lý lỗi nếu có
    // }
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
            if (response == false) {
                answer = await getPromiseResult(valueInput); // Thêm await vào đây
                displayBotMessage(answer);
                // saveUserInputQuestion(valueInput, answer);
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


function findBestMatch(userQuestion, questions) {
    const matches = getCloseMatches(userQuestion, questions, 1, 0.8);
    if (matches.length > 0) {
        return matches[0];
    } else {
        return null;
    }
}



},{"string-similarity":2}],2:[function(require,module,exports){
module.exports = {
	compareTwoStrings:compareTwoStrings,
	findBestMatch:findBestMatch
};

function compareTwoStrings(first, second) {
	first = first.replace(/\s+/g, '')
	second = second.replace(/\s+/g, '')

	if (first === second) return 1; // identical or empty
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	};

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

function findBestMatch(mainString, targetStrings) {
	if (!areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
	
	const ratings = [];
	let bestMatchIndex = 0;

	for (let i = 0; i < targetStrings.length; i++) {
		const currentTargetString = targetStrings[i];
		const currentRating = compareTwoStrings(mainString, currentTargetString)
		ratings.push({target: currentTargetString, rating: currentRating})
		if (currentRating > ratings[bestMatchIndex].rating) {
			bestMatchIndex = i
		}
	}
	
	
	const bestMatch = ratings[bestMatchIndex]
	
	return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
}

function areArgsValid(mainString, targetStrings) {
	if (typeof mainString !== 'string') return false;
	if (!Array.isArray(targetStrings)) return false;
	if (!targetStrings.length) return false;
	if (targetStrings.find( function (s) { return typeof s !== 'string'})) return false;
	return true;
}

},{}]},{},[1]);
