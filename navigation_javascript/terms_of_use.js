// Lấy các phần tử cần thiết từ DOM
const viewTermsLink = document.querySelector('.rules__group__title__content');
const rulesContent = document.querySelector('.rules__group__content');
const hideButton = document.querySelector('.button__hide__terms__of__use');

// Xử lý sự kiện khi click vào 'Xem điều khoản sử dụng'
viewTermsLink.addEventListener('click', function() {
    rulesContent.style.display = 'flex'; // Hiển thị nội dung
});

// Xử lý sự kiện khi click vào nút 'Xác nhận'
hideButton.addEventListener('click', function() {
    rulesContent.style.display = 'none'; // Ẩn nội dung
});



var nightmodebt = document.querySelector('.night__mode__button');
var nen = document.querySelector('.container');

function nightmode(event) {
    if (nightmodebt.style.background === 'rgb(34, 34, 34)' || nightmodebt.style.background === '') {
        nen.style.background = '#111'; 
        nightmodebt.style.background = 'white';
        nightmodebt.style.color = 'rgb(34, 34, 34)';
    }
    else {
        nen.style.background = 'white'; 
        nightmodebt.style.background = 'rgb(34, 34, 34)';
        nightmodebt.style.color = 'whitesmoke';
    }
}

nightmodebt.addEventListener('click', nightmode);
