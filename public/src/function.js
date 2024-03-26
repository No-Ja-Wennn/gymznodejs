
const titleNameE = document.querySelector(".chatbox__head__title");

const chatBoxMessage = document.querySelector('.chatbox__message');
const chatBoxList = chatBoxMessage.querySelector('.chatbox__message__list');

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
export function displayRightMessage(message) {
    const chatBoxItemUser = makeLi(message, "chatbox__message__item__right");
    chatBoxList.appendChild(chatBoxItemUser);
}
export function displayLeftMessage(message) {
    const chatBoxItemBot = makeLi(message, "chatbox__message__item__left");
    chatBoxList.appendChild(chatBoxItemBot);
}

export let maKHActive = "";

function f_clickChat(maKH, name, element) {
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

function createMessageBox(maKH, name) {
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

    // Tạo phần tử span.user-ifm-card
    var userIfmCardSpan = document.createElement('span');
    userIfmCardSpan.classList.add('user-ifm-card');
    userIfmCardSpan.textContent = 'MT: ';

    // Tạo phần tử span.user-ifm-card-number
    var userIfmCardNumberSpan = document.createElement('span');
    userIfmCardNumberSpan.classList.add('user-ifm-card-number');
    userIfmCardNumberSpan.textContent = maKH;

    // Thêm phần tử span.user-ifm-card-number vào span.user-ifm-card
    userIfmCardSpan.appendChild(userIfmCardNumberSpan);

    // Thêm phần tử span.user-ifm-name và span.user-ifm-card vào div.user-ifm
    userIfmDiv.appendChild(userIfmNameSpan);
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

function activeFunctionApp() {
    const msgBoxes = document.querySelectorAll('.msg-box');

    // Mặc định chọn msg-box đầu tiên và thêm class active
    let activeMsgBox = msgBoxes[0];
    activeMsgBox.classList.add('active');
    activeMsgBox.click();
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

const msgList = document.querySelector(".msg-list");

export function innerBoxMsg(data) {
    data.forEach(value => {
        msgList.appendChild(createMessageBox(value.maKH, value.name))
    });
    activeFunctionApp();
}