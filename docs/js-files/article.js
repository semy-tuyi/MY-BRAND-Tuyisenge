
const id = localStorage.getItem('articleToRead');
//console.log(id);

//window.onload = 
const displayArticle = () =>{
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`https://tsamuel-brand-app.herokuapp.com/article/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          //article = result;
            console.log(result);
          let convas = document.getElementById('convas');
          convas.innerHTML = `
          <h2 clss= "sized"> ${result.title} </h2>
          <div for="author" class="col-primary center">Author ${result.authorName}  </div>
          <img src="images/blog.jpg"  class="blog-image ">
          <p>
          ${result.content} 
          </p>
          <div class="col-secondary  center">
                      <i class="fa fa-thumbs-o-up padding"> Likes: </i>
                      <i class="fa fa-comment padding" id="icon"> Comment:  </i>
                  </div>
              `;
        })
        .catch(error => console.log('error', error));
    
};

displayArticle();
const logedInUser = JSON.parse(localStorage.getItem("logedInUser")) || [];
if (logedInUser.role) {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "block";
    
  }else{
      document.getElementById("login").style.display = "block";
    document.getElementById("logout").style.display = "none";
  }
  const logout = () => {
    localStorage.removeItem("logedInUser");
    document.getElementById("login").style.display = "block";
    document.getElementById("logout").style.display = "none";
    
  };



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

//show and hide of comment box 
function showCommentBox(){
    let commentBox = document.getElementById('comment-div');
    let commentBtn = document.getElementById('icon');
        
    commentBox.style.display = 'none';

    commentBtn.addEventListener('click' ,function (){
        if(commentBox.style.display === 'none'){
            commentBox.style.display = 'block';

        }else{
            commentBox.style.display = 'none';
        }
    }); 

}
showCommentBox();
// function to add comment
/*function addComment(content){
    let today = new Date()
    let user = JSON.parse(localStorage.getItem('user'));
    let key = JSON.parse(localStorage.getItem('key'));
    let articles = JSON.parse(localStorage.getItem('articles'));
    let article = articles.filter(item => item.id == key);
    articles = articles.filter(item => item.id != key);
    let name = JSON.parse(localStorage.getItem('subscribers'))[user].fname;
    
    let comment = article[0].comments;

    comment.push({
        name,
        today,
        content,
    })
    console.log('this array after push',comment)

    let Article = {
        id:key,
         head:article[0].head,
         author:article[0].author,
         coverImage:article[0].coverImage,
         body:article[0].body,
         likes:article[0].likes,
         comments:comment,
     }
     console.log(Article);
     articles.push(Article);
         
     localStorage.setItem("articles", JSON.stringify(articles));

}*/
//show and hide of comment box 
/*function showCommentBox(){
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

}*/

/*function displayArticle(){
    let convas = document.getElementById('convas');

    //const articles = JSON.parse(localStorage.getItem('articles'));
    //const id = JSON.parse(localStorage.getItem('key'));

    //let article = articles.filter( item => item.id === id);

    convas.innerHTML = `
    <h2 clss= "sized"> ${article.title} </h2>
    <div for="author" class="col-primary center">Author ${article.authorName}  </div>
    <img src="images/blog.jpg"  class="blog-image ">
    <p>
    ${article.content}
    </p>
    <div class="col-secondary  center">
                <!--<i class="fa fa-thumbs-o-up padding"> Likes: </i>
                <i class="fa fa-comment padding" id="comment-icon"> Comment:  </i>-->
            </div>
        `;
}*/
/*
// display comments on blog
let blogComments = () =>{
    let key = JSON.parse(localStorage.getItem('key'));
    let articles = JSON.parse(localStorage.getItem('articles'));
    let article = articles.filter(item => item.id == key);
    let comments = article[0].comments;

    const board = document.getElementById('comm');

    comments.forEach(element => {
        board.innerHTML += `
        <div>
            <p><b>${element.name} </b> Commented <br>
            ${element.today} <br>
            ${element.content}</p>
        </div>
        `;
    });
   
};
blogComments();*/
