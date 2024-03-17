// Import các module cần thiết
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
var mysql = require('mysql');
const { generateCustomerCode } = require('./src/functions.js');

// Sử dụng body-parser để phân tích cú pháp dữ liệu form
app.use(bodyParser.urlencoded({ extended: true }));

// Phục vụ các file tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());

// Hàm setCookie
function setCookie(res, cookieName, cookieValue) {
  res.cookie(cookieName, cookieValue, { maxAge: 900000, httpOnly: true });
}

// Hàm getCookie
function getCookie(req, cookieName) {
  return req.cookies[cookieName];
}
// Hàm clearCookie
function clearCookie(res, cookieName) {
  res.clearCookie(cookieName);
}


//////////////////


// CREATE CONNECTION
let con = mysql.createConnection({
  host: "localhost",
  user: "quyen",
  password: "1234"
});

/* INITIAL DATA BASE */
con.connect(function (err) {
  if (err) throw err;
  con.query("SHOW DATABASES LIKE 'gymz'", function (err, result) {
    if (err) throw err;
    if (result.length) {
      console.log("Database gymz already exists");
      createTable();
    } else {
      con.query("CREATE DATABASE gymz", function (err, result) {
        if (err) throw err;
        console.log("Database gymz created");
        createTable();
      });
    }
  })
});
function createTable() {
  con = mysql.createConnection({
    host: "localhost",
    user: "quyen",
    password: "1234",
    database: "gymz"
  });

  const tables = [
    {
      name: 'loginData',
      columns: 'maKH VARCHAR(10) PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255)'
    },
    {
      name: 'historyMessage',
      columns: 'messageID INT AUTO_INCREMENT PRIMARY KEY, maKH VARCHAR(10), sender VARCHAR(255), senderRole ENUM("admin", "customer"), message VARCHAR(255), FOREIGN KEY (maKH) REFERENCES loginData(maKH)'
    },
    {
      name: 'cardData',
      columns: 'maThe VARCHAR(10) PRIMARY KEY, maKH VARCHAR(10), name VARCHAR(255), dateOfBirth DATE, phoneNumber VARCHAR(255), cardType VARCHAR(255), dateStart DATE, dateEnd DATE, FOREIGN KEY (maKH) REFERENCES loginData(maKH)'
    },
    {
      name: 'calendarData',
      columns: 'maLT VARCHAR(10) PRIMARY KEY, maThe VARCHAR(10), name VARCHAR(255), date DATE, timeStart TIME, timeEnd TIME, type VARCHAR(255), ptName VARCHAR(255), note VARCHAR(255), FOREIGN KEY (maThe) REFERENCES cardData(maThe)'
    }
  ];
  tables.forEach(table => {
    const checkTableExists = `SELECT count(*) as count FROM information_schema.tables WHERE table_schema = 'gymz' AND table_name = '${table.name}'`;
    con.query(checkTableExists, function (err, result) {
      if (err) throw err;
      if (result[0].count === 0) {
        const createTable = `CREATE TABLE ${table.name} (${table.columns}) CHARACTER SET utf8 COLLATE utf8_general_ci`;
        con.query(createTable, function (err, result) {
          if (err) throw err;
          console.log("Table " + table.name + " created");
        });
      } else {
        console.log("Table " + table.name + " already exists");
      }
    });
  });

}

app.post('/login-url', (req, res) => {
  const { email, password } = req.body;

  const lowerCaseEmail = email.toLowerCase();
  var sql = "SELECT * FROM loginData";
  con.query(sql, function (err, result) {
    if (err) throw err;
    var user = result.find(row => row.email === lowerCaseEmail && row.password === password);
    if (user) {
      setCookie(res, "user_id", user);
      res.json({ success: true, email: lowerCaseEmail, maKH: user.maKH, name: user.name });
    } else {
      console.log('Invalid email or password');
    }
    res.end();
  });
});

app.post('/create-account-url', (req, res) => {
  // data of form in req.body
  const { fullname, email, password, passwordConfirm } = req.body;
  // ktra ton tai
  let emailLower = email.toLowerCase();
  var sqlQuery = "SELECT email FROM loginData";
  con.query(sqlQuery, function (err, result, fileds) {
    var test = false;
    result.map(value => {
      if (!test && value.email == emailLower) test = true;
    })
    if (!test) {
      con.query("SELECT maKH FROM loginData ORDER BY maKH DESC LIMIT 1",
        function (err, result, fields) {
          if (err) throw err;
          var sql = `INSERT INTO loginData (maKH ,name, email, password) VALUES ('${generateCustomerCode(result[0].maKH)}', '${fullname}',  '${emailLower}', '${password}')`;
          con.query(sql, function (err, result) {
            if (err) throw err;
            res.json({success: true, active: true});
            res.end();
          });
        });
    }else{
      console.log("Trùng email");
      res.json({success: true, active: false});
      res.end();
    }
  });
});

app.post('/logout-url', function (req, res) {
  // Xóa cookie
  clearCookie(res, "user_id");
  // Gửi phản hồi về client
  res.json({ message: 'Đã đăng xuất' });
});

app.post('/register', (req, res) => {
  // Dữ liệu form được gửi sẽ có sẵn trong req.body
  const { username, password } = req.body;

  // Ở đây, bạn có thể xử lý dữ liệu form, ví dụ: kiểm tra thông tin đăng nhập, truy vấn CSDL, v.v.
  // ...

  // Gửi phản hồi về cho client
  res.send('Đã nhận dữ liệu form');
});

// COOKIE
app.get('/get-cookie', function (req, res) {
  // Lấy giá trị cookie
  var cookieValue = getCookie(req, 'user_id');

  // Gửi giá trị cookie về client
  res.json({ cookieValue: cookieValue });
});


// Khởi động server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});


