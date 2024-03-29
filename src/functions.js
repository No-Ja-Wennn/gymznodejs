const { get } = require("http");

function generateCustomerCode(lastCode) {
    var numericPart = parseInt(lastCode.slice(2));
    var startCode = lastCode.slice(0, 2);
    var newNumericPart = numericPart + 1;
    var newCode = startCode + String(newNumericPart).padStart(4, '0');
    return newCode;
}

function getCurrentDate() {
    return new Date();
}

function addMonths(date, months) {
    let newDate = new Date(date.getTime());
    newDate.setMonth(date.getMonth() + months);
    return newDate;
}


function loadMessage(con, maKH, callback) {
    var sql = "SELECT * FROM historyMessage WHERE maKH = ?";
    con.query(sql, maKH, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            callback(result); // Gọi callback với kết quả truy vấn
        } else {
            callback([]); // Gọi callback với một mảng rỗng nếu không có dữ liệu
        }
    });
}

function changeStatusSeen(con, maKH, callback) {
    var sql = "UPDATE historyMessage SET seen = 1 WHERE maKH = ?";
    con.query(sql, [maKH], function (err, result) {
        if (err) throw err;
        console.log("đổi trang thái maK: ", maKH);
    });
}

function getContentMessage(con, maKH, callback) {
    var sql = "SELECT * FROM historyMessage WHERE maKH = ?";
    con.query(sql, [maKH], function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            callback(result);
        } else {
            callback([]);
        }
    });
}

function getNameCustomer(con, maKH, callback) {
    var sql = "SELECT name from users where maKH = ?";
    con.query(sql, [maKH], function (err, result) {
        if (err) throw err;
        if (result.length > 0)
            callback(result[0].name);
        else
            callback("");
    });
}

function getBoxMessage(con, callback) {
    var sql = "SELECT t1.maKH, t1.senderRole, t1.message, t1.seen FROM historyMessage t1 LEFT JOIN historyMessage t2 ON t1.maKH = t2.maKH AND t1.messageID < t2.messageID WHERE t2.maKH IS NULL ORDER BY t1.messageID DESC";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("re: ", result);
        if (result.length > 0) {
            var promises = [];
            result.forEach(function (value) {
                // Tạo một promise mới cho mỗi giá trị
                promises.push(new Promise(function (resolve, reject) {
                    // Gọi hàm getNameCustomer để lấy tên của khách hàng dựa trên maKH
                    getNameCustomer(con, value.maKH, function (data) {
                        // Sau khi lấy được tên, gán tên vào thuộc tính "name" của object
                        value["name"] = data;
                        // Đánh dấu promise này đã hoàn thành
                        resolve();
                    });
                }));
            });

            // Khi tất cả các promise đã hoàn thành
            Promise.all(promises).then(function () {
                // Gọi callback và truyền kết quả result đã được cập nhật (bao gồm tên khách hàng)
                callback(result);
            });
        } else {
            callback([]);
        }
    });
}

function saveMessage(con, maKH, senderRole, message) {

    // Lưu tin nhắn vào cơ sở dữ liệu
    const query = `INSERT INTO historymessage (maKH, senderRole, message) VALUES (?, ?, ?)`;
    con.query(query, [maKH, senderRole, message, false], function (error, results, fields) {
        if (error) throw error;
        console.log('Message saved to database');
    });
}

module.exports = {
    generateCustomerCode,
    getCurrentDate,
    addMonths,
    loadMessage,
    getContentMessage,
    getBoxMessage,
    saveMessage,
    changeStatusSeen
}
