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
const searchResultBox = document.getElementById("search-result");
const searchListBox = document.getElementById("list-item-search");
const exitSearchBTN = searchResultBox.querySelector('i');


function itemEvent(item, itemID) {
    // event.preventDefault();
    const productName = item.querySelector('.name span').textContent;
    const productCost = item.querySelector('.cost').textContent.trim();
    const productImgSrc = item.querySelector('.item-img img').getAttribute('src');
    const productTitle = item.closest('.product-style').querySelector('.product-title h1').textContent;

    productNameElement.textContent = productName;
    productCostElement.textContent = productCost;
    totalCostElement.textContent = productCost;
    namePageInPathBar.textContent = productTitle;
    nameProductInPathBar.textContent = productName;
    mainImgElement.setAttribute('src', productImgSrc);

    detailsItem.style.display = 'flex';
    header.style.position = 'fixed'
    mainContent.style.opacity = '0';
    html.style.overflow = 'hidden';
    chooseOption.id = itemID;
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
                    ${Cost}
                    <span>
                        ₫
                    </span>
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
                    console.log(cost)
                    var elementCreate = createItem(item.ItemID, item.MainImg, item.NameItem, cost)
                    // console.log(item.MainImg)
                    if (item.MainImg.includes('../img/shop/whey')) {
                        wheyList.appendChild(elementCreate);
                    } else if (item.MainImg.includes('../img/shop/milk')) {
                        milkList.appendChild(elementCreate);
                    } else if (item.MainImg.includes('../img/shop/vitamin')) {
                        vitaminList.appendChild(elementCreate);
                    } else if (item.MainImg.includes('../img/shop/bcaa')) {
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

a_viral.map((value, index)=>{
    a_viral[index].addEventListener("click", function() {
        a_products[index].scrollIntoView({ behavior: 'smooth' });
    });    
})