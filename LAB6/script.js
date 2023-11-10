let popupBg = document.querySelector('.popup__bg');
let popup = document.querySelector('.popup'); 
let openPopupButtons = document.querySelectorAll('.open-popup'); 
let closePopupButton = document.querySelector('.close-popup'); 
let submitFormButton = document.querySelector("#submit-form");
let nameInput = document.querySelector("#name")
let surnameInput = document.querySelector("#surname")
let emailInput = document.querySelector("#email")
let telInput = document.querySelector("#tel")
let messageInput = document.querySelector("#message")

let formObject = {
    name: "",
    surname: "",
    email: "",
    tel: "",
    message: ""

}
nameInput.addEventListener('input', () => {
    formObject.name = nameInput.value;
})

surnameInput.addEventListener('input', () => {
    formObject.surname = surnameInput.value;
})

emailInput.addEventListener('input', () => {
    formObject.email = emailInput.value;
})

telInput.addEventListener('input', () => {
    formObject.tel = telInput.value;
})

messageInput.addEventListener('input', () => {
    formObject.message = messageInput.value;
})

openPopupButtons.forEach((button) => { 
    button.addEventListener('click', (e) => { 
        e.preventDefault();
        console.log(formObject)
        formObject = JSON.parse(localStorage.getItem("form"))
        fillInputs();

        popupBg.classList.add('active');
        popup.classList.add('active'); 
    })
});

closePopupButton.addEventListener('click',() => { 
    popupBg.classList.remove('active');
    popup.classList.remove('active');
    localStorage.setItem("form", JSON.stringify(formObject))
});

document.addEventListener('click', (e) => {
    if(e.target === popupBg) { 
        popupBg.classList.remove('active');
        popup.classList.remove('active');
        localStorage.setItem("form", JSON.stringify(formObject)) 
    }
});

submitFormButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    var isValid = true;
    
    var nameError = document.querySelector("#name-error")
    nameError.innerHTML = ''
    if (!formObject.name){
        nameError.innerHTML = "Заполните имя!"
        isValid = false;
    }

    
    var surnameError = document.querySelector("#surname-error")
    surnameError.innerHTML = ''
    if (!formObject.surname){
        surnameError.innerHTML = "Заполните фамилию!"
        isValid = false;
    }

    var emailError = document.querySelector("#email-error")
    emailError.innerHTML = ''
    if (!formObject.email){
        emailError.innerHTML = "Заполните email!"
        isValid = false;
    }
    else
    {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        console.log(EMAIL_REGEXP.test(formObject.email))
        if (!EMAIL_REGEXP.test(formObject.email)){
            emailError.innerHTML = "Email не удовлетворяет паттерну test@testmail.com"
            isValid = false;
        }
    }

    const telError = document.querySelector("#tel-error")
    telError.innerHTML = ''
    if (formObject.tel)
    {
        const TEL_REGEXP = /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/;
        if (!TEL_REGEXP.test(formObject.tel)){
            telError.innerHTML = 'Номер телефона не удовлетворяет паттерну!'
            isValid = false;
        }
    }

    const messageError = document.querySelector("#message-error")
    messageError.innerHTML = ''
    if (!formObject.message){
        messageError.innerHTML = "Введите сообщение!"
        isValid = false;
    }

    if (isValid){
        popupBg.classList.remove('active');
        popup.classList.remove('active');
        localStorage.setItem("form", JSON.stringify(formObject))

        console.log(navigator.cookieEnabled) 
        document.cookie = "path=D:/Магистратура/3%20семестр/Web/FP_Galina_Vazyukova/LAB6"
        document.cookie = "name=" + encodeURIComponent(formObject.name);
        document.cookie = "surname=" + encodeURIComponent(formObject.surname);
        console.log(document.cookie)
        //alert("Обращение на создание пользователя " + formObject.name + " " + formObject.surname + " отправлено!")
    }
})

function fillInputs(){
    nameInput.value = formObject.name;
    surnameInput.value = formObject.surname;
    emailInput.value = formObject.email
    telInput.value = formObject.tel;
    messageInput.value = formObject.message;
}