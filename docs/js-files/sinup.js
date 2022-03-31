 // access our form
const firstName = document.getElementById('first-name');
const userEmail = document.getElementById('email');
const userPassword = document.getElementById('user-password');
const sinupForm = document.getElementById('sinup-form');

// add event to sinup form
sinupForm.addEventListener('submit', (e) => {
    e.preventDefault();
     checkSinupInputs();
})


function checkSinupInputs(){
    // trim to prevent white space
    const firstNameValue = firstName.value.trim();
    const userEmailValue = userEmail.value.trim();
    const userPasswordValue = userPassword.value.trim();

    if( firstNameValue === ''){
        setErrorFor(firstName, "Name cannot be blank");
    }else{
        setSuccessFor(firstName);
    }

    if(userEmailValue === ''){
        setErrorFor(userEmail, 'Email cannot be blank');
    }else if( isEmail(userEmail)){
        setErrorFor(userEmail, 'Email not valid');
    }
    else{
        setSuccessFor(userEmail)
    }

    if(userPasswordValue === ''){
        setErrorFor(userPassword, "Password cannot be blank");
    }else{
        setSuccessFor(userPassword);
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

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
