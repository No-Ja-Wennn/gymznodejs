import { activeLoginBox, activeNecessaryForm } from "../src/function.js";
import { showErrorToast, showSuccessToast } from "../src/toast.js";


const html = document.querySelector('html');
const container = document.querySelector('.container');
const header = document.querySelector('.header');
const mainContent = document.querySelector('.main-content');
const listItem = document.querySelectorAll('.item');
const detailsItem = document.querySelector('.product-details');
const productNameElement = document.querySelector('.name-product span');
const productCostElement = document.querySelector('.cost');
const totalCostElement = document.querySelector('.total span');
const namePageInPathBar = document.querySelector('.page-products a');
const nameProductInPathBar = document.querySelector('.current-product a');
const mainImgElement = document.querySelector('.main-img img');
const productTitleElement = document.querySelector('.product-title h1');
const chooseOption = document.querySelector(".choose-options");
const buyNow = chooseOption.querySelector(".buy-now");
const addCart = chooseOption.querySelector(".add-cart");
const searchResultBox = document.getElementById("search-result");
const searchListBox = document.getElementById("list-item-search");
const exitSearchBTN = searchResultBox.querySelector('i');

const mainProduct = document.querySelector(".main-product");
const plusCountMainProduct = mainProduct.querySelector(".plus-button");
const minusCountMainProduct = mainProduct.querySelector(".minus-button");
const inputCountMainProduct = mainProduct.querySelector(".input-quantily");
const costOneProduct = mainProduct.querySelector(".cost");
const costTotalProduct = mainProduct.querySelector(".total");
const costTotalSpanProduct = costTotalProduct.querySelector("span");


function itemEvent(item, itemID) {
    // event.preventDefault();
    const productName = item.querySelector('.name span').textContent;
    const productCost = item.querySelector('.cost').textContent.trim().replaceAll(',', '.');
    const productImgSrc = item.querySelector('.item-img img').getAttribute('src');
    const productTitle = item.closest('.product-style').querySelector('.product-title h1').textContent;

    productNameElement.textContent = productName;
    productCostElement.textContent = productCost;
    totalCostElement.textContent = productCost;
    namePageInPathBar.textContent = productTitle;
    nameProductInPathBar.textContent = productName;
    mainImgElement.setAttribute('src', productImgSrc);

    costTotalSpanProduct.innerText = productCost;


    detailsItem.style.display = 'flex';
    header.style.position = 'fixed'
    mainContent.style.opacity = '0';
    html.style.overflow = 'hidden';
    chooseOption.id = itemID;

    inputCountMainProduct.value = 1;
}


function itemEvent2({
    ItemID,
    NameItem,
    Cost,
    MainImg,
}) {
    console.log(ItemID)
    Cost = Cost.toLocaleString();
    // // event.preventDefault();
    // const productName = item.querySelector('.name span').textContent;
    // const productCost = item.querySelector('.cost').textContent.trim();
    // const productImgSrc = item.querySelector('.item-img img').getAttribute('src');
    // const productTitle = item.closest('.product-style').querySelector('.product-title h1').textContent;

    productNameElement.textContent = NameItem;
    productCostElement.textContent = Cost;
    totalCostElement.textContent = Cost;
    // namePageInPathBar.textContent = productTitle;
    nameProductInPathBar.textContent = NameItem;
    mainImgElement.setAttribute('src', MainImg);

    costTotalSpanProduct.innerText = Cost;


    detailsItem.style.display = 'flex';
    header.style.position = 'fixed'
    mainContent.style.opacity = '0';
    html.style.overflow = 'hidden';
    chooseOption.id = ItemID;

    inputCountMainProduct.value = 1;
}

buyNow.addEventListener("click", f_buyNowBTN);
addCart.addEventListener("click", f_addCartBTN);

function f_buyNowBTN() {
    var ItemID = this.closest('.choose-options').id;
    console.log(ItemID);
}
function f_addCartBTN() {
    var ItemID = this.closest('.choose-options').id;
    var Count = inputCountMainProduct.value;
    if (Count > 0) {
        $.ajax({
            url: '/add-cart-url',
            type: 'POST',
            data: { ItemID, Count },
            success: function (data) {
                console.log(data);
                if (data.success) {
                    showSuccessToast(data.msg, "");
                } else {
                    if (!data.login) {
                        showErrorToast("Lỗi", data.msg);
                        activeNecessaryForm();
                        activeLoginBox();
                    }
                }
            },
            error: function (err) {

            }
        })
    } else {
        showErrorToast("Số lượng sản phẩm không hợp lệ", "");
    }
}

function createItem(ItemID, MainImg, NameItem, Cost) {
    var itemElement = document.createElement('a');
    itemElement.href = '#';
    itemElement.classList.add('item');
    itemElement.classList.add(ItemID);
    itemElement.addEventListener("click", () => {
        itemEvent(itemElement, ItemID)
    });
    itemElement.innerHTML = `
        <div class="item-img">
            <div class="item-img-wrapper">
                <img src="${MainImg}" alt="">
            </div>
        </div>
        <div class="item-information">
            <div class="item-information-wrapper">
                <div class="auth">
                    <div class="auth-wrapper">
                        <div class="auth-icon">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <div class="auth-content">
                            CHÍNH HÃNG
                        </div>
                    </div>
                </div>
                <div class="name">
                    <span>
                        ${NameItem}
                    </span>
                </div>
                <div class="star">
                    <div class="star-icon">
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="star-icon">
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="star-icon">
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="star-icon">
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="star-icon">
                        <i class="fa-solid fa-star"></i>
                    </div>
                </div>
                <div class="cost">
                    ${Cost} ₫
                </div>
            </div>
            <div class="brand-ship">
                <div class="brand">
                    <img src="../img/shop/ghn.png" alt="">
                </div>
                <div class="brand">
                    <img src="../img/shop/j&t.png" alt="">
                </div>
            </div>
        </div>`;
    return itemElement;
}

const wheyProduct = document.querySelector(".whey-products");
const wheyList = wheyProduct.querySelector(".list-item");

const milkProduct = document.querySelector(".milk-products");
const milkList = milkProduct.querySelector(".list-item");

const vitaminProduct = document.querySelector(".vitamin-products");
const vitaminList = vitaminProduct.querySelector(".list-item");

const bcaaProduct = document.querySelector(".bcaa-products");
const bcaaList = bcaaProduct.querySelector(".list-item");


$(document).ready(function () {
    $.ajax({
        url: "/get-product-item",
        type: 'GET',
        success: function (data) {
            if (data.success) {
                var a_item = data.value;
                a_item.forEach(item => {
                    var cost = item.Cost.toLocaleString().replaceAll('.', ',');
                    var elementCreate = createItem(item.ItemID, item.MainImg, item.NameItem, cost)
                    if (item.Type == "whey") {
                        wheyList.appendChild(elementCreate);
                    } else if (item.Type == "milk") {
                        milkList.appendChild(elementCreate);
                    } else if (item.Type == "vitamin") {
                        vitaminList.appendChild(elementCreate);
                    } else if (item.Type == "bcaa") {
                        bcaaList.appendChild(elementCreate);
                    } else {
                        console.log("sản phẩm khonong đúng");
                    }
                })
            } else {
                // lỗi code
            }
        },
        error: function (err) {
            console.err(err);
        }
    })
});


// FIND ITEM
$('#search-form').submit(function (e) {
    e.preventDefault();
    $.ajax({
        url: '/get-item-search',
        type: 'POST',
        data: $(this).serialize(),
        success: function (data) {
            if (data.success) {
                searchResultBox.style.display = 'flex';
                html.style.overflow = 'hidden';
                var items = data.items
                items.forEach(value => {
                    var cost = item.Cost.toLocaleString().replaceAll('.', ',');
                    var element = createItem(value.ItemID, value.MainImg, value.NameItem, cost)
                    searchListBox.appendChild(element);
                })
            } else {
                console.log(data)
            }
        },
        error: function (err) {
            console.log(err)
        }
    })

})
exitSearchBTN.addEventListener("click", function () {
    searchResultBox.style.display = 'none';
    html.style.overflow = 'auto';
    searchInput.value = '';
})


// 

const viralSearch = document.querySelector(".viral-search-wrapper");
let a_viral = viralSearch.querySelectorAll("button");
a_viral = Array.from(a_viral);
let a_products = document.querySelectorAll(".product-style");
a_products = Array.from(a_products);

a_viral = Array.from(a_viral);

a_viral.map((value, index) => {
    a_viral[index].addEventListener("click", function () {
        a_products[index].scrollIntoView({ behavior: 'smooth' });
    });
})


// CHECK OUT
const cartShowMini = document.querySelector(".cart-show");

let a_plusItem = cartShowMini.querySelectorAll(".plus");
let a_minusItem = cartShowMini.querySelectorAll(".minus");

a_plusItem = [...a_plusItem];
a_minusItem = [...a_minusItem];

a_plusItem.forEach(plus => {
    plus.addEventListener("click", function () {
        let inputCountItem = this.closest('.item-quantity').querySelector(".quantity");
        if (inputCountItem.value < 99)
            inputCountItem.value++;
    })
})
a_minusItem.forEach(minus => {
    minus.addEventListener("click", function () {
        let inputCountItem = this.closest('.item-quantity').querySelector(".quantity");
        if (inputCountItem.value > 0)
            inputCountItem.value--;

    })
})



plusCountMainProduct.addEventListener("click", () => {
    if (inputCountMainProduct.value < 99) {
        inputCountMainProduct.value++;
        var productCost = parseInt(productCostElement.textContent.replace(/[₫,.]/g, '').trim()) * parseInt(inputCountMainProduct.value);
        costTotalSpanProduct.innerHTML = `${productCost.toLocaleString()} ₫`;
    }
})
minusCountMainProduct.addEventListener("click", () => {
    if (inputCountMainProduct.value > 1) {
        inputCountMainProduct.value--;
        var productCost = parseInt(productCostElement.textContent.replace(/[₫,.]/g, '').trim()) * parseInt(inputCountMainProduct.value);
        costTotalSpanProduct.innerHTML = `${productCost.toLocaleString()} ₫`;
    }
})

inputCountMainProduct.addEventListener("input", function () {

    var inputValue = inputCountMainProduct.value;
    inputCountMainProduct.value = parseInt(inputValue);
    if (isNaN(inputValue) || inputValue == '') {
        inputCountMainProduct.value = 0;
    } else {
        var productCost = parseInt(productCostElement.textContent.replace(/[₫,.]/g, '').trim()) * parseInt(inputCountMainProduct.value);
        costTotalSpanProduct.innerHTML = `${productCost.toLocaleString()} ₫`;
    }
})

function HTMLItemCart({ MainImg, NameItem, Count, CostAll, Cost, ItemID }) {
    const itemCart = document.createElement('div');
    itemCart.className = "item-in-cart"
    itemCart.innerHTML = `
                <div class="item-img">
                    <img src="${MainImg}"
                        alt="">
                </div>
                <div class="item-information">
                    <div class="information-group">
                        <div class="item-name">
                            ${NameItem}
                        </div>
                        <div class="item-quantity">
                            <button class="plus">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                            <input class="quantity" type="text" value="${Count}">
                            <button class="minus">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="item-price">
                        ${CostAll}
                        <span>
                            ₫
                        </span>
                    </div>
                </div>
        `;

    itemCart.querySelector('.item-img').addEventListener("click", function () {
        itemEvent2({ ItemID, MainImg, NameItem, Cost });
        // itemID,
        // NameItem,
        // Cost,
        // MainImg,
    })

    itemCart.querySelector('.plus').addEventListener('click', function () {
        let inputCountItem = this.closest('.item-quantity').querySelector(".quantity");
        if (inputCountItem.value < 99)
            inputCountItem.value++;
    })
    itemCart.querySelector('.minus').addEventListener('click', function () {
        let inputCountItem = this.closest('.item-quantity').querySelector(".quantity");
        if (inputCountItem.value > 0)
            inputCountItem.value--;

    })
    return itemCart;
}

//// show item cart
const cartButton2 = document.querySelector('.cart-button button');
const listItemCartShow = cartShowMini.querySelector(".list-items");
const totalCartShow = cartShowMini.querySelector(".total");
const cartCountE = document.querySelector(".cart-count");

cartButton2.addEventListener("click", f_getItemCart);

function f_getItemCart() {
    $.ajax({
        url: '/get-item-cart',
        type: 'GET',
        success: function (res) {
            if (res.success) {
                listItemCartShow.innerHTML = '';
                let cost = 0;
                res.data.forEach(value => {
                    cost += value.Cost * value.Count;
                    value.CostAll = (value.Cost * value.Count).toLocaleString();
                    var divE = HTMLItemCart(value)
                    listItemCartShow.appendChild(divE);
                })
                totalCartShow.innerHTML = `Tổng <span>${cost.toLocaleString()}<span>₫</span></span>`;
                cartCountE.innerText = res.data.length;
            }
        },
        error: function (err) {

        }
    }
    )
}
$(document).ready(function () {
    f_getItemCart();
})


