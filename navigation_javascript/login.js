var modalElement = document.querySelector(".modal");
var BMIForm = document.querySelector(".BMI-form");
BMIForm.style.display = "none"
var jsonPath = '../data/loginData.json';

//set defaut
let accountName = document.querySelector(".account__name");
let accountCode = document.querySelector(".account__code");

let dataLogin;

// fetch(jsonPath)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         var myData = data.accounts;
//         dataLogin = myData;
//     })
//     .catch(error => {
//         console.error('Fetch error:', error);
//     }
//     );

if (!localStorage.getItem('loginData')) {
    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            myData = data;
            localStorage.setItem('loginData', JSON.stringify(myData));
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
} else {
    // Nếu dữ liệu đã tồn tại trong localStorage, sử dụng nó
    myData = JSON.parse(localStorage.getItem('loginData'));
    dataLogin = myData.accounts;
}

var loginBox = document.querySelector(".login-box");
var buttonLogin = document.getElementById("login-btn");
function buttonLoginFunction() {
    var inputLoginEmail = loginBox.querySelector(".login-email");
    var inputLoginPass = loginBox.querySelector(".login-pass");
    var emailValue = inputLoginEmail.value;
    var passValue = inputLoginPass.value;
    if (emailValue && passValue) {
        dataLogin.map((value, index) => {
            if (emailValue == value.email && passValue == value.password) {
                accountName.innerText = value.name;
                accountCode.innerText = value.id;
                var date = new Date();
                date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000)); // Set expires to 3 days from now
                var expires = "; expires=" + date.toUTCString();
                document.cookie = "loggedInUser=" + JSON.stringify(value) + expires; // Lưu thông tin người dùng vào cookie
                var modalElement = document.querySelector(".modal").style.display = "none";

                inputLoginEmail.value = "";
                inputLoginPass.value = "";
                loginMenu1.innerText = value.name;
            }
        })
    }
}

buttonLogin.addEventListener("click", () => buttonLoginFunction())

window.onload = function () {
    var cookie = document.cookie.split('; ').find(row => row.startsWith('loggedInUser'));
    if (cookie) {
        var loggedInUser = JSON.parse(cookie.split('=')[1]); // Lấy thông tin người dùng từ cookie và chuyển nó thành đối tượng
        if (loggedInUser) {
            accountName.innerText = loggedInUser.name;
            accountCode.innerText = loggedInUser.id;
            loginMenu1.innerText = loggedInUser.name;
        }
    }
}


var modalOverLay = document.querySelector('.modal-overlay');
modalOverLay.addEventListener("click", () => {
    modalElement.style.display = "none";
})
// click on avt
let loginMenu1 = document.querySelector(".loginstatus");

loginMenu1.addEventListener("click", () => {
    if (loginMenu1.innerText == "ĐĂNG NHẬP") {
        modalElement.style.display = "flex";
    }
})

let logoutMenu1 = document.querySelector(".logoutstatus");
logoutMenu1.addEventListener("click", (e) => {
    e.preventDefault()
    document.cookie = "loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    accountName = "";
    accountCode = "";
    loginMenu1.innerText = "ĐĂNG NHẬP";
})
// click on avt mini
var accountLoginaInner = document.querySelector(".account__login__inner");
accountLoginaInner.addEventListener("click", (e) => {
    e.preventDefault()
    modalElement.style.display = "flex";
})

var logoElement = document.querySelector(".logo");
logoElement.addEventListener("click", () => {
    modalElement.style.display = "flex";
})



document.addEventListener('keypress', function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    // enter key
    if (keycode == '13') {
        if (modalElement.style.display == "flex") {
            var inputLoginEmail = loginBox.querySelector(".login-email");
            var inputLoginPass = loginBox.querySelector(".login-pass");
            var emailValue = inputLoginEmail.value;
            var passValue = inputLoginPass.value;
            if (emailValue && passValue) {
                buttonLoginFunction();
            }
        }
    }
});
