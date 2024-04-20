// import { f_removeChat } from "../admin.js";

import { showSuccessToast, showErrorToast } from "./toast.js";

export let socket = null;
export let customerID = null;

const modalBox = document.querySelector(".modal");
const overlayBox = modalBox.querySelector(".modal-overlay");
const loginBox = modalBox.querySelector(".login-box");
const createAccountBox = modalBox.querySelector(".create-account-box");
const forgotPassBox = modalBox.querySelector(".forgot-pass-box");
const registerCartBox = document.getElementById("form-register");
const registerCartBoxModal = modalBox.querySelector(".register-cart");
const cancelRECartBox = document.getElementById("form-cancel");
const changeNameBox = modalBox.querySelector(".change-name-box");
const changePassBox = modalBox.querySelector(".change-pass-box");


/* ACTIVE NECESSARY FORM  */
export function activeNecessaryForm() {
    modalBox.style.display = "flex";
    overlayBox.style.display = "block";
}
/* DISPLAY NONE ALL */
export function displayNoneAll() {
    modalBox.style.display = "none";
    overlayBox.style.display = "none";
    var a_modalBodyBox = modalBox.querySelectorAll(".modal__body__box");
    a_modalBodyBox = Array.from(a_modalBodyBox);
    a_modalBodyBox.map(value => value.style.display = "none");
}

export function removeAllInputValue() {
    var a_inputElement = modalBox.querySelectorAll("input");
    console.log(a_inputElement)
    a_inputElement = Array.from(a_inputElement);
    a_inputElement.map(element => {
        if (element.type == 'checkbox' || element.type == 'radio' || element.type == 'file')
            return;
        element.value = "";
    });
    var checkboxes = modalBox.querySelectorAll('input[type=checkbox]');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    var radios = modalBox.querySelectorAll('input[type=radio]');
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    var a_img = modalBox.querySelectorAll(".row__content__col img");
    a_img = Array.from(a_img);
    a_img.forEach(img => img.src = '');
}

export function activeLoginBox() {
    loginBox.style.display = 'block';
}


const titleNameE = document.querySelector(".chatbox__head__title");

const chatBoxMessage = document.querySelector('.chatbox__message');
let chatBoxList = null;
if (chatBoxMessage) {
    chatBoxList = chatBoxMessage.querySelector('.chatbox__message__list');
}

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

const hostCur = window.location.host;
// const pathMain = currentPath.split('/')[0];
function makeLiHide(value = "", option = "customer") {
    const chatBoxItem = document.createElement('div');
    if (value) {
        chatBoxItem.className = `message ${option}`;
        if (option == "admin") {
            // console.log(hostCur)
            var spanImg = document.createElement("span");
            spanImg.classList.add('admin-img');
            var imgElement = document.createElement("img");
            imgElement.src = 'http://' + hostCur + '/img/icon/closeAi.jpg';
            imgElement.alt = "";
            spanImg.appendChild(imgElement);
            chatBoxItem.appendChild(spanImg);

        }
        const textMessage = document.createElement('p');
        textMessage.className = 'message-text';
        textMessage.innerText = value;
        chatBoxItem.appendChild(textMessage);
    }
    return chatBoxItem;
}

export let maKHActive = "";

function f_clickChat(maKH, name, element) {
    // console.log("hello");
    maKHActive = maKH;
    chatBoxList.innerHTML = "";
    if (titleNameE)
        titleNameE.innerText = name;
    $.ajax({
        url: "/get-content-message",
        type: 'POST',
        data: { maKH: maKH },
        success: function (data) {
            if (data) {
                var a_value = data.value;
                a_value.forEach(value => {
                    var role = value.senderRole;
                    if (role == "admin") {
                        displayRightMessage(value.message);
                    } else if (role == "customer") {
                        displayLeftMessage(value.message);
                    }
                })
            }
        },
        error: function (err) {

        }
    });
    var nameElement = element.querySelector(".user-ifm-name");
    nameElement.style.fontWeight = 500;
}

export function createMessageBox(maKH, name, role, newMessage, seen) {
    // Tạo phần tử li mới
    var liElement = document.createElement('li');
    liElement.classList.add('msg-box');

    liElement.addEventListener("click", () => f_clickChat(maKH, name, liElement));

    // Tạo phần tử div.box-top
    var boxTopDiv = document.createElement('div');
    boxTopDiv.classList.add('box-top');

    // Tạo phần tử div.user-box
    var userBoxDiv = document.createElement('div');
    userBoxDiv.classList.add('user-box');

    // Tạo phần tử div.user-avt
    var userAvtDiv = document.createElement('div');
    userAvtDiv.classList.add('user-avt');

    // Tạo phần tử img.user-avt-img
    var userAvtImg = document.createElement('img');
    userAvtImg.setAttribute('src', './img/icon/ico-avt.png');
    userAvtImg.setAttribute('alt', '');

    // Thêm phần tử img vào div.user-avt
    userAvtDiv.appendChild(userAvtImg);

    // Tạo phần tử div.user-ifm
    var userIfmDiv = document.createElement('div');
    userIfmDiv.classList.add('user-ifm');

    // Tạo phần tử span.user-ifm-name
    var userIfmNameSpan = document.createElement('span');
    userIfmNameSpan.classList.add('user-ifm-name');
    userIfmNameSpan.textContent = name;
    if (!seen) {
        userIfmNameSpan.style.fontWeight = 700;
    }
    userIfmDiv.appendChild(userIfmNameSpan);


    // Tạo phần tử span.user-ifm-card
    var userIfmCardSpan = document.createElement('span');
    userIfmCardSpan.classList.add('user-ifm-card');
    userIfmCardSpan.textContent = 'MK: ';

    // Tạo phần tử span.user-ifm-card-number
    var userIfmCardNumberSpan = document.createElement('span');
    userIfmCardNumberSpan.classList.add('user-ifm-card-number');
    userIfmCardNumberSpan.textContent = maKH;
    userIfmCardSpan.style.display = "none";
    userIfmCardSpan.appendChild(userIfmCardNumberSpan);
    userIfmDiv.appendChild(userIfmCardSpan);


    // Tạo phần tử span.user-ifm-card
    var userIfmCardSpan = document.createElement('span');
    userIfmCardSpan.classList.add('user-ifm-card2');
    userIfmCardSpan.textContent = role + ': ';

    // Tạo phần tử span.user-ifm-card-number
    var userIfmCardNumberSpan = document.createElement('span');
    userIfmCardNumberSpan.classList.add('user-ifm-card-number2');
    userIfmCardNumberSpan.textContent = newMessage;

    // Thêm phần tử span.user-ifm-card-number vào span.user-ifm-card
    userIfmCardSpan.appendChild(userIfmCardNumberSpan);

    // Thêm phần tử span.user-ifm-name và span.user-ifm-card vào div.user-ifm
    userIfmDiv.appendChild(userIfmCardSpan);

    // Thêm div.user-avt và div.user-ifm vào div.user-box
    userBoxDiv.appendChild(userAvtDiv);
    userBoxDiv.appendChild(userIfmDiv);

    // Tạo phần tử div.more-option
    var moreOptionDiv = document.createElement('div');
    moreOptionDiv.classList.add('more-option');

    // Tạo phần tử button.more-option-bt
    var moreOptionButton = document.createElement('button');
    moreOptionButton.classList.add('more-option-bt');

    // Tạo phần tử ion-icon.more-option-bt-icon
    var moreOptionIcon = document.createElement('ion-icon');
    moreOptionIcon.classList.add('more-option-bt-icon');
    moreOptionIcon.setAttribute('name', 'ellipsis-horizontal-sharp');

    // Thêm phần tử ion-icon vào button.more-option-bt
    moreOptionButton.appendChild(moreOptionIcon);

    // Thêm button.more-option-bt vào div.more-option
    moreOptionDiv.appendChild(moreOptionButton);

    // Thêm div.user-box và div.more-option vào div.box-top
    boxTopDiv.appendChild(userBoxDiv);
    boxTopDiv.appendChild(moreOptionDiv);

    // Thêm div.box-top vào phần tử li
    liElement.appendChild(boxTopDiv);

    // Tạo phần tử div.box-bot
    var boxBotDiv = document.createElement('div');
    boxBotDiv.classList.add('box-bot');
    boxBotDiv.classList.add('bot-bar');

    // Tạo phần tử ul.bot-bar-menu
    var botBarMenuUl = document.createElement('ul');
    botBarMenuUl.classList.add('bot-bar-menu');

    // Tạo phần tử li.bot-bar-item
    var botBarItemLi = document.createElement('li');
    botBarItemLi.classList.add('bot-bar-item');

    // Tạo phần tử span.bot-bar-item-text
    var botBarItemTextSpan = document.createElement('span');
    botBarItemTextSpan.classList.add('bot-bar-item-text');
    botBarItemTextSpan.textContent = 'Xoá';

    // Tạo phần tử ion-icon.bot-bar-item-icon
    var botBarItemIcon = document.createElement('ion-icon');
    botBarItemIcon.classList.add('bot-bar-item-icon');
    botBarItemIcon.setAttribute('name', 'trash-sharp');

    // Thêm phần tử ion-icon vào span.bot-bar-item-text
    botBarItemTextSpan.appendChild(botBarItemIcon);

    botBarItemTextSpan.addEventListener("click", () => f_removeChat(maKH, liElement))

    // Thêm span.bot-bar-item-text vào li.bot-bar-item
    botBarItemLi.appendChild(botBarItemTextSpan);

    // Thêm li.bot-bar-item vào ul.bot-bar-menu
    botBarMenuUl.appendChild(botBarItemLi);

    // Thêm ul.bot-bar-menu vào div.box-bot
    boxBotDiv.appendChild(botBarMenuUl);

    // Thêm div.box-bot vào phần tử li
    liElement.appendChild(boxBotDiv);

    // Trả về phần tử li đã tạo
    return liElement;
}

export function activeEventClickBox(msgBox) {
    var msgBoxes = document.querySelectorAll('.msg-box');
    const moreOptionBtn = msgBox.querySelector('.more-option-bt');
    const boxBot = msgBox.querySelector('.box-bot');

    // Thêm sự kiện click vào more-option-bt
    moreOptionBtn.addEventListener('click', function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click từ more-option-bt lan toả lên các phần tử khác

        // Ẩn tất cả các box-bot trước khi hiển thị box-bot của msg-box hiện tại
        msgBoxes.forEach(box => {
            if (box !== msgBox) {
                box.querySelector('.box-bot').style.display = 'none';
            }
        });

        // Hiển thị hoặc ẩn box-bot tùy thuộc vào trạng thái hiện tại
        if (boxBot.style.display === 'none' || boxBot.style.display === '') {
            boxBot.style.display = 'block';
            // boxBot.style.animation = 'showtrash .5s ease-in-out forwards;';
        } else {
            boxBot.style.display = 'none';
        }

        // Xóa class active từ msg-box hiện tại và thêm vào msg-box được click
        activeMsgBox.classList.remove('active');
        msgBox.classList.add('active');
        activeMsgBox = msgBox; // Cập nhật msg-box hiện tại là msg-box được click
    });

    // Thêm sự kiện click vào msg-box để thêm class active và xóa class active từ msg-box hiện tại
    msgBox.addEventListener('click', function () {
        activeMsgBox.classList.remove('active');
        msgBox.classList.add('active');
        activeMsgBox = msgBox;
    });
}
let activeMsgBox;
function activeFunctionApp(activeFirst = true) {
    let msgBoxes = document.querySelectorAll('.msg-box');

    // Mặc định chọn msg-box đầu tiên và thêm class active
    activeMsgBox = msgBoxes[0];

    if (activeMsgBox) {
        if (activeFirst) {
            activeMsgBox.classList.add('active');
            activeMsgBox.click();
        }
        msgBoxes.forEach(msgBox => {
            const moreOptionBtn = msgBox.querySelector('.more-option-bt');
            const boxBot = msgBox.querySelector('.box-bot');

            // Thêm sự kiện click vào more-option-bt
            moreOptionBtn.addEventListener('click', function (event) {
                event.stopPropagation(); // Ngăn chặn sự kiện click từ more-option-bt lan toả lên các phần tử khác

                // Ẩn tất cả các box-bot trước khi hiển thị box-bot của msg-box hiện tại
                msgBoxes.forEach(box => {
                    if (box !== msgBox) {
                        box.querySelector('.box-bot').style.display = 'none';
                    }
                });

                // Hiển thị hoặc ẩn box-bot tùy thuộc vào trạng thái hiện tại
                if (boxBot.style.display === 'none' || boxBot.style.display === '') {
                    boxBot.style.display = 'block';
                    // boxBot.style.animation = 'showtrash .5s ease-in-out forwards;';
                } else {
                    boxBot.style.display = 'none';
                }

                // Xóa class active từ msg-box hiện tại và thêm vào msg-box được click
                activeMsgBox.classList.remove('active');
                msgBox.classList.add('active');
                activeMsgBox = msgBox; // Cập nhật msg-box hiện tại là msg-box được click
            });

            // Thêm sự kiện click vào msg-box để thêm class active và xóa class active từ msg-box hiện tại
            msgBox.addEventListener('click', function () {
                activeMsgBox.classList.remove('active');
                msgBox.classList.add('active');
                activeMsgBox = msgBox;
            });
        });

        // Thêm sự kiện click vào document để ẩn box-bot khi click bên ngoài msg-box
        document.addEventListener('click', function () {
            msgBoxes.forEach(box => {
                box.querySelector('.box-bot').style.display = 'none';
            });
        });
        document.querySelector('.box-bot').addEventListener('click', function (event) {
            event.stopPropagation();
        });
    }

}

const msgList = document.querySelector(".msg-list");

export function innerBoxMsg(data) {
    data.forEach(value => {
        if (msgList)
            msgList.appendChild(createMessageBox(value.maKH, value.name, value.senderRole, value.message, value.seen))
    });
    activeFunctionApp();
}

export function innerAloneMsg(value) {
    if (msgList)
        msgList.appendChild(createMessageBox(value.maKH, value.name, value.senderRole, value.message, value.seen))
    activeFunctionApp(false);
}
export function removeAllBoxMessage() {
    if (msgList)
        msgList.innerHTML = '';
}

export function replaceNullUndefinedWithEmptyString(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    for (let key in obj) {
        if (obj[key] === null || obj[key] === undefined) {
            obj[key] = '';
        }
    }
    return obj;
}

//
export function removeAccents(str) {
    var accents = 'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ';
    var accentsOut = "AAAAEEEIIOOOOUUADIUOaaaaeeeiioooouuadiuoUUAAEAEAAAAEEEEEIIIOOOOOUUUUYYYNuuAAEAEAAAAEEEEEIIIOOOOOUUUUYYYN";
    str = str.split('');
    var strLen = str.length;
    var i, x;
    for (i = 0; i < strLen; i++) {
        if ((x = accents.indexOf(str[i])) != -1) {
            str[i] = accentsOut[x];
        }
    }
    return str.join('');
}


function f_removeChat(maKH, liElement) {
    $.ajax({
        url: '/remove-chat',
        type: "POST",
        data: { maKH },
        success: function (data) {
            var success = data.success;
            if (success) {
                liElement.remove();
                showSuccessToast("Thành công", "đã xóa đoạn chat");
            } else {
                showErrorToast("Lỗi");
            }
        },
        error: function (err) {

        }
    })
}


// CHAT BOX
export function innerMesageBox(name) {
    const titleNameE = document.querySelector(".chatbox__head__title");
    if (titleNameE)
        titleNameE.innerText = name;
    if (chatBoxList)
        chatBoxList.innerHTML = "";
    $.ajax({
        url: '/get-customer-message',
        type: "GET",
        success: function (data) {
            if (data.success) {
                var a_value = data.value;
                a_value.forEach(value => {
                    var role = value.senderRole;
                    if (role == "admin") {
                        displayLeftMessage(value.message);
                    } else if (role == "customer") {
                        if (chatBoxList)
                            displayRightMessage(value.message);
                    }
                })
            }
        },
        error: function (err) {

        }
    });
}


export function displayRightMessage(message) {
    const chatBoxItemUser = makeLi(message, "chatbox__message__item__right");
    if (chatBoxList)
        chatBoxList.appendChild(chatBoxItemUser);
}
export function displayLeftMessage(message) {
    const chatBoxItemBot = makeLi(message, "chatbox__message__item__left");
    if (chatBoxList)
        chatBoxList.appendChild(chatBoxItemBot);
}
const chatHideBox = document.querySelector(".chat-box");
let msgListHide = null;
if (chatHideBox) {
    msgListHide = chatHideBox.querySelector(".chat-log");
}

export function scrollToBottom() {
    if (msgListHide)
        msgListHide.scrollTop = msgListHide.scrollHeight;
}

export function displayRightMessageHide(message) {
    const chatBoxItemUser = makeLiHide(message, "customer");
    if (msgListHide) {
        msgListHide.appendChild(chatBoxItemUser);
        scrollToBottom();
    }
}
export function displayLeftMessageHide(message) {
    const chatBoxItemBot = makeLiHide(message, "admin");
    if (msgListHide) {
        msgListHide.appendChild(chatBoxItemBot);
        scrollToBottom();
    }
}

export function loadHideMessage() {
    $.ajax({
        url: "/get-customer-message",
        type: 'GET',
        success: function (data) {
            if (data.success) {
                var a_value = data.value;
                a_value.forEach(value => {
                    var role = value.senderRole;
                    if (role == "admin") {
                        displayLeftMessageHide(value.message);
                    } else if (role == "customer") {
                        displayRightMessageHide(value.message);
                    }
                })
                scrollToBottom();
            } else {
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

export function removeHideMessage() {
    if (msgListHide)
        msgListHide.innerHTML = '';
}

export function sendMessage(message) {
    if (socket) {
        socket.emit('clientMessage', { text: message, id: customerID });
        return true;
    } else {
        console.log('You must be logged in to send a message');
        return false;
    }
}

export function removeMessageBox() {
    const titleNameE = document.querySelector(".chatbox__head__title");
    if (titleNameE)
        titleNameE.innerText = "....";
    if (chatBoxList)
        chatBoxList.innerHTML = "";
}

export function loginSocket(maKH) {
    socket = io();
    // socket = io({
    //     query: {
    //         token: true
    //     }
    // });
    customerID = maKH;
    socket.on('connect', () => {
        console.log('Connected to server');
    });
    // showSuccessToast("kết lối");
    socket.on('adminMessage', (data) => {
        if (customerID == data.maKH) {
            displayLeftMessage(data.message);
            displayLeftMessageHide(data.message);
        }
    });
    socket.on('response-message-client', (data) => {
        if (customerID == data.maKH) {
            displayRightMessage(data.message);
            displayRightMessageHide(data.message);
        }
    });
}

export function logoutSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
        customerID = null;
        // showSuccessToast("hủy kết nối");
        console.log('Disconnected from server');
    }
}


export function updateRowShop(dataObj, editRow, flag = false) {
    var cellIndex = 0;
    console.log("//////////////// ");
    console.log(dataObj)
    editRow.map((cell, index) => {
        var className = cell.className;
        if (index > 6) return;

        if (index == 0 || index == 1)
            cell.querySelector('label').style.display = 'none';

        if (flag) {
            console.log(flag)
            if (index == 0 || index == 1) {
                // cell.querySelector('label').style.display = 'none';
                // console.log(cell.querySelector('label').style.display);
                if (dataObj[className]) {
                    cell.textContent = '';
                    var imgE = document.createElement('img');
                    imgE.className = "show_main_img";
                    imgE.src = "" || dataObj[className];
                    cell.appendChild(imgE);

                    // cell.innerHTML = `<img class="show_main_img" src="${dataObj[className]}" alt="">`; // Điền dữ liệu vào ô
                    var inputChange = document.createElement('input');
                    inputChange.type = 'file';
                    inputChange.id = 'input' + className + index;
                    var lableTag = document.createElement('label');
                    lableTag.innerText = 'Thay ảnh';
                    lableTag.htmlFor = 'input' + className + index;
                    lableTag.style.display = 'none';
                    inputChange.style.display = 'none';
                    inputChange.addEventListener('change', function (img) {
                        return function (event) {
                            changeFileInput(event, img);
                        };
                    }(imgE));
                    cell.appendChild(inputChange);
                    cell.appendChild(lableTag);
                }
                console.log(cell.querySelector('label'));
            }
            else {
                return;
            }
        }
        else {
            if (index == 0 || index == 1) {
                return;
            }
            else {
                cell.innerHTML = "";
                if (dataObj[className])
                    cell.textContent = dataObj[className];
            }
        }
    })

}

//"change"  input file

export function changeFileInput(event, imgE) {
    console.log(imgE)
    // Kiểm tra xem có tệp nào được chọn hay không
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        // Đọc tệp tin hình ảnh
        reader.onload = function (e) {
            imgE.src = e.target.result;
            imgE.style.display = 'block'; // Hiển thị thẻ <img>
        };

        // Đọc dữ liệu từ tệp tin hình ảnh dưới dạng URL dữ liệu
        reader.readAsDataURL(event.target.files[0]);
    }
}




export function updateRowShop2(dataObj, editRow) {
    console.log(dataObj);
    for (var i = 0; i < editRow.length; i++) {
        editRow[i].innerHTML = ""; // Xóa nội dung hiện có của ô
        if (i === 0 || i === 1) {
            var imgTag = document.createElement('img');
            imgTag.className = 'show_main_img';
            imgTag.src = dataObj[`field${i}`]; // Sử dụng template literal để truy cập vào field tương ứng
            imgTag.alt = '';
            editRow[i].appendChild(imgTag);

            var inputChange = document.createElement('input');
            inputChange.type = 'file';
            inputChange.id = `inputfield${i}${i}`;
            var labelTag = document.createElement('label');
            labelTag.innerText = 'Thay ảnh';
            labelTag.htmlFor = `inputfield${i}${i}`;
            labelTag.style.display = 'none';
            inputChange.style.display = 'none';
            editRow[i].appendChild(inputChange);
            editRow[i].appendChild(labelTag);
        } else {
            editRow[i].innerText = dataObj[`field${i}`]; // Sử dụng template literal để truy cập vào field tương ứng
        }
        editRow[i].classList.add(`field${i}`); // Thêm class tương ứng
    }
}


export function updateRowTable(cells, data) {

}

export function editDate(dateValue) {
    let date = new Date(dateValue);
    date.setUTCHours(24, 0, 0, 0);
    let roundedDate = date.toISOString().split('T')[0];
    console.log(roundedDate);
    return roundedDate;
}


export function hidenLoginBox() {
    displayNoneAll();
    activeNecessaryForm();
    activeLoginBox();
}

export function plusMinusItemCart(inputCountItem, ItemID, Cost, costAll, totalCartShow, type) {
    costAll.innerHTML = `
    ${(Cost * inputCountItem.value).toLocaleString()}
    <span>
        ₫
    </span>
    `
    var totalCart = totalCartShow.querySelector('.total__cart')
    var totalValue = totalCart.innerHTML.replace(/[,.₫]/g, '');
    console.log(totalValue);
    if(type == 'plus'){
        var one = 1;
    }if(type == 'minus'){
        var one = -1;
    }
    totalCart.innerHTML =  (parseInt(totalValue)  + parseInt(Cost) * one).toLocaleString() + '₫';
    $.ajax({
        url: '/plus-minus-item-cart',
        method: 'POST',
        data: { ItemID, Count: inputCountItem.value },
        success: function (res) {
            if (!res.login) {
                showErrorToast("Chưa đăng nhập vào hệ thống", "");
            }
        },
        error: function (err) {
            console.error(err);
        }
    })
}