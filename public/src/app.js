const navbar = document.querySelector('.navbar');
const closenav = navbar.querySelector('.nav-close-bt');
const shadow = document.querySelector('.shadow');
const opennav = document.querySelectorAll('.nav-open-bt');
const chat = document.querySelector('.chatbox');

shadow.addEventListener('click', function(event) {
    console.log('shadow close');
    navbar.style.animation = 'fly-out-left .35s ease-in-out forwards';
    shadow.style.animation = 'shadow-out .35s ease-in-out forwards';
    setTimeout(function() {
        navbar.style.display = 'none';
        opennav.innerHTML = '<i class="fa-solid fa-bars"></i>';
        shadow.style.display = 'none';
    }, 500);
})
opennav.forEach(button => {
    button.addEventListener('click', function(event) {
        console.log('open');
        navbar.style.animation = 'fly-in-left .35s ease-in-out forwards';
        navbar.style.display = 'flex';
        shadow.style.animation = 'shadow-in .35s ease-in-out forwards';
        shadow.style.display = 'flex';
    })
});
closenav.addEventListener('click', function(event) {
    console.log('close');
    navbar.style.animation = 'fly-out-left .35s ease-in-out forwards';
    shadow.style.animation = 'shadow-out .35s ease-in-out forwards';
    setTimeout(function() {
        navbar.style.display = 'none';
        opennav.innerHTML = '<i class="fa-solid fa-bars"></i>';
        shadow.style.display = 'none';
    }, 500);
})

// xu ly khi click ra ngoai nut 3 cham
// document.addEventListener('click', function(){
//     if(displaytrash.style.display === 'flex'){
//         console.log('hide click tum lum')
//         displaylist.style.animation = 'hidelist .1s ease-in-out forwards';
//         setTimeout(function(){
//             displaytrash.style.animation = 'hidetrash .35s ease-in-out forwards';
//             setTimeout(function(){
//                 displaytrash.style.display = 'none';
//             }, 350)
//         }, 50)
//     }
// });

// document.getElementById('next').onclick = function(){
//     const widthItem = document.querySelector('.chatbox').offsetWidth;
//     document.getElementById('groupList').scrollLeft += widthItem;
// };
// document.getElementById('prve').onclick = function(){
//     const widthItem = document.querySelector('.chatbox').offsetWidth;
//     document.getElementById('groupList').scrollLeft -= widthItem;
// };

function scrollRight() {
    const widthItem = document.querySelector('.chatbox').offsetWidth;
    document.getElementById('groupList').scrollLeft += widthItem;
}
function scrollLeft() {
    const widthItem = document.querySelector('.chatbox').offsetWidth;
    document.getElementById('groupList').scrollLeft -= widthItem;
}
document.getElementById('next').onclick = scrollRight;
document.getElementById('prve').onclick = scrollLeft;
// // Biến để theo dõi trạng thái của vòng lặp
// let isScrollingRight = true;
// // Thiết lập vòng lặp vô tận để gọi hàm
// setInterval(function() {
//     if (isScrollingRight) {
//         scrollRight();
//     } else {
//         scrollLeft();
//     }
//     isScrollingRight = !isScrollingRight; // Đảo ngược trạng thái sau mỗi lần gọi hàm
// }, 2000); // Thực hiện sau mỗi 3 giây

const qlMessage = navbar.querySelector('#QLMessage');
const qlAccount = navbar.querySelector('#QLAccount');
const qlCard = navbar.querySelector('#QLCard');
const qlTrainingSchedule = navbar.querySelector('#QLCalendar');
//
const inputShow = document.querySelector('.container__show');
const showMessage = inputShow.querySelector('#groupList');
const showAccount = inputShow.querySelector('#accountTable');
const showCard = inputShow.querySelector('#cardTable');
const showTrainingSchedule = inputShow.querySelector('#trainingScheduleTable');

// Tạo một hàm để hiển thị bảng tương ứng và ẩn các bảng khác
function showTable(tableToShow) {
    const allTables = [showMessage, showAccount, showCard, showTrainingSchedule];
    allTables.forEach(table => {
      if (table === tableToShow) {
        table.style.display = 'block';
      } else {
        table.style.display = 'none';
      }
    });
  }
  
  // Ẩn tất cả các bảng trừ bảng showMessage
  showTable(showMessage);
  
  // Thêm sự kiện click cho các thẻ qlMessage, qlAccount, qlCard, qlTrainingSchedule
  qlMessage.addEventListener('click', function() {
    showTable(showMessage);
  });
  
  qlAccount.addEventListener('click', function() {
    showTable(showAccount);
  });
  
  qlCard.addEventListener('click', function() {
    showTable(showCard);
  });
  
  qlTrainingSchedule.addEventListener('click', function() {
    showTable(showTrainingSchedule);
  });


const msgBoxes = document.querySelectorAll('.msg-box');

msgBoxes.forEach(msgBox => {
  const btOpenTrash = msgBox.querySelector('.more-option-bt');
  const showTrash = msgBox.querySelector('.box-bot');
  const btTrash = msgBox.querySelector('.bot-bar-item');
  
  btOpenTrash.addEventListener('click', function(){
    if (showTrash.style.display === 'none' || showTrash.style.display === '') {
      showTrash.style.display = 'flex';
      console.log('show trash')
    }
    else{
      showTrash.style.display = 'none';
      console.log('hide trash')
    }
  });

  btTrash.addEventListener('click', function(){
    msgBox.style.display = 'none';
    console.log('delete message');
  });
  
});


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
