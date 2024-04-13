import { f_activeOldNav } from "./src/app.js";
import {
    activeEventClickBox,
    activeNecessaryForm,
    changeFileInput,
    createMessageBox,
    displayLeftMessage,
    displayNoneAll,
    displayRightMessage,
    innerBoxMsg,
    maKHActive,
    removeAccents,
    removeAllInputValue,
    updateRowShop
} from "./src/function.js";
import { showErrorToast, showSuccessToast } from "./src/toast.js";
import { validateAddProduct, validateAdminAddAcc, validateAdminAddCalendar, validateAdminAddCard, validateAdminEditAcc, validateAdminEditCard, validateCreateAccount } from "./src/validate.js";


/*====== LOGIN =====*/
const modalBox = document.querySelector(".modal");
const overlayBox = document.querySelector(".modal-overlay");
const loginBox = document.querySelector(".login-box");

const accountPage = document.getElementById("accountTable");
const cardPage = document.getElementById("cardTable");
const calendarPage = document.getElementById("calendarTable");
const shopPage = document.getElementById("shopTable");


function affterLogin(data) {
    adminName.innerText = data.username;
    showSuccessToast("Đăng nhập thành công")
    displayNoneAll();
    logoutAdminBTN.style.display = 'flex';
    loginAdminBTN.removeEventListener("click", f_getLoginAdmin);
    f_activeOldNav();
}

function affterLogout(data) {
    adminName.innerText = 'ADMIN NAME';
    showSuccessToast("Đã đăng xuất");
    displayNoneAll();
    logoutAdminBTN.style.display = 'none';
}
let socket = null;
function activeEventLogin() {
    console.log("hello2");
    socket = io(
        //     {
        //     query: {
        //         token: localStorage.getItem('accessToken')
        //     }
        // }
    );
    // let socket = io({
    //     query: {
    //         token: localStorage.getItem('accessToken')
    //     }
    // });
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


    f_getBoxMsg();

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

function f_getLoginAdmin() {
    $.ajax({
        url: '/get-login-admin',
        type: 'get',
        success: function (data) {
            if (data.success) {
                userToken(data.username)
                    .then(function () {
                        affterLogin(data);
                        activeEventLogin();
                    })
                    .catch(function (err) {
                        console.error("Error: ", err);
                    })
            } else {
                displayNoneAll();
                activeNecessaryForm();
                loginBox.style.display = "block";
            }
        },
        error: function (err) {

        }
    })
}

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
                    userToken(data.username)
                        .then(function () {
                            affterLogin(data);
                            activeEventLogin();
                        })
                        .catch(function (err) {
                            console.error("Error: ", err);
                        })
                }
            },
            error: function (err) {
                console.error(err);
            }
        })
})

const loginAdminBTN = document.getElementById("login-admin");
loginAdminBTN.addEventListener("click", f_getLoginAdmin);




const logoutAdminBTN = document.getElementById("logOut");
logoutAdminBTN.addEventListener("click", function () {
    $.ajax({
        url: '/logout-admin-url',
        type: 'GET',
        success: function (data) {
            if (data.success) {
                localStorage.setItem('refreshToken', "");
                localStorage.setItem('accessToken', "");
                affterLogout();
                if (socket) {
                    socket.disconnect();
                    socket = null;
                    showSuccessToast("hủy kết nối");
                    console.log('Disconnected from server');
                }
                loginAdminBTN.addEventListener("click", f_getLoginAdmin);
            } else {
                showErrorToast("Chưa đăng nhập vào hệ thống");
            }
        },
        error: function (err) {
            console.err(err);
        }
    })
})




const msgNav = document.getElementById("QLMessage");
const accountNav = document.getElementById("QLAccount");
const cardNav = document.getElementById("QLCard");
const calendarNav = document.getElementById("QLCalendar");
const shopNav = document.getElementById("QLShop");

// test jwt

/*
$.ajax({
    url: '/login-test',
    type: 'POST',
    data: {username: "holiut"},
    success: function(data){
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
    return new Promise(function (resolve, reject) {

        $.ajax({
            url: '/post-user-token',
            type: 'POST',
            data: { username },
            success: function (data) {
                const { accessToken, refreshToken } = data;
                // Lưu trữ refresh token
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('accessToken', accessToken);
                // useAccessToken(accessToken);
                resolve();
            },
            error: function (err) {
                console.error(err);
                reject();
            }
        });
    })
}

// function useAccessToken(accessToken) {
//     $.ajax({
//         url: "/get-book",
//         type: 'GET',
//         headers: {
//             'Authorization': 'Bearer ' + accessToken
//         },
//         success: function (data) {
//         },
//         error: function (err) {
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
    f_getLoginAdmin();

    // $.ajax({
    //     url: '/get-box-message',
    //     type: "GET",
    //     success: function (data) {
    //         innerBoxMsg(data.value);
    //     },
    //     error: function (err) {

    //     }
    // });

})

function f_getBoxMsg() {
    var accessToken = localStorage.getItem('accessToken');
    sendRequest("/get-box-message", 'GET',
        {
            'Authorization': 'Bearer ' + accessToken
        },
        null,
        function (data) {
            innerBoxMsg(data.value);
        }),
        function (err) {

        }
}



function sendMessage(message) {
    socket.emit('adminMessage', { text: message, id: maKHActive });
}

const inputBox = document.querySelector('.chatbox__bottom__input');
const inputElement = inputBox.querySelector('textarea');
const sendButton = document.querySelector('.chatbox__bottom__send ion-icon');

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
// bên function.js


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
        tbody = accountPage.querySelector('.table__show__main tbody');
    else if (tableName == "card")
        tbody = cardPage.querySelector('.table__show__main tbody');
    else if (tableName == "calendar")
        tbody = calendarPage.querySelector('.table__show__main tbody');
    else if (tableName == "shop")
        tbody = shopPage.querySelector('.table__show__main tbody');

    var row = tbody.insertRow(-1); // Chèn hàng mới vào cuối tbody

    // Duyệt qua từng trường trong đối tượng dataObject
    var cellIndex = 0;
    var idIndex = 0;
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
            if (cellIndex == 0) {
                cell.classList.add("show_id");
            }

            if (cellIndex == 2) {
                cell.classList.add("show_name");
            }
            if (cellIndex == 5) {
                cell.classList.add("show_type");
            }
            if (cellIndex == 6) {
                cell.classList.add("show_start");
            }
            if (cellIndex == 7) {
                cell.classList.add("show_end");
            }

            cellIndex++;
        } else if (tableName == "calendar") {
            // Nếu đây là ô đầu tiên, thêm class "show_id"
            if (cellIndex == 0) {
                cell.classList.add("show_id");
            }

            if (cellIndex == 2) {
                cell.classList.add("show_name");
            }

            if (cellIndex == 6) {
                cell.classList.add("show_type");
            }

            if (cellIndex == 7) {
                cell.classList.add("show_pt");
            }

            cellIndex++;
        } else if (tableName == "shop") {

            // img 1
            if (cellIndex == 0 || cellIndex == 1) {
                cell.textContent = '';
                var imgE = document.createElement('img');
                imgE.className = "show_main_img";
                imgE.src = "" || dataObject[field];
                cell.appendChild(imgE);
                var inputChange = document.createElement('input');
                inputChange.type = 'file';
                inputChange.id = 'input' + field + idIndex;
                var lableTag = document.createElement('label');
                lableTag.innerText = 'Thay ảnh';
                lableTag.htmlFor = 'input' + field + idIndex;
                lableTag.style.display = 'none';
                inputChange.style.display = 'none';
                inputChange.addEventListener('change', function (img) {
                    return function (event) {
                        changeFileInput(event, img);
                    };
                }(imgE));
                cell.appendChild(inputChange);
                cell.appendChild(lableTag);
                idIndex++;
            }

            cell.classList.add(field);
            cellIndex++;
        }

    }

    // Thêm nút xóa vào ô cuối cùng
    var cell = row.insertCell(-1);

    var i1 = document.createElement('i');
    i1.className = 'fa-solid fa-pen-to-square';

    if (tableName == "account")
        i1.addEventListener("click", f_editAccountBTN);
    else if (tableName == "card")
        i1.addEventListener("click", f_editCardBTN);
    else if (tableName == "calendar")
        i1.addEventListener("click", f_editCalendarBTN);
    else if (tableName == "shop")
        i1.addEventListener("click", f_editShopBTN);

    var i2 = document.createElement('i');
    i2.className = 'fa-solid fa-trash';
    if (tableName == "account")
        i2.addEventListener("click", f_removeAccountBTN);
    else if (tableName == "card")
        i2.addEventListener("click", f_removeCardBTN);
    else if (tableName == "calendar")
        i2.addEventListener("click", f_removeCalendarBTN);
    else if (tableName == "shop")
        i2.addEventListener("click", f_removeShopBTN);

    // Thêm hai thẻ i vào cell
    cell.appendChild(i1);
    cell.appendChild(i2);
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
// overlcreateayBox.addEventListener("click", displayNoneAll);

const exitAddAccount = addAccountBox.querySelector(".x__cancel");
exitAddAccount.addEventListener("click", displayNoneAll)


// add account function
const addAccountBTN = addAccountBox.querySelector(".button__form");
$('#form-add-account').submit(function (e) {
    let accessToken = localStorage.getItem('accessToken');
    e.preventDefault();
    var fullname = addAccountBox.querySelector("[name='fullname']").value;
    var email = addAccountBox.querySelector("[name='email']").value;
    var password = addAccountBox.querySelector("[name='password']").value;
    if (validateAdminAddAcc(fullname, email, password)) {
        sendRequest(
            '/create-account-url',
            'POST',
            {
                'Authorization': 'Bearer ' + accessToken
            },
            $(this).serialize(),
            function (data) {
                if (data.success) {
                    if (data.active == true) {
                        showSuccessToast("Thêm thành công", "");
                        displayNoneAll();
                        accountNav.click();
                        removeAllInputValue();
                        // insertToTable('account', data.acc)
                    } else {

                    }
                } else {
                    showErrorToast("Thất bại", "Email đã tồn tại trong hệ thống")
                }
            },
            function (err) {
                showErrorToast("Thất bại", "Chưa đăng nhập");
                console.err(err);
            }
        )
        // $.ajax({
        //     url: "/create-account-url",
        //     type: "POST",
        //     data: $(this).serialize(),
        //     success: function (data) {
        //         if (data.success) {
        //             if (data.active == true) {
        //                 showSuccessToast("Thêm thành công", "");
        //                 displayNoneAll();
        //                 accountNav.click();
        //                 removeAllInputValue();
        //                 // insertToTable('account', data.acc)
        //             } else {

        //             }
        //         } else {
        //             showErrorToast("Thất bại", "Email đã tồn tại trong hệ thống")
        //         }
        //     },
        //     error: function () {

        //     }
        // })
    }
})


// find account
const findAccountInput = accountPage.querySelector(".find-account-input");

const findAccountBTN = accountPage.querySelector(".container__show__find__btn");
const exitSearchAccBTN = accountPage.querySelector(".exit--search ");


findAccountBTN.addEventListener("click", function () {
    var inputValue = removeAccents(findAccountInput.value.trim().toLowerCase());
    var a_id = accountPage.querySelectorAll(".show_id");
    a_id = Array.from(a_id);
    var a_name = accountPage.querySelectorAll(".show_name");
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
    var a_id = accountPage.querySelectorAll(".show_id");
    a_id = Array.from(a_id);
    a_id.forEach((element) => {
        element.parentNode.style.display = "table-row";
    });
    findAccountInput.value = '';
    this.style.display = "none";
})




// ==== ADD CARD ===== //

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
    var accessToken = localStorage.getItem('accessToken');
    if (validateAdminAddCard(maKH, name, dateOfBirth, phoneNumber, cardType, dateStart)) {
        sendRequest(
            '/create-card-admin-url',
            'POST',
            {
                'Authorization': 'Bearer ' + accessToken
            },
            $(this).serialize(),
            function (data) {
                if (data.success) {
                    showSuccessToast("Thêm thành công");
                    displayNoneAll();
                    cardNav.click();
                    removeAllInputValue();

                } else {
                    showErrorToast("Thêm thất bại", data.message);
                }
            },
            function (err) {
                if (err.status == 401)
                    showErrorToast("Thất bại", "Chưa đăng nhập vào hệ thống");
            }
        )
        // $.ajax({
        //     url: "",
        //     type: "POST",
        //     data: $(this).serialize(),
        //     success: function (data) {
        //         if (data.success) {
        //             showSuccessToast("Thêm thành công");
        //             displayNoneAll();
        //             cardNav.click();
        //             removeAllInputValue();

        //         } else {
        //             showErrorToast("Thêm thất bại", data.message);
        //         }
        //     },
        //     error: function () {

        //     }
        // })
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
    var checkBox = addcalendarBox.querySelectorAll('input[name="weekday[]"]:checked');
    var weekdayValue = [];
    for (let i = 0; i < checkBox.length; i++) {
        weekdayValue.push(checkBox[i].value);
    }
    weekdayValue = weekdayValue.toString();

    var time = addcalendarBox.querySelector("[name='time']").value;
    var type = addcalendarBox.querySelector("[name='type']").value;
    var ptName = addcalendarBox.querySelector("[name='ptName']").value;
    var note = addcalendarBox.querySelector("[name='note']").value;
    if (validateAdminAddCalendar(maThe, name, weekdayValue, time, type, ptName, note)) {
        var accessToken = localStorage.getItem('accessToken');
        sendRequest(
            '/create-calendar-admin-url',
            'POST',
            {
                'Authorization': 'Bearer ' + accessToken
            },
            $(this).serialize(),
            function (data) {
                if (data.success) {
                    showSuccessToast("Thêm thành công");
                    displayNoneAll();
                    calendarNav.click();
                    removeAllInputValue();

                } else {
                    showErrorToast("Thêm thất bại", data.message);
                }
            },
            function (err) {
                if (err.status == 401)
                    showErrorToast("Không thể thực hiện thao tác", "Vui lòng đăng nhập");
            }
        )
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







// 
const editAccBox = modalBox.querySelector(".admin-edit-account")
const modalBodyBox = modalBox.querySelector(".modal__body")

// ==== EDIT ACCOUNT ====== ///
const exitEditAcc = editAccBox.querySelector(".x__cancel");
function f_editAccountBTN() {
    var thisElement = this;
    var row = thisElement.closest("tr");
    var a_box = row.querySelectorAll("td");
    a_box = Array.from(a_box);
    a_box.pop();
    // a_box.shift();

    var a_span = editAccBox.querySelectorAll("span.row__content__input");
    var firstInput = editAccBox.querySelector("input.row__content__input");
    firstInput.value = a_box[0].innerText
    a_span = Array.from(a_span);

    a_box.map((value, index) => {
        a_span[index].innerText = a_box[index].innerText;
    })

    displayNoneAll();
    activeNecessaryForm();
    editAccBox.style.display = "block";
}
exitEditAcc.addEventListener("click", function () {
    displayNoneAll();
});


$('#form-edit-account').submit(function (e) {
    e.preventDefault();
    var valueInput = serializeObject(this);
    let accessToken = localStorage.getItem('accessToken');
    if (validateAdminEditAcc(valueInput.name, valueInput.email, valueInput.password)) {
        sendRequest(
            '/edit-account-url',
            'POST',
            {
                'Authorization': 'Bearer ' + accessToken
            },
            $(this).serialize(),
            function (data) {
                if (data.success) {
                    showSuccessToast("Sửa tài khoản thành công");
                    displayNoneAll();
                    removeAllInputValue();
                    accountNav.click();
                    removeAllInputValue();

                } else {
                    showErrorToast(data.err);
                }
            },
            function (err) {
                if (err.status == 401)
                    showErrorToast("Thất bại", "Chưa đăng nhập vào hệ thống");
            }
        )
    }

})

function serializeObject(element) {
    let serialized = $(element).serialize().split("&");
    let obj = {};

    serialized.forEach(function (item) {
        let splitItem = item.split("=");
        obj[decodeURIComponent(splitItem[0])] = decodeURIComponent(splitItem[1]);
    });

    return obj;
}


// 
const editCardBox = modalBox.querySelector(".admin-edit-card")

// ==== EDIT CARD ====== ///
const exitEditCard = editCardBox.querySelector(".x__cancel");
function f_editCardBTN() {
    var thisElement = this;
    var row = thisElement.closest("tr");
    var a_box = row.querySelectorAll("td");
    a_box = Array.from(a_box);
    a_box.pop();
    var a_span = editCardBox.querySelectorAll("span.row__content__input");
    var a_Input = editCardBox.querySelectorAll("input.row__content__input");
    a_Input = Array.from(a_Input);
    a_Input[0].value = a_box[0].innerText
    a_Input[1].value = a_box[1].innerText
    a_span = Array.from(a_span);

    a_box.map((value, index) => {
        a_span[index].innerText = a_box[index].innerText;
    })

    displayNoneAll();
    activeNecessaryForm();
    editCardBox.style.display = "block";
}

exitEditCard.addEventListener("click", function () {
    displayNoneAll();
});


$('#form-edit-card').submit(function (e) {
    e.preventDefault();
    var valueInput = serializeObject(this);
    var accessToken = localStorage.getItem('accessToken');
    if (validateAdminEditCard(valueInput)) {
        sendRequest(
            '/edit-card-url',
            'POST',
            {
                'Authorization': 'Bearer ' + accessToken
            },
            $(this).serialize(),
            function (data) {
                if (data.success) {
                    showSuccessToast("Sửa thông tin thẻ thành công");
                    displayNoneAll();
                    removeAllInputValue();
                    cardNav.click();
                    removeAllInputValue();

                } else {
                    showErrorToast("Lỗi");
                }
            },
            function (err) {
                if (err.status == 401)
                    showErrorToast("Không thể thực hiện thao tác", "Vui lòng đăng nhập");
            }
        )
    }
})


//EDIT CALENDAR
// 
const editCalendarBox = modalBox.querySelector(".admin-edit-calendar")

// ==== EDIT ACCOUNT ====== ///
const exitEditCalendar = editCalendarBox.querySelector(".x__cancel");
function f_editCalendarBTN() {
    var thisElement = this;
    var row = thisElement.closest("tr");
    var a_box = row.querySelectorAll("td");
    a_box = Array.from(a_box);
    a_box.pop();
    var a_span = editCalendarBox.querySelectorAll("span.row__content__input");
    var a_Input = editCalendarBox.querySelectorAll("input.row__content__input");
    a_Input = Array.from(a_Input);
    a_Input[0].value = a_box[0].innerText
    a_Input[1].value = a_box[1].innerText
    a_span = Array.from(a_span);

    a_box.map((value, index) => {
        a_span[index].innerText = a_box[index].innerText;
    })

    displayNoneAll();
    activeNecessaryForm();
    editCalendarBox.style.display = "block";
}

exitEditCalendar.addEventListener("click", function () {
    displayNoneAll();
});


$('#form-edit-calendar').submit(function (e) {
    e.preventDefault();
    var valueInput = serializeObject(this);

    // if (validateAdminEditCalendar(valueInput)) {
    var accessToken = localStorage.getItem('accessToken');
    sendRequest(
        '/edit-calendar-url',
        'POST',
        {
            'Authorization': 'Bearer ' + accessToken
        },
        $(this).serialize(),
        function (data) {
            if (data.success) {
                showSuccessToast("Sửa thông tin thẻ thành công");
                displayNoneAll();
                calendarNav.click();
                removeAllInputValue();

            } else {
                showErrorToast("Lỗi");
            }
        },
        function (err) {
            if (err.status == 401)
                showErrorToast("Không thể thực hiện thao tác", "Vui lòng đăng nhập");
        }
    )
})




// remove account
const removeAccBox = modalBox.querySelector(".admin-remove-account")
function f_removeAccountBTN() {
    var element = this;
    var row = element.closest("tr");
    var idValue = row.querySelector(".show_id").innerText;
    var nameValue = row.querySelector(".show_name").innerText;
    var contentE = removeAccBox.querySelectorAll(".row__title2");
    contentE = Array.from(contentE);
    contentE[0].innerText = idValue;
    contentE[1].innerText = nameValue;
    displayNoneAll();
    activeNecessaryForm();
    removeAccBox.style.display = "block";
}

const submitRemoveAcc = removeAccBox.querySelector(".button__form");
submitRemoveAcc.addEventListener("click", function () {
    var contentE = removeAccBox.querySelectorAll(".row__title2");
    contentE = Array.from(contentE);
    var maKH = contentE[0].innerText;
    let accessToken = localStorage.getItem('accessToken');
    if (maKH) {
        sendRequest(
            '/admin-remove-acc',
            'POST',
            {
                'Authorization': 'Bearer ' + accessToken
            },
            { maKH },
            function (data) {
                if (data.success) {
                    showSuccessToast("Xóa thành công");
                    displayNoneAll();
                    accountNav.click();
                    removeAllInputValue();

                } else {
                    showErrorToast("Lỗi");
                }
            },
            function (err) {
                if (err.status == 401)
                    showErrorToast('Lỗi', "Vui lòng đăng nhập vào hệ thống");
            }

        )
    }
});

const exitRemoveAcc = removeAccBox.querySelector(".x__cancel")
exitRemoveAcc.addEventListener("click", displayNoneAll)





// remove card
const removeCardBox = modalBox.querySelector(".admin-remove-card")
function f_removeCardBTN() {
    var element = this;
    var row = element.closest("tr");
    var idValue = row.querySelector(".show_id").innerText;
    var nameValue = row.querySelector(".show_name").innerText;
    var contentE = removeCardBox.querySelectorAll(".row__title2");
    contentE = Array.from(contentE);
    contentE[0].innerText = idValue;
    contentE[1].innerText = nameValue;
    displayNoneAll();
    activeNecessaryForm();
    removeCardBox.style.display = "block";
}

const submitRemoveCard = removeCardBox.querySelector(".button__form");
submitRemoveCard.addEventListener("click", function () {
    var contentE = removeCardBox.querySelectorAll(".row__title2");
    contentE = Array.from(contentE);
    var maThe = contentE[0].innerText;
    if (maThe) {
        var accessToken = localStorage.getItem('accessToken');
        sendRequest(
            '/admin-remove-card',
            'POST',
            {
                'Authorization': 'Bearer ' + accessToken
            },
            { maThe },
            function (data) {
                if (data.success) {
                    showSuccessToast("Xóa thành công");
                    displayNoneAll();
                    cardNav.click();
                    removeAllInputValue();

                } else {
                    showErrorToast("Lỗi");
                }
            },
            function (err) {
                if (err.status == 401)
                    showErrorToast("Không thể thực hiện thao tác", "Vui lòng đăng nhập");

            }
        )
    }
});

const exitRemoveCard = removeCardBox.querySelector(".x__cancel")
exitRemoveCard.addEventListener("click", displayNoneAll)



// remove card
const removeCalendarBox = modalBox.querySelector(".admin-remove-calendar")
function f_removeCalendarBTN() {
    var element = this;
    var row = element.closest("tr");
    var idValue = row.querySelector(".show_id").innerText;
    var nameValue = row.querySelector(".show_name").innerText;
    var contentE = removeCalendarBox.querySelectorAll(".row__title2");
    contentE = Array.from(contentE);
    contentE[0].innerText = idValue;
    contentE[1].innerText = nameValue;
    displayNoneAll();
    activeNecessaryForm();
    removeCalendarBox.style.display = "block";
}

const submitRemoveAccount = removeCalendarBox.querySelector(".button__form");
submitRemoveAccount.addEventListener("click", function () {
    var contentE = removeCalendarBox.querySelectorAll(".row__title2");
    contentE = Array.from(contentE);
    var maLT = contentE[0].innerText;
    if (maLT) {
        var accessToken = localStorage.getItem('accessToken');
        sendRequest(
            '/admin-remove-calendar',
            'POST',
            {
                'Authorization': 'Bearer ' + accessToken
            },
            { maLT },
            function (data) {
                if (data.success) {
                    showSuccessToast("Xóa thành công");
                    displayNoneAll();
                    calendarNav.click();
                    removeAllInputValue();

                } else {
                    showErrorToast("Lỗi");
                }
            },
            function (err) {
                if (err.status == 401)
                    showErrorToast("Không thể thực hiện thao tác", "Vui lòng đăng nhập");
            }
        )
    }
});

const exitRemoveCalendar = removeCalendarBox.querySelector(".x__cancel")
exitRemoveCalendar.addEventListener("click", displayNoneAll)

//////////////////////////
// nhập mã thì sẽ ẩn ô tên đi //

let a_inputID = modalBodyBox.querySelectorAll(".row__content__input__id");
a_inputID = Array.from(a_inputID);
a_inputID.forEach(element => {
    var formE = element.closest('form');
    var rowName = formE.querySelector(".row__name");
    element.addEventListener("input", function () {
        if (this.value) {
            rowName.style.display = 'none';
        } else {
            rowName.style.display = 'inline';
        }
    })
})

let a_inputName = modalBodyBox.querySelectorAll(".row__content__input__name");
a_inputName = Array.from(a_inputName);
a_inputName.forEach(element => {
    var formE = element.closest('form');
    var inputID = formE.querySelector(".row__content__input__id");

    let first = false;

    element.addEventListener("input", function (event) {
        if (this.value.trim() !== '') {
            if (!first) {
                first = true;
                inputID.addEventListener('keydown', unactiveInput);
            }
        } else {
            first = false;
            inputID.removeEventListener('keydown', unactiveInput);
        }
    })

})




function unactiveInput(e) {
    showErrorToast("Không thể điền dữ liệu", "Vui lòng xóa tên khách hàng mới để thao tác")
    e.preventDefault();
}

//================= STORE SHOP WHEY ================== //

// GET ITEM
shopNav.addEventListener("click", f_shopNav)

function f_shopNav() {
    var accessToken = localStorage.getItem('accessToken');
    sendRequest("/get-shop-item", 'GET',
        {
            'Authorization': 'Bearer ' + accessToken
        },
        null,
        function (data) {
            removeAllTable();
            data.data.forEach(value => {
                value.Cost = value.Cost.toLocaleString();
                insertToTable("shop", value);
            })
        },
        function (err) {
            console.error(err);
            if (err.status === 403) {
                const refreshToken = localStorage.getItem('refreshToken');
                sendRequest('/refresh-token', 'POST', { token: refreshToken },
                    function (data) {
                        const { accessToken } = data;
                        f_shopNav(accessToken);
                    },
                    function (err) {
                        console.error(err);
                    }
                );
            }
        }
    );
}


// ADD ITEM


// $('#form-edit-calendar').submit(function (e) {
//     e.preventDefault();

function splitSerialize(dataString) {
    var dataArray = dataString.split("&");
    var dataObj = {};

    for (var i = 0; i < dataArray.length; i++) {
        var item = dataArray[i].split("=");
        dataObj[item[0]] = decodeURIComponent(item[1]);
    }

    return dataObj;
}

const addProductBTN = document.getElementById("add-shop");
const addProductBox = modalBodyBox.querySelector(".admin-add-product")
addProductBTN.addEventListener("click", () => {
    modalBox.style.display = 'flex';
    overlayBox.style.display = 'block';
    modalBodyBox.style.display = 'block';
    addProductBox.style.display = 'block';

    const cancelAddProduct = addProductBox.querySelector(".x__cancel");
    cancelAddProduct.addEventListener("click", () => {
        displayNoneAll();
    })
})

// change picture click



function previewImage() {
    console.log(this)
    var parentThis = this.closest('div');

    const image = parentThis.querySelector('img'); // Lấy hình ảnh theo ID

    const files = this.files; // Lấy danh sách các file được chọn từ input
    
    // Kiểm tra xem có file nào được chọn không
    if (files.length > 0) {
        const file = files[0]; // Lấy file đầu tiên trong danh sách

        // Tạo một FileReader để đọc dữ liệu của file được chọn
        const reader = new FileReader();

        // Định nghĩa hàm xử lý khi file được đọc thành công
        reader.onload = function(e) {
            image.src = e.target.result; // Gán nguồn (src) của ảnh là dữ liệu của file đã đọc
        };

        // Đọc dữ liệu của file
        reader.readAsDataURL(file);
    } else {
        // Nếu không có file nào được chọn, gán nguồn (src) của ảnh là một giá trị mặc định
        image.src = '#';
    }
}

let imgInputAdd = addProductBox.querySelectorAll(".content-img-main");
imgInputAdd = Array.from(imgInputAdd);
imgInputAdd.forEach(element=>element.addEventListener('change', previewImage))


$('#form-add-product').submit(function (e) {
    e.preventDefault();
    var accessToken = localStorage.getItem('accessToken');
    var dataObj = splitSerialize($(this).serialize());
    
    var file_input1 = addProductBox.querySelector('.content-img-main1');
    var file_input2 = addProductBox.querySelector('.content-img-main2');
    var file_data1 = file_input1.files[0];
    var file_data2 = file_input2.files[0];
    dataObj.file_data1 = file_data1
    dataObj.file_data2 = file_data2
    if (validateAddProduct(dataObj)) {


    var form_data = new FormData();
    form_data.append('file1', file_data1);
    form_data.append('file2', file_data2);
    form_data.append('dataItem', JSON.stringify(dataObj));
    console.log(dataObj);
    $.ajax({
        url: '/add-product-item',
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.success) {
                insertToTable('shop', response.data);
                displayNoneAll();
                removeAllInputValue();
                showSuccessToast("Thêm sản phẩm thành công");
            } else {
                showErrorToast("Thêm sản phẩm thất bại", response.notifi);
            }
        }
    });
    }
})



// EDIT ITEM

const saveBTN = document.querySelector(".save__box");

let editRow = null;

function f_editShopBTN() {
    if (!editRow) {
        var trElement = this.closest('tr');
        editRow = trElement;
        var a_tdElement = trElement.querySelectorAll('td');
        a_tdElement = Array.from(a_tdElement);
        a_tdElement.map((element, index) => {
            var value = element.textContent.replace(/[.,]/g, '');
            if (index == 4) {
                var selectType = document.createElement('select');
                selectType.id = 'select' + index;
                selectType.innerHTML = `
                    <option value="whey">whey</option>
                    <option value="milk">milk</option>
                    <option value="vitamin">vitamin</option>
                    <option value="bcaa">bcaa</option>
                    `

                // var value = element.textContent;
                console.log("Value: ", value);
                element.textContent = ''
                for (var i = 0; i < selectType.options.length; i++) {
                    if (selectType.options[i].value == value) {
                        selectType.options[i].selected = true;
                        break;
                    }
                }
                element.appendChild(selectType);
                selectType.style.display = 'inline-block';

            } else if (index > 2 && index < 7) {

                var inputE = document.createElement('input');
                console.log(inputE)
                inputE.value = value;
                element.textContent = '';
                element.appendChild(inputE);
                saveBTN.style.display = 'block';
            }
        })
        var a_label = trElement.querySelectorAll("label");
        a_label = Array.from(a_label);
        a_label.forEach(e => e.style.display = "inline");
    } else {
        showErrorToast("Thất bại", "Vui lòng lưu dòng đang sửa")
    }
}

saveBTN.addEventListener("click", f_saveFunction)

function f_saveFunction() {
    saveBTN.style.display = 'none';
    let tdRow = editRow.querySelectorAll('td');
    tdRow = Array.from(tdRow);
    let obj = {};
    tdRow.forEach(element => {
        var inputElement = element.querySelector('input');
        var selectElement = element.querySelector('select');
        if (inputElement)
            obj[element.className] = inputElement.value;
        else if (selectElement) {
            obj[element.className] = selectElement.value;
        }
    })
    var idItem = editRow.querySelector('.ItemID');
    obj[idItem.className] = idItem.innerText;
    var accessToken = localStorage.getItem('accessToken');
    console.log("obj: ", obj);

    sendRequest(
        '/edit-item-admin-url',
        'POST',
        {
            'Authorization': 'Bearer ' + accessToken
        },
        obj,
        function (data) {
            console.log(data);
            if (data.success) {
                data.data.Cost = data.data.Cost.toLocaleString();
                console.log(data.data)
                updateRowShop(data.data, tdRow, false);
                showSuccessToast("Sửa thành công", "");
                editRow = null;
            } else {
                showErrorToast("Lỗi");
            }
        },
        function (err) {
            console.error(err);
        }
    );
    // img


    /////////////
    var a_fileInput = [
        editRow.querySelector('.MainImg').querySelector('input'),
        editRow.querySelector('.SubImg').querySelector('input'),
    ]
    a_fileInput.forEach(file_input => {
        if (file_input.files.length > 0) {
            var file_data = file_input.files[0]; // Không cần sử dụng jQuery ở đây
            var form_data = new FormData();
            form_data.append('file', file_data);
            form_data.append('Type', obj.Type);
            form_data.append('ItemID', obj.ItemID);
            var imgType = file_input.closest('td').className;
            form_data.append('imgType', imgType);
            console.log("imgType: ", imgType);
            $.ajax({
                url: '/upload',
                type: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: form_data,
                cache: false,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.success) {
                        // var data = { MainImg: response.img }
                        updateRowShop(response.data, tdRow, true);
                        console.log(response.data);
                    } else {
                        showErrorToast("Sửa thất ảnh thất bại");
                    }
                }
            });
        } else {
            console.log("No file selected.");
        }
    })

}

// REMOVE ITEM

function f_removeShopBTN() {
    console.log("ello")
}

