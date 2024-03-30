import {
    activeEventClickBox,
    activeNecessaryForm,
    createMessageBox,
    displayLeftMessage,
    displayNoneAll,
    displayRightMessage,
    innerBoxMsg,
    maKHActive
} from "./src/function.js";
import { showErrorToast, showSuccessToast } from "./src/toast.js";
import { validateAdminAddAcc } from "./src/validate.js";


/*====== LOGIN =====*/
const modalBox = document.querySelector(".modal");
const overlayBox = document.querySelector(".modal-overlay");
const loginBox = document.querySelector(".login-box");


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

const accountTable = document.getElementById("accountTable");
const cardTable = document.getElementById("cardTable");
const calendarTable = document.getElementById("calendarTable");

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
    for (var field in dataObject) {
        var cell = row.insertCell(-1); // Chèn ô mới vào hàng
        cell.textContent = dataObject[field]; // Điền dữ liệu vào ô
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
console.log(addAccountBox)
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