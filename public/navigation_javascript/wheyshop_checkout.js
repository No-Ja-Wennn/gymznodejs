

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
                    ${ Cost.toLocaleString() }
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

$(document).ready(function () {
    var localValue = JSON.parse(localStorage.getItem('tempItem'));
    const { ItemID, count } = localValue;
    console.log(localValue)
    $.ajax({
        url: '/get-item-by-id',
        type: 'POST',
        data: { ItemID },
        success: function (res) {
            if (res.success) {
                var data = res.data;
                data.Count = count;
                console.log(data)

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
