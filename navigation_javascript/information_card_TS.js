import { loadData } from './loadData.js';

loadData();

import { toast, showSuccessToast, showErrorToast } from './toast.js';
document.cookie = "loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/navigation;";

// Lấy các phần tử cần thiết từ DOM
const viewTermsLink = document.querySelector('.rules__group__title__content');
const rulesContent = document.querySelector('.rules__group__content');
const hideButton = document.querySelector('.button__hide__terms__of__use');

// Xử lý sự kiện khi click vào 'Xem điều khoản sử dụng'
if (viewTermsLink)
    viewTermsLink.addEventListener('click', function () {
        rulesContent.style.display = 'flex'; // Hiển thị nội dung
    });

// Xử lý sự kiện khi click vào nút 'Xác nhận'
if (hideButton)
    hideButton.addEventListener('click', function () {
        rulesContent.style.display = 'none'; // Ẩn nội dung
    });

var nightmodebt = document.querySelector('.night__mode__button');
var nen = document.querySelector('.container');

function nightmode(event) {
    if (nightmodebt.style.background === 'rgb(34, 34, 34)' || nightmodebt.style.background === '') {
        nen.style.background = '#111';
        nen.style.color = 'rgb(255, 255, 255)';
        nightmodebt.style.background = 'white';
        nightmodebt.style.color = 'rgb(34, 34, 34)';
    }
    else {
        nen.style.background = 'white';
        nen.style.color = 'rgb(0, 0, 0)';
        nightmodebt.style.background = 'rgb(34, 34, 34)';
        nightmodebt.style.color = 'whitesmoke';
    }
}
if (nightmodebt)
    nightmodebt.addEventListener('click', nightmode);



var buttonregistration = document.querySelector('#button1');
var xregistration = document.querySelector('.x__cancel');
var formregistration = document.querySelector('.form1');
var buttonsendrequest = document.querySelector('.button__form');
var cancelCalendarBTN = document.getElementById("button2")
// buttonregistration.addEventListener('click', function () {
//     if (cookie) {
//         formregistration.style.display = 'flex';
//     } else {
//         showErrorToast("Thất bại", "Vui lòng đăng nhập để sử dụng chức năng này")
//     }
// })

if (xregistration)
    xregistration.addEventListener('click', function () {
        formregistration.style.display = 'none';
    })
// init


let nameElement = document.querySelector(".card__holder__content");
let idElement = document.querySelector(".id__card__content");
let typeElement = document.querySelector(".card__type__content__link");
let startElement = document.querySelector(".card__registration__date__content");
let endElement = document.querySelector(".card__expiration__date__content");
// value
let cardData = JSON.parse(localStorage.getItem('cardData'));
let accountData = JSON.parse(localStorage.getItem('loginData'));
let calendarData = JSON.parse(localStorage.getItem('calendarData'));

const cookie = document.cookie.split('; ').find(
    row => row.startsWith('loggedInUser'));

let loggedInUser;
if (cookie)
    for (let i = 0; i < cookie.length; i++) {
        if (cookie[i].startsWith('loggedInUser') && cookie[i].includes('path=/')) {
            loggedInUser = cookie[i];
            // console.log(loggedInUser)
            break;
        }
    }


if (!accountData) {

} else {
    if (cookie) {
        loggedInUser = JSON.parse(cookie.split('=')[1]); // Lấy thông tin người dùng từ cookie và chuyển nó thành đối tượng
        console.log(loggedInUser)
        var test = false;
        cardData.cards.map(value => {
            if (value.id == loggedInUser.id) {
                // do
                showInformation(value);
                test = true;
            }
        })
        if (!test)
            accountData.accounts.map(value => {
                if (value.id == loggedInUser.id) {
                    // do
                    showInformation(value, "account")
                }
            })


        calendarData.calendars.map(value => {
            if (value.id == loggedInUser.id) {
                // do
                loadInforCalendar(value);
            }
        })
    }
}

function showInformation(value, type = "card") {
    if (nameElement && idElement) {
        nameElement.innerText = value.name;
        idElement.innerText = value.id;
        if (type != "account") {
            typeElement.innerText = value.cardType;
            startElement.innerText = value.dateStart;
            endElement.innerText = value.dateEnd;

            var cardImg = document.querySelector(".card-img");
            if (value.cardType == "BEGINNER") {
                cardImg.src = "../img/card/beginner.png";
            } else if (value.cardType == "BASIC") {
                cardImg.src = "../img/card/basic.png";
            } else if (value.cardType == "ADVANCE") {
                cardImg.src = "../img/card/advance.png";
            }
        }
    }


}

const registerBTN = document.getElementById("button1");
let submitRegister = document.querySelector(".button__form");
let cube = document.querySelectorAll(".cube");
if (cube)
    cube = Array.from(cube);
if (registerBTN)
    registerBTN.addEventListener("click", f_mainRegister);
if (cube)
    cube.map(value => {
        value.addEventListener("click", () => {
            var cookie = document.cookie.split('; ').find(row => row.startsWith('loggedInUser'));
            var modalBox = document.querySelector(".modal");
            var modalBody = modalBox.querySelector(".modal__body");
            modalBox.style.display = "flex"
            if (cookie) {
                var bodyBox = modalBox.querySelector(".form1");
                bodyBox.style.padding = "0"
                bodyBox.style.boxShadow = "none";
                bodyBox.style.display = "flex";
                modalBody.style.display = "flex"
                bodyBox.style.backgroundColor = "transparent";
            } else {
                var loginBox = document.querySelector(".login-box");
                loginBox.style.display = "block";
            }
            f_mainRegister();
        }
        );
    })

function f_mainRegister() {
    var cookie = document.cookie.split('; ').find(row => row.startsWith('loggedInUser'));

    if (cookie) {
        var test = false;
        var loggedInUser = JSON.parse(cookie.split('=')[1]); // Lấy thông tin người dùng từ cookie và chuyển nó thành đối tượng
        calendarData.calendars.map(value => {
            if (value.date && value.id == loggedInUser.id) {
                console.log(value.date)
                test = true;
            }
        })
        if (!test) {
            formregistration.style.display = 'flex';
            submitRegister.addEventListener("click", f_submitRegister)
        }

        else {

            var modalBox = document.querySelector(".modal");
            if (modalBox) modalBox.style.display = "none";
            showErrorToast("Xin lỗi", "Bạn đã đăng ký dịch vụ của chúng tôi trước đó");
        }
    } else {
        showErrorToast("Thất bại", "Vui lòng đăng nhập")
    }
}

function f_submitRegister() {
    var cookie = document.cookie.split('; ').find(row => row.startsWith('loggedInUser'));
    var loggedInUser = JSON.parse(cookie.split('=')[1]); // Lấy thông tin người dùng từ cookie và chuyển nó thành đối tượng
    var inputs = document.getElementsByName('card');
    var card;
    for (var i = 0; i < inputs.length; i++) {
        // Kiểm tra xem thẻ input nào đang được chọn
        if (inputs[i].checked) {
            // Lấy id của thẻ input đang được chọn
            var id = inputs[i].id;

            // Sử dụng id để lấy thẻ label tương ứng
            var label = document.querySelector('label[for="' + id + '"]');

            // In ra giá trị của thẻ label
            //   console.log(label.innerText);
            card = label.innerText
        }
    }

    var inputs = document.getElementsByName('weekday');
    var a_week = [];
    for (var i = 0; i < inputs.length; i++) {
        // Kiểm tra xem thẻ input nào đang được chọn
        if (inputs[i].checked) {
            // Lấy id của thẻ input đang được chọn
            var id = inputs[i].id;

            // Sử dụng id để lấy thẻ label tương ứng
            var label = document.querySelector('label[for="' + id + '"]');

            // In ra giá trị của thẻ label
            //   console.log(label.innerText);
            a_week.push(label.innerText)
        }
    }

    var time = "";
    inputs = document.getElementsByName('time');
    for (var i = 0; i < inputs.length; i++) {
        // Kiểm tra xem thẻ input nào đang được chọn
        if (inputs[i].checked) {
            // Lấy id của thẻ input đang được chọn
            var id = inputs[i].id;

            // Sử dụng id để lấy thẻ label tương ứng
            var label = document.querySelector('label[for="' + id + '"]');

            // In ra giá trị của thẻ label
            //   console.log(label.innerText);
            time = label.innerText;
        }
    }
    var type = ""
    inputs = document.getElementsByName('type');
    for (var i = 0; i < inputs.length; i++) {
        // Kiểm tra xem thẻ input nào đang được chọn
        if (inputs[i].checked) {
            // Lấy id của thẻ input đang được chọn
            var id = inputs[i].id;

            // Sử dụng id để lấy thẻ label tương ứng
            var label = document.querySelector('label[for="' + id + '"]');

            // In ra giá trị của thẻ label
            //   console.log(label.innerText);
            type = label.innerText;
        }
    }
    if (time)
        time = time.split("-");
    console.log(time)
    var note = document.querySelector(".row__content__input").value;
    if (isValidValue(card, a_week, time, type)) {
        var flag = false;
        calendarData.calendars.map(value => {
            if (value.id == loggedInUser.id) {
                value.date = a_week.toString();
                value.timeStart = time[0];
                value.timeEnd = time[1];
                value.type = type;
                value.ptName = "Truong Co Bap";
                value.note = "Chưa thanh toán";
                flag = true;
            }
        })
        if (!flag) {
            var data = {
                id: loggedInUser.id,
                name: loggedInUser.name,
                date: a_week.toString(),
                timeStart: time[0],
                timeEnd: time[1],
                type: type,
                ptName: "Truong Co Bap",
                note: "Chưa thanh toán"
            }
            calendarData.calendars.push(data);
        }
        flag = false;
        console.log(calendarData)
        localStorage.setItem("calendarData", JSON.stringify(calendarData));

        // save to card data
        cardData = JSON.parse(localStorage.getItem('cardData'));

        var date = new Date();
        var day = date.getDate().toString().padStart(2, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are 0-based
        var year = date.getFullYear();
        var dateNow = day + '/' + month + '/' + year;

        if (card == "BEGINNER")
            var end = addMonthsAndGetDate(1);
        if (card == "BASIC")
            var end = addMonthsAndGetDate(2);
        if (card == "ADVANCE")
            var end = addMonthsAndGetDate(3);

        // innerTexxt


        typeElement = card;
        startElement = dateNow;
        endElement = end;
        // data card
        cardData.cards.map(value => {
            if (value.id == loggedInUser.id) {
                flag = true;
                value.cardType = card;
                value.dateStart = dateNow;
                value.dateEnd = end;
            }

        })
        if (!flag) {
            var data = {
                id: loggedInUser.id,
                name: loggedInUser.name,
                age: "",
                phoneNumber: "",
                cardType: card,
                dateStart: dateNow,
                dateEnd: end,
            }
            cardData.cards.push(data);
        }
        flag = false;
        localStorage.setItem("cardData", JSON.stringify(cardData));

        // show
        calendarData.calendars.map(value => {
            if (value.id == loggedInUser.id) {
                loadInforCalendar(value);
            }
        })
        // successesfulll

        showSuccessToast("Thành công", "Đăng ký lịch tập thành công, cảm ơn đã sử dụng dịch vụ");
        formregistration.style.display = 'none';
        removeChecked("card");
        removeChecked("weekday");
        removeChecked("time");
        removeChecked("type");
        document.querySelector(".row__content__input").value = "";

        var modalBox = document.querySelector(".modal");
        var bodyBox = modalBox.querySelector(".form1");
        if (modalBox) modalBox.style.display = "none";
        submitRegister.removeEventListener("click", f_submitRegister);
    }
}

function isValidValue(card, a_week, time, type) {
    if (!card) {
        showErrorToast("Thất bại", "Vui lòng chọn loại thẻ");
        return false;
    } else if (a_week.length == 0) {
        showErrorToast("Thất bại", "Vui lòng chọn ngày tập mong muốn");
        return false;
    } else if (!time) {
        showErrorToast("Thất bại", "Vui lòng chọn thời gian");
        return false;
    } else if (!type) {
        showErrorToast("Thất bại", "Vui lòng chọn môn");
        return false;
    }
    return true;
}


function removeChecked(type) {
    var inputs = document.getElementsByName(type);

    // Duyệt qua tất cả các thẻ input
    for (var i = 0; i < inputs.length; i++) {
        // Bỏ chọn thẻ input
        inputs[i].checked = false;
    }
}


function addMonthsAndGetDate(months) {
    var date = new Date();
    date.setMonth(date.getMonth() + months);
    var day = date.getDate().toString().padStart(2, '0');
    var month = (date.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are 0-based
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
}


function loadInforCalendar(value) {
    var trainingBox = document.querySelector(".training__schedule--calendar");
    var a_date = value.date;
    a_date = a_date.replaceAll("T", "");
    a_date = a_date.split(",");
    console.log(a_date)
    // return;
    if (a_date[0] != "")
        for (var i = 0; i < a_date.length; i++) {
            var tableElement = document.createElement("div");
            tableElement.classList.add("table");
            tableElement.innerHTML = `
                            <div id="training-schedule" class="first__training__schedule">
                                <div class="row">
                                    <div class="row__title">
                                        Ngày:
                                    </div>
                                    <div class="row__content">
                                        Thứ ${a_date[i]}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="row__title">
                                        Thời gian:
                                    </div>
                                    <div class="row__content">
                                        ${value.timeStart + "-" + value.timeEnd}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="row__title">
                                        Môn:
                                    </div>
                                    <div class="row__content">
                                        ${value.type}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="row__title">
                                        Huấn luyện viên:
                                    </div>
                                    <div class="row__content">
                                        ${value.ptName}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="row__title">
                                        Ghi chú: 
                                    </div>
                                    <div class="row__content">
                                        ....
                                    </div>
                                </div>
                            </div>

                            `
            if (trainingBox)
                trainingBox.appendChild(tableElement);
        }

}
const xCancel2 = document.querySelector(".x__cancel2");
if (xCancel2)
    xCancel2.addEventListener("click", function () {
        form2.style.display = "none";
    })

// huỷn lịch tập
let submitCancel = document.querySelector(".button__form__cancel");
if (cancelCalendarBTN)
    cancelCalendarBTN.addEventListener("click", function () {
        if (cookie) {
            calendarData = JSON.parse(localStorage.getItem('calendarData'));
            var test = false;
            calendarData.calendars.map(value => {
                if (value.id == loggedInUser.id && value.date) {
                    test = true;
                }
            })
            if (test) {
                var form2 = document.getElementById("form2");
                form2.style.display = "flex";

                submitCancel.addEventListener("click", f_summitCancel);
            } else {
                showErrorToast("Thất bại", "Bạn chưa đăng ký lịch tập")
            }
        } else {
            showErrorToast("Thất bại", "Vui lòng đăng nhập")
        }
    })

function f_summitCancel() {

    calendarData.calendars.map(value => {
        if (value.id == loggedInUser.id) {
            value.date = "";
            value.timeStart = "";
            value.timeEnd = "";
            value.type = "";
            value.ptName = "";
            value.note = "";
        }
    })
    cardData = JSON.parse(localStorage.getItem('cardData'));

    cardData.cards.map(value => {
        if (value.id == loggedInUser.id) {
            value.cardType = "";
            value.dateStart = "";
            value.dateEnd = "";
        }
    })

    localStorage.setItem("calendarData", JSON.stringify(calendarData));
    localStorage.setItem("cardData", JSON.stringify(cardData));

    var trainingBox = document.querySelector(".training__schedule--calendar");
    trainingBox.innerHTML = ""
    form2.style.display = "none";
    showSuccessToast("Thành công", "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi");
    submitCancel.removeEventListener("click", f_summitCancel);

}

const btnExitCancel = document.querySelector(".button__form__exit");
if (btnExitCancel)
    btnExitCancel.addEventListener("click", function () {
        form2.style.display = "none";
    })