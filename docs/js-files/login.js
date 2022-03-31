//login form elements
const username = document.getElementById('username');
const password = document.getElementById('password');
let loginForm = document.getElementById('login-form');

console.log(loginForm)

// add event to login form
// loginForm is null why?
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

// add event to sinup form



function checkInputs(){
    // trim to remove the whitespaces
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if(usernameValue === ''){
        setErrorFor(username, 'Username cannot be blank');
    }else{
        setSuccessFor(username);
    }

    if(passwordValue === ''){
        setErrorFor(password, 'Password cannot be blank');

    }else{
        setSuccessFor(password);
    }
}


function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function setErrorFor(input,message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}
