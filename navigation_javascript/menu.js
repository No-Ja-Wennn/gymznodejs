var sub = document.querySelector(".submenu b");
// Lấy phần tử noidung222
var noidung222 = document.querySelector('.noidung222');
function toggleNoidung222(event) {
    // Ngăn chặn sự kiện click lan ra các phần tử cha
    event.stopPropagation();

    // Ngăn chặn sự kiện mặc định của thẻ <a>
    // event.preventDefault();

    

    // Toggle hiển thị/ẩn
    if (noidung222.style.display === 'none' || noidung222.style.display === '') {
        noidung222.style.display = 'block';
        sub.style.color = 'goldenrod';
        // sub.style.background = '#222';
    } else {
        noidung222.style.display = 'none';
        sub.style.color = 'white'
        // sub.style.background = '#000';
    }
}

// Bổ sung sự kiện click để ẩn noidung222 khi click bất kỳ đâu trên trang
document.addEventListener('click', function () {
    var noidung222 = document.querySelector('.noidung222');
    noidung222.style.display = 'none';
});