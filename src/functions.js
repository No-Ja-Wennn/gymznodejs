function generateCustomerCode(lastCode) {
    var numericPart = parseInt(lastCode.slice(2));
    var startCode = lastCode.slice(0, 2);
    var newNumericPart = numericPart + 1;
    var newCode = startCode + String(newNumericPart).padStart(4, '0');
    return newCode;
}
module.exports = {
    generateCustomerCode
}
