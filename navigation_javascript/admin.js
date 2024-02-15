/* CLICK TO SHOW FORM */
const messageFormBTN = document.getElementById("QLMessage");
const accountFormBTN = document.getElementById("QLAccount");
const cardFormBTN = document.getElementById("QLCard");
const calendarFormBTN = document.getElementById("QLCalendar");
// messageFormBTN
const messageForm = document.querySelector(".container__show__message")
const accountForm = document.querySelector(".container__show__account")
const cardForm = document.querySelector(".container__show__card")
const calendarForm = document.querySelector(".container__show__calendar")

messageForm.style.display = "block";
accountForm.style.display = "none";
cardForm.style.display = "none";
calendarForm.style.display = "none";


const jsonPathCard = '../data/carddata.json';
const jsonPathCalendar = '../data/calendarData.json';

let myData = {};
let activeOption = "";
let activeForm = "";
let doingForm = "";

var itemsBox = document.querySelectorAll('.container__bar__item');

// li loop
for (var i = 0; i < itemsBox.length; i++) {
    itemsBox[i].addEventListener('click', function () {
        for (var j = 0; j < itemsBox.length; j++) {
            itemsBox[j].classList.remove('container__bar__item--active');
        }
        this.classList.add('container__bar__item--active');
    });
}

messageFormBTN.addEventListener("click", function () {
    messageForm.style.display = "block";
    accountForm.style.display = "none";
    cardForm.style.display = "none";
    calendarForm.style.display = "none";
    showMessage();
    saveAciveForm("message")
})

// accountFormBTN
accountFormBTN.addEventListener("click", function () {
    messageForm.style.display = "none";
    accountForm.style.display = "block";
    cardForm.style.display = "none";
    calendarForm.style.display = "none";
    showAccount();
    saveAciveForm("account")
})

// cardFormBTN
cardFormBTN.addEventListener("click", function () {
    messageForm.style.display = "none";
    accountForm.style.display = "none";
    cardForm.style.display = "block";
    calendarForm.style.display = "none";
    showCard()
    saveAciveForm("card")
    console.log("hekk")
})

// calendarFormBTN
calendarFormBTN.addEventListener("click", function () {
    messageForm.style.display = "none";
    accountForm.style.display = "none";
    cardForm.style.display = "none";
    calendarForm.style.display = "block";
    showCalendar()
    saveAciveForm("calendar")
})


// LOAD
function saveAciveForm(value) {
    activeForm = value;
    var date = new Date();
    date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000)); // Set expires to 3 days from now
    var expires = "; expires=" + date.toUTCString();
    document.cookie = "activeForm=" + JSON.stringify(value) + expires;
}

window.onload = function () {
    var name = "activeForm=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            var activeNow = JSON.parse(c.substring(name.length, c.length));
            if (activeNow == "message") {
                messageFormBTN.click()
            } else if (activeNow == "account") {
                accountFormBTN.click()
            } else if (activeNow == "card") {
                cardFormBTN.click()
            } else if (activeNow == "calendar") {
                calendarFormBTN.click()
            } else {
                // messageFormBTN.click()
            }
        }
    }
    //load mesage
    var myData = JSON.parse(localStorage.getItem('historyMessage'));
    if (myData)
        myData.map((value) => {
            if (value.sender == 'User') {
                displayBotMessage(value.message)
            }
            if (value.sender == 'Admin') {
                displayUserMessage(value.message)
            }
        })
}



// check save on active // khongbiet vie t gi day nua
function checkValidSave(valueActive, flagConsole = true) {
    if (doingForm == valueActive || doingForm == "") {
        return true;
    } else {
        if (flagConsole)
            if (doingForm == "card") {
                if (activeOption == "edit")
                    showErrorToast("Vui lòng hoàn tất chức năng sửa thẻ");
                else if (activeOption == "add")
                    showErrorToast("Vui lòng hoàn tất chức năng thêm thẻ");
                else if (activeOption == "remove")
                    showErrorToast("Vui lòng hoàn tất chức năng xóa thẻ");
            } else if (doingForm == "account") {
                if (activeOption == "edit")
                    showErrorToast("Vui lòng hoàn tất chức năng sửa tài khoản");
                else if (activeOption == "add")
                    showErrorToast("Vui lòng hoàn tất chức năng thêm tài khoản");
                else if (activeOption == "remove")
                    showErrorToast("Vui lòng hoàn tất chức năng xóa tài khoản");
            } else if (doingForm == "calendar") {
                if (activeOption == "edit")
                    showErrorToast("Vui lòng hoàn tất chức năng sửa lịch tập");
                else if (activeOption == "add")
                    showErrorToast("Vui lòng hoàn tất chức năng thêm lịch tập");
                else if (activeOption == "remove")
                    showErrorToast("Vui lòng hoàn tất chức năng xóa lịch tập");
            } else {
                showErrorToast("lỗi ở đâu đó");
            }

        return false;
    }
}

// toast
function toast({
    title = "",
    message = '',
    type = "info",
    duration = 3000
}) {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement('div');

        // auto remove
        const autoRemove = setTimeout(function () {
            main.removeChild(toast)
        }, duration + 1000)
        // remove when click
        toast.onclick = function (e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemove);
            }
        }
        const icons = {
            success: ' fas fa-circle-check',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-circle',
            error: 'fas fa-exclamation-circle',

        }
        const icon = icons[type]

        const delay = (duration / 1000).toFixed(2)
        toast.classList.add('toast', `toast__${type}`);
        toast.style.animation = `slideInleft ease .3s, fadeOutToast linear 1s ${delay}s forwards`
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <div class="toast__title">${title}</div>
                <div class="toast__msg">${message}</div>
            </div>
            <div class="toast__close">
                <i class="fa-sharp fa-solid fa-xmark"></i>
            </div>
                    `;
        main.appendChild(toast);
        setTimeout(function () {
        }, duration + 1000)
    }
}
function showSuccessToast(message) {
    toast({
        title: "Thành công",
        message: message,
        type: "success",
        duration: 5000,
    })
}
function showErrorToast(message) {
    toast({
        title: "Thất bại",
        message: message,
        type: "error",
        duration: 5000,
    })
}


// ========================
/* function of form */


/*
SHOW CART
*/

let trAddArray;
let trAddArray2;

function innerTableCard(array) {
    if (cardForm) {
        const tableCard = cardForm.querySelector(".table__show");
        array.map(value => {
            var trElement = document.createElement("tr");
            trElement.className = "tr__show";
            trElement.innerHTML = `
        <td class="td__show">${value.id}</td>
        <td class="td__show">${value.name}</td>
        <td class="td__show">${value.age}</td>
        <td class="td__show">${value.phoneNumber}</td>
        <td class="td__show">${value.cardType}</td>
        <td class="td__show">${value.dateStart}</td>
        <td class="td__show">${value.dateEnd}</td>
        <td class="td__show">
        <i class="fa-solid fa-pen-to-square" onclick="editCard(this)"></i>
        <i class="fa-solid fa-trash" onclick="removeCard(this)"></i>
        </td>
        `
            tableCard.appendChild(trElement);
        })
    }
}

function showCard() {
    const firstTd = cardForm.querySelector(".td__show");
    // Kiểm tra xem dữ liệu đã tồn tại trong localStorage chưa
    if (firstTd == null)
        if (!localStorage.getItem('cardData')) {
            fetch(jsonPathCard)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    myData = data;
                    localStorage.setItem('cardData', JSON.stringify(myData));
                    innerTableCard(myData.cards)
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        } else {
            // Nếu dữ liệu đã tồn tại trong localStorage, sử dụng nó
            myData = JSON.parse(localStorage.getItem('cardData'));
            innerTableCard(myData.cards);
        }



    const findBTN = cardForm.querySelector(".container__show__card__find__btn");
    findBTN.addEventListener("click", () => {
        var inputID = cardForm.querySelector(".show__input__id").value.trim();
        var selectPackage = cardForm.querySelector(".show__input__package").value.trim();
        var inputStart = document.getElementById("input-date-start").value.trim()
        var inputEnd = document.getElementById("input-date-end").value.trim();

        const findBox = document.querySelector(".show__find__id__box");
        findBox.innerText = ""

        myData = JSON.parse(localStorage.getItem('cardData'));
        dataArray = myData.cards;
        const tableShowElement = cardForm.querySelector(".table__show");

        if (inputID != "" || selectPackage != "" || inputStart != "" || inputEnd != "") {
            tableShowElement.style.display = "none";
            const tableBox = cardForm.querySelector(".container__show__card__content");
            // tableBox.innerHTML = "";
            var tableCreate = document.createElement("table");
            tableCreate.className = "table__show";
            var trCreate = document.createElement("tr");
            trCreate.className = "tr__show";
            trCreate.innerHTML = `
            <th class="th__show">Mã thẻ</th>
            <th class="th__show">Tên Hội Viên</th>
            <th class="th__show">Tuổi</th>
            <th class="th__show">Số điện thoại</th>
            <th class="th__show">Loại Thành Viên</th>
            <th class="th__show">Ngày gia nhập</th>
            <th class="th__show">Ngày Hết Hạn Thẻ</th>
            <th class="th__show">Thao tác</th>
        `
            tableCreate.appendChild(trCreate);
            dataArray.map((value, index) => {
                var test = true;
                if (inputID != "" && test == true) {
                    if (!value.id.includes(inputID)) {
                        test = false;
                    }
                }
                if (selectPackage != "" && test == true) {
                    if (selectPackage !== value.cardType) {
                        test = false;
                    }
                }
                if (inputStart != "" && test == true) {
                    if (inputStart !== value.dateStart) {
                        test = false;
                    }
                }
                if (inputEnd != "" && test == true) {
                    if (inputEnd !== value.dateEnd) {
                        test = false;
                    }
                }
                if (inputID == "" && selectPackage == "" && inputStart == "" && inputEnd == "") {
                    test = false;
                }
                if (test == true) {

                    var trCreate = document.createElement("tr");
                    trCreate.className = "tr__show";
                    trCreate.innerHTML = `
                    <td class="td__show">${value.id}</td>
                    <td class="td__show">${value.name}</td>
                    <td class="td__show">${value.age}</td>
                    <td class="td__show">${value.phoneNumber}</td>
                    <td class="td__show">${value.cardType}</td>
                    <td class="td__show">${value.dateStart}</td>
                    <td class="td__show">${value.dateEnd}</td>
                    <td class="td__show">
                    <i class="fa-solid fa-pen-to-square" onclick="editCard(this)"></i>
                    <i class="fa-solid fa-trash" onclick="removeCard(this)"></i>
                    </td>
                `
                    tableCreate.appendChild(trCreate);

                }
            });
            tableBox.appendChild(tableCreate);
        }
    })

}

function addCard() {
    if (checkValidSave("card") && activeOption == "") {
        doingForm = "card";
        activeOption = "add";
        const tableCard = cardForm.querySelector(".table__show");
        var trElement = document.createElement("tr");
        trElement.className = "trAdd tr__show";
        trElement.innerHTML = `
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="date" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="date" placeholder="....."></td>
            <td class="td__show">
                <i class="fa-solid fa-pen-to-square" onclick="editCard(this)"></i>
                <i class="fa-solid fa-trash" onclick="removeCard(this)"></i>
            </td>
                `
        tableCard.appendChild(trElement);
        trAddArray = cardForm.querySelectorAll(".trAdd");
        trAddArray = Array.from(trAddArray);
    } else if (doingForm == "card" && activeOption == "add") {
        showErrorToast("Bạn đang thực hiện thao tác này");
    } else if (doingForm == "card" && activeOption == "edit") {
        showErrorToast("Bạn đang thực hiện thao tác chỉnh sửa thẻ, bấm lưu để tiếp tục sử dụng chức năng này");
    } else if (doingForm == "card" && activeOption == "remove") {
        showErrorToast("Bạn đang thực hiện thao tác xóa thẻ, bấm lưu để tiếp tục sử dụng chức năng này");
    }
}

function saveCard() {
    const saveMessage = cardForm.querySelector(".save__message");
    if (activeOption == "add") {
        if (trAddArray) {
            if (checkAll(trAddArray)) {
                // đủ thông tin
                var arrayData = [];
                trAddArray.map((tr, index1) => {
                    var inputArray = tr.querySelectorAll(".inputAdd");
                    inputArray = Array.from(inputArray);
                    inputArray.map((inputE, index2) => {
                        var value = inputE.value;
                        if (!arrayData[index1]) {
                            arrayData[index1] = [];
                        }
                        arrayData[index1][index2] = value;
                    })
                })
                myData = JSON.parse(localStorage.getItem('cardData'));
                dataCompear = myData.cards;
                arrayData.map(value => {
                    for (var i = 0; i < dataCompear.length; i++) {
                        if (dataCompear[i].id == value[0]) {
                            showErrorToast("ID trùng lặp!");
                            return;
                        }
                    }

                    if (isNaN(value[2])) {
                        showErrorToast("Tuổi là số!");
                        return;
                    }
                    var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                    if (!regex.test(value[3])) {
                        showErrorToast("Nhập đúng số điện thoại!");
                        return;
                    }
                    data = {
                        "id": `${value[0]}`,
                        "name": `${value[1]}`,
                        "age": `${value[2]}`,
                        "phoneNumber": `${value[3]}`,
                        "cardType": `${value[4]}`,
                        "dateStart": `${value[5]}`,
                        "dateEnd": `${value[6]}`
                    };

                    myData.cards.push(data);
                    localStorage.setItem('cardData', JSON.stringify(myData));
                    var trElement = cardForm.querySelector(".trAdd");
                    trElement.classList.remove("trAdd");
                    showSuccessToast("Thêm thành công!");
                    activeOption = "";
                    doingForm = "";
                })
                // if (test == false)
                //     saveMessage.innerText = "ID trùng lặp!"


            } else {
                showErrorToast("Vui lòng điền đầy đủ thông tin");

            }
        } else {
            showErrorToast("Không có gì thay đổi!");
        }
    } else if (activeOption == "edit") {
        var tdArray = trelementChange.getElementsByTagName("td");
        tdArray = Array.from(tdArray);
        var valueArray = [];
        for (var i = 0; i < tdArray.length - 1; i++) {
            var value = tdArray[i].querySelector(".inputAdd").value;
            if (value != "") {
                if (i >= 5)
                    valueArray[i] = convertDateFormat(value);
                else
                    valueArray[i] = value;
                console.log(value)
            }
            // else if (i >= 5) {
            //     valueArray[i] = tdArray[i].querySelector(".inputAdd").getAttribute("value")
            //     console.log(valueArray[i])
            // }
            else
                valueArray[i] = tdArray[i].querySelector(".inputAdd").getAttribute("placeholder")
        }
        if (checkInformationValidCard(valueArray)) {
            for (var i = 0; i < tdArray.length - 1; i++) {
                tdArray[i].innerHTML = `${valueArray[i]}`
            }
        } else {
            return;
        }
        var data = {
            "id": `${valueArray[0]}`,
            "name": `${valueArray[1]}`,
            "age": `${Number(valueArray[2])}`,
            "phoneNumber": `${valueArray[3]}`,
            "cardType": `${valueArray[4]}`,
            "dateStart": `${valueArray[5]}`,
            "dateEnd": `${valueArray[6]}`
        };
        if (indexChange !== -1) {
            myData.cards[indexChange] = data;
        } else {
            myData.cards.push(data);
        }
        indexChange = -1;
        localStorage.setItem('cardData', JSON.stringify(myData));
        var trElement = cardForm.querySelector(".trEdit");
        trElement.classList.remove("trEdit");
        showSuccessToast("Sửa thành công!")
        activeOption = "";
        doingForm = "";
    } else if (activeOption == "remove") {
        localStorage.setItem('cardData', JSON.stringify(dataAfterRemove));
        showSuccessToast("Xóa thành công!");
        activeOption = "";
        doingForm = "";
    } else {
        showErrorToast("Vui lòng chọn chức năng!");
    }
}

function checkInformationValidCard(arrayData) {
    myData = JSON.parse(localStorage.getItem('cardData'));
    var data = {
        "id": `${arrayData[0]}`,
        "name": `${arrayData[1]}`,
        "age": `${Number(arrayData[2])}`,
        "phoneNumber": `${arrayData[3]}`,
        "cardType": `${arrayData[4]}`,
        "dateStart": `${arrayData[5]}`,
        "dateEnd": `${arrayData[6]}`
    };
    if (indexChange !== -1) {
        myData.cards[indexChange] = data;
    } else {
        myData.cards.push(data);
    }
    dataCompear = myData.cards;
    var test = true;
    arrayData[2] = Number(arrayData[2])
    var arrayChange = [];
    var oneTime = true;
    for (var i = 0; i < dataCompear.length - 1; i++) {
        arrayChange[i] = [
            dataCompear[i].id,
            dataCompear[i].name,
            Number(dataCompear[i].age),
            dataCompear[i].phoneNumber,
            dataCompear[i].cardType,
            dataCompear[i].dateStart,
            dataCompear[i].dateEnd
        ]
        if (arraysEqual(arrayChange[i], arrayData) && oneTime == true) {
            oneTime = false;
            continue;
        }
        if (dataCompear[i].id == arrayData[0]) {
            showErrorToast("ID trùng lặp!");
            test = false;
        }
    }
    if (isNaN(arrayData[2])) {
        showErrorToast("Tuổi là số!");
        test = false
    }
    var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!regex.test(arrayData[3])) {
        showErrorToast("Nhập đúng số điện thoại!");
        test = false;
    }
    return test;
}

function checkAll(trArray) {
    var ktra = true;
    trArray.map(element => {
        var arrayInput = element.getElementsByTagName("input")
        if (ktra == false) return;
        if (checkRowAddCard(arrayInput) == false) {
            ktra = false;
        }
    })
    return ktra;
}

function arraysEqual(a, b) {// LENGTH  -1;
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function arraysEqual1(a, b) {// LENGTH  -1;
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length - 1; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function checkRowAddCard(arrayElement) {
    var ktra = true;
    arrayElement = Array.from(arrayElement);
    arrayElement.map(value => {
        if (ktra == false) return;
        if (value.value == "") {
            ktra = false;
        }
    })
    return ktra;
}

function formatDate(str) {
    var parts = str.split("/");
    if (parts)
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    return str;
}
function convertDateFormat(str) {
    var parts = str.split("-");
    if (parts)
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return str;
}
let trelementChange;
let indexChange = -1;
function editCard(thisElement) {
    if (checkValidSave("card") && activeOption == "") {
        doingForm = "card";
        activeOption = "edit";
        indexChange = -1;
        var trElement = thisElement.parentElement.parentElement;
        var tableElement = trElement.parentElement;
        var tableElement2 = cardForm.querySelector(".table__show__main");
        var trAray = tableElement2.querySelectorAll("tr");
        trAray = Array.from(trAray);
        var valueEdit = getValueOnTrShow(trElement);
        trAray.map((value, index) => {
            var valueShow = getValueOnTrShow(value);
            if (arraysEqual1(valueShow, valueEdit)) {
                indexChange = index - 1;
            }
        })
        trelementChange = trElement;
        var tdArray = trElement.getElementsByTagName("td")
        tdArray = Array.from(tdArray);
        var valueArray = [];
        for (var i = 0; i < tdArray.length - 1; i++) {
            valueArray[i] = tdArray[i].innerHTML;
        }
        trElement.className = "trEdit";
        for (var i = 0; i < tdArray.length - 1; i++) {
            if (i >= 5) {
                tdArray[i].innerHTML = `<input class="inputAdd" type="date" value="${formatDate(valueArray[i])}">`
            } else
                tdArray[i].innerHTML = `<input class="inputAdd" type="text" placeholder="${valueArray[i]}">`
        }
    } else if (doingForm == "card" && activeOption == "edit") {
        showErrorToast("vui lòng bấm lưu trước khi sửa dòng khác!");
    } else if (doingForm == "card" && activeOption == "remove") {
        showErrorToast("Bạn đang thực hiện thao tác xóa thẻ, bấm lưu để tiếp tục thực hiện chức năng này!");
    } else if (doingForm == "card" && activeOption == "add") {
        showErrorToast("Bạn đang thực hiện thao tác thêm thẻ, hãy hoàn tất chức năng này trước!");
    }
}

let dataAfterRemove;

function removeCard(thisElement) {
    if (checkValidSave("card") && (activeOption == "" || activeOption == "remove" || activeOption == "add")) {
        doingForm = "card";
        activeOption = "remove";
        var trElement = thisElement.parentElement.parentElement;
        trelementChange = trElement;
        trElement.remove();
        // trelementChange
        var tdArray = trelementChange.getElementsByTagName("td");
        tdArray = Array.from(tdArray);

        var valueArray = [];
        for (var i = 0; i < tdArray.length - 1; i++) {
            var value = tdArray[i].innerHTML;
            if (value)
                valueArray[i] = value;
            else
                valueArray[i] = tdArray[i].querySelector(".inputAdd").getAttribute("placeholder")
        }

        // Tạo một đối tượng data mới từ mảng giá trị
        var data = {
            "id": `${valueArray[0]}`,
            "name": `${valueArray[1]}`,
            "age": `${valueArray[2]}`,
            "phoneNumber": `${valueArray[3]}`,
            "cardType": `${valueArray[4]}`,
            "dateStart": `${valueArray[5]}`,
            "dateEnd": `${valueArray[6]}`
        };
        myData = JSON.parse(localStorage.getItem('cardData'));
        var index = myData.cards.findIndex(card => card.id === data.id);

        if (index !== -1) {
            myData.cards.splice(index, 1);
        }
        dataAfterRemove = myData;
    } else if (doingForm == "card" && activeOption == "edit") {
        showErrorToast("Bạn đang thực hiện thao tác chỉnh sửa thẻ, bấm lưu để tiếp tục thực hiện chức năng này!");
    } else if (checkValidSave("card", false) && doingForm == "card" && activeOption == "add") {
        var trElement = thisElement.parentElement.parentElement;
        if (trElement.className == "trAdd tr__show") {
            activeOption = "remove";
            trelementChange = trElement;
            trElement.remove();
            activeOption == ""
            doingForm = "";
        }
        // showErrorToast("Bạn đang thực hiện thao tác thêm thẻ, hãy hoàn tất chức năng này trước!");
    }
}

function findByIDCard(thisElement) {
    myData = JSON.parse(localStorage.getItem('cardData'));
    dataArray = myData.cards;
    const findBox = cardForm.querySelector(".show__find__id__box");
    findBox.innerText = ""
    if (thisElement.value == "") {
        findBox.innerText = "";
    } else {
        dataArray.map((value, index) => {
            if (value.id.toLowerCase().includes(thisElement.value.toLowerCase())) {
                var spanE = document.createElement("show__find_id");
                spanE.className = "show__find_id";
                spanE.innerText = value.id;
                const inputFindID = cardForm.querySelector(".show__input__id");
                spanE.onclick = function () {
                    var value = this.innerText;
                    inputFindID.value = value;
                    findByIDCard(thisElement);
                };
                findBox.appendChild(spanE);
            }
        });
    }

}

function getValueOnTrShow(trElement) {
    var tdArray = trElement.querySelectorAll(".td__show");
    tdArray = Array.from(tdArray);
    var arrayValue = [];
    tdArray.map((value, index) => {
        arrayValue[index] = value.innerHTML;
    })
    return arrayValue;
}

function showMessage() {
    function sendMessage(message) {
        localStorage.setItem('adminMessage', message);
        // Lưu tin nhắn vào lịch sử
        var historyMessage = JSON.parse(localStorage.getItem('historyMessage')) || [];
        historyMessage.push({ sender: 'Admin', message: message });
        localStorage.setItem('historyMessage', JSON.stringify(historyMessage));

    }
    // Kiểm tra tin nhắn mới từ người dùng sau mỗi giây
    setInterval(function () {
        var userMessage = localStorage.getItem('userMessage');
        if (userMessage) {
            // Hiển thị tin nhắn từ người dùng
            displayBotMessage(userMessage)
            // Xóa tin nhắn từ người dùng sau khi đã hiển thị
            localStorage.removeItem('userMessage');

            chatBoxMessage.scrollTop = chatBoxMessage.scrollHeight + 100;
            // Lưu tin nhắn vào lịch sử
            // var historyMessage = JSON.parse(localStorage.getItem('historyMessage')) || [];
            // historyMessage.push({ sender: 'User', message: userMessage });
            // localStorage.setItem('historyMessage', JSON.stringify(historyMessage));
        }
    }, 1000);


    const inputBox = document.querySelector('.chatbox__bottom__input');
    const inputElement = inputBox.querySelector('input')
    const sendButton = inputBox.querySelector('i');
    sendButton.addEventListener('click', async () => { // Thêm async vào đây
        const valueInput = inputElement.value.trim();
        if (valueInput) {
            displayUserMessage(valueInput);
            inputElement.value = '';
            sendMessage(valueInput)
            chatBoxMessage.scrollTop = chatBoxMessage.scrollHeight + 100;
        }
    });
    inputElement.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendButton.click();
        }
    });
}
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

function displayUserMessage(message) {
    const chatBoxItemUser = makeLi(message, "chatbox__message__item__right");
    chatBoxList.appendChild(chatBoxItemUser);
}
function displayBotMessage(message) {
    const chatBoxItemBot = makeLi(message, "chatbox__message__item__left");
    chatBoxList.appendChild(chatBoxItemBot);
}


// acount ql
// email: "quyen@gmail.com"
// id: "MT05"
// name: "Quyen Developer"
// password: "123"

const jsonPathAccount = '../data/loginData.json';

function findByIDAccount(thisElement) {
    myData = JSON.parse(localStorage.getItem('loginData'));
    dataArray = myData.accounts;
    const findBox = document.querySelector(".show__find__id__box");
    findBox.innerText = "";
    if (thisElement.value == "") {
        findBox.innerText = "";
    } else {
        var k = 1;
        dataArray.map((value, index) => {
            if (k > 10) return;
            if (value.id.toLowerCase().includes(thisElement.value.toLowerCase())) {
                k++;
                var spanE = document.createElement("show__find_id");
                spanE.className = "show__find_id";
                spanE.innerText = value.id;
                const inputFindID = document.querySelector(".show__input__id");
                spanE.onclick = function () {
                    var value = this.innerText;
                    inputFindID.value = value;
                    findByIDAccount(thisElement);
                };
                findBox.appendChild(spanE);
            }
        });
    }

}

function innerTableAccount(array) {
    if (cardForm) {
        const tableAccount = accountForm.querySelector(".table__show");
        array.map(value => {
            var trElement = document.createElement("tr");
            trElement.className = "tr__show";
            trElement.innerHTML = `
        <td class="td__show">${value.id}</td>
        <td class="td__show">${value.name}</td>
        <td class="td__show">${value.email}</td>
        <td class="td__show">${value.password}</td>
        <td class="td__show">
        <i class="fa-solid fa-pen-to-square" onclick="editAccount(this)"></i>
        <i class="fa-solid fa-trash" onclick="removeAccount(this)"></i>
        </td>
        `
            tableAccount.appendChild(trElement);
        })
    }
}

function showAccount() {
    const tableCard = accountForm.getElementsByTagName("table");
    const firstTd = accountForm.querySelector(".td__show");
    // Kiểm tra xem dữ liệu đã tồn tại trong localStorage chưa
    if (firstTd == null)
        if (!localStorage.getItem('loginData')) {
            fetch(jsonPathAccount)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    myData = data;
                    // Lưu dữ liệu vào localStorage
                    localStorage.setItem('loginData', JSON.stringify(myData));
                    innerTableAccount(myData.accounts)
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        } else {
            // Nếu dữ liệu đã tồn tại trong localStorage, sử dụng nó
            myData = JSON.parse(localStorage.getItem('loginData'));
            innerTableAccount(myData.accounts);
        }
    const findBTN = accountForm.querySelector(".container__show__find__btn");
    findBTN.addEventListener("click", () => {
        var inputID = accountForm.querySelector(".show__input__id").value.trim();
        const findBox = document.querySelector(".show__find__id__box");
        findBox.innerText = ""
        // var selectPackage = accountForm.querySelector(".show__input__package").value.trim();
        // var inputStart = accountForm.getElementById("input-date-start").value.trim()
        // var inputEnd = accountForm.getElementById("input-date-end").value.trim();

        myData = JSON.parse(localStorage.getItem('loginData'));
        dataArray = myData.accounts;
        const tableShowElement = accountForm.querySelector(".table__show");

        if (inputID != "") {
            tableShowElement.style.display = "none";
            const tableBox = accountForm.querySelector(".container__show__content");
            // tableBox.innerHTML = "";
            var tableCreate = document.createElement("table");
            tableCreate.className = "table__show";
            var trCreate = document.createElement("tr");
            trCreate.className = "tr__show";
            trCreate.innerHTML = `
            <th class="th__show">ID</th>
            <th class="th__show">EMAIL</th>
            <th class="th__show">USERNAME</th>
            <th class="th__show">PASSWORD</th>
            <th class="th__show"></th>
            `
            tableCreate.appendChild(trCreate);
            dataArray.map((value, index) => {
                var test = true;
                if (inputID != "" && test == true) {
                    if (!value.id.includes(inputID)) {
                        test = false;
                    }
                }
                if (inputID == "") {
                    test = false;
                }
                if (test == true) {
                    var trCreate = document.createElement("tr");
                    trCreate.className = "tr__show";
                    trCreate.innerHTML = `
                    <td class="td__show">${value.id}</td>
                    <td class="td__show">${value.name}</td>
                    <td class="td__show">${value.email}</td>
                    <td class="td__show">${value.password}</td>
                    <td class="td__show">
                    <i class="fa-solid fa-pen-to-square" onclick="editAccount(this)"></i>
                    <i class="fa-solid fa-trash" onclick="removeAccount(this)"></i>
                    </td>
                `
                    tableCreate.appendChild(trCreate);

                }
            });
            tableBox.appendChild(tableCreate);
        }
    })
}

function addAccount() {
    var btnAddAccount = accountForm.querySelector(".container__show__account__add__btn");
    if (checkValidSave("account") && activeOption == "") {
        doingForm = "account";
        activeOption = "add";
        const tableCard = accountForm.querySelector(".table__show");
        var trElement = document.createElement("tr");
        trElement.className = "trAdd tr__show";
        trElement.innerHTML = `
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show">
                <i class="fa-solid fa-pen-to-square" onclick="editAccount(this)"></i>
                <i class="fa-solid fa-trash" onclick="removeAccount(this)"></i>
            </td>
                `
        tableCard.appendChild(trElement);
        trAddArray = accountForm.querySelectorAll(".trAdd");
        trAddArray = Array.from(trAddArray);
    } else if (doingForm == "account" && activeOption == "add") {
        showErrorToast("Bạn đang thực hiện thao tác này");
    } else if (doingForm == "account" && activeOption == "edit") {
        showErrorToast("Bạn đang thực hiện thao tác chỉnh sửa tài khoản, bấm lưu để tiếp tục sử dụng chức năng này");
    } else if (doingForm == "account" && activeOption == "remove") {
        showErrorToast("Bạn đang thực hiện thao tác xóa tài khoản, bấm lưu để tiếp tục sử dụng chức năng này");
    }
}

function saveAccount() {
    if (activeOption == "add") {
        if (trAddArray) {
            if (checkAllAccount(trAddArray)) {
                // đủ thông tin
                var arrayData = [];
                trAddArray.map((tr, index1) => {
                    var inputArray = tr.querySelectorAll(".inputAdd");
                    inputArray = Array.from(inputArray);
                    inputArray.map((inputE, index2) => {
                        var value = inputE.value;
                        if (!arrayData[index1]) {
                            arrayData[index1] = [];
                        }
                        arrayData[index1][index2] = value;
                    })
                })
                myData = JSON.parse(localStorage.getItem('loginData'));
                dataCompear = myData.accounts;
                arrayData.map(value => {
                    for (var i = 0; i < dataCompear.length; i++) {
                        if (dataCompear[i].id == value[0]) {
                            showErrorToast("ID trùng lặp!");
                            return;
                        }
                    }

                    // if (isNaN(value[2])) {
                    //     showErrorToast("Tuổi là số!");
                    //     return;
                    // }
                    // var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                    // if (!regex.test(value[3])) {
                    //     showErrorToast("Nhập đúng số điện thoại!");
                    //     return;
                    // }
                    data = {
                        "id": `${value[0]}`,
                        "name": `${value[1]}`,
                        "email": `${value[2]}`,
                        "password": `${value[3]}`
                    };

                    myData.accounts.push(data);
                    localStorage.setItem('loginData', JSON.stringify(myData));
                    var trElement = accountForm.querySelector(".trAdd");
                    trElement.classList.remove("trAdd");
                    showSuccessToast("Thêm thành công!");
                    activeOption = "";
                    doingForm = "";
                })
                // if (test == false)
                //     saveMessage.innerText = "ID trùng lặp!"
            } else {
                showErrorToast("Vui lòng điền đầy đủ thông tin");

            }
        } else {
            showErrorToast("Không có gì thay đổi!");
        }
    } else if (activeOption == "edit") {
        var tdArray = trelementChange.getElementsByTagName("td");
        tdArray = Array.from(tdArray);
        var valueArray = [];
        for (var i = 0; i < tdArray.length - 1; i++) {
            var value = tdArray[i].querySelector(".inputAdd").value;
            if (value != "") {
                valueArray[i] = value;
            }
            else
                valueArray[i] = tdArray[i].querySelector(".inputAdd").getAttribute("placeholder")
        }
        if (checkInformationValidAccount(valueArray)) {
            for (var i = 0; i < tdArray.length - 1; i++) {
                tdArray[i].innerHTML = `${valueArray[i]}`
            }
        } else {
            return;
        }
        var data = {
            "id": `${valueArray[0]}`,
            "name": `${valueArray[1]}`,
            "email": `${valueArray[2]}`,
            "password": `${valueArray[3]}`
        };
        if (indexChange !== -1) {
            myData.accounts[indexChange] = data;
        } else {
            myData.accounts.push(data);
        }
        indexChange = -1;
        localStorage.setItem('loginData', JSON.stringify(myData));
        var trElement = accountForm.querySelector(".trEdit");
        trElement.classList.remove("trEdit");
        showSuccessToast("Sửa thành công!")
        activeOption = "";
        doingForm = "";
    } else if (activeOption == "remove") {
        localStorage.setItem('loginData', JSON.stringify(dataAfterRemove));
        showSuccessToast("Xóa thành công!");
        activeOption = "";
        doingForm = "";
    } else {
        showErrorToast("Vui lòng chọn chức năng!");
    }
}

function checkRowAddAccount(arrayElement) {
    var ktra = true;
    arrayElement = Array.from(arrayElement);
    arrayElement.map(value => {
        if (ktra == false) return;
        if (value.value == "") {
            ktra = false;
        }
    })
    return ktra;
}
function checkAllAccount(trArray) {
    var ktra = true;
    trArray.map(element => {
        var arrayInput = element.getElementsByTagName("input")
        if (ktra == false) return;
        if (checkRowAddAccount(arrayInput) == false) {
            ktra = false;
        }
    })
    return ktra;
}

function checkInformationValidAccount(arrayData) {
    myData = JSON.parse(localStorage.getItem('loginData'));
    var data = {
        "id": `${arrayData[0]}`,
        "name": `${arrayData[1]}`,
        "email": `${arrayData[2]}`,
        "password": `${arrayData[3]}`
    };
    if (indexChange !== -1) {
        myData.accounts[indexChange] = data;
    } else {
        myData.accounts.push(data);
    }
    dataCompear = myData.accounts;
    var test = true;
    arrayData[2] = arrayData[2];
    var arrayChange = [];
    var oneTime = true;
    for (var i = 0; i < dataCompear.length - 1; i++) {
        arrayChange[i] = [
            dataCompear[i].id,
            dataCompear[i].name,
            dataCompear[i].email,
            dataCompear[i].password
        ]
        if (arraysEqual(arrayChange[i], arrayData) && oneTime == true) {
            oneTime = false;
            continue;
        }
        if (dataCompear[i].id == arrayData[0]) {
            showErrorToast("ID trùng lặp!");
            test = false;
        }
    }
    // if (isNaN(arrayData[2])) {
    //     showErrorToast("Tuổi là số!");
    //     test = false
    // }
    // var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    // if (!regex.test(arrayData[3])) {
    //     showErrorToast("Nhập đúng số điện thoại!");
    //     test = false;
    // }
    return test;
}

function removeAccount(thisElement) {
    if (checkValidSave("account") && (activeOption == "" || activeOption == "remove" || activeOption == "add")) {
        doingForm = "account";
        activeOption = "remove";
        var trElement = thisElement.parentElement.parentElement;
        trelementChange = trElement;
        trElement.remove();
        // trelementChange
        var tdArray = trelementChange.getElementsByTagName("td");
        tdArray = Array.from(tdArray);

        var valueArray = [];
        for (var i = 0; i < tdArray.length - 1; i++) {
            var value = tdArray[i].innerHTML;
            if (value)
                valueArray[i] = value;
            else
                valueArray[i] = tdArray[i].querySelector(".inputAdd").getAttribute("placeholder")
        }

        // Tạo một đối tượng data mới từ mảng giá trị
        var data = {
            "id": `${valueArray[0]}`,
            "name": `${valueArray[1]}`,
            "email": `${valueArray[2]}`,
            "password": `${valueArray[3]}`
        };
        myData = JSON.parse(localStorage.getItem('loginData'));
        var index = myData.accounts.findIndex(card => card.id === data.id);

        if (index !== -1) {
            myData.accounts.splice(index, 1);
        }
        dataAfterRemove = myData;
    } else if (doingForm == "account" && activeOption == "edit") {
        showErrorToast("Bạn đang thực hiện thao tác chỉnh sửa, bấm lưu để tiếp tục thực hiện chức năng này!");
    } else if (checkValidSave("account", false) && doingForm == "account" && activeOption == "add") {
        var trElement = thisElement.parentElement.parentElement;
        if (trElement.className == "trAdd tr__show") {
            activeOption = "remove";
            trelementChange = trElement;
            trElement.remove();
            activeOption == ""
            doingForm = "";
        }
        // showErrorToast("Bạn đang thực hiện thao tác thêm thẻ, hãy hoàn tất chức năng này trước!");
    }
}

function editAccount(thisElement) {
    if (checkValidSave("account") && activeOption == "") {
        doingForm = "account";
        activeOption = "edit";
        indexChange = -1;
        var trElement = thisElement.parentElement.parentElement;
        var tableElement = trElement.parentElement;
        var tableElement2 = accountForm.querySelector(".table__show__main");
        var trAray = tableElement2.querySelectorAll("tr");
        trAray = Array.from(trAray);
        var valueEdit = getValueOnTrShow(trElement);
        trAray.map((value, index) => {
            var valueShow = getValueOnTrShow(value);
            if (arraysEqual1(valueShow, valueEdit)) {
                indexChange = index - 1;
            }
        })
        trelementChange = trElement;
        var tdArray = trElement.getElementsByTagName("td")
        tdArray = Array.from(tdArray);
        var valueArray = [];
        for (var i = 0; i < tdArray.length - 1; i++) {
            valueArray[i] = tdArray[i].innerHTML;
        }
        trElement.className = "trEdit";
        for (var i = 0; i < tdArray.length - 1; i++) {
            tdArray[i].innerHTML = `<input class="inputAdd" type="text" placeholder="${valueArray[i]}">`
        }
    } else if (doingForm == "account" && activeOption == "edit") {
        showErrorToast("vui lòng bấm lưu trước khi sửa dòng khác!");
    } else if (doingForm == "account" && activeOption == "remove") {
        showErrorToast("Bạn đang thực hiện thao tác xóa tài khoản, bấm lưu để tiếp tục thực hiện chức năng này!");
    } else if (doingForm == "account" && activeOption == "add") {
        showErrorToast("Bạn đang thực hiện thao tác thêm tài khoản, hãy hoàn tất chức năng này trước!");
    }
}

function findByIDCalendar(thisElement) {
    myData = JSON.parse(localStorage.getItem('calendarData'));
    dataArray = myData.calendars;
    const findBox = calendarForm.querySelector(".show__find__id__box");
    findBox.innerText = "";
    if (thisElement.value == "") {
        findBox.innerText = "";
    } else {
        var k = 1;
        dataArray.map((value, index) => {
            if (k > 10) return;
            if (value.id.toLowerCase().includes(thisElement.value.toLowerCase())) {
                k++;
                var spanE = document.createElement("show__find_id");
                spanE.className = "show__find_id";
                spanE.innerText = value.id;
                const inputFindID = calendarForm.querySelector(".show__input__id");
                spanE.onclick = function () {
                    var value = this.innerText;
                    inputFindID.value = value;
                    findByIDCalendar(thisElement);
                };
                findBox.appendChild(spanE);
            }
        });
    }

}

function innerTableCalendar(array) {
    if (cardForm) {
        const tableCalendar = calendarForm.querySelector(".table__show");
        array.map(value => {
            var trElement = document.createElement("tr");
            trElement.className = "tr__show";
            trElement.innerHTML = `
        <td class="td__show">${value.id}</td>
        <td class="td__show">${value.name}</td>
        <td class="td__show">${value.date}</td>
        <td class="td__show">${value.timeStart}</td>
        <td class="td__show">${value.timeEnd}</td>
        <td class="td__show">${value.type}</td>
        <td class="td__show">${value.ptName}</td>
        <td class="td__show">${value.note}</td>
        <td class="td__show">
        <i class="fa-solid fa-pen-to-square" onclick="editCalendar(this)"></i>
        <i class="fa-solid fa-trash" onclick="removeCalendar(this)"></i>
        </td>
        `
            tableCalendar.appendChild(trElement);
        })
    }
}

function showCalendar() {
    const tableCard = calendarForm.getElementsByTagName("table");
    const firstTd = calendarForm.querySelector(".td__show");
    // Kiểm tra xem dữ liệu đã tồn tại trong localStorage chưa
    if (firstTd == null)
        if (!localStorage.getItem('calendarData')) {
            fetch(jsonPathCalendar)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    myData = data;
                    // Lưu dữ liệu vào localStorage
                    localStorage.setItem('calendarData', JSON.stringify(myData));
                    innerTableCalendar(myData.calendars)
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        } else {
            // Nếu dữ liệu đã tồn tại trong localStorage, sử dụng nó
            myData = JSON.parse(localStorage.getItem('calendarData'));
            innerTableCalendar(myData.calendars);
        }
    // oke//89

    const findBTN = calendarForm.querySelector(".container__show__find__btn");
    findBTN.addEventListener("click", () => {
        var inputID = calendarForm.querySelector(".show__input__id").value.trim();
        const findBox = document.querySelector(".show__find__id__box");
        findBox.innerText = ""
        // var selectPackage = calendarForm.querySelector(".show__input__package").value.trim();
        // var inputStart = calendarForm.getElementById("input-date-start").value.trim()
        // var inputEnd = calendarForm.getElementById("input-date-end").value.trim();
        myData = JSON.parse(localStorage.getItem('calendarData'));
        dataArray = myData.calendars;
        const tableShowElement = calendarForm.querySelector(".table__show");
        if (inputID != "") {
            tableShowElement.style.display = "none";
            const tableBox = calendarForm.querySelector(".container__show__content");
            // tableBox.innerHTML = "";
            var tableCreate = document.createElement("table");
            tableCreate.className = "table__show";
            var trCreate = document.createElement("tr");
            trCreate.className = "tr__show";
            trCreate.innerHTML = `
            <th class="th__show">Mã thẻ</th>
            <th class="th__show">Tên Hội Viên</th>
            <th class="th__show">Ngày tập</th>
            <th class="th__show">Thời gian bắt đầu</th>
            <th class="th__show">Thời gian kết thúc</th>
            <th class="th__show">Bài tập</th>
            <th class="th__show">Huấn luyện viên</th>
            <th class="th__show">Thao tác</th>
            <th class="th__show"></th>
            `
            tableCreate.appendChild(trCreate);
            dataArray.map((value, index) => {
                var test = true;
                if (inputID != "" && test == true) {
                    if (!value.id.includes(inputID)) {
                        test = false;
                    }
                }
                if (inputID == "") {
                    test = false;
                }
                if (test == true) {

                    var trCreate = document.createElement("tr");
                    trCreate.className = "tr__show";
                    trCreate.innerHTML = `
                    <td class="td__show">${value.id}</td>
                    <td class="td__show">${value.name}</td>
                    <td class="td__show">${value.date}</td>
                    <td class="td__show">${value.timeStart}</td>
                    <td class="td__show">${value.timeEnd}</td>
                    <td class="td__show">${value.type}</td>
                    <td class="td__show">${value.ptName}</td>
                    <td class="td__show">${value.note}</td>
                    <td class="td__show">
                    <i class="fa-solid fa-pen-to-square" onclick="editCalendar(this)"></i>
                    <i class="fa-solid fa-trash" onclick="removeCalendar(this)"></i>
                    </td>
                `
                    tableCreate.appendChild(trCreate);

                }
            });
            tableBox.appendChild(tableCreate);
        }
    })

}

function saveCalendar() {
    const saveMessage = calendarForm.querySelector(".save__message");
    var saveCalendarElement = calendarForm.querySelector(".save-btn");
    if (activeOption == "add") {
        if (trAddArray) {
            if (checkAllCalendar(trAddArray)) {
                // đủ thông tin
                var arrayData = [];
                trAddArray.map((tr, index1) => {
                    var inputArray = tr.querySelectorAll(".inputAdd");
                    inputArray = Array.from(inputArray);
                    inputArray.map((inputE, index2) => {
                        var value = inputE.value;
                        if (!arrayData[index1]) {
                            arrayData[index1] = [];
                        }
                        arrayData[index1][index2] = value;
                    })
                })
                myData = JSON.parse(localStorage.getItem('calendarData'));
                dataCompear = myData.calendars;
                arrayData.map(value => {
                    for (var i = 0; i < dataCompear.length; i++) {
                        if (dataCompear[i].id == value[0]) {
                            showErrorToast("ID trùng lặp!");
                            return;
                        }
                    }

                    // if (isNaN(value[2])) {
                    //     showErrorToast("Tuổi là số!");
                    //     return;
                    // }
                    // var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                    // if (!regex.test(value[3])) {
                    //     showErrorToast("Nhập đúng số điện thoại!");
                    //     return;
                    // }
                    data = {
                        "id": `${value[0]}`,
                        "name": `${value[1]}`,
                        "date": `${value[2]}`,
                        "timeStart": `${value[3]}`,
                        "timeEnd": `${value[4]}`,
                        "type": `${value[5]}`,
                        "ptName": `${value[6]}`,
                        "note": `${value[7]}`
                    };

                    myData.calendars.push(data);
                    localStorage.setItem('calendarData', JSON.stringify(myData));
                    var trElement = calendarForm.querySelector(".trAdd");
                    trElement.classList.remove("trAdd");
                    showSuccessToast("Thêm thành công!");
                    activeOption = "";
                    doingForm = "";
                })
                // if (test == false)
                //     saveMessage.innerText = "ID trùng lặp!"
            } else {
                showErrorToast("Vui lòng điền đầy đủ thông tin");
            }
        } else {
            showErrorToast("Không có gì thay đổi!");
        }
    } else if (activeOption == "edit") {
        var tdArray = trelementChange.getElementsByTagName("td");
        tdArray = Array.from(tdArray);
        var valueArray = [];
        for (var i = 0; i < tdArray.length - 1; i++) {
            var value = tdArray[i].querySelector(".inputAdd").value;
            if (value != "") {
                valueArray[i] = value;
            }
            else
                valueArray[i] = tdArray[i].querySelector(".inputAdd").getAttribute("placeholder")
        }
        if (checkInformationValidCalendar(valueArray)) {
            for (var i = 0; i < tdArray.length - 1; i++) {
                tdArray[i].innerHTML = `${valueArray[i]}`
            }
        } else {
            return;
        }
        var data = {
            "id": `${valueArray[0]}`,
            "name": `${valueArray[1]}`,
            "date": `${valueArray[2]}`,
            "timeStart": `${valueArray[3]}`,
            "timeEnd": `${valueArray[4]}`,
            "type": `${valueArray[5]}`,
            "ptName": `${valueArray[6]}`,
            "note": `${valueArray[7]}`
        };
        if (indexChange !== -1) {
            myData.calendars[indexChange] = data;
        } else {
            myData.calendars.push(data);
        }
        indexChange = -1;
        localStorage.setItem('calendarData', JSON.stringify(myData));
        var trElement = calendarForm.querySelector(".trEdit");
        trElement.classList.remove("trEdit");
        showSuccessToast("Sửa thành công!")
        activeOption = "";
        doingForm = "";

    } else if (activeOption == "remove") {
        localStorage.setItem('calendarData', JSON.stringify(dataAfterRemove));
        showSuccessToast("Xóa thành công!");
        activeOption = "";
        doingForm = "";

    } else {
        showErrorToast("Vui lòng chọn chức năng!");
    }
}

function addCalendar() {
    var btnAddCalendar = calendarForm.querySelector(".container__show__calendar__add__btn");
    var showSide = cardForm.querySelector(".container__show__card__content")
    if (checkValidSave("calendar") && activeOption == "") {
        doingForm = "calendar";
        activeOption = "add";
        const tableCard = calendarForm.querySelector(".table__show");
        var trElement = document.createElement("tr");
        trElement.className = "trAdd tr__show";
        trElement.innerHTML = `
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="date" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
            <td class="td__show">
                <i class="fa-solid fa-pen-to-square" onclick="editCalendar(this)"></i>
                <i class="fa-solid fa-trash" onclick="removeCalendar(this)"></i>
            </td>
                `
        tableCard.appendChild(trElement);
        trAddArray = calendarForm.querySelectorAll(".trAdd");
        trAddArray = Array.from(trAddArray);
    } else if (doingForm == "calendar" && activeOption == "add") {
        showErrorToast("Bạn đang thực hiện thao tác này");
    } else if (doingForm == "calendar" && activeOption == "edit") {
        showErrorToast("Bạn đang thực hiện thao tác chỉnh sửa lịch tập, bấm lưu để tiếp tục sử dụng chức năng này");
    } else if (doingForm == "calendar" && activeOption == "remove") {
        showErrorToast("Bạn đang thực hiện thao tác xóa lịch tập, bấm lưu để tiếp tục sử dụng chức năng này");
    }
}


function checkRowAddCalendar(arrayElement) {
    var ktra = true;
    arrayElement = Array.from(arrayElement);
    arrayElement.map(value => {
        if (ktra == false) return;
        if (value.value == "") {
            ktra = false;
        }
    })
    return ktra;
}
function checkAllCalendar(trArray) {
    var ktra = true;
    trArray.map(element => {
        var arrayInput = element.getElementsByTagName("input")
        if (ktra == false) return;
        if (checkRowAddCalendar(arrayInput) == false) {
            ktra = false;
        }
    })
    return ktra;
}

function checkInformationValidCalendar(arrayData) {
    myData = JSON.parse(localStorage.getItem('calendarData'));
    var data = {
        "id": `${arrayData[0]}`,
        "name": `${arrayData[1]}`,
        "date": `${arrayData[2]}`,
        "timeStart": `${arrayData[3]}`,
        "timeEnd": `${arrayData[4]}`,
        "type": `${arrayData[5]}`,
        "ptName": `${arrayData[6]}`,
        "note": `${arrayData[7]}`
    };
    if (indexChange !== -1) {
        myData.calendars[indexChange] = data;
    } else {
        myData.calendars.push(data);
    }
    dataCompear = myData.calendars;
    var test = true;
    arrayData[2] = arrayData[2];
    var arrayChange = [];
    var oneTime = true;
    for (var i = 0; i < dataCompear.length - 1; i++) {
        arrayChange[i] = [
            dataCompear[i].id,
            dataCompear[i].name,
            dataCompear[i].date,
            dataCompear[i].timeStart,
            dataCompear[i].timeEnd,
            dataCompear[i].type,
            dataCompear[i].ptName,
            dataCompear[i].note
        ]
        if (arraysEqual(arrayChange[i], arrayData) && oneTime == true) {
            oneTime = false;
            continue;
        }
        if (dataCompear[i].id == arrayData[0]) {
            showErrorToast("ID trùng lặp!");
            test = false;
        }
    }
    // if (isNaN(arrayData[2])) {
    //     showErrorToast("Tuổi là số!");
    //     test = false
    // }
    // var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    // if (!regex.test(arrayData[3])) {
    //     showErrorToast("Nhập đúng số điện thoại!");
    //     test = false;
    // }
    return test;
}

function removeCalendar(thisElement) {
    if (checkValidSave("calendar") && (activeOption == "" || activeOption == "remove" || activeOption == "add")) {
        doingForm = "calendar";
        activeOption = "remove";
        var trElement = thisElement.parentElement.parentElement;
        trelementChange = trElement;
        trElement.remove();
        // trelementChange
        var tdArray = trelementChange.getElementsByTagName("td");
        tdArray = Array.from(tdArray);

        var valueArray = [];
        for (var i = 0; i < tdArray.length - 1; i++) {
            var value = tdArray[i].innerHTML;
            if (value)
                valueArray[i] = value;
            else
                valueArray[i] = tdArray[i].querySelector(".inputAdd").getAttribute("placeholder")
        }

        // Tạo một đối tượng data mới từ mảng giá trị
        var data = {
            "id": `${valueArray[0]}`,
            "name": `${valueArray[1]}`,
            "date": `${valueArray[2]}`,
            "timeStart": `${valueArray[3]}`,
            "timeEnd": `${valueArray[4]}`,
            "type": `${valueArray[5]}`,
            "ptName": `${valueArray[6]}`,
            "note": `${valueArray[7]}`
        };
        myData = JSON.parse(localStorage.getItem('calendarData'));
        var index = myData.calendars.findIndex(card => card.id === data.id);

        if (index !== -1) {
            myData.calendars.splice(index, 1);
        }
        dataAfterRemove = myData;
    } else if (doingForm == "calendar" && activeOption == "edit") {
        showErrorToast("Bạn đang thực hiện thao tác chỉnh sửa, bấm lưu để tiếp tục thực hiện chức năng này!");
    } else if (checkValidSave("calendar", false) && doingForm == "calendar" && activeOption == "add") {
        var trElement = thisElement.parentElement.parentElement;
        if (trElement.className == "trAdd tr__show") {
            activeOption = "remove";
            trelementChange = trElement;
            trElement.remove();
            activeOption == ""
            doingForm = "";

        }
        // showErrorToast("Bạn đang thực hiện thao tác thêm thẻ, hãy hoàn tất chức năng này trước!");
    }
}

function editCalendar(thisElement) {
    if (checkValidSave("calendar") && activeOption == "") {
        doingForm = "calendar";
        activeOption = "edit";
        indexChange = -1;
        var trElement = thisElement.parentElement.parentElement;
        var tableElement = trElement.parentElement;
        var tableElement2 = calendarForm.querySelector(".table__show__main");
        var trAray = tableElement2.querySelectorAll("tr");
        trAray = Array.from(trAray);
        var valueEdit = getValueOnTrShow(trElement);
        trAray.map((value, index) => {
            var valueShow = getValueOnTrShow(value);
            if (arraysEqual1(valueShow, valueEdit)) {
                indexChange = index - 1;
            }
        })
        trelementChange = trElement;
        var tdArray = trElement.getElementsByTagName("td")
        tdArray = Array.from(tdArray);
        var valueArray = [];
        for (var i = 0; i < tdArray.length - 1; i++) {
            valueArray[i] = tdArray[i].innerHTML;
        }
        trElement.className = "trEdit";
        for (var i = 0; i < tdArray.length - 1; i++) {
            if (i == 3 || i == 4) {
                tdArray[i].innerHTML = `<input class="inputAdd" type="time" value="${valueArray[i]}">`
                console.log(tdArray[i])
            } else
                tdArray[i].innerHTML = `<input class="inputAdd" type="text" placeholder="${valueArray[i]}">`
        }
    } else if (doingForm == "calendar" && activeOption == "edit") {
        showErrorToast("vui lòng bấm lưu trước khi sửa dòng khác!");
    } else if (doingForm == "calendar" && activeOption == "remove") {
        showErrorToast("Bạn đang thực hiện thao tác xóa lịch tập, bấm lưu để tiếp tục thực hiện chức năng này!");
    } else if (doingForm == "calendar" && activeOption == "add") {
        showErrorToast("Bạn đang thực hiện thao tác thêm lịch tập, hãy hoàn tất chức năng này trước!");
    }
}