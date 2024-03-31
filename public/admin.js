import {
    activeEventClickBox,
    activeNecessaryForm,
    createMessageBox,
    displayLeftMessage,
    displayNoneAll,
    displayRightMessage,
    innerBoxMsg,
    maKHActive,
    removeAccents
} from "./src/function.js";
import { showErrorToast, showSuccessToast } from "./src/toast.js";
import { validateAdminAddAcc, validateAdminAddCalendar, validateAdminAddCard } from "./src/validate.js";


/*====== LOGIN =====*/
const modalBox = document.querySelector(".modal");
const overlayBox = document.querySelector(".modal-overlay");
const loginBox = document.querySelector(".login-box");



const accountTable = document.getElementById("accountTable");
const cardPage = document.getElementById("cardTable");
const calendarPage = document.getElementById("calendarTable");


function affterLogin(data) {
    adminName.innerText = data.username;
    showSuccessToast("Đăng nhập thành công")
    displayNoneAll();
}

let accessRights = null;

function checkCookieAdmin() {
    $.ajax({
        url: '/get-login-admin',
        type: 'get',
        success: function (data) {
            if (data) {
                return data.success;
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}
console.log(checkCookieAdmin())

$.ajax({
    url: '/get-login-admin',
    type: 'get',
    success: function (data) {
        console.log(data);
        if (data.success) {
            affterLogin(data);
            userToken(data.username)
        } else {
            displayNoneAll();
            activeNecessaryForm();
            loginBox.style.display = "block";
        }
    },
    error: function (err) {

    }
})

function validValueAdminLogin() {
    return true;
}

const adminName = document.querySelector(".nav-admin-ifm-name");

$('#login-admin-form').submit(function (e) {
    e.preventDefault();
    if (validValueAdminLogin())
        $.ajax({
            url: '/login-admin-url',
            type: 'POST',
            data: $(this).serialize(),
            success: function (data) {
                if (data.success) {
                    affterLogin(data);
                    userToken(data.username)
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
})






const msgNav = document.getElementById("QLMessage");
const accountNav = document.getElementById("QLAccount");
const cardNav = document.getElementById("QLCard");
const calendarNav = document.getElementById("QLCalendar");

// test jwt

/*
$.ajax({
    url: '/login-test',
    type: 'POST',
    data: {username: "holiut"},
    success: function(data){
        console.log(data)
    },
    error: function(err){
        
    }
})

const YOUR_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhvbGl1dCIsImlhdCI6MTcxMTcwMjUwMSwiZXhwIjoxNzExNzAyNTQxfQ.MYBvVQfJmxNb6MfFddy3bNMv_RyeR5zAu_MNcELFHT8"
$.ajax({
    url: "/get-book",
    type: 'GET',
    headers: {
        'Authorization': 'Bearer ' + YOUR_TOKEN
    },
    success: function(data){
        console.log(data);
    },
    error: function(err){
        console.log(err);
    }
})
*/

function sendRequest(url, method, headers, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        headers: headers,
        data: data,
        success: successCallback,
        error: errorCallback
    });
}

function userToken(username) {
    $.ajax({
        url: '/post-user-token',
        type: 'POST',
        data: { username },
        success: function (data) {
            console.log(data);
            const { accessToken, refreshToken } = data;
            // Lưu trữ refresh token
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('accessToken', accessToken);
            // useAccessToken(accessToken);
        },
        error: function (err) {
            console.error(err);
        }
    });
}

// function useAccessToken(accessToken) {
//     $.ajax({
//         url: "/get-book",
//         type: 'GET',
//         headers: {
//             'Authorization': 'Bearer ' + accessToken
//         },
//         success: function (data) {
//             console.log(data);
//         },
//         error: function (err) {
//             console.log(err);
//             if (err.status === 403) {
//                 // Nếu access token hết hạn, sử dụng refresh token để lấy access token mới
//                 const refreshToken = localStorage.getItem('refreshToken');
//                 $.ajax({
//                     url: '/refresh-token',
//                     type: 'POST',
//                     data: { token: refreshToken },
//                     success: function (data) {
//                         const { accessToken } = data;
//                         // Sử dụng access token mới để gọi lại API
//                         useAccessToken(accessToken);
//                     },
//                     error: function (err) {
//                         console.log(err);
//                     }
//                 });
//             }
//         }
//     });
// }


function isLoggedIn() {
    const refreshToken = localStorage.getItem('refreshToken');
    return refreshToken !== null;
}

// $('#yourElementId').click(function() {
//     if (!isLoggedIn()) {
//         alert("Vui lòng đăng nhập để lấy sách!");
//     } else {
//         getBook();
//     }
// });


// function getBook() {
//     sendRequest("/get-book", 'GET', null,
//         function (data) {
//             console.log(data);
//         },
//         function (err) {
//             console.error(err);
//             if (err.status === 403) {
//                 const refreshToken = localStorage.getItem('refreshToken');
//                 sendRequest('/refresh-token', 'POST', { token: refreshToken },
//                     function (data) {
//                         const { accessToken } = data;
//                         useAccessToken(accessToken);
//                     },
//                     function (err) {
//                         console.error(err);
//                     }
//                 );
//             }
//         }
//     );
// }




/* ===== CHAT // GET MESSAGE ===== */


$(document).ready(function () {
    $.ajax({
        url: '/get-box-message',
        type: "GET",
        success: function (data) {
            // console.log(data);
            innerBoxMsg(data.value);
        },
        error: function (err) {

        }
    });
})

const socket = io();
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('response-message-admin', (message) => {
    displayRightMessage(message);
});

socket.on('clientMessage', (data) => {
    // console.log(maKHActive)
    if (data.maKH == maKHActive)
        displayLeftMessage(data.message);
    activeNewMessage(data.maKH, data.name, data.senderRole, data.message);
});

function sendMessage(message) {
    socket.emit('adminMessage', { text: message, id: maKHActive });
}

const inputBox = document.querySelector('.chatbox__bottom__input');
const inputElement = inputBox.querySelector('textarea');
const sendButton = document.querySelector('.chatbox__bottom__send i');

sendButton.addEventListener('click', async () => {
    const valueInput = inputElement.value.trim();
    if (valueInput != '') {
        sendMessage(valueInput);
        inputElement.value = '';
    }
});

inputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
});


function updateNewMessage(element, message) {
    var newMessageE = element.querySelector(".user-ifm-card-number2");
    newMessageE.innerText = message;
}

const msgList = document.querySelector(".msg-list");

function activeNewMessage(maKH, name, role, message) {
    var newClient = true;
    var a_listMessage = document.querySelectorAll(".msg-box");
    a_listMessage = Array.from(a_listMessage);
    a_listMessage.forEach(value => {
        var valueMaKH = value.querySelector(".user-ifm-card-number").innerText;
        if (valueMaKH == maKH && maKHActive != maKH) {
            var parentElement = value.parentNode;
            parentElement.insertBefore(value, parentElement.firstChild);
            var nameElement = value.querySelector(".user-ifm-name");
            nameElement.style.fontWeight = 700;
            updateNewMessage(value, message);
        } else if (maKH == valueMaKH) {
            var parentElement = value.parentNode;
            parentElement.insertBefore(value, parentElement.firstChild);
            updateNewMessage(value, message);
        }
        if (valueMaKH == maKH) {
            newClient = false;
        }
    });
    if (newClient) {
        var newMsgItem = createMessageBox(maKH, name, role, message);
        activeEventClickBox(newMsgItem);
        msgList.appendChild(newMsgItem);
        var parentElement = newMsgItem.parentNode;
        parentElement.insertBefore(newMsgItem, parentElement.firstChild);
        var nameElement = newMsgItem.querySelector(".user-ifm-name");
        nameElement.style.fontWeight = 700;
    }
}



// find chatbox

const boxList = document.querySelector('.msg-list');

var searchChatInput = document.getElementById("searchInput");
if (searchChatInput)
    searchChatInput.addEventListener("input", function () {
        var inputValue = this.value.toLowerCase();
        var a_chatbox = boxList.querySelectorAll(".msg-box");
        a_chatbox = Array.from(a_chatbox);
        a_chatbox.forEach(element => {
            element.style.display = "flex";
            var name = element.querySelector(".user-ifm-name").innerText.toLowerCase();
            var id = element.querySelector(".user-ifm-card-number").innerText.toLowerCase();
            if (!(name.includes(inputValue) || id.includes(inputValue))) {
                element.style.display = "none";
            }
        })
    })

/* REMOVE CHAT MESSAGE */

export function f_removeChat(maKH, liElement) {
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


/* ======  ACCOUNT ====== */
// get account
accountNav.addEventListener("click", f_accountNav)

function f_accountNav() {
    var accessToken = localStorage.getItem('accessToken');
    sendRequest("/get-account-cus", 'GET',
        {
            'Authorization': 'Bearer ' + accessToken
        },
        null,
        function (data) {
            removeAllTable();
            data.data.forEach(value => {
                insertToTable("account", value);
            })
        },
        function (err) {
            console.error(err);
            if (err.status === 403) {
                const refreshToken = localStorage.getItem('refreshToken');
                sendRequest('/refresh-token', 'POST', { token: refreshToken },
                    function (data) {
                        const { accessToken } = data;
                        f_accountNav(accessToken);
                    },
                    function (err) {
                        console.error(err);
                    }
                );
            }
        }
    );
}

// add account
const addAccountBox = document.querySelector(".admin-add-account");

const showAddAccBTN = document.getElementById("add-account");
showAddAccBTN.addEventListener("click", function () {
    modalBox.style.display = "flex";
    overlayBox.style.display = "block";
    addAccountBox.style.display = "block";

})

function removeAllTable() {
    var a_tbody = document.querySelectorAll('tbody');
    a_tbody = Array.from(a_tbody)
    a_tbody.forEach(value => {
        value.innerHTML = "";
    })
}

function insertToTable(tableName, dataObject) {
    var tbody;
    if (tableName == "account")
        tbody = accountTable.querySelector('.table__show__main tbody');
    else if (tableName == "card")
        tbody = cardTable.querySelector('.table__show__main tbody');
    else if (tableName == "calendar")
        tbody = calendarTable.querySelector('.table__show__main tbody');

    var row = tbody.insertRow(-1); // Chèn hàng mới vào cuối tbody

    // Duyệt qua từng trường trong đối tượng dataObject
    var cellIndex = 0;
    for (var field in dataObject) {
        var cell = row.insertCell(-1); // Chèn ô mới vào hàng
        cell.textContent = dataObject[field]; // Điền dữ liệu vào ô

        if (tableName == "account") {
            // Nếu đây là ô đầu tiên, thêm class "show_id"
            if (cellIndex == 0) {
                cell.className = "show_id";
            }

            // Nếu đây là ô thứ hai, thêm class "show_name"
            if (cellIndex == 1) {
                cell.className = "show_name";
            }

            cellIndex++;
        } else if (tableName == "card") {
            // Nếu đây là ô đầu tiên, thêm class "show_id"
            if (cellIndex == 0) {
                cell.classList.add("show_id");
            }

            // Nếu đây là ô thứ hai, thêm class "show_name"
            if (cellIndex == 2) {
                cell.classList.add("show_name");
            }
            // Nếu đây là ô thứ hai, thêm class "show_name"
            if (cellIndex == 5) {
                cell.classList.add("show_type");
            }
            // Nếu đây là ô thứ hai, thêm class "show_name"
            if (cellIndex == 6) {
                cell.classList.add("show_start");
            }
            // Nếu đây là ô thứ hai, thêm class "show_name"
            if (cellIndex == 7) {
                cell.classList.add("show_end");
            }

            cellIndex++;
        } else if (tableName == "calendar") {
            // Nếu đây là ô đầu tiên, thêm class "show_id"
            if (cellIndex == 0) {
                cell.classList.add("show_id");
            }

            // Nếu đây là ô thứ hai, thêm class "show_name"
            if (cellIndex == 2) {
                cell.classList.add("show_name");
            }
            // Nếu đây là ô thứ hai, thêm class "show_name"
            if (cellIndex == 6) {
                cell.classList.add("show_type");
            }
            // Nếu đây là ô thứ hai, thêm class "show_name"
            if (cellIndex == 7) {
                cell.classList.add("show_pt");
            }

            cellIndex++;
        }
    }

    // Thêm nút xóa vào ô cuối cùng
    var cell = row.insertCell(-1);
    cell.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> <i class="fa-solid fa-trash"></i>';
}


// get card
cardNav.addEventListener("click", f_cardNav)

function f_cardNav() {
    var accessToken = localStorage.getItem('accessToken');
    sendRequest("/get-card-cus", 'GET',
        {
            'Authorization': 'Bearer ' + accessToken
        },
        null,
        function (data) {
            removeAllTable();
            data.data.forEach(value => {
                insertToTable("card", value);
            })
        },
        function (err) {
            console.error(err);
            if (err.status === 403) {
                const refreshToken = localStorage.getItem('refreshToken');
                sendRequest('/refresh-token', 'POST', { token: refreshToken },
                    function (data) {
                        const { accessToken } = data;
                        f_cardNav(accessToken);
                    },
                    function (err) {
                        console.error(err);
                    }
                );
            }
        }
    );
}


// getcalendar
calendarNav.addEventListener("click", f_calendarNav)

function f_calendarNav() {
    var accessToken = localStorage.getItem('accessToken');
    sendRequest("/get-calendar-cus", 'GET',
        {
            'Authorization': 'Bearer ' + accessToken
        },
        null,
        function (data) {
            removeAllTable();
            data.data.forEach(value => {
                insertToTable("calendar", value);
            })
        },
        function (err) {
            console.error(err);
            if (err.status === 403) {
                const refreshToken = localStorage.getItem('refreshToken');
                sendRequest('/refresh-token', 'POST', { token: refreshToken },
                    function (data) {
                        const { accessToken } = data;
                        f_calendarNav(accessToken);
                    },
                    function (err) {
                        console.error(err);
                    }
                );
            }
        }
    );
}




// click overlay
// overlayBox.addEventListener("click", displayNoneAll);

const exitAddAccount = addAccountBox.querySelector(".x__cancel");
exitAddAccount.addEventListener("click", displayNoneAll)


// add account function
const addAccountBTN = addAccountBox.querySelector(".button__form");
$('#form-add-account').submit(function (e) {
    e.preventDefault();
    var fullname = addAccountBox.querySelector("[name='fullname']").value;
    var email = addAccountBox.querySelector("[name='email']").value;
    var password = addAccountBox.querySelector("[name='password']").value;
    if (validateAdminAddAcc(fullname, email, password))
        $.ajax({
            url: "/create-account-url",
            type: "POST",
            data: $(this).serialize(),
            success: function (data) {
                console.log(data)
                if (data.success) {
                    if (data.active == true) {
                        showSuccessToast("Thêm thành công", "");
                        displayNoneAll();
                    } else {

                    }
                } else {
                    showErrorToast("Thất bại", "Email đã tồn tại trong hệ thống")
                }
            },
            error: function () {

            }
        })
})


// find account
const findAccountInput = accountTable.querySelector(".find-account-input");

const findAccountBTN = accountTable.querySelector(".container__show__find__btn");
const exitSearchAccBTN = accountTable.querySelector(".exit--search ");


findAccountBTN.addEventListener("click", function () {
    var inputValue = removeAccents(findAccountInput.value.trim().toLowerCase());
    var a_id = accountTable.querySelectorAll(".show_id");
    a_id = Array.from(a_id);
    var a_name = accountTable.querySelectorAll(".show_name");
    a_name = Array.from(a_name);

    if (inputValue != '') {
        exitSearchAccBTN.style.display = "flex";
        a_id.forEach((element, index) => {
            var parentNodeE = element.parentNode;
            var valueID = removeAccents(element.innerText.toLowerCase());
            var nameValue = removeAccents(parentNodeE.querySelector(".show_name").innerText.toLowerCase());

            if (valueID.includes(inputValue) || nameValue.includes(inputValue)) {
                parentNodeE.style.display = "table-row";
            } else {
                parentNodeE.style.display = "none";
            }
        });
    } else {
        a_id.forEach((element) => {
            element.parentNode.style.display = "table-row";
        });
        showErrorToast("", "Vui lòng nhập giá trị tìm kiếm");
    }
});

exitSearchAccBTN.addEventListener("click", function () {
    var a_id = accountTable.querySelectorAll(".show_id");
    a_id = Array.from(a_id);
    a_id.forEach((element) => {
        element.parentNode.style.display = "table-row";
    });
    findAccountInput.value = '';
    this.style.display = "none";
})




// ==== ASDD CARD ===== //

const addCardBox = modalBox.querySelector(".admin-add-card");

const exitAddCard = addCardBox.querySelector(".x__cancel");
exitAddCard.addEventListener("click", displayNoneAll)


// add CARD function

const showAddCardBTN = document.getElementById("add-card");
showAddCardBTN.addEventListener("click", function () {
    displayNoneAll();
    activeNecessaryForm();
    addCardBox.style.display = "block";
})

$('#form-add-card').submit(function (e) {
    e.preventDefault();
    var maKH = addCardBox.querySelector("[name='maKH']").value;
    var name = addCardBox.querySelector("[name='name']").value;
    var dateOfBirth = addCardBox.querySelector("[name='dateOfBirth']").value;
    var phoneNumber = addCardBox.querySelector("[name='phoneNumber']").value;
    var cardType = addCardBox.querySelector("[name='cardType']").value;
    var dateStart = addCardBox.querySelector("[name='dateStart']").value;
    console.log(name, dateOfBirth, phoneNumber, cardType, dateStart)
    if (validateAdminAddCard(name, dateOfBirth, phoneNumber, cardType, dateStart)) {
        $.ajax({
            url: "/create-card-admin-url",
            type: "POST",
            data: $(this).serialize(),
            success: function (data) {
                console.log(data);
                if (data.success) {
                    showSuccessToast("Thêm thành công");
                } else {
                    showErrorToast("Thêm thất bại", data.message);
                }
            },
            error: function () {

            }
        })
    }
})

// FIND CARD

const inputIDCard = cardPage.querySelector(".find-id-card");
const inputPackage = cardPage.querySelector(".show__input__package");
const inputStart = document.getElementById("input-date-start");
const inputEnd = document.getElementById("input-date-end");

const findCardBTN = cardPage.querySelector(".container__show__find__btn");
const exitSearchCardBTN = cardPage.querySelector(".exit--search ");


findCardBTN.addEventListener("click", function () {
    var valueIDCard = removeAccents(inputIDCard.value.trim().toLowerCase());
    var valuePackage = removeAccents(inputPackage.value.trim().toLowerCase());
    var valueStart = removeAccents(inputStart.value.trim().toLowerCase());
    var valueEnd = removeAccents(inputEnd.value.trim().toLowerCase());
    var a_id = cardPage.querySelectorAll(".show_id");
    a_id = Array.from(a_id);

    exitSearchCardBTN.style.display = "flex";
    a_id.forEach((element, index) => {
        var parentNodeE = element.parentNode;
        var valueID = removeAccents(element.innerText.toLowerCase());
        var nameValue = removeAccents(parentNodeE.querySelector(".show_name").innerText.toLowerCase());
        var typeValue = removeAccents(parentNodeE.querySelector(".show_type").innerText.toLowerCase());
        var startValue = removeAccents(parentNodeE.querySelector(".show_start").innerText.split("T")[0].toLowerCase());
        var endValue = removeAccents(parentNodeE.querySelector(".show_end").innerText.split("T")[0].toLowerCase());

        var match = true;
        if (valueIDCard != '' && (!valueID.includes(valueIDCard) && !nameValue.includes(valueIDCard))) match = false;
        if (valuePackage != '' && valuePackage != typeValue) match = false;
        if (valueStart != '' && valueStart != startValue) match = false;
        if (valueEnd != '' && valueEnd != endValue) match = false;
        console.log(valueStart, startValue);
        if (match) {
            parentNodeE.style.display = "table-row";
        } else {
            parentNodeE.style.display = "none";
        }
    });
    if (valueIDCard == '' && valuePackage == '' && valueStart == '' && valueEnd == '') {
        a_id.forEach((element) => {
            element.parentNode.style.display = "table-row";
        });
        showErrorToast("", "Vui lòng nhập giá trị tìm kiếm");
    }
});

exitSearchCardBTN.addEventListener("click", function () {
    var a_id = cardPage.querySelectorAll(".show_id");
    a_id = Array.from(a_id);
    a_id.forEach((element) => {
        element.parentNode.style.display = "table-row";
    });
    findAccountInput.value = '';

    inputIDCard.value = "";
    inputPackage.value = "";
    inputStart.value = "";
    inputEnd.value = "";

    this.style.display = "none";
})




// ==== ASDD calendar ===== //

const addcalendarBox = modalBox.querySelector(".admin-add-calendar");

const exitAddcalendar = addcalendarBox.querySelector(".x__cancel");
exitAddcalendar.addEventListener("click", displayNoneAll)



// add calendar function

const showAddcalendarBTN = document.getElementById("add-calendar");
showAddcalendarBTN.addEventListener("click", function () {
    displayNoneAll();
    activeNecessaryForm();
    addcalendarBox.style.display = "block";
})

$('#form-add-calendar').submit(function (e) {
    e.preventDefault();
    var maThe = addcalendarBox.querySelector("[name='maThe']").value;
    var name = addcalendarBox.querySelector("[name='name']").value;
    var date = addcalendarBox.querySelector("[name='date']").value;
    var time = addcalendarBox.querySelector("[name='time']").value;
    var type = addcalendarBox.querySelector("[name='type']").value;
    var ptName = addcalendarBox.querySelector("[name='ptName']").value;
    var note = addcalendarBox.querySelector("[name='note']").value;
    if (validateAdminAddCalendar(maThe, name, date, time, type, ptName, note)) {
        $.ajax({
            url: "/create-calendar-admin-url",
            type: "POST",
            data: $(this).serialize(),
            success: function (data) {
                console.log(data);
                if (data.success) {
                    showSuccessToast("Thêm thành công");
                } else {
                    showErrorToast("Thêm thất bại", data.message);
                }
            },
            error: function () {

            }
        })
    }
})


// FIND CALENDAR

const inputIDCalendar = calendarPage.querySelector(".find-id-calendar");
const inputPTCalendar = calendarPage.querySelector(".find-pt-calendar");
const inputTypeCalendar = calendarPage.querySelector(".show__input__type");

const findCalendarBTN = calendarPage.querySelector(".container__show__find__btn");
const exitSearchCalendarBTN = calendarPage.querySelector(".exit--search ");


findCalendarBTN.addEventListener("click", function () {
    var valueIDInput = removeAccents(inputIDCalendar.value.trim().toLowerCase());
    var valuePT = removeAccents(inputPTCalendar.value.trim().toLowerCase());
    var valuetype = removeAccents(inputTypeCalendar.value.trim().toLowerCase());
    var a_id = calendarPage.querySelectorAll(".show_id");
    a_id = Array.from(a_id);
    console.log(a_id)
    exitSearchCalendarBTN.style.display = "flex";
    a_id.forEach((element, index) => {
        var parentNodeE = element.parentNode;
        var valueID = removeAccents(element.innerText.toLowerCase());
        var nameValue = removeAccents(parentNodeE.querySelector(".show_name").innerText.toLowerCase());
        var ptValue = removeAccents(parentNodeE.querySelector(".show_pt").innerText.toLowerCase());
        var typeValue = removeAccents(parentNodeE.querySelector(".show_type").innerText.toLowerCase());
        var match = true;
        if (valueID != '' && (!valueID.includes(valueIDInput) && !nameValue.includes(valueIDInput))) match = false;
        if (valuePT != '' && !ptValue.includes(valuePT)) match = false;
        if (valuetype != '' && valuetype != typeValue) match = false;
        
        if (match) {
            console.log(ptValue, valuePT)
            parentNodeE.style.display = "table-row";
        } else {
            parentNodeE.style.display = "none";
        }
    });
    if (valueIDInput == '' && valuePT == '' && valuetype == '') {
        a_id.forEach((element) => {
            element.parentNode.style.display = "table-row";
        });
        showErrorToast("", "Vui lòng nhập giá trị tìm kiếm");
    }
});

exitSearchCalendarBTN.addEventListener("click", function () {
    var a_id = calendarPage.querySelectorAll(".show_id");
    a_id = Array.from(a_id);
    a_id.forEach((element) => {
        element.parentNode.style.display = "table-row";
    });

    inputIDCalendar.value = "";
    inputPTCalendar.value = "";
    inputTypeCalendar.value = "";

    this.style.display = "none";
})







