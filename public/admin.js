import {
    displayLeftMessage,
    displayRightMessage,
    innerBoxMsg,
    maKHActive
} from "./src/function.js";



// let socket = io();

// // send message to admin
// function sendMessage(message) {
//     var data = {
//         senderRole: "admin",
//         message: message
//     }
//     socket.emit('chatMessage', data);
// }

// socket.on('messageData', function (data, name) {

//     if (data.length > 0) {
//         for (var i = 0; i < data.length; i++) {
//             // console.log("messageID:", data[i].messageID);
//             // console.log("maKH:", data[i].maKH);
//             if (data[i].senderRole == "admin") {
//                 displayRightMessage(data[i].message);
//             } else if (data[i].senderRole == "customer") {
//                 displayLeftMessage(data[i].message);
//             }
//             // console.log("senderRole:", data[i].senderRole);
//             // console.log("message:", data[i].message);
//             // console.log("-------------------------------");
//         }
//     } else {
//         console.log("Không có dữ liệu phù hợp.");
//     }
// });


// socket.on('chatMessage', function (msg, maKH) {
//     if (msg && maKH == maKHActive) {
//         displayLeftMessage(msg);
//     }
//     //  else {
//     //     showErrorToast("Quý khách chưa đăng nhập", "Vui lòng đăng nhập vào hệ thống");
//     //     displayNoneAll();
//     //     activeNecessaryForm();
//     //     f_loginBTN();
//     // }
// });

const inputBox = document.querySelector('.chatbox__bottom__input');
const inputElement = inputBox.querySelector('textarea');
const sendButton = document.querySelector('.chatbox__bottom__send i');

sendButton.addEventListener('click', async () => {
    const valueInput = inputElement.value.trim();
    sendMessage(maKHActive, valueInput);
    inputElement.value = "";
});

inputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
});

$(document).ready(function () {
    $.ajax({
        url: '/get-box-message',
        type: "GET",
        success: function (data) {
            innerBoxMsg(data.value);
        },
        error: function (err) {

        }
    });
})

const socket = io();

// Hàm gửi tin nhắn từ admin đến server
function sendMessage(maKH, message) {
    console.log(message);
    socket.emit('admin-message', { maKH, message });
}

// Sự kiện nhận tin nhắn từ server và hiển thị nó
socket.on('client-message', (data) => {
    // data.maKH
    console.log("message:", message);
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<p>Client: ${data.message}</p>`;
});

// Sự kiện nhận tin nhắn từ client và hiển thị nó
socket.on('admin-message', (data) => {
    if (maKHActive == data.maKH)
        displayLeftMessage(data.message);

    var a_listMessage = document.querySelectorAll(".msg-box");
    a_listMessage = Array.from(a_listMessage);
    a_listMessage.forEach(value => {
        var valueMaKH = value.querySelector(".user-ifm-card-number").innerText;
        if (valueMaKH == data.maKH && maKHActive != data.maKH) {
            var parentElement = value.parentNode;
            parentElement.insertBefore(value, parentElement.firstChild);
            var nameElement = value.querySelector(".user-ifm-name");
            nameElement.style.fontWeight = 700;
        }
    })
});

// Gửi thông tin admin khi trang được tải
socket.emit('admin-connect', "AD0001");

// Tính năng chọn khách hàng để gửi tin nhắn
function selectClient(clientId) {
    document.getElementById('clientIdInput').value = clientId;
}




// find chatbox

const boxList = document.querySelector('.msg-list');


var searchChatInput = document.getElementById("searchInput");
searchChatInput.addEventListener("input", function(){
    var inputValue = this.value.toLowerCase();
    var a_chatbox = boxList.querySelectorAll(".msg-box");
    a_chatbox = Array.from(a_chatbox);
    a_chatbox.forEach(element=>{
        element.style.display = "flex";
        var name = element.querySelector(".user-ifm-name").innerText.toLowerCase();
        var id = element.querySelector(".user-ifm-card-number").innerText.toLowerCase();
        if(!(name.includes(inputValue) || id.includes(inputValue))){
            element.style.display = "none";
        }
    })
})