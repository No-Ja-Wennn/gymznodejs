function createItem(MainImg, NameItem, Cost) {
    var itemElement = document.createElement('a');
    itemElement.href = '#';
    itemElement.classList.add('item');
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
                    var elementCreate = createItem(item.MainImg, item.NameItem, item.Cost)
                    console.log(item.MainImg)
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
