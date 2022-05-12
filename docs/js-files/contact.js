//displayArticleList();

let contactNames = document.getElementById('names')
    emailAddress = document.getElementById('email')
    contactMessage = document.getElementById('contact-message'),
    contactForm = document.getElementById('contact-form');
 
contactForm.addEventListener('submit', e =>{
    e.preventDefault();
    checkInputs();
});

const  checkInputs = () => {
   const contactNamesValue = contactNames.value;
   const emailAddressValue = emailAddress.value;
   const contactMessageValue = contactMessage.value;

    if(contactNamesValue === '' && emailAddressValue === ''){
        setErrorFor(contactNames, 'Names and Email cannot be blank');
    }else if(contactNamesValue === ''){
        setErrorFor(contactNames, 'names cannot be blank');
    }else if(emailAddressValue === ''){
        setErrorFor(emailAddress, 'Email cannot be blank');
    }
    else if(contactMessageValue === ''){
        setErrorFor(contactMessage, "text cannot be blank")
    }else{
        sendQuery(contactNamesValue, emailAddressValue, contactMessageValue);
        contactNames.value = '';
        emailAddress.value = '';
        contactMessage.value = '';
    }
}

const  setSuccessFor = (input) => {
    const formDiv = input.parentElement;
    formDiv.classList += 'success';
}

const setErrorFor = (input, msg) =>{
 const formDiv = input.parentElement;
 const small = formDiv.querySelector('small');
 formDiv.classList += ' error';
 small.innerText = msg;

}

// send query
/*
const query = JSON.parse(localStorage.getItem("queries")) || [];
const sendQuery = (name, email,content ) => {

    query.push({
        name,
        email,
        content,
    });
	    

    localStorage.setItem("queries", JSON.stringify(query));
     alert('Message sent successfully!! :(');

};*/
const sendQuery = (names, email, message) => {
    let reqHeader = new Headers();
    reqHeader.append("Content-type", "application/json");

    let raw = JSON.stringify({
        "name": names,
        "email": email,
        "message": message
        
    });

    let requestOptions = {
        method:'POST',
        headers:reqHeader,
        body: raw,
        
    };

    fetch("https://tsamuel-brand-app.herokuapp.com/query", requestOptions)
    .then(response => response.json())
    .then(result => {
       console.log(result);
        alert("Message sent! ")
    })
    .catch(error => console.log('error', error));

};

// display 2 latest article on portifolio
function displayArticleList(){
    let list = document.getElementById('blog-link');
    const articles = JSON.parse(localStorage.getItem('articles'));

    // loop through articles
    let l = articles.length;
    for(let i= l-1; i > l-3; i--){

    list.innerHTML += `
    <div class="card card-sized" id="${articles[i].id}">
        <h2 class="center">${articles[i].head}</h2>
        <P class="col-primary">Author: ${articles[i].author}</P>
        <img class="" src="images/blog.jpg" alt="article-picture"/>
        <p>
        ${articles[i].body} 
        </p>
        <a href="blog.html" class="col-primary read">Read more..</a>
        </div>
    </div>

    `;

    }
    let cards = document.querySelectorAll('.card');
    let key = cards.length -1;

    cards.forEach( card => {
        card.addEventListener('click', () => {
            key = card.id;
            localStorage.setItem('key',key);
            location.assign('./blog.html');

        })
    })

}
