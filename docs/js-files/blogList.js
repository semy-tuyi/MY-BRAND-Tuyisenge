displayArticleList();


function displayArticleList(){
    let list = document.getElementById('blogList');
    const articles = JSON.parse(localStorage.getItem('articles'));

    // loop through articles

    for(let i=0; i<articles.length; i++){

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




