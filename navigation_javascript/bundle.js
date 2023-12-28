(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
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


sendButton.addEventListener('click', () => {
    const valueInput = inputElement.value.trim();
    if (valueInput) {
        displayUserMessage(valueInput);

        loadKnowledgeBase(function (knowledgeBase) {
            const bestMatch = findBestMatch(valueInput, knowledgeBase.questions);
            let answer = "Xin lỗi, tôi chưa thể trả lời câu hỏi này.";
            if (bestMatch && bestMatch.answer) {
                answer = bestMatch.answer;
            }
            displayBotMessage(answer);
        }); 
        
        inputElement.value = '';
    }
});

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


// function getCloseMatches(userInput, questions, n, cutoff) {
//     var matches = [];
//     // convert all to lower
//     userInput = userInput.toLowerCase();
//     questions.forEach(question => {
//         question.question = question.question.toLowerCase();
//     });
//     // compear
//     for (var i = 0; i < questions.length; i++) {
//         var question = questions[i];
//         var similarity = stringSimilarity.compareTwoStrings(userInput, question.question); // Sử dụng stringSimilarity để tính toán độ tương đồng
//         console.log(question, ": ",similarity)
//         if (similarity >= cutoff) {
//             matches.push(question);
//             if (matches.length >= n) {
//                 break;
//             }
//         }
//     }
//     return matches;
// }

function jaccardSimilarity(question, userInput) {
    let questionSet = new Set(question.split(' '));
    let userInputSet = new Set(userInput.split(' '));
    let intersection = new Set([...questionSet].filter(x => userInputSet.has(x)));
    return intersection.size / (questionSet.size + userInputSet.size - intersection.size);
}

function getCloseMatches(userInput, questions, n, cutoff) {
    var matches = [];
    // convert all to lower
    userInput = userInput.toLowerCase();
    questions.forEach(question => {
        question.question = question.question.toLowerCase();
    });
    // compare
    for (var i = 0; i < questions.length; i++) {
        var question = questions[i];
        var similarity = jaccardSimilarity(userInput, question.question);
        console.log(question, ": ",similarity)
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
    const matches = getCloseMatches(userQuestion, questions, 1, 0.5);
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

},{"fs":1,"string-similarity":3}],3:[function(require,module,exports){
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

},{}]},{},[2]);
