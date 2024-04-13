import { showSuccessToast, showErrorToast } from './toast.js';

const modalBox = document.querySelector(".modal");
const overlayBox = modalBox.querySelector(".modal-overlay");
const loginBox = modalBox.querySelector(".login-box");
const createAccountBox = modalBox.querySelector(".create-account-box");
const forgotPassBox = modalBox.querySelector(".forgot-pass-box");
const registerCartBox = modalBox.querySelector(".register-cart");
const changeNameBox = modalBox.querySelector(".change-name-box");


// Hàm kiểm tra email
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Hàm kiểm tra số điện thoại
function validatePhoneNumber(phoneNumber) {
    var re = /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/;
    return re.test(String(phoneNumber));
}
function validatePassword(password) {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return re.test(password);
}

function validateNumber(input) {
    if (input === null || input === undefined) {
        return false;
    }
    return !isNaN(input);
}

export function validateCreateAccount() {
    var fullname = createAccountBox.querySelector(".login-name").value;
    var email = createAccountBox.querySelector(".login-email").value;
    var password = createAccountBox.querySelector(".login-pass").value;
    var passwordConfirm = createAccountBox.querySelector(".login-pass-confirm").value;
    if (!fullname) {
        showErrorToast("Thất bại", "Vui lòng nhập tên của bạn");
        return false;
    } else if (!email) {
        showErrorToast("Thất bại", "Vui lòng nhập email của bạn");
        return false;
    } else if (!validateEmail(email)) {
        showErrorToast("Thất bại", "Địa chỉ email không hợp lệ");
        return false;
    } else if (!password) {
        showErrorToast("Thất bại", "Vui lòng nhập mật khẩu");
        return false;
    } else if (!validatePassword(password)) {
        showErrorToast("Thất bại", "mật khẩu ít nhất 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt");
        return false;
    } else if (!passwordConfirm) {
        showErrorToast("Thất bại", "Vui lòng nhập lại mật khẩu");
        return false;
    } else if (password != passwordConfirm) {
        showErrorToast("Thất bại", "Mật khẩu không khớp");
        return false;
    }
    return true;
}

export function validateLoginValue() {
    var email = loginBox.querySelector(".login-email").value;
    var password = loginBox.querySelector(".login-pass").value;
    if (!email) {
        showErrorToast("Thất bại", "Vui lòng điền địa chỉ email");
        return false;
    } else if (!validateEmail(email)) {
        showErrorToast("Thất bại", "Địa chỉ email không hợp lệ");
        return false;
    } else if (!password) {
        showErrorToast("Thất bại", "Vui lòng điền mật khẩu");
        return false;
    }
    return true;
}

export function validateChangePass(newPass, confirmPass){
    console.log(1)
    if(!newPass){
        showErrorToast("Thất bại", "Vui lòng nhập mật khẩu mới của bạn");
        return false;
    } else if (!validatePassword(newPass)) {
        showErrorToast("Thất bại", "mật khẩu ít nhất 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt");
        return false;
    } else if(!confirmPass){
        showErrorToast("Thất bại", "Vui lòng nhập mật khẩu mới của bạn");
        return false;
    }else if(newPass != confirmPass){
        showErrorToast("Thất bại", "Mật khẩu không khớp");
        return false;
    }
    return true;
}


export function isValidChangePass(password, newPass, confirmPass){
    if(!password){
        showErrorToast("Thất bại", "Vui lòng điền mật khẩu");
        return false;
    } else if(!newPass){
        showErrorToast("Thất bại", "Vui lòng điền mật khẩu");
        return false;
    } else if(!validatePassword(newPass)){
        showErrorToast("Thất bại", "mật khẩu ít nhất 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt");
        return false;
    } else if(!confirmPass){
        showErrorToast("Thất bại", "Vui lòng nhập lại mật khẩu");
        return false;
    } else if( newPass != confirmPass){
        showErrorToast("Thất bại", "Mật khẩu không khớp");
        return false;
    }
    return true;
}

export function isFormComplete() {
    let cardType = document.querySelector('input[name="cardType"]:checked');
    if (!cardType) {
        showErrorToast("Vui lòng điền đầy đủ thông tin", "Chưa chọn loại thẻ")
        return false;
    }

    let weekdays = document.querySelectorAll('input[name="weekday[]"]:checked');
    if (weekdays.length === 0) {
        showErrorToast("Vui lòng điền đầy đủ thông tin", "Chưa chọn  ngày")
        return false;
    }

    let time = document.querySelector('input[name="time"]:checked');
    if (!time) {
        showErrorToast("Vui lòng điền đầy đủ thông tin", "Chưa chọn  thời gian")
        return false;
    }

    let type = document.querySelector('input[name="type"]:checked');
    if (!type) {
        showErrorToast("Vui lòng điền đầy đủ thông tin", "Chưa chọn  bộ môn")
        return false;
    }

    return true;
}

export function validateAdminAddAcc(fullname, email, password){
    if(!fullname){
        showErrorToast("Thêm thất bại", "Vui lòng điền tên khách hàng");
        return false;
    }else if(!email){
        showErrorToast("Thêm thất bại", "Vui lòng điền email");
        return false;
    }else if(!password){
        showErrorToast("Thêm thất bại", "Vui lòng điền mật khẩu");
        return false;
    }else if(!validateEmail(email)){
        showErrorToast("Thêm thất bại", "Địa chỉ email không hợp lệ");
        return false;
    }else if(!validatePassword(password)){
        showErrorToast("Thêm thất bại", "mật khẩu ít nhất 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt");
        return false;
    }
    return true;

}
export function validateAdminEditAcc(fullname, email, password){
    console.log(email)
    if(email != "" && !validateEmail(email)){
        showErrorToast("Sửa thất bại", "Địa chỉ email không hợp lệ");
        return false;
    }else if(password != "" && !validatePassword(password)){
        showErrorToast("Sửa thất bại", "mật khẩu ít nhất 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt");
        return false;
    }
    return true;

}

export function validateAdminAddCard(maKH, fullname, dateOfBirth, phoneNumber, typeCard, buyDate){
    if(!maKH && !fullname){
        showErrorToast("Thêm thất bại", "Vui lòng điền mã hoặc tên của khách hàng");
        return false;
    }else if(!dateOfBirth){
        showErrorToast("Thêm thất bại", "Vui lòng chọn ngày sinh");
        return false;
    }else if(!phoneNumber){
        showErrorToast("Thêm thất bại", "Vui lòng điền số điện thoại");
        return false;
    }else if(!typeCard){
        showErrorToast("Thêm thất bại", "Vui lòng điền loại thẻ");
        return false;
    }
    else if(!buyDate){
        showErrorToast("Thêm thất bại", "Vui lòng điền ngày mua");
        return false;
    }
    else
     if(!validatePhoneNumber(phoneNumber)){
        showErrorToast("Thêm thất bại", "Vui lòng điền đúng số điện thoại");
        return false;
    }
    return true;
}


export function validateAdminEditCard(value){
    var phoneNumber = value.phoneNumber;
    console.log(phoneNumber)
    if(phoneNumber != "" && !validatePhoneNumber(phoneNumber)){
        showErrorToast("Sửa thất bại", "Số điện thoại không hợp lệ");
        return false;
    }
    return true;

}

export function validateAdminAddCalendar(maThe, name, date, time, type, ptName, note){
    if(!name){
        showErrorToast("Thiếu thông tin", "Vui lòng nhập tên khách hàng");
        return false;
    }else if(!date){
        showErrorToast("Thiếu thông tin", "Vui lòng chọn ngày tập");
        return false;
    }else if(!time){
        showErrorToast("Thiếu thông tin", "Vui lòng chọn thời gian tập");
        return false;
    }else if(!type){
        showErrorToast("Thiếu thông tin", "Vui lòng loại bài tập");
        return false;
    }else if(!ptName){
        showErrorToast("Thiếu thông tin", "Vui lòng nhập tên pt");
        return false;
    }
    return true;

}

export function validateAddProduct(dataObj){
    const {NameItem, Type, Cost, Depict,file_data1, file_data2} = dataObj;
    if(!NameItem){
        showErrorToast("Thất bại", "Vui lòng nhập tên sản phẩm");
        return false;
    }else if(!Type){
        showErrorToast("Thất bại", "Vui lòng chọn loại sản phẩm");
        return false;
    }else if(!Cost){
        showErrorToast("Thất bại", "Vui lòng nhập giá tiền");
        return false;
    }else if(!validateNumber(Cost)){
        showErrorToast("Thất bại", "Giá tiền là một con số");
        return false;
    }else if(!Depict){
        showErrorToast("Thất bại", "Vui lòng điền mô tả");
        return false;
    }else if(!file_data1){
        showErrorToast("Thất bại", "Vui tải lên ảnh chính");
        return false;
    }else if(!file_data2){
        showErrorToast("Thất bại", "Vui lòng tải lên ảnh phụ");
        return false;
    }
    return true;
}
