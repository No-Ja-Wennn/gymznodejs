// Import các module cần thiết
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
var mysql = require('mysql');
const { generateCustomerCode } = require('./src/functions.js');
const nodemailer = require('nodemailer');

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

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dtc225180268@ictu.edu.vn',
    pass: 'xfsgtulujoijcuea'
  }
});

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
      name: 'users',
      columns: 'maKH VARCHAR(10) PRIMARY KEY, name VARCHAR(255), email VARCHAR(255)'
    },
    {
      name: 'loginData',
      columns: 'maKH VARCHAR(10) PRIMARY KEY, password VARCHAR(255), FOREIGN KEY (maKH) REFERENCES users(maKH)'
    },
    {
      name: 'historyMessage',
      columns: 'messageID INT AUTO_INCREMENT PRIMARY KEY, maKH VARCHAR(10), sender VARCHAR(255), senderRole ENUM("admin", "customer"), message TEXT, FOREIGN KEY (maKH) REFERENCES users(maKH)'
    },
    {
      name: 'cardData',
      columns: 'maThe VARCHAR(10) PRIMARY KEY, maKH VARCHAR(10), dateOfBirth DATE, phoneNumber VARCHAR(11), cardType VARCHAR(255), dateStart DATE, dateEnd DATE, FOREIGN KEY (maKH) REFERENCES users(maKH)'
    },
    {
      name: 'calendarData',
      columns: 'maLT VARCHAR(10) PRIMARY KEY, maThe VARCHAR(10), date DATE, timeStart TIME, timeEnd TIME, type VARCHAR(255), ptName VARCHAR(255), note VARCHAR(255), FOREIGN KEY (maThe) REFERENCES cardData(maThe)'
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
  var sql = "SELECT users.maKH, users.name, loginData.password FROM users INNER JOIN loginData ON users.maKH = loginData.maKH WHERE users.email = ? AND loginData.password = ?";
  con.query(sql, [lowerCaseEmail, password], function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
      console.log("re: ", result[0]);
      var user = result[0];
      setCookie(res, "user_id", user);
      res.json({ success: true, email: lowerCaseEmail, maKH: user.maKH, name: user.name });
    } else {
      console.log('Invalid email or password');
      res.json({ success: false, message: 'Invalid email or password' });
    }
    res.end();
  });
});


app.post('/create-account-url', (req, res) => {
  // data of form in req.body
  const { fullname, email, password, passwordConfirm } = req.body;
  // ktra ton tai
  let emailLower = email.toLowerCase();
  var sqlQuery = "SELECT email FROM users";
  con.query(sqlQuery, function (err, result, fileds) {
    var test = false;
    result.map(value => {
      if (!test && value.email == emailLower) test = true;
    })
    if (!test) {
      con.query("SELECT maKH FROM users ORDER BY maKH DESC LIMIT 1",
        function (err, result, fields) {
          if (err) throw err;
          var maKH;
          if (!result[0]) {
            maKH = 'MK0001';
          } else {
            maKH = generateCustomerCode(result[0].maKH);
          }
          var sql = `INSERT INTO users (maKH ,name, email) VALUES ('${maKH}', '${fullname}',  '${emailLower}')`;
          con.query(sql, function (err, result) {
            if (err) throw err;
            sql = `INSERT INTO loginData (maKH ,password) VALUES ('${maKH}', '${password}')`;
            con.query(sql, function (err, result) {
              if (err) throw err;
              res.json({ success: true, active: true });
              res.end();
            });
          });
        });
    } else {
      console.log("Trùng email");
      res.json({ success: true, active: false });
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

function textForgotPass(code) {
  return `Chào mừng bạn đến với phòng tập gym của chúng tôi,

  Chúng tôi nhận được yêu cầu cài đặt lại mật khẩu cho tài khoản của bạn. Mã cài đặt lại mật khẩu của bạn là: ${code}
  
  Vui lòng truy cập vào trang "Quên mật khẩu" trên website của chúng tôi và nhập mã này để tiến hành cài đặt lại mật khẩu.
  
  Nếu bạn không yêu cầu cài đặt lại mật khẩu, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi để được hỗ trợ.
  
  Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!

  Trân trọng,
  Đội ngũ hỗ trợ phòng tập gym`;

}
let codeChangePass = 0;
app.post('/your-send-code-url', function (req, res) {
  const { email } = req.body;
  var emailLower = email.toLowerCase();
  // Truy vấn SQL
  var sql = `SELECT * FROM users WHERE email = ?`;

  con.query(sql, [emailLower], function (err, result) {
    if (err) throw err;

    if (result.length > 0) {
      var randomNumber = Math.floor(Math.random() * 1000000);
      codeChangePass = randomNumber;
      var mailOptions = {
        from: 'dtc225180268@ictu.edu.vn',
        to: email,
        subject: 'HỆ THỐNG PHÒNG TẬP GYMZ!',
        text: textForgotPass(randomNumber)
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      // Gửi phản hồi về client
      res.json({ code: randomNumber, active: true });
    } else {
      randomNumber = -99999;
      console.log("Email does not exist in the database.");
      res.json({ code: randomNumber, active: false });
    }
  });
});


app.post('/your-forgot-password-url', function (req, res) {
  const { email, code } = req.body;
  if (email && code == codeChangePass) {
    // Gửi phản hồi về client
    res.json({ active: true });
  } else {
    res.json({ active: false });
  }
});
app.post('/your-change-password-url', function (req, res) {
  const { email, pass } = req.body;
  if (email && pass) {
    let newPassword = pass; // Thay đổi giá trị này thành mật khẩu mới
    let emailLower = email.toLowerCase(); // Thay đổi giá trị này thành email của người dùng cần cập nhật mật khẩu

    var sql = `SELECT maKH FROM users WHERE email = ?`;
    con.query(sql, [emailLower], function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        let maKH = result[0].maKH;
        var sqlUpdate = `UPDATE loginData SET password = ? WHERE maKH = ?`;
        con.query(sqlUpdate, [newPassword, maKH], function (err, result) {
          if (err) throw err;
          console.log("Password updated");
          // Gửi phản hồi về client
          res.json({ active: true });
        });
      } else {
        console.log("No user found with this email");
        res.json({ active: false });
      }
    });
  } else {
    console.log("email, pass: ", email, pass);
    res.json({ active: false });
  }
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
  var cookieValue = getCookie(req, 'user_id');
  res.json({ cookieValue: cookieValue });
});

// app.get('/get-value-information-form', async function (req, res) {
//   let resultAdd = {
//     maThe: "",
//     maKH: "",
//     name: "",
//     email: "",
//     password: "",
//     dateOfBirth: "",
//     phoneNumber: "",
//     cardType: "",
//     dateStart: "",
//     dateEnd: ""
//   };
//   let cookieValue = getCookie(req, 'user_id');
//   if (cookieValue && cookieValue.maKH) {
//     let maKH = cookieValue.maKH;
//     var sql1 = 'SELECT * FROM cardData WHERE maKH = ?';
//     var sql2 = 'SELECT * FROM loginData WHERE maKH = ?';
//     var sql3 = 'SELECT * FROM users WHERE maKH = ?';
//     try {
//       const [cardDataResult, loginDataResult, userDataResult] = await Promise.all([
//         new Promise((resolve, reject) => {
//           con.query(sql1, [maKH], (err, result) => {
//             if (err) reject(err);
//             resolve(result[0]);
//           });
//         }),
//         new Promise((resolve, reject) => {
//           con.query(sql2, [maKH], (err, result) => {
//             if (err) reject(err);
//             resolve(result[0]);
//           });
//         }),
//         new Promise((resolve, reject) => {
//           con.query(sql3, [maKH], (err, result) => {
//             if (err) reject(err);
//             resolve(result[0]);
//           });
//         })
//       ]);
//       console.log("_____")
//       resultAdd = { ...resultAdd, ...cardDataResult, ...loginDataResult, ...userDataResult };
//       res.json({ active: true, value: resultAdd });
//     } catch (err) {
//       // Handle error
//     }
//   }
// });

app.get('/get-value-information-form', function (req, res) {
  let resultAdd = {
    maThe: "",
    maKH: "",
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    phoneNumber: "",
    cardType: "",
    dateStart: "",
    dateEnd: ""
  };
  let cookieValue = getCookie(req, 'user_id');
  if (cookieValue && cookieValue.maKH) {
    let maKH = cookieValue.maKH;
    var sql1 = 'SELECT * FROM cardData WHERE maKH = ?';
    var sql2 = 'SELECT * FROM loginData WHERE maKH = ?';
    var sql3 = 'SELECT * FROM users WHERE maKH = ?';
    con.query(sql1, [maKH], (err, result) => {
      if (err) reject(err);
      cardDataResult = result[0];
      con.query(sql2, [maKH], (err, result) => {
        if (err) reject(err);
        loginDataResult = result[0];
        con.query(sql3, [maKH], (err, result) => {
          if (err) reject(err);
          userDataResult = result[0];
          if(cardDataResult && loginDataResult && userDataResult){
            resultAdd = { ...resultAdd, ...cardDataResult, ...loginDataResult, ...userDataResult };
            console.log("resultAdd", resultAdd)
            res.json({ success: true, value: resultAdd });
          }
        });
      });
    });
  }else{
    res.json({ success: false, value: resultAdd });
  }
});

app.post('/change-name-url', (req, res) => {
  const { name, maKH } = req.body;
  var sqlQuery = "UPDATE users SET name = ? WHERE maKH = ?";
  con.query(sqlQuery, [name, maKH], function (err, result) {
    if (err) throw err;
    res.json({ success: true, type: "name" });
  })
});
app.post('/change-profile-url', (req, res) => {
  const { date, maKH } = req.body;
  var sqlQuery = "UPDATE cardData SET dateOfBirth = ? WHERE maKH = ?";
  con.query(sqlQuery, [date, maKH], function (err, result) {
    if (err) throw err;
    res.json({ success: true, type: "profile" });
  })
});
app.post('/change-inforaccount-url', (req, res) => {
  const { email, phoneNumber, maKH } = req.body;
  var sqlQuery = "UPDATE cardData SET phoneNumber = ? WHERE maKH = ?";
  con.query(sqlQuery, [phoneNumber, maKH], function (err, result) {
    if (err) throw err;
    var sqlQuery = "UPDATE users SET email = ? WHERE maKH = ?";
    con.query(sqlQuery, [email, maKH], function (err, result) {
      if (err) throw err;
      res.json({ success: true, type: "account" });
    })
  })
});
app.post('/change-password-url', (req, res) => {
  const { password, newPass, confirmPass, maKH } = req.body;
  var sql = "SELECT password FROM loginData WHERE maKH = ?";
  con.query(sql, [maKH], function (err, result) {
    console.log(result[0].password);
    console.log("pass: ", password);
    if (result[0].password == password) {
      var sqlQuery = "UPDATE loginData SET password = ? WHERE maKH = ?";
      con.query(sqlQuery, [newPass, maKH], function (err, result) {
        if (err) throw err;
        res.json({ success: true, type: "pass" });
      })
    } else {
      res.json({ success: false, type: "pass" });
    }
  })
});



// Khởi động server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});


