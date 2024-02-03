const cardBox = document.querySelector(".container--id");
let timeCard = cardBox.querySelector(".top-id")
let typeCard = cardBox.querySelector(".bot-id")
let userName = cardBox.querySelector(".name-id")

window.onload = function () {
    // localstorage
    var myData = JSON.parse(localStorage.getItem('cardData'));
    dataLogin = myData.cards;
    // cookie
    var cookie = document.cookie.split('; ').find(row => row.startsWith('loggedInUser'));
    if (cookie) {
        var month = 1;
        var loggedInUser = JSON.parse(cookie.split('=')[1]); // Lấy thông tin người dùng từ cookie và chuyển nó thành đối tượng
        if (loggedInUser) {
            dataLogin.map((value) => {
                if (value.id == loggedInUser.id) {
                    if (value.cardType == "BEGINNER")
                        month = 1;
                    else if (value.cardType == "BASIC")
                        month = 2;
                    else if (value.cardType == "ADVENCE")
                        month = 3;
                    userName.innerText = loggedInUser.name + " >> " + value.id + " <<";
                    timeCard.innerText = month + " MONTH";
                    typeCard.innerText = "TITANIUM " + value.cardType + " PASS";
                }
            })


        }
    }
}
