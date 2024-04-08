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
  { tab: navbar.querySelector('#QLCalendar'), table: document.querySelector('#calendarTable') },
  { tab: navbar.querySelector('#QLShop'), table: document.querySelector('#shopTable') }
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

window.onload = function () {
  // Make the DIV element draggable:
  dragElement(document.getElementById("draggable"));

  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      var newTop = elmnt.offsetTop - pos2;
      var newLeft = elmnt.offsetLeft - pos1;
      var parent = elmnt.parentElement;
      if (newTop >= 0 && newTop <= parent.offsetHeight - elmnt.offsetHeight) {
        elmnt.style.top = newTop + "px";
      }
      if (newLeft >= 0 && newLeft <= parent.offsetWidth - elmnt.offsetWidth) {
        elmnt.style.left = newLeft + "px";
      }
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  // active old nav
  // f_activeOldNav();

}

export function f_activeOldNav(){
  var navIDCook = getCookie("old_nav");
  if (navIDCook) {
    var navCook = document.getElementById(navIDCook.nav);
    navCook.click();
    navbar.style.display = 'none';
    opennav.forEach(button => {
      button.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
    shadow.style.display = 'none';
  }else{
    navbar.style.animation = 'fly-in-left .35s ease-in-out forwards';
    navbar.style.display = 'flex';
    shadow.style.animation = 'shadow-in .35s ease-in-out forwards';
    shadow.style.display = 'flex';
  }
}

function setCookie(cookieName, value) {
  var data = { nav: value };
  var date = new Date();
  date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000));
  var expires = "; expires=" + date.toUTCString();
  document.cookie = cookieName + "=" + JSON.stringify(data) + expires + "; path=/";
}

function getCookie(cookieName) {
  var cookie = document.cookie.split(';').find(row => row.trim().startsWith(cookieName + "="));
  if (cookie) {
    var value = cookie.split('=')[1];
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (error) {
      return null;
    }
  }
  return null;
}

// save old click
const a_nav = [
  document.getElementById("QLMessage"),
  document.getElementById("QLAccount"),
  document.getElementById("QLCard"),
  document.getElementById("QLCalendar"),
  document.getElementById("QLShop"),
]

a_nav.forEach(value => {
  value.addEventListener("click", function () {
    setCookie("old_nav", value.id);
  })
})

