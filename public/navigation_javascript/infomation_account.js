const nameClientElement = document.getElementById("name-client");
const dateOfBirthClientElement = document.getElementById("dateofbirth-client");
const emailClientElement = document.getElementById("email-client");
const phoneClientElement = document.getElementById("phone-client");


export function innerTextOfInformation(name, date, email, phone) {
    nameClientElement.innerText = name;
    dateOfBirthClientElement.innerText = date;
    emailClientElement.innerText = email;
    phoneClientElement.innerText = phone;
}