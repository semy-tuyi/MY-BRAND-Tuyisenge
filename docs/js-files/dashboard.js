
// try to access divs from dash board middile divisions to switched on a click
let dashboardDiv = document.getElementById('dashboard-box');
let postDiv = document.getElementById('posts-box');
let createPostDiv = document.getElementById('create-post-box');
let queryDiv = document.getElementById('query-box');

// access dashboard menu
let dashboardMenu = document.getElementById('dashboard-menu');
let postMenu = document.getElementById('posts-menu');
let newPostMenu = document.getElementById('new-post-menu');
let queryMenu = document.getElementById('query-menu');

// default displaying of box-m divs
dashboardDiv.style.display = "block";
postDiv.style.display = "none";
createPostDiv.style.display = "none";
queryDiv.style.display = "none";

// add event to menu
dashboardMenu.addEventListener('click', ()=>{
    if(dashboardDiv.style.display === 'none'){
        dashboardDiv.style.display = 'block';

        postDiv.style.display = 'none';
        createPostDiv.style.display = 'none';
        queryDiv.style.display = 'none';
    }
});
postMenu.addEventListener('click',()=>{
    if(postDiv.style.display === 'none'){
        postDiv.style.display = 'block';

        dashboardDiv.style.display = 'none';
        createPostDiv.style.display = 'none';
        queryDiv.style.display = 'none';
    }
});
newPostMenu.addEventListener('click',  ()=>{
    if(createPostDiv.style.display === 'none'){
        createPostDiv.style.display = 'block';
        
        postDiv.style.display = 'none';
        dashboardDiv.style.display = 'none';
        queryDiv.style.display = 'none';
    }
});
queryMenu.addEventListener('click', ()=>{
    if(queryDiv.style.display === 'none'){
        queryDiv.style.display = 'block';
        
        createPostDiv.style.display = 'none';
        postDiv.style.display = 'none';
        dashboardDiv.style.display = 'none';
    }
});

// getting form elements for creating new article

ClassicEditor.create(document.querySelector("#content"))
  .catch((error) => {
    console.error(error);
  });
let title = document.getElementById('title');
let authorName = document.getElementById('author');
let content = document.getElementById('content');
let coverImage = document.getElementById('cover-image');
let articleForm = document.getElementById('article-form');


// add event to form
articleForm.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
} );

// function to check input
function checkInputs(){
    const titleValue = title.value;
    const authorNameValue = authorName.value;
    const contentValue = content.value;
    const coverImageFile = coverImage.value;
    const likes = 0;
    
    if(titleValue === ''){
        setErrorFor(title, 'Title can not be blank');
    }else if(authorNameValue === ''){
        setErrorFor(authorName, "Author cannot be blank");
    }else if(contentValue ===''){
        setErrorFor(content, "content field cannot be blank")

    }else{
        addArticle(titleValue, authorNameValue, contentValue, coverImageFile, likes);
        title.value = '';
        authorName.value = '';
        content.value = '';
        
    }
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

// save article into local storage
/*const Article = {
    head:'sdf',
    author:'ds',
    body:'ds',
    coverPhoto:'sd'
    likes: number
};*/

const articles = JSON.parse(localStorage.getItem("articles")) || [];
console.log(articles[7].coverImage)
const addArticle = (head, author, body, coverImageFile, likes) => {
    let Art = {
        head,
        author,
        coverImage,
        body,
        likes,
    }
    /*coverImage.addEventListener('change',(e) => {
            
        const reader = new FileReader()
        const file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
        Art['coverImage'] = reader.result
            console.log(Art['coverImage']);
        });
        //console.log(img)
    
    });*/
    articles.push(Art);
	    
    localStorage.setItem("articles", JSON.stringify(articles));
    alert('A post added successfully!! :(');

};


  let Art = {
        head:'head',
        author:'author',
        coverImage,
        body:'body',
        likes:"5",
    }
    coverImage.addEventListener('change',(e) => {
            
        const reader = new FileReader()
        const file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
        Art['coverImage'] = reader.result
            console.log(Art['coverImage']);
        });
        //console.log(img)
    
    });
/*
function imgStr(){
    coverImage.addEventListener('change',(e) => {
			
        const reader = new FileReader()
        const file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
            return img = reader.result
            //console.log(img)
        });
        //console.log(img)
    
    });
}*/

//console.log(imgStr())

/*	

coverImage.addEventListener('change', (e)=>{
    const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        localStorage.setItem('wallpaper', base64String);
        document.body.style.background = `url(data:image/png;base64,${base64String})`;
      };
      reader.readAsDataURL(file);
  })*/

// access buttons

function posts(){
    let list = document.getElementById('post-crud');
    const articles = JSON.parse(localStorage.getItem('articles'));

    // loop through articles

    for(let i=0; i<articles.length; i++){

    list.innerHTML += `
    <div class="card card-sized" id="${i}">
        <h2 class="center">${articles[i].head}</h2>
        <P class="col-primary">Author: ${articles[i].author}</P>
        <img class="" src="images/blog.jpg" alt="article-picture"/>
        <div>
            <button class="update" id="update">Update</button>
            <button class="delete" id="delete"> Delete</button>
        </div>
        <p>
        ${articles[i].body} 
        </p>
        
    </div>

    `;

    }
    let cards = document.querySelectorAll('.card');
    let key = cards.length -1;

    cards.forEach( card => {
        card.addEventListener('click', () => {
            key = card.id;
            localStorage.setItem('key',key);
            //console.log(key);
            //location.assign('./blog.html');

        })
    })

}

const updateBtn = document.querySelectorAll('.update');
const deleteBtn = document.querySelectorAll('.delete');
/*updateBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        updateArticle();
    });
})*/

deleteBtn.forEach( btn => {
    btn.addEventListener('click', () =>{
        deleteArticle();
        alert('Article deleted successfully!! :(');
    });
})

// function to delete article
function deleteArticle(){
    const articles = JSON.parse(localStorage.getItem('articles'));
    const key = JSON.parse(localStorage.getItem('key'));
    articles.splice(key,1);
    return localStorage.setItem("articles", JSON.stringify(articles));
}

// function to update article
/*function updateArticle(){
    const articles = JSON.parse(localStorage.getItem('articles'));
    const key = JSON.parse(localStorage.getItem('key'));
    console.log(title);
    title.value = articles[key].head;
    authorName.value = articles[key].author;
    content.innerText = `${articles[key].body}`;  
    console.log(content.innerText);
    //coverImage.value = articles[key].coverImage;
    
    postDiv.style.display = "none";
    createPostDiv.style.display = "block";
}*/


// DISPLAY QUERY ON DASHBOARD
function query(){
    let list = document.getElementById('query-content');
    const queries = JSON.parse(localStorage.getItem('queries'));

    // loop through articles

    for(let i=0; i<queries.length; i++){

    list.innerHTML += `
            <div class="query-item bg-3 margin">
                <label for="names" class="margin"><b>Names:</b>${queries[i].name}</label> <br>
                <label for="names" class="margin"><b>Email:</b>${queries[i].email}</label>
                <div class="message margin">
                    ${queries[i].content}
                </div>
                <i class="col-s margin">Reply</i>
            </div>
    `;
        
    }
}

// comments
function comments(){
    let list = document.getElementById('recent-comment');
    const comments = JSON.parse(localStorage.getItem('comments'));
    // loop through comments

    for(let i=0; i<comments.length; i++){

    list.innerHTML += `
            <div class="query-item bg-3 margin">
                <label for="names" class="margin"><b>Name:</b>${comments[i].name}</label> <br>
                <label for="names" class="margin"><b>Article:</b>${comments[i].article}</label><br>
                <label for="names" class="margin"><b>Date:</b>${comments[i].today}</label><br>
                   <b> ${comments[i].content}  </b>   
            </div>
    `;
    }
}

posts();
query();
comments();