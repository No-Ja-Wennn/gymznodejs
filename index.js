
// Import các module cần thiết
const express = require('express');
const app = express();
const path = require('path');
const url = require('url');
const http = require('http');
const bodyParser = require('body-parser');
var mysql = require('mysql');
const {
  generateCustomerCode,
  getCurrentDate,
  addMonths,
  loadMessage,
  getContentMessage,
  getBoxMessage,
  saveMessage
} = require('./src/functions.js');
const nodemailer = require('nodemailer');

const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

var cookieParser = require('cookie-parser');
var session = require('express-session');
const { threadId } = require('worker_threads');
app.use(cookieParser());

// Hàm setCookie
function setCookie(res, cookieName, cookieValue) {
  const oneDay = 24 * 60 * 60 * 1000;
  res.cookie(cookieName, cookieValue, { maxAge: oneDay, httpOnly: true });
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

//INITIAL DATA BASE 
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
      columns: 'maKH VARCHAR(10) PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), dateOfBirth DATE, phoneNumber VARCHAR(11)'
    },
    {
      name: 'loginData',
      columns: 'maKH VARCHAR(10) PRIMARY KEY, password VARCHAR(255), FOREIGN KEY (maKH) REFERENCES users(maKH)'
    },
    {
      name: 'historyMessage',
      columns: 'messageID INT AUTO_INCREMENT PRIMARY KEY, maKH VARCHAR(10), senderRole ENUM("admin", "customer"), message TEXT, seen ENUM("true", "false"), FOREIGN KEY (maKH) REFERENCES users(maKH)'
    },
    {
      name: 'cardData',
      columns: 'maThe VARCHAR(10) PRIMARY KEY, maKH VARCHAR(10), cardType VARCHAR(255), dateStart DATE, dateEnd DATE, FOREIGN KEY (maKH) REFERENCES users(maKH)'
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

function insertIntoTable(tableName, data) {
  let columns = Object.keys(data).join(', ');
  let values = Object.values(data).map(value => `'${value}'`).join(', ');

  let sql = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Record inserted successfully");
  });
}

app.post('/login-url', (req, res) => {
  const { email, password } = req.body;
  const lowerCaseEmail = email.toLowerCase();
  var sql = "SELECT users.maKH, users.name, loginData.password FROM users INNER JOIN loginData ON users.maKH = loginData.maKH WHERE users.email = ? AND loginData.password = ?";
  con.query(sql, [lowerCaseEmail, password], function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
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
              con.query("SELECT maThe FROM cardData ORDER BY maThe DESC LIMIT 1",
                function (err, result, fields) {
                  if (err) throw err;
                  var maThe;
                  if (!result[0]) {
                    maThe = 'MT0001';
                  } else {
                    maThe = generateCustomerCode(result[0].maThe);
                  }
                  var cardData = { maKH: maKH, maThe: maThe };
                  insertIntoTable("cardData", cardData);

                  con.query("SELECT maLT FROM calendarData ORDER BY maLT DESC LIMIT 1",
                    function (err, result, fields) {
                      if (err) throw err;
                      var maLT;
                      if (!result[0]) {
                        maLT = 'LT0001';
                      } else {
                        maLT = generateCustomerCode(result[0].maLT);
                      }
                      var calendarData = { maLT: maLT, maThe: maThe };
                      insertIntoTable("calendarData", calendarData);
                    }
                  )
                }
              )

              res.json({ success: true, active: true });
              res.end();
            });

          });
        });
    } else {
      res.json({ success: true, active: false });
      res.end();
    }
  });
});


app.post('/logout-url', function (req, res) {
  var cookie = getCookie(req, "user_id");
  if (cookie) {
    var maKH = cookie.maKH;
    console.log("xóa: ", maKH);
    delete clients[maKH];
  }
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

app.post('/get-value-information-form', function (req, res) {
  const { type } = req.body;
  let cookieValue = getCookie(req, 'user_id');
  if (cookieValue && cookieValue.maKH) {
    let maKH = cookieValue.maKH;
    if (type == "account") {
      var sql = 'SELECT * FROM users WHERE maKH = ?';
      con.query(sql, [maKH], function (err, result) {
        var data = result[0];
        if (data) {
          res.json({ success: true, value: data });
        }
      });
    } else if (type == "card") {
      var resultAdd = {};
      var sql = 'SELECT * FROM cardData WHERE maKH = ?';
      con.query(sql, [maKH], function (err, result) {
        if (err) throw err;
        var data = result[0];
        if (data) {
          for (var key in data) {
            resultAdd[key] = data[key];
          }
          var sql = 'SELECT name FROM users WHERE maKH = ?';
          con.query(sql, [maKH], function (err, result) {
            if (err) throw err;
            var data = result[0];
            if (data) {
              for (var key in data) {
                resultAdd[key] = data[key];
                var sql = 'SELECT * FROM calendarData WHERE maThe = ?';
                con.query(sql, [resultAdd.maThe], function (err, result) {
                  if (err) throw err;
                  var data = result[0];
                  if (data) {
                    for (var key in data) {
                      resultAdd[key] = data[key];
                    }
                    res.json({ success: true, value: resultAdd });
                  }
                })
              }
            }
          })
        }
      });

    } else {
      res.json({ success: false, value: {}, login: true });
    }
  } else {
    res.json({ success: false, value: {} });
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
  var sqlQuery = "UPDATE users SET dateOfBirth = ? WHERE maKH = ?";
  con.query(sqlQuery, [date, maKH], function (err, result) {
    if (err) throw err;
    res.json({ success: true, type: "profile" });
  })
});
app.post('/change-inforaccount-url', (req, res) => {
  const { email, phoneNumber, maKH } = req.body;
  var sqlQuery = "UPDATE users SET phoneNumber = ? WHERE maKH = ?";
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

// cardType: 'on', weekday: 'on', time: 'on', type: 'on'
app.post('/register-card-url', (req, res) => {
  const cookie = getCookie(req, 'user_id');
  if (cookie) {
    const maKH = cookie.maKH;
    var sql = "SELECT maThe FROM cardData WHERE maKH = ?";
    con.query(sql, [maKH], function (err, result) {
      if (err) throw err;
      var maThe = result[0].maThe;
      if (maThe) {
        const { cardType, weekday, time, type, note } = req.body;
        var dateStart = getCurrentDate();
        var add = 1;
        if (cardType == "BEGINNER") add = 1;
        else if (cardType == "BASIC") add = 2;
        else if (cardType == "ADVANCE") add = 3;
        var dateEnd = addMonths(dateStart, add);
        var sql = "UPDATE cardData SET cardType = ?, dateStart = ?, dateEnd = ? WHERE maThe = ?";
        con.query(sql, [cardType, dateStart, dateEnd, maThe], function (err, result) {
          if (err) throw err;
          if (weekday)
            var date = weekday.join(", ");
          else
            var date = null;
          if (time)
            var a_time = time.split("-");
          else
            var a_time = ["00h00", "00h00"];
          var sql = 'UPDATE calendarData SET date = ? , timeStart = ? , timeEnd = ? , type = ? , ptName = ? , note = ?';
          con.query(sql, [date, a_time[0], a_time[1], type, "Truong co bap", note], function (err, result) {
            if (err) throw err;
            res.json({ success: true });
          })
        });
      } else {
        res.json({ success: false });
      }
    })
  } else {
    res.json({ success: false, reason: "login" });
  }
})

// active register card
app.get('/get-valid-card', function (req, res) {
  const cookie = getCookie(req, 'user_id');
  if (cookie) {
    var maKH = cookie.maKH;
    con.query("SELECT cardType FROM cardData WHERE maKH = ?", [maKH], function (err, result) {
      console.log(result[0].cardType);
      if (result[0].cardType) {
        res.json({ have: true, login: true });
      } else {
        res.json({ have: false, login: true });
      }
    })
  } else {
    res.json({ have: false, login: false });
  }
})

// CANCEL CALENDAR
app.get('/get-cancel-submit', function (req, res) {
  const cookie = getCookie(req, 'user_id');
  if (cookie) {
    var maKH = cookie.maKH;
    let sql = 'UPDATE cardData SET cardType = NULL, dateStart = NULL, dateEnd = NULL WHERE maKH = ?';
    con.query(sql, [maKH], function (err, result) {
      if (err) throw err;
      sql = "SELECT maThe FROM cardData WHERE maKH = ?";
      con.query(sql, [maKH], function (err, result) {
        if (result[0].maThe) {
          var maThe = result[0].maThe;
          sql = 'UPDATE calendarData SET date = NULL, timeStart = NULL, timeEnd = NULL, type = NULL, ptName = NULL, note = NULL WHERE maThe = ?';
          con.query(sql, [maThe], function (err, result) {
            if (err) throw err;
            res.json({ success: true });
          });
        }
      })
    });

  } else {
    res.json({ success: false });
  }
})



///

function getCookie2(cookieName, socket) {
  // Lấy cookie từ handshake
  const cookie = socket.handshake.headers.cookie;
  if (cookie) {
    // Tìm chuỗi chứa cookie cụ thể
    const cookieString = cookie.split(';').find(pair => pair.trim().startsWith(cookieName + '='));
    if (cookieString) {
      // Lấy giá trị của cookie
      const cookieValue = cookieString.split('=')[1].trim();

      // Loại bỏ ký tự không mong muốn từ chuỗi

      // Giải mã chuỗi từ URL-encoded trở lại chuỗi gốc
      const decodedCookieValue = decodeURIComponent(cookieValue);
      const cleanedCookieValue = decodedCookieValue.replace(/^j:/, '');
      console.log(cleanedCookieValue)
      try {
        // Phân tích chuỗi thành đối tượng JSON
        const cookieObject = JSON.parse(cleanedCookieValue);
        return cookieObject;
      } catch (error) {
        console.error('Không thể phân tích chuỗi cookie thành đối tượng JSON:', error);
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}

//////////  CHAT BOX /////////////////
// socket
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);


app.get('/get-login', (req, res) => {
  var cookie = getCookie(req, 'user_id');
  if (cookie) {
    var maKH = cookie.maKH;
    res.json({ success: true, maKH: maKH });
  } else {
    res.json({ success: false, maKH: "" });
  }
})


app.use(express.static(path.join(__dirname, 'public')));

// Sử dụng middleware để phục vụ các tệp tĩnh từ thư mục client-dist
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));


var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(function (req, res, next) {
  req.io = io;
  req.res = res;
  next();
});

const clients = {};
const admins = {}; // Lưu trữ thông tin về các kết nối của admin

// Sự kiện khi có một kết nối mới được thiết lập
io.on('connection', (socket) => {
  console.log('New connection:', socket.id);
  // Sự kiện khi một khách hàng kết nối
  socket.on('client-connect', (maKH) => {
    console.log("client-connect: ", maKH);
    // Lưu thông tin về kết nối của khách hàng
    clients[maKH] = socket.id;
    // Sự kiện khi một khách hàng gửi tin nhắn cho admin
    socket.on('client-message', (data) => {
      // Lấy thông tin khách hàng từ data
      const { message } = data;
      console.log(clients);
      if (clients.hasOwnProperty(maKH)) {
        console.log("Mã khách hàng hợp lệ:", maKH);
        console.log("Data:", message);

        // Lưu tin nhắn vào csdl
        saveMessage(con, maKH, "customer", message);
        console.log("data:", message);

        // gửi tới khách hàng để hiển thị và lưu vào csdl
        saveMessage(con, maKH, "customer", message);
        io.emit('response-message', message);

        // Gửi tin nhắn đến admin
        for (const adminSocketId in admins) {
          io.to(admins[adminSocketId]).emit('admin-message', { maKH, message });
        }
      } else {
        console.log("Mã khách hàng không hợp lệ:", maKH);
        // Xử lý trường hợp mã khách hàng không hợp lệ nếu cần
      }
    });
  });

  // Sự kiện khi một admin kết nối
  socket.on('admin-connect', (adminId) => {
    console.log("admin-connect: ", adminId);
    // Lưu thông tin về kết nối của admin
    admins[adminId] = socket.id;
    // Sự kiện khi một admin gửi tin nhắn cho một khách hàng cụ thể
    socket.on('admin-message', (data) => {
      const { maKH, message } = data;

      // Gửi tin nhắn đến khách hàng cụ thể
      io.to(clients[maKH]).emit('client-message', { message });
    });
  });

  // Sự kiện khi một kết nối bị đóng
  socket.on('disconnect', () => {
    console.log('Connection closed:', socket.id);

    // Xóa thông tin kết nối của khách hàng hoặc admin khi họ ngắt kết nối
    for (const maKH in clients) {
      if (clients[maKH] === socket.id) {
        delete clients[maKH];
        break;
      }
    }
    for (const adminId in admins) {
      if (admins[adminId] === socket.id) {
        delete admins[adminId];
        break;
      }
    }
  });
});




// ====== ADMIN ====== //


app.get('/get-box-message', (req, res) => {
  getBoxMessage(con, function (data) {
    console.log(data);
    res.json({ value: data });
  });
});

app.post('/get-content-message', (req, res) => {
  var { maKH } = req.body;
  getContentMessage(con, maKH, function (data) {
    res.json({ value: data });
  })
})

app.get('/get-customer-message', (req, res) => {
  var cookie = getCookie(req, "user_id");
  if (cookie) {
    var maKH = cookie.maKH;
    getContentMessage(con, maKH, function (data) {
      res.json({ value: data });
    })
  }
})


// =======================
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});
