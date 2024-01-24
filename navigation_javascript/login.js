var modalElement = document.querySelector(".modal");
var BMIForm = document.querySelector(".BMI-form");
BMIForm.style.display = "none"
var jsonPath = '../data/loginData.json';

//set defaut
var accountName = document.querySelector(".account__name");
var accountCode = document.querySelector(".account__code");

let dataLogin;

fetch(jsonPath)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var myData = data.accounts;
        dataLogin = myData;
    })
    .catch(error => {
        console.error('Fetch error:', error);
    }
    );

var loginBox = document.querySelector(".login-box");

var buttonLogin = document.getElementById("login-btn");

buttonLogin.addEventListener("click", () => {
    var inputLoginEmail = loginBox.querySelector(".login-email");
    var inputLoginPass = loginBox.querySelector(".login-pass");
    var emailValue = inputLoginEmail.value;
    var passValue = inputLoginPass.value;
    var accountName = document.querySelector(".account__name");
    var accountCode = document.querySelector(".account__code");
    if (emailValue && passValue) {
        dataLogin.map((value, index) => {
            if (emailValue == value.email && passValue == value.password) {
                accountName.innerText = value.name;
                accountCode.innerText = value.id;
                var date = new Date();
                date.setTime(date.getTime() + (3*24*60*60*1000)); // Set expires to 3 days from now
                var expires = "; expires=" + date.toUTCString();
                document.cookie = "loggedInUser=" + JSON.stringify(value) + expires; // Lưu thông tin người dùng vào cookie
                var modalElement = document.querySelector(".modal").style.display = "none";
            }
        })
    }
})

// Kiểm tra người dùng đã đăng nhập chưa khi tải lại trang
window.onload = function() {
    var loggedInUser = JSON.parse(document.cookie.split('; ').find(row => row.startsWith('loggedInUser')).split('=')[1]); // Lấy thông tin người dùng từ cookie và chuyển nó thành đối tượng
    if (loggedInUser) {
        accountName.innerText = loggedInUser.name;
        accountCode.innerText = loggedInUser.id;
    }
}


var modalOverLay = document.querySelector('.modal-overlay');
modalOverLay.addEventListener("click", ()=>{
    modalElement.style.display = "none";
})
// click on avt
var accountAvt = document.querySelector(".account-avt");
accountAvt.addEventListener("click", ()=>{
    console.log("hello")
    modalElement.style.display = "flex";
})
// click on avt mini
var accountLoginaInner = document.querySelector(".account__login__inner");
accountLoginaInner.addEventListener("click", (e)=>{
    e.preventDefault()
    console.log("hello")
    modalElement.style.display = "flex";
})

var logoElement = document.querySelector(".logo");
logoElement.addEventListener("click", ()=>{
    modalElement.style.display = "flex";
})
