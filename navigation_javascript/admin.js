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
    const tableCart = showCart.getElementsByTagName("table")[0];
    array.map(value => {
        var trElement = document.createElement("tr");
        trElement.innerHTML = `
        <td>${value.id}</td>
        <td>${value.name}</td>
        <td>${value.age}</td>
        <td>${value.phoneNumber}</td>
        <td>${value.cartType}</td>
        <td>${value.dateStart}</td>
        <td>${value.dateEnd}</td>
        <td>
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
        const tableCart = showCart.getElementsByTagName("table")[0];
        var trElement = document.createElement("tr");
        trElement.className = "trAdd";
        trElement.innerHTML = `
        <td><input class="inputAdd" type="text" placeholder="....."></td>
        <td><input class="inputAdd" type="text" placeholder="....."></td>
        <td><input class="inputAdd" type="text" placeholder="....."></td>
        <td><input class="inputAdd" type="text" placeholder="....."></td>
        <td><input class="inputAdd" type="text" placeholder="....."></td>
        <td><input class="inputAdd" type="text" placeholder="....."></td>
        <td><input class="inputAdd" type="text" placeholder="....."></td>
        <td>
            <i class="fa-solid fa-pen-to-square" onclick="editCart(this)"></i>
            <i class="fa-solid fa-trash" onclick="removeCart(this)"></i>
        </td>
            `
        tableCart.appendChild(trElement);
        trAddArray = document.querySelectorAll(".trAdd");
        trAddArray = Array.from(trAddArray);
    } else if (activeOption == "add") {
        saveMessage.innerText = "Bạn đang thực hiện thao tác này";
    } else if (activeOption == "edit") {
        saveMessage.innerText = "Bạn đang thực hiện thao tác chỉnh sửa thẻ, bấm lưu để tiếp tục sử dụng chức năng này";
    } else if (activeOption == "remove") {
        saveMessage.innerText = "Bạn đang thực hiện thao tác xóa thẻ, bấm lưu để tiếp tục sử dụng chức năng này";
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
                            saveMessage.innerText = "ID trùng lặp!"
                            return;
                        }
                    }
                    if (isNaN(value[2])) {
                        saveMessage.innerText = "Tuổi là số!";
                        return;
                    }
                    var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                    if (!regex.test(value[3])) {
                        saveMessage.innerText = "Nhập đúng số điện thoại!";
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
                    saveMessage.innerText = "Thêm thành công!";
                    activeOption = "";
                })
                // if (test == false)
                //     saveMessage.innerText = "ID trùng lặp!"


            } else {
                saveMessage.innerText = "Vui lòng điền đầy đủ thông tin"
            }
        } else {
            saveMessage.innerText = "Không có gì thay đổi!"
        }
    } else if (activeOption == "edit") {
        // trelementChange
        var tdArray = trelementChange.getElementsByTagName("td");
        tdArray = Array.from(tdArray);

        var valueArray = [];
        for (var i = 0; i < tdArray.length - 1; i++) {
            var value = tdArray[i].querySelector(".inputAdd").value;
            if (value)
                valueArray[i] = value;
            else
                valueArray[i] = tdArray[i].querySelector(".inputAdd").getAttribute("placeholder")
        }

        if (checkInformationValid(valueArray)) {
            for (var i = 0; i < tdArray.length - 1; i++) {
                tdArray[i].innerHTML = `${valueArray[i]}`
            }
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

        // var index = myData.carts.findIndex(cart => cart.id === data.id);

        if (indexChange !== -1) {
            myData.carts[indexChange] = data;
        } else {
            myData.carts.push(data);
        }

        localStorage.setItem('cartData', JSON.stringify(myData));

        var trElement = document.querySelector(".trEdit");
        trElement.classList.remove("trEdit");
        saveMessage.innerText = "Sửa thành công!";
        activeOption = "";
    } else if (activeOption == "remove") {


        localStorage.setItem('cartData', JSON.stringify(dataAfterRemove));
        saveMessage.innerText = "Xóa thành công!";
        activeOption = "";
    } else {
        saveMessage.innerText = "Vui lòng chọn chức năng!"
    }

})

function checkInformationValid(arrayData) {
    myData = JSON.parse(localStorage.getItem('cartData'));
    dataCompear = myData.carts;
    var test = true;
    arrayData.map(value => {
        for (var i = 0; i < dataCompear.length; i++) {
            if (dataCompear[i].id == value[0]) {
                saveMessage.innerText = "ID trùng lặp!"
                test = false;
                return;
            }
        }
        if (isNaN(value[2])) {
            saveMessage.innerText = "Tuổi là số!";
            test = false
            return;
        }
        var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!regex.test(value[3])) {
            saveMessage.innerText = "Nhập đúng số điện thoại!";
            test = false;
            return;
        }
    });
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
        var trElement = thisElement.parentElement.parentElement;
        var tableElement = trElement.parentElement;
        var trAray = tableElement.querySelectorAll("tr");
        trAray = Array.from(trAray);
        trAray.map((value, index)=>{
            if(value === trElement){
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
    } else if (activeOption == "edit") {
        saveMessage.innerText = "vui lòng bấm lưu trước khi sửa dòng khác!";
    } else if (activeOption == "remove") {
        saveMessage.innerText = "Bạn đang thực hiện thao tác xóa, bấm lưu để tiếp tục thực hiện chức năng này!";
    } else if (activeOption == "add") {
        saveMessage.innerText = "Bạn đang thực hiện thao tác thêm thẻ, hãy hoàn tất chức năng này trước!";
    }
}

let dataAfterRemove;

function removeCart(thisElement) {
    console.log(activeOption)
    if (activeOption == "" || activeOption == "remove") {
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
        saveMessage.innerText = "Bạn đang thực hiện thao tác chỉnh sửa, bấm lưu để tiếp tục thực hiện chức năng này!";
    } else if (activeOption == "add") {
        var trElement = thisElement.parentElement.parentElement;
        if (trElement.className == "trAdd") {
            activeOption = "remove";
            trelementChange = trElement;
            trElement.remove();
            activeOption == ""
        }

        saveMessage.innerText = "Bạn đang thực hiện thao tác thêm thẻ, hãy hoàn tất chức năng này trước!";
    }
}