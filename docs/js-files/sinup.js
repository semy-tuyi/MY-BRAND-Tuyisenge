 // switching sign up and login
 let showLogin = document.getElementById('login-choice');

 // access our signup form
const firstName = document.getElementById('first-name');
const userEmail = document.getElementById('email');
const userPassword = document.getElementById('user-password');
const sinupForm = document.getElementById('sinup-form');

// access login form
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginForm = document.getElementById('loginForm');
loginForm.style.display = 'none';

// add event to sinup form
sinupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    signUp();
})

// add event to login form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    login();
})

showLogin.addEventListener('click', ()=>{
    if(loginForm.style.display === 'none'){
        loginForm.style.display = 'block';
        sinupForm.style.display = 'none';
        showLogin.innerText = 'SinUp';
        
    }else{
        sinupForm.style.display = 'block';
        loginForm.style.display = 'none';
        showLogin.innerText = 'Login';
    }
    
})

function signUp(){
    // trim to prevent white space
    const firstNameValue = firstName.value.trim();
    const userEmailValue = userEmail.value.trim();
    const userPasswordValue = userPassword.value.trim();

    if( firstNameValue === ''){
        setErrorFor(firstName, "Name cannot be blank");
    }else if(userEmailValue === ''){
        setErrorFor(userEmail, 'Email cannot be blank');
    }else if( isEmail(userEmail)){
        setErrorFor(userEmail, 'Email not valid');
    }else if(userPasswordValue === ''){
        setErrorFor(userPassword, "Password cannot be blank");
    }else{
        addSubscriber(firstNameValue, userEmailValue, userPasswordValue);
        firstName.value = '';
        userEmail.value = '';
        userPassword.value = '';
    }
}

function login(){
    // trim to prevent white space
    const loginEmailValue = loginEmail.value.trim();
    const loginPasswordValue = loginPassword.value.trim();

    if(loginEmailValue === ''){
        setErrorFor(loginEmail, 'Email cannot be blank');
    }else if( isEmail(loginEmail)){
        setErrorFor(loginEmail, 'Email not valid');
    }else if(loginPasswordValue === ''){
        setErrorFor(loginPassword, "Password cannot be blank");
    }else{
        checkSubscriber( loginEmailValue, loginPasswordValue);
        loginEmail.value = '';
        loginPassword.value = '';
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

// create object for sinup
//const articles = JSON.parse(localStorage.getItem("articles")) || [];
const subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
const addSubscriber = (fname, email, password) => {

    subscribers.push({
        fname,
        email,
        password,
    });
	    
    localStorage.setItem("subscribers", JSON.stringify(subscribers));
    checkSubscriber(email, password);
    //alert('Thank for subscription!! :(');
};

const checkSubscriber = (mail, pwd) => {
    const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
    subscribers.forEach(element => {
        if(element.email === mail && element.password === pwd  ){
            let user =  subscribers.indexOf(element, 0);
            localStorage.setItem('user', JSON.stringify(user))
            location.assign('./articles.html');
        }
    });
}