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


function loadMessage(con, maKH, callback){
    var sql = "SELECT * FROM historyMessage WHERE maKH = ?";
    con.query(sql, maKH, function(err, result){
        if(err) throw err;
        if(result.length > 0) {
            callback(result); // Gọi callback với kết quả truy vấn
        } else {
            callback([]); // Gọi callback với một mảng rỗng nếu không có dữ liệu
        }
    });
}


module.exports = {
    generateCustomerCode,
    getCurrentDate,
    addMonths,
    loadMessage
}
