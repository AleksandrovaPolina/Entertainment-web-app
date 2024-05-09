const emailInput = document.querySelector('#email-input');
const passInput = document.querySelector('#pass-input');
const passSecondInput = document.querySelector('#second-pass-input');
const warningInputMessage = document.querySelector('.warning_input');
const warningPassMessage = document.querySelector('.warning_pass');
const warningDifferentPass = document.querySelector('.warning_difference-pass');
const warningError = document.querySelector('.warning_error');
const warningServer = document.querySelector('.warning_server');
const btn = document.querySelector('.form__btn');



function checkInputs(){
    if(emailInput.value.trim() === '' || passInput.value.trim() === '' || passSecondInput.value.trim() === ''){
        warningInputMessage.classList.remove('none');
        warningPassMessage.classList.add('none');
        warningDifferentPass.classList.add('none');
    }else if(passInput.value.trim().length < 6){
        warningInputMessage.classList.add('none');
        warningPassMessage.classList.remove('none');
        warningDifferentPass.classList.add('none');
    } else if(passInput.value.trim() !== passSecondInput.value.trim()){
        warningDifferentPass.classList.remove('none');
        warningPassMessage.classList.add('none');
        warningInputMessage.classList.add('none');
    } else{
        checkUser()
    }
}

async function checkUser(){
    try{
        const resp = await fetch('http://localhost:3001/userData');
        const data = await resp.json();
        const getUsers = data.find(item => item.email === emailInput.value)
        if(!getUsers){
            signUp()
        } else{
            warningError.classList.remove('none');
        }
    }catch(error){
        console.error(error);
    }
}

function signUp(){
    const userData = {
        "email": emailInput.value,
        "password": passInput.value,
    }
    fetch('http://localhost:3001/userData', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers:{
            'content-type':'application/json;charset=UTF-8'
        }
    })
    .then((res)=>{
        if(res.ok){
            window.location.href = './profile-page.html'
        } else{
            warningServer.classList.remove('none');
        }
    })
    .catch((error)=>{
        console.error(error);
    })
}

btn.addEventListener('click', function(event){
    event.preventDefault();
    checkInputs()
})