const showCart = document.querySelector(".container__show__cart");
const tableCart = showCart.getElementsByTagName("table");
const jsonPathCart = '../data/cartdata.json';
let myData = {};
let activeOption = "";
// Kiểm tra xem dữ liệu đã tồn tại trong localStorage chưa
if (!localStorage.getItem('cartData')) {
    fetch(jsonPathCart)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            myData = data;
            // Lưu dữ liệu vào localStorage
            localStorage.setItem('cartData', JSON.stringify(myData));
            innerTableCart(myData.carts)
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
} else {
    // Nếu dữ liệu đã tồn tại trong localStorage, sử dụng nó
    myData = JSON.parse(localStorage.getItem('cartData'));
    innerTableCart(myData.carts);
}



function innerTableCart(array) {
    const tableCart = showCart.querySelector(".table__show");
    array.map(value => {
        var trElement = document.createElement("tr");
        trElement.className = "tr__show";
        trElement.innerHTML = `
        <td class="td__show">${value.id}</td>
        <td class="td__show">${value.name}</td>
        <td class="td__show">${value.age}</td>
        <td class="td__show">${value.phoneNumber}</td>
        <td class="td__show">${value.cartType}</td>
        <td class="td__show">${value.dateStart}</td>
        <td class="td__show">${value.dateEnd}</td>
        <td class="td__show">
        <i class="fa-solid fa-pen-to-square" onclick="editCart(this)"></i>
        <i class="fa-solid fa-trash" onclick="removeCart(this)"></i>
        </td>
        `
        tableCart.appendChild(trElement);
    })

}


// add cart
const btnAddCart = document.querySelector(".container__show__cart__add__btn");
const showSide = document.querySelector(".container__show__cart__content")
let trAddArray;
let trAddArray2;
btnAddCart.addEventListener("click", () => {
    if (activeOption == "") {
        activeOption = "add";
        const tableCart = showCart.querySelector(".table__show");
        var trElement = document.createElement("tr");
        trElement.className = "trAdd tr__show";
        trElement.innerHTML = `
        <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
        <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
        <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
        <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
        <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
        <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
        <td class="td__show"><input class="input__show inputAdd" type="text" placeholder="....."></td>
        <td class="td__show">
            <i class="fa-solid fa-pen-to-square" onclick="editCart(this)"></i>
            <i class="fa-solid fa-trash" onclick="removeCart(this)"></i>
        </td>
            `
        tableCart.appendChild(trElement);
        trAddArray = document.querySelectorAll(".trAdd");
        trAddArray = Array.from(trAddArray);
    } else if (activeOption == "add") {
        showErrorToast("Bạn đang thực hiện thao tác này");
    } else if (activeOption == "edit") {
        showErrorToast("Bạn đang thực hiện thao tác chỉnh sửa thẻ, bấm lưu để tiếp tục sử dụng chức năng này");
    } else if (activeOption == "remove") {
        showErrorToast("Bạn đang thực hiện thao tác xóa thẻ, bấm lưu để tiếp tục sử dụng chức năng này");
    }

})

const saveMessage = document.querySelector(".save__message");
var saveCartElement = document.querySelector(".save-btn");
saveCartElement.addEventListener("click", () => {
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
                myData = JSON.parse(localStorage.getItem('cartData'));
                dataCompear = myData.carts;
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
                        "cartType": `${value[4]}`,
                        "dateStart": `${value[5]}`,
                        "dateEnd": `${value[6]}`
                    };

                    myData.carts.push(data);
                    localStorage.setItem('cartData', JSON.stringify(myData));
                    var trElement = document.querySelector(".trAdd");
                    trElement.classList.remove("trAdd");
                    showSuccessToast("Thêm thành công!");
                    activeOption = "";
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
        if (checkInformationValid(valueArray)) {
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
            "cartType": `${valueArray[4]}`,
            "dateStart": `${valueArray[5]}`,
            "dateEnd": `${valueArray[6]}`
        };
        console.log("indexcjagasdf", indexChange);
        if (indexChange !== -1) {
            myData.carts[indexChange] = data;
        } else {
            myData.carts.push(data);
        }
        indexChange = -1;
        localStorage.setItem('cartData', JSON.stringify(myData));
        var trElement = document.querySelector(".trEdit");
        trElement.classList.remove("trEdit");
        showSuccessToast("Sửa thành công!")
        activeOption = "";
    } else if (activeOption == "remove") {
        localStorage.setItem('cartData', JSON.stringify(dataAfterRemove));
        showSuccessToast("Xóa thành công!");
        activeOption = "";
    } else {
        showErrorToast("Vui lòng chọn chức năng!");
    }
})

function checkInformationValid(arrayData) {
    myData = JSON.parse(localStorage.getItem('cartData'));
    var data = {
        "id": `${arrayData[0]}`,
        "name": `${arrayData[1]}`,
        "age": `${Number(arrayData[2])}`,
        "phoneNumber": `${arrayData[3]}`,
        "cartType": `${arrayData[4]}`,
        "dateStart": `${arrayData[5]}`,
        "dateEnd": `${arrayData[6]}`
    };
    if (indexChange !== -1) {
        myData.carts[indexChange] = data;
    } else {
        myData.carts.push(data);
    }
    dataCompear = myData.carts;
    var test = true;
    arrayData[2] = Number(arrayData[2])
    var arrayChange = [];
    var oneTime = true;
    for (var i = 0; i < dataCompear.length -1; i++) {
        arrayChange[i] = [
            dataCompear[i].id,
            dataCompear[i].name,
            Number(dataCompear[i].age),
            dataCompear[i].phoneNumber,
            dataCompear[i].cartType,
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
        if (checkRowAddCart(arrayInput) == false) {
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

    for (let i = 0; i < a.length-1; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function checkRowAddCart(arrayElement) {
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

let trelementChange;
let indexChange = -1;
function editCart(thisElement) {
    if (activeOption == "") {
        activeOption = "edit";
        indexChange = -1;
        var trElement = thisElement.parentElement.parentElement;
        var tableElement = trElement.parentElement;
        var tableElement2 = document.querySelector(".table__show__main");
        var trAray = tableElement2.querySelectorAll("tr");
        trAray = Array.from(trAray);
        var valueEdit = getValueOnTrShow(trElement);
        trAray.map((value, index) => {
            var valueShow = getValueOnTrShow(value);
            console.log( valueShow, valueEdit);
            if (arraysEqual1( valueShow, valueEdit)) {
                indexChange = index - 1;
            }
        })
        // console.log("indexChange", indexChange);
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
    } else if (activeOption == "edit") {
        showErrorToast("vui lòng bấm lưu trước khi sửa dòng khác!");
    } else if (activeOption == "remove") {
        showErrorToast("Bạn đang thực hiện thao tác xóa, bấm lưu để tiếp tục thực hiện chức năng này!");
    } else if (activeOption == "add") {
        showErrorToast("Bạn đang thực hiện thao tác thêm thẻ, hãy hoàn tất chức năng này trước!");
    }
}

let dataAfterRemove;

function removeCart(thisElement) {
    if (activeOption == "" || activeOption == "remove" || activeOption == "add") {
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
            "cartType": `${valueArray[4]}`,
            "dateStart": `${valueArray[5]}`,
            "dateEnd": `${valueArray[6]}`
        };

        var index = myData.carts.findIndex(cart => cart.id === data.id);

        if (index !== -1) {
            myData.carts.splice(index, 1);
        }
        dataAfterRemove = myData;
    } else if (activeOption == "edit") {
        showErrorToast("Bạn đang thực hiện thao tác chỉnh sửa, bấm lưu để tiếp tục thực hiện chức năng này!");
    } else if (activeOption == "add") {
        var trElement = thisElement.parentElement.parentElement;
        if (trElement.className == "trAdd tr__show") {
            activeOption = "remove";
            trelementChange = trElement;
            trElement.remove();
            activeOption == ""
        }
        // showErrorToast("Bạn đang thực hiện thao tác thêm thẻ, hãy hoàn tất chức năng này trước!");
    }
}


function findByID(thisElement) {
    myData = JSON.parse(localStorage.getItem('cartData'));
    dataArray = myData.carts;
    const findBox = document.querySelector(".show__find__id__box");
    findBox.innerText = ""
    if (thisElement.value == "") {
        findBox.innerText = "";
    } else {
        dataArray.map((value, index) => {
            if (value.id.toLowerCase().includes(thisElement.value.toLowerCase())) {
                var spanE = document.createElement("show__find_id");
                spanE.className = "show__find_id";
                spanE.innerText = value.id;
                const inputFindID = document.querySelector(".show__input__id");
                spanE.onclick = function () {
                    var value = this.innerText;
                    inputFindID.value = value;
                    findByID(thisElement);
                };
                findBox.appendChild(spanE);
            }
        });
    }

}

const findBTN = document.querySelector(".container__show__cart__find__btn");
findBTN.addEventListener("click", () => {
    var inputID = document.querySelector(".show__input__id").value.trim();
    var selectPackage = document.querySelector(".show__input__package").value.trim();
    var inputStart = document.getElementById("input-date-start").value.trim()
    var inputEnd = document.getElementById("input-date-end").value.trim();

    myData = JSON.parse(localStorage.getItem('cartData'));
    dataArray = myData.carts;
    const tableShowElement = document.querySelector(".table__show");

    if (inputID != "" || selectPackage != "" || inputStart != "" || inputEnd != "") {
        tableShowElement.style.display = "none";
        const tableBox = document.querySelector(".container__show__cart__content");
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
                if (selectPackage !== value.cartType) {
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
                    <td class="td__show">${value.cartType}</td>
                    <td class="td__show">${value.dateStart}</td>
                    <td class="td__show">${value.dateEnd}</td>
                    <td class="td__show">
                    <i class="fa-solid fa-pen-to-square" onclick="editCart(this)"></i>
                    <i class="fa-solid fa-trash" onclick="removeCart(this)"></i>
                    </td>
                `
                tableCreate.appendChild(trCreate);

            }
        });
        tableBox.appendChild(tableCreate);
    }
})


function getValueOnTrShow(trElement) {
    var tdArray = trElement.querySelectorAll(".td__show");
    tdArray = Array.from(tdArray);
    var arrayValue = [];
    tdArray.map((value, index)=>{
        arrayValue[index] = value.innerHTML;
    })
    return arrayValue;
}
// function getValueOnTrEdit(trElement) {
//     var tdArray = trElement.innerHTML;
//     // tdArray = Array.from(tdArray);
//     console.log(tdArray)
//     var arrayValue = [];
//     // arrayValue = tdArray.map((value, index)=>{
//     //     // console.log(value.querySelector(".inputAdd"))
//     //     // console.log("value: ", value)   
//     //     return value.getAttribute("placeholder");
//     // }) 
//     // console.log(arrayValue)
// }













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
        toast.style.animation = `slideInleft ease .3s, fadeOut linear 1s ${delay}s forwards`
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
