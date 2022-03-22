// divs
let query = document.getElementById('query');
let blog = document.getElementById('blog');
let newArticle = document.getElementById('newArticle');

// buttons
 
let queryBtn = document.getElementById('query-btn');
let articleBtn = document.getElementById('new-article-btn');
let blogBtn = document.getElementById('blog-btn');

// default settings
    newArticle.style.display = 'flex';
    blog.style.display = 'none';
    query.style.display = "none";    

// add events
queryBtn.addEventListener('click', function (){
    if(query.style.display === 'none'){
        query.style.display = "block";

        newArticle.style.display = 'none';
        blog.style.display = 'none';
        
    }else{
        newArticle.style.display = 'none';
        blog.style.display = 'none';
        
    }
});

articleBtn.addEventListener('click', function (){
    if(newArticle.style.display === 'none'){
        newArticle.style.display = 'flex';

        query.style.display = 'none';
        blog.style.display = 'none';
        
    }else{
        query.style.display = 'none';
        blog.style.display = 'none';
        
    };
});

blogBtn.addEventListener('click', function(){
    if(blog.style.display === 'none'){
        blog.style.display = 'block';

        query.style.display = 'none';
        newArticle.style.display = 'none';
        
    }else{
        query.style.display = 'none';
        newArticle.style.display = 'none';
    }
});

