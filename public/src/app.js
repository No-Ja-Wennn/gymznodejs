const navbar = document.querySelector('.navbar');
const closenav = navbar.querySelector('.nav-close-bt');
const shadow = document.querySelector('.shadow');
const opennav = document.querySelectorAll('.nav-open-bt');
const chat = document.querySelector('.chatbox');
let activeNav = null;

// Tạo một mảng để lưu trữ các thẻ và bảng tương ứng
const tabs = [
  { tab: navbar.querySelector('#QLMessage'), table: document.querySelector('#groupList') },
  { tab: navbar.querySelector('#QLAccount'), table: document.querySelector('#accountTable') },
  { tab: navbar.querySelector('#QLCard'), table: document.querySelector('#cardTable') },
  { tab: navbar.querySelector('#QLCalendar'), table: document.querySelector('#trainingScheduleTable') }
];

// Hàm để hiển thị bảng tương ứng và thêm class active cho tab
function showTableAndSetActive(tab, table) {
  tabs.forEach(item => {
    if (item.tab === tab) {
      item.tab.classList.add('active');
      item.table.style.display = 'block';
    } else {
      item.tab.classList.remove('active');
      item.table.style.display = 'none';
    }
  });
}

// Thêm sự kiện click cho các tab và xử lý hiển thị bảng và class active
tabs.forEach(item => {
  item.tab.addEventListener('click', function () {
    showTableAndSetActive(item.tab, item.table);
    setTimeout(closeNav, 300);
  });
});

// Thêm sự kiện click cho nút mở nav
opennav.forEach(button => {
  button.addEventListener('click', function () {
    console.log('open');
    navbar.style.animation = 'fly-in-left .35s ease-in-out forwards';
    navbar.style.display = 'flex';
    shadow.style.animation = 'shadow-in .35s ease-in-out forwards';
    shadow.style.display = 'flex';
  })
});

// Thêm sự kiện click cho nút đóng nav
closenav.addEventListener('click', closeNav);
shadow.addEventListener('click', closeNav);

function closeNav() {
  navbar.style.animation = 'fly-out-left .35s ease-in-out forwards';
  shadow.style.animation = 'shadow-out .35s ease-in-out forwards';
  setTimeout(function () {
    navbar.style.display = 'none';
    opennav.forEach(button => {
      button.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
    shadow.style.display = 'none';
  }, 500);
}

document.getElementById('next').onclick = function () {
  const widthItem = document.querySelector('.chatbox').offsetWidth;
  document.getElementById('groupList').scrollLeft += widthItem;
};
document.getElementById('prve').onclick = function () {
  const widthItem = document.querySelector('.chatbox').offsetWidth;
  document.getElementById('groupList').scrollLeft -= widthItem;
};


// const msgBoxes = document.querySelectorAll('.msg-box');

// // Mặc định chọn msg-box đầu tiên và thêm class active
// let activeMsgBox = msgBoxes[0];
// activeMsgBox.classList.add('active');

// Lấy danh sách tất cả các msg-box

// Lặp qua từng msg-box để thêm sự kiện click vào more-option-bt
// msgBoxes.forEach(msgBox => {
//   const moreOptionBtn = msgBox.querySelector('.more-option-bt');
//   const boxBot = msgBox.querySelector('.box-bot');

//   // Thêm sự kiện click vào more-option-bt
//   moreOptionBtn.addEventListener('click', function (event) {
//     event.stopPropagation(); // Ngăn chặn sự kiện click từ more-option-bt lan toả lên các phần tử khác

//     // Ẩn tất cả các box-bot trước khi hiển thị box-bot của msg-box hiện tại
//     msgBoxes.forEach(box => {
//       if (box !== msgBox) {
//         box.querySelector('.box-bot').style.display = 'none';
//       }
//     });

//     // Hiển thị hoặc ẩn box-bot tùy thuộc vào trạng thái hiện tại
//     if (boxBot.style.display === 'none' || boxBot.style.display === '') {
//       boxBot.style.display = 'block';
//       // boxBot.style.animation = 'showtrash .5s ease-in-out forwards;';
//     } else {
//       boxBot.style.display = 'none';
//     }

//     // Xóa class active từ msg-box hiện tại và thêm vào msg-box được click
//     activeMsgBox.classList.remove('active');
//     msgBox.classList.add('active');
//     activeMsgBox = msgBox; // Cập nhật msg-box hiện tại là msg-box được click
//   });

//   // Thêm sự kiện click vào msg-box để thêm class active và xóa class active từ msg-box hiện tại
//   msgBox.addEventListener('click', function () {
//     activeMsgBox.classList.remove('active');
//     msgBox.classList.add('active');
//     activeMsgBox = msgBox;
//   });
// });

// // Thêm sự kiện click vào document để ẩn box-bot khi click bên ngoài msg-box
// document.addEventListener('click', function () {
//   msgBoxes.forEach(box => {
//     box.querySelector('.box-bot').style.display = 'none';
//   });
// });

// Chặn sự kiện click từ box-bot lan toả lên các phần tử khác
// document.querySelector('.box-bot').addEventListener('click', function (event) {
//   event.stopPropagation();
// });









// const msgBoxes = document.querySelectorAll('.msg-box');

// msgBoxes.forEach(msgBox => {
//   const btOpenTrash = msgBox.querySelector('.more-option-bt');
//   const showTrash = msgBox.querySelector('.box-bot');
//   const btTrash = msgBox.querySelectorAll('.bot-bar-item');

//   btOpenTrash.addEventListener('click', function() {
//     if (showTrash.style.display === 'none' || showTrash.style.display === '') {
//       showTrash.style.display = 'flex';
//       console.log('show trash');
//     } else {
//       showTrash.style.display = 'none';
//       console.log('hide trash');
//     }
//   });

//   btTrash.forEach(button => {
//     button.addEventListener('click', function() {
//       msgBox.style.display = 'none';
//       console.log('delete message');
//     });
//   });
// });

