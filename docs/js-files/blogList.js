//retrieveBlogs();
console.log("here we go");

const retrieveBlogs = () => {
    //const articles = JSON.parse(localStorage.getItem('articles'));
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }

    fetch("https://tsamuel-brand-app.herokuapp.com/article", requestOptions)
        .then(response => response.json())
        .then(result => {
            

            let list = document.getElementById('blogList');

            //console.log(result);
            result.forEach( article => {
                
                list.innerHTML += `
                <div class="card card-sized" id="${article._id}">
                    <h2 class="center">${article.title}</h2>
                    <P class="col-primary">Author: ${article.authorName}</P>
                    <img class="" src="images/blog.jpg" alt="article-picture"/>
           
                    <a href="blog.html" class="col-primary read"onclick = "readMore('${article._id}')" >Read more..</a>
                    <p>
                    ${article.content} 
                    </p>
                    </div>
                </div>
            
                `;
            });
        })
        .catch(error => console.log('error', error));
    }

    retrieveBlogs()

    const readMore = article => {
        localStorage.setItem('articleToRead', article);
      }
      const logedInUser = JSON.parse(localStorage.getItem("logedInUser")) || [];
      if (logedInUser.role) {
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "block";
        //document.getElementById('username').innerHTML = loginedUser.username
      }else{
          document.getElementById("login").style.display = "block";
        document.getElementById("logout").style.display = "none";
      }
      const logout = () => {
        localStorage.removeItem("logedInUser");
        document.getElementById("login").style.display = "block";
        document.getElementById("logout").style.display = "none";
       
      };
/*
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

    list.innerHTML += ` <b>
                    <tr >
                    
                        <td class="">${article._id}</td>  &nbsp;  &nbsp; &nbsp;  &nbsp;
                        <td class="pd-l">${article.title}</td> &nbsp;  &nbsp; &nbsp;  &nbsp;
                        <td class="pd-l">${article.authorName}</td> &nbsp;  &nbsp; &nbsp;  &nbsp;
                        <td class="pd-l">${article.createdAt}</td> &nbsp;  &nbsp; &nbsp;  &nbsp;
                        <td class="pd-l">
                        
                            <button onclick="updater('${article._id}','${article.title}','${article.authorName}','${article.content}')">
                                <i class = "fa fa-edit"></i>
                            </button>
                            <button onclick="deleteArticle('${article._id}')">
                                <i class="fa  fa-trash col-s "></i>
                            </button>
                           
                        
                        </td>
                    </tr>
                    </b>
                    <br> <br>
                `;
    
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

*/


