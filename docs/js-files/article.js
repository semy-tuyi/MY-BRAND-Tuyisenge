displayArticle();
showCommentBox();

let commentBox = document.getElementById('comment-div');

// comment form
let submitComment = document.getElementById('commentForm');
let content = document.getElementById('comment-box');

submitComment.addEventListener('submit', (e)=>{
    e.preventDefault();
    content = content.value;
    addComment(content);
    content.value = '';
    commentBox.style.display = 'none';
    
})

// function to add comment
function addComment(content){
    let today = new Date()
    let user = JSON.parse(localStorage.getItem('user'));
    let key = JSON.parse(localStorage.getItem('key'));
    let article = JSON.parse(localStorage.getItem('articles'))[key].head;
    let name = JSON.parse(localStorage.getItem('subscribers'))[user].fname;
   
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push({
        name,
        today,
        article,
        content,
    })

    localStorage.setItem("comments", JSON.stringify(comments));
}
//show and hide of comment box 
function showCommentBox(){
    let commentBox = document.getElementById('comment-div');
    let commentBtn = document.getElementById('comment-icon');
        
    commentBox.style.display = 'none';

    commentBtn.addEventListener('click' ,function (){
        if(commentBox.style.display === 'none'){
            commentBox.style.display = 'block';

        }else{
            commentBox.style.display = 'none';
        }
    }); 

}

// retrieve article from local storage
function displayArticle(){
    let convas = document.getElementById('convas');

    const articles = JSON.parse(localStorage.getItem('articles'));
    const id = JSON.parse(localStorage.getItem('key'));

    convas.innerHTML = `
    <h2 clss= "sized"> ${articles[id].head} </h2>
    <div for="author" class="col-primary center">Author ${articles[id].author}  </div>
    <img src="images/blog.jpg"  class="blog-image ">
    ${articles[id].body} 
        `;
    //localStorage.removeItem('key');
}

