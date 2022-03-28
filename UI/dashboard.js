// try to access divs from dash board.
let dashboardDiv = document.getElementById('dashboard-box');
let postDiv = document.getElementById('posts-box');
let createPostDiv = document.getElementById('create-post-box');
let queryDiv = document.getElementById('query-box');

// accss dashboard menu
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

