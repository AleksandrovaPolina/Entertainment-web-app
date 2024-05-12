const emailInput = document.querySelector('#email_input');
const passInput = document.querySelector('#pass_input');
const warningInputMessage = document.querySelector('.warning_input');
const warningLoginMessage = document.querySelector('.warning_login');
const loginBtn = document.querySelector('.form__btn');




async function checkUser(){
    try{
        const resp = await fetch('http://localhost:3001/userData');
        const data = await resp.json();
        const getUsers = data.find(item => item.email === emailInput.value && item.password == passInput.value)
        if(!getUsers){
            warningLoginMessage.classList.remove('none');
        } else{
            warningLoginMessage.classList.add('none');
            window.location.href = './profile-page.html'
            localStorage.setItem('login', JSON.stringify(emailInput.value))
        }
    }catch(error){
        console.error(error);
    }
}

function checkInputs(){
    if(emailInput.value.trim() ==="" || passInput.value.trim() === ""){
        warningInputMessage.classList.remove('none');
        warningLoginMessage.classList.add('none');
    } else{
        warningInputMessage.classList.add('none');
        checkUser();
    }
}

loginBtn.addEventListener('click', function(event){
    event.preventDefault();
    checkInputs();
})