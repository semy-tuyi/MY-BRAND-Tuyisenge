// form validation

//login form elements
const username = document.getElementById('username');
const password = document.getElementById('password');
let loginForm = document.getElementById('login-form');


// add event to login form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs(){
    const usernameValue = username.value;
    const passwordValue = password.value;
    
    if(usernameValue === ''){
        setErrorFor(username, 'Username cannot be blank');
    }

    if(passwordValue === ''){
        setErrorFor(password, 'Password cannot be blank');

    }else{
       login();
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


// login
// Add admin into local storage
/*
const Administrator = {
    name:"admin2022",
    password:'semysamy'
};
localStorage.setItem('Administrator', JSON.stringify(Administrator));
*/

// retrive admin infor from local storage

function login(e){
    // retrieve administrator properties
    const admin = JSON.parse(localStorage.getItem("Administrator"));
    
    const usernameValue = username.value;
    const passwordValue = password.value;
    
    let exist = () =>  admin.name == usernameValue && admin.password == passwordValue ;
   
    if(!exist()){
        setErrorFor(username, "invalid credentials!");
        setErrorFor(password, "Invalid credentials!");
       
    }else{
        location.href = "admin.html";
    }   
}