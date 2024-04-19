import { hidenLoginBox } from "../src/function.js";
import { showErrorToast } from "../src/toast.js";
import { checkValidPayAll } from "../src/validate.js";


const listItemMain = document.querySelector('.list-items-wrapper');
const totalBox = document.querySelector(".total");
const totalPriceProduct = totalBox.querySelector(".total-price-product");
const totalQuantityProduct = totalBox.querySelector(".total-quantity-product");
const totalPriceShip = totalBox.querySelector(".total-price-ship");
const totalPriceVat = totalBox.querySelector(".total-price-vat");
const finalTotalPrice = totalBox.querySelector(".final-total-price");



function HTMLItemCart({ MainImg, NameItem, Count, Cost, ItemID }) {
    const itemCart = document.createElement('div');
    itemCart.className = "item"
    itemCart.innerHTML = `
            <div class="item-img">
                <img src="${MainImg}" alt="">
            </div>
            <div class="item-information">
                <div class="information-group">
                    <div class="item-name">
                        ${NameItem}
                    </div>
                    <div class="item-quantity">
                        Số lượng:
                        <span>
                            ${Count}
                        </span>
                    </div>
                </div>
                <div class="item-price">
                    ${Cost.toLocaleString()}
                    <span>
                        ₫
                    </span>
                </div>
            </div>
         `;
    return itemCart;
}

const shipPrice = 26500;
const vatPrice = 0;
const defaultAddressInput = document.getElementById("default");
const newAddressInput = document.getElementById("new");
const defaultAddressLabel = document.querySelector('label[for="default"]');
const newAddressLabel = document.querySelector('label[for="new"]');

const emailElement = document.getElementById("email");
const nameElement = document.getElementById("name");
const phonenumberElement = document.getElementById("phonenumber");
const addressElement = document.getElementById("address");


newAddressInput.addEventListener("click", function () {
    addressElement.value = '';
})

let addressSave = '';

defaultAddressInput.addEventListener("click", function () {
    console.log("ehll")
    addressElement.value = addressSave;
})

$(document).ready(function () {
    var localValue = JSON.parse(localStorage.getItem('tempItem'));
    const { ItemID, count } = localValue;

    $.ajax({
        url: '/get-address-cus',
        method: 'POST',
        data: { ItemID },
        success: function (response) {
            console.log(response);
            var customerData = response.data;

            if (response.have == false) {
                console.log(response.address);
                defaultAddressInput.setAttribute('disabled', true);
                newAddressInput.setAttribute('checked', true);
                defaultAddressLabel.style.opacity = 0.8;
                defaultAddressLabel.style.cursor = "not-allowed";
                defaultAddressInput.style.cursor = "not-allowed";

            } else {
                // newAddressInput.setAttribute('disabled', true);
                defaultAddressInput.setAttribute('checked', true);
                // newAddressLabel.style.color = "#999";
                // newAddressLabel.style.cursor = "not-allowed";
                // newAddressInput.style.cursor = "not-allowed";
                addressElement.value = customerData.address;
                addressSave = customerData.address;
            }


            emailElement.value = customerData.email;
            nameElement.value = customerData.name;
            phonenumberElement.value = customerData.phoneNumber;
            // addressElement = customerData.email;
        },
        error: function (err) {
            console.log(err);
        }
    })


    console.log(localValue)
    $.ajax({
        url: '/get-item-by-id',
        type: 'POST',
        data: { ItemID },
        success: function (res) {
            if (res.success) {
                var data = res.data;
                data.Count = count;
                console.log(data);

                var element = HTMLItemCart(data);

                listItemMain.appendChild(element);

                totalPriceProduct.querySelector('span').innerText = (count * data.Cost).toLocaleString();
                totalQuantityProduct.querySelector('span').innerText = count
                totalPriceShip.querySelector('span').innerText = shipPrice.toLocaleString();
                totalPriceVat.querySelector('span').innerText = vatPrice.toLocaleString();
                var finalPrice = parseInt(count) * data.Cost + shipPrice + vatPrice;
                finalTotalPrice.querySelector('span').innerText = finalPrice.toLocaleString();

                // localStorage.removeItem('tempItem')
            }
        },
        error: function (err) {
            console.error(err);
        }
    })
})


const payAllBTN = document.getElementById("pay-all-product");
payAllBTN.addEventListener("click", f_payAll);

const orderSuccessful = document.querySelector('.order-succesful')
const pay = document.querySelector('.button-payment')

const online = document.getElementById("online");
const offline = document.getElementById("offline");

console.log(online.value
    , offline.value)

function f_payAll() {
    var localValue = JSON.parse(localStorage.getItem('tempItem'));
    const { ItemID, count } = localValue;
    let payMethod = 'offline';
    if(online.checked){
        payMethod = 'online';
    }else{
        payMethod = 'offline';
    }
    var objPay = {
        name: nameElement.value,
        email: emailElement.value,
        phoneNumber: phonenumberElement.value,
        address: addressElement.value,
        ItemID,
        Count: count,
        payMethod: payMethod
    }
    console.log(objPay)
    if (checkValidPayAll(objPay)) {
        $.ajax({
            url: '/pay-product-item',
            method: 'POST',
            data: objPay,
            success: function (response) {
                console.log(response);
                if (response.login) {
                    if (response.success) {
                        pay.onclick = function () {
                            orderSuccessful.style.display = 'flex';
                        }
                        pay.click();
                    } else {
                        console.log("lkooxi khi điền dư xlieeuj")
                        showErrorToast("Lỗi", "Lỗi khi điền dữ liệu");
                    }
                } else {
                    showErrorToast("Chưa đăng nhập", "Vui lòng đăng nhập để thanh toán");
                    hidenLoginBox();
                }
            },
            error: function (errr) {
                console.error(err);
            }
        })
    }
}