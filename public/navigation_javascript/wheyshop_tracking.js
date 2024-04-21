import { showErrorToast } from "../src/toast.js";

const tabs = document.querySelectorAll('.tab button')
const contents = document.querySelectorAll('.content')
const orderActive = document.querySelector('.order-details');
tabs.forEach((tab, index) => {

    const content = contents[index]

    tab.onclick = function () {

        console.log(document.querySelector('.content.active'));

        document.querySelector('.tab button.active').classList.remove('active');
        
        if (orderActive.classList.contains('active')) {
            document.querySelector('.order-details.active').classList.remove('active');
        }
        if ( document.querySelector('.content').contains('active')) {
            document.querySelector('.content.active').classList.remove('active');
        }

        this.classList.add('active');
        content.classList.add('active');
    }
})


const searchInput = document.querySelector('.search-input');
setInterval(() => {
    searchInput.placeholder = "whey";
    setTimeout(() => {
        searchInput.placeholder = "dầu cá omega3";
        setTimeout(() => {
            searchInput.placeholder = "sữa tăng cân";
        }, 3000);
    }, 3000);
}, 6000);

const home = document.querySelector('.home-button')
home.onclick = function () {
    window.location.href = 'wheyshop.html'
}

const editAccount = document.querySelector('.user-account-edit');
editAccount.onclick = function () {
    window.location.href = 'information_account.html'
}

const orders = document.querySelectorAll('.order')
// orders.forEach(order => {

//     order.onclick = function () {
//         console.log(this)
//         // document.querySelector('.content.active').classList.remove('active');
//         document.querySelector('.order-details').classList.add('active');

//     }
// })

const closeDetails = document.querySelector('.close-details')
closeDetails.onclick = function () {
    document.querySelector('.order-details.active').classList.remove('active');
}




function setStyle(elements, color) {
    elements.forEach(element => {
        element.style.backgroundColor = color;
        element.style.borderColor = color;
    });
}

const processShipping = document.querySelector('.transportation-process');
const circles = document.querySelectorAll('.circle');
const wrapperCircles = document.querySelectorAll('.wrapper-circle');
const lines = document.querySelectorAll('.line');

if (processShipping.classList.contains('orderSuccess')) {
    setStyle([circles[0], wrapperCircles[0], circles[1], wrapperCircles[1], lines[0]], '#2196F3');
} else if (processShipping.classList.contains('transport')) {
    setStyle([circles[0], wrapperCircles[0], circles[1], wrapperCircles[1], lines[0], circles[2], wrapperCircles[2], lines[1]], '#2196F3');
} else if (processShipping.classList.contains('complete')) {
    setStyle([circles[0], wrapperCircles[0], circles[1], wrapperCircles[1], lines[0], circles[2], wrapperCircles[2], circles[3], wrapperCircles[3], lines[1], lines[2]], '#2196F3');
}



// const processShipping = document.querySelector('.transportation-process');
// const circle0 = document.querySelector('.circle.zero')
// const circle1 = document.querySelector('.circle.one')
// const circle2 = document.querySelector('.circle.two')
// const circle3 = document.querySelector('.circle.three')
// const wcircle0 = document.querySelector('.wrapper-circle.zero')
// const wcircle1 = document.querySelector('.wrapper-circle.one')
// const wcircle2 = document.querySelector('.wrapper-circle.two')
// const wcircle3 = document.querySelector('.wrapper-circle.three')
// const line0 = document.querySelector('.line.zero')
// const line1 = document.querySelector('.line.one')
// const line2 = document.querySelector('.line.two')

// if (processShipping.classList.contains('oderSuccess')) {
//     circle0.style.backgroundColor = '#2196F3';
//     wcircle0.style.borderColor = '#2196F3';
//     circle1.style.backgroundColor = '#2196F3';
//     wcircle1.style.borderColor = '#2196F3';
//     line0.style.backgroundColor = '#2196F3';
// } else if (processShipping.classList.contains('transport')) {
//     circle0.style.backgroundColor = '#2196F3';
//     wcircle0.style.borderColor = '#2196F3';
//     circle1.style.backgroundColor = '#2196F3';
//     wcircle1.style.borderColor = '#2196F3';
//     line0.style.backgroundColor = '#2196F3';
//     circle2.style.backgroundColor = '#2196F3';
//     wcircle2.style.borderColor = '#2196F3';
//     line1.style.backgroundColor = '#2196F3';
// } else if (processShipping.classList.contains('complete')) {
//     circle0.style.backgroundColor = '#2196F3';
//     wcircle0.style.borderColor = '#2196F3';
//     circle1.style.backgroundColor = '#2196F3';
//     wcircle1.style.borderColor = '#2196F3';
//     line0.style.backgroundColor = '#2196F3';
//     circle2.style.backgroundColor = '#2196F3';
//     wcircle2.style.borderColor = '#2196F3';
//     circle2.style.backgroundColor = '#2196F3';
//     wcircle2.style.borderColor = '#2196F3';
//     line1.style.backgroundColor = '#2196F3';
//     circle3.style.backgroundColor = '#2196F3';
//     wcircle3.style.borderColor = '#2196F3';
//     line2.style.backgroundColor = '#2196F3';
// }

// status-order

function createOrderElement(
    {
        Cost,
        MainImg,
        NameItem,
        TotalCost,
        TotalCount,
        orderID,
        timeOrder,
        status,
        Count
    }
) {

    var order = document.createElement("div");
    order.classList.add('order');
    order.innerHTML = `
            <div class="order-wrapper">
                <div class="header-order">
                    <div class="brand-offical">
                        <div class="brand-offical-logo">
                            <img class="check-icon" src="../img/shop/icon/checklist.png"
                                alt="">
                            <span>
                                OFFICAL
                            </span>
                        </div>
                        <div class="brand-name">
                            WHEZ
                        </div>
                    </div>
                    <div class="status-order ${status}">
                        Hoàn thành
                    </div>
                </div>
                <div class="first-product">
                    <div class="first-product-img">
                        <img src="${MainImg}"
                            alt="">
                    </div>
                    <div class="first-product-information">
                        <div class="information-group">
                            <div class="first-product-name">
                                ${NameItem}
                            </div>
                            <div class="first-product-quantity">
                                Số lượng:
                                <span>
                                    ${Count}
                                </span>
                            </div>
                        </div>
                        <div class="first-product-price">
                            <span>
                                ${(Count * Cost).toLocaleString()}
                            </span>
                            ₫
                        </div>
                    </div>
                </div>
                <div class="total">
                    <div class="total-products">
                        <span>
                            ${TotalCount}
                        </span>
                        sản phẩm
                        </div>
                        <div class="total-price">
                        <img src="../img/shop/icon/shield.png" alt="">
                        Thành tiền:
                        <div>
                        <span>
                            ${TotalCost.toLocaleString()}
                            </span>
                            ₫
                        </div>
                    </div>
                </div>
            </div>
    `;



    return order;
}

// GET ORDER

function createAnInforOrderBox(
    {
        MainImg,
        NameItem,
        Count,
        Cost,
        status,
        orderID
    }
) {
    var order = document.createElement("div");
    order.classList.add('product');

    order.innerHTML = `
            <div class="product-wrapper">
                <div class="product-img">
                    <img src="${MainImg}"
                        alt="">
                </div>
                <div class="product-information">
                    <div class="information-group">
                        <div class="product-name">
                            ${NameItem}
                        </div>
                        <div class="product-quantity">
                            Số lượng:
                            <span>
                                ${Count}
                            </span>
                        </div>
                    </div>
                    <div class="product-price">
                        <span>
                            ${(Count * Cost).toLocaleString()}
                        </span>
                        ₫
                    </div>
                </div>
            </div>
    `

    return order;
}

function f_eventOrderClick(orderID) {

    $.ajax({
        url: '/get-order-by-id',
        method: 'POST',
        data: { orderID },
        success: function (res) {
            if (res.login) {
                var data = res.data;
                var orderIDElement = document.querySelector(".title-order-details span");
                var totalCountProductElement = document.querySelector(".total-products span");
                var totalPriceProductElement = document.querySelector(".total-price span");
                orderIDElement.innerText = data[0].orderID;
                var countAllItem = 0;
                var costAllItem = 0;
                data.forEach(item => {
                    countAllItem+=item.Count;
                    costAllItem+= item.Count * item.Cost;
                    var orderElement = createAnInforOrderBox(item);
                    iformationOrderBox.appendChild(orderElement);
                })
                totalCountProductElement.innerText = countAllItem;
                totalPriceProductElement.innerText = costAllItem.toLocaleString();
            } else {
                showErrorToast("Chưa đăng nhập", "Vui lòng thử lại");
            }
        },
        error: function (err) {
            console.error(err);
        }
    })

    document.querySelector('.content.active').classList.remove('active');
    document.querySelector('.order-details').classList.add('active');
}


const allOrderBox = document.querySelector(".list-order-all");
const cancelOrderBox = document.querySelector(".list-order-cancel");
const transportOrderBox = document.querySelector(".list-order-transport");
const completeOrderBox = document.querySelector(".list-order-complete");
const iformationOrderBox = document.querySelector(".list-order-iformation");

const shipPrice = 26500;
const vatPrice = 0;

$(document).ready(function () {
    // $.ajax({
    //     url: '/get-cookie',
    //     type: 'GET',
    //     success: function (data) {

    //     },
    //     error: function (err) {
    //     }
    // });
    $.ajax({
        url: '/get-order-cus',
        method: 'GET',
        success: function (res) {
            var dataItem = res.data;
            var mathData = {};

            // mathData[row.orderID][TotalCost] = 0;
            // mathData[row.orderID][TotalCount] = 0;

            dataItem.forEach(row => {
                if (!mathData[row.orderID]) {
                    mathData[row.orderID] = {}; // Tạo đối tượng mới cho orderID
                    mathData[row.orderID].TotalCost = shipPrice + vatPrice; // Khởi tạo TotalCost
                    mathData[row.orderID].TotalCount = 0; // Khởi tạo TotalCount
                    // Các thuộc tính khác của mathData[row.orderID] nếu cần
                }

                for (var key in row) {
                    mathData[row.orderID][key] = row[key];
                }

                mathData[row.orderID]["TotalCost"] += row.Cost * row.Count;

                mathData[row.orderID]["TotalCount"] += row.Count;

            })

            for (var item in mathData) {
                (function (item) {

                    const orderElement = createOrderElement(mathData[item]);
                    const orderElement2 = createOrderElement(mathData[item]);

                    orderElement.addEventListener('click', function () {
                        f_eventOrderClick(mathData[item].orderID);
                    });
                    orderElement2.addEventListener('click', function () {
                        f_eventOrderClick(mathData[item].orderID);
                    });

                    allOrderBox.appendChild(orderElement2);
                    if (mathData[item].status == 'canceled') {
                        cancelOrderBox.appendChild(orderElement);
                    } else if (mathData[item].status == 'transport') {
                        transportOrderBox.appendChild(orderElement);
                    } else if (mathData[item].status == 'complete') {
                        completeOrderBox.appendChild(orderElement);
                    }
                })(item);

            }

        },
        error: function (err) {
            console.log(err);
        }
    })


})

