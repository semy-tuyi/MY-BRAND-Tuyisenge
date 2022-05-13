
//retrieveArticles();
//retrieveQuery();
// getting form elements for creating new article
//CKEDITOR.replace('content');

/*ClassicEditor.create(document.querySelector("#content"))
  .catch((error) => {
    console.error(error);
  });*/

let title = document.getElementById('title');
let authorName = document.getElementById('author');
let content = document.getElementById('content');
//let content = CKEDITOR.instances.body.getData();
let coverImage = document.getElementById('cover-image');
let articleForm = document.getElementById('article-form');

// add event to form
articleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
    
} );

// function to check input
const checkInputs = () => {
    const titleValue = title.value;
    const authorNameValue = authorName.value;
    const contentValue = content.value;
    const coverImageFile = coverImage.value;
    
    if(titleValue === ''){
        setErrorFor(title, 'Title can not be blank');
    }else if(authorNameValue === ''){
        setErrorFor(authorName, "Author cannot be blank");
    }else if(contentValue ===''){
        setErrorFor(content, "content field cannot be blank")

    }else{
       if(localStorage.getItem("tobeUpdated")){
        let article = JSON.parse(localStorage.getItem("tobeUpdated"));
        console.log(article);
        //console.log(article);
        updateArticle(article.id,titleValue,authorNameValue, contentValue);
        localStorage.removeItem("tobeUpdated");
       }else{
        addArticle(titleValue, authorNameValue, contentValue);

       }

    }
}
const  setSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

const user = JSON.parse(localStorage.getItem("logedInUser"));

const addArticle = (title, author, content) => {

    let reqHeader = new Headers();
    reqHeader.append("Content-type", "application/json");
    reqHeader.append("Authorization", `Bearer ${user.token}`);
    
    //console.log(reqHeader)

    let raw = JSON.stringify({
        "title":title,
        "authorName":author,
        "content":content,
        
    });

    let requestOptions = {
        method: 'POST',
        headers:reqHeader,
        body:raw,
        redirect:'follow'
    };

    fetch("https://tsamuel-brand-app.herokuapp.com/article", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert("article added successfully!")
            location.reload();

        })
        .catch(error => console.log('error', error));

}   

const retrieveArticles = () => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }

    fetch("https://tsamuel-brand-app.herokuapp.com/article/", requestOptions)
        .then(response => response.json())
        .then(result => {
            //alert("article added successfully!")
            //console.log(result)

            let list = document.getElementById('post-crud');
            
            result.forEach( article => {
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
            //onclick = "update('${article._id}','${article.title}','${article.authorName}','${article.content}')"
            });
           
        })
        .catch(error => console.log('error', error));
};

let deleteArticle = (id) =>{
    
    let reqHeader = new Headers();
    reqHeader.append("Authorization", `Bearer ${user.token}`);

    let requestOptions = {
        method:'DELETE',
        headers: reqHeader,
        redirect:'follow'
    }
    fetch(`https://tsamuel-brand-app.herokuapp.com/article/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            //console.log(result);
            alert(result.message);
            location.reload();
        })
        .catch(error => console.log('error', error));
}

//
let updater = (id, title, authorName, content) => {
    const article = {
        id,
        title,
        authorName,
        content
    };
    localStorage.setItem('tobeUpdated',JSON.stringify(article));

    createPostDiv.style.display = 'block';  
    postDiv.style.display = 'none';
    dashboardDiv.style.display = 'none';
    queryDiv.style.display = 'none';

    document.getElementById('cover').innerHTML = "Update Article";
    document.getElementById('title').value = title
    document.getElementById('author').value = authorName
    document.getElementById('content').value = content


};

let updateArticle = (id,title,authorName,content) => {

    let reqHeader = new Headers();
    reqHeader.append("Content-type", "application/json");
    reqHeader.append("Authorization", `Bearer ${user.token}`);
    
    //console.log(reqHeader)

    let raw = JSON.stringify({
        "title":title,
        "authorName":authorName,
        "content":content,
        
    });

    let requestOptions = {
        method: 'PATCH',
        headers:reqHeader,
        body:raw,
        redirect:'follow'
    };

    fetch(`https://tsamuel-brand-app.herokuapp.com/article/${id}/update`, requestOptions)
        .then(response => response.json())
        .then(result => {
            alert("article updated successfully!")
           // console.log(result)
            location.reload();

        })
        .catch(error => console.log('error', error));


    
}


// DISPLAY QUERY ON DASHBOARD
const  retrieveQuery = () => {
    //let list = document.getElementById('query-content');

    let reqHeader = new Headers();
    reqHeader.append("Content-type", "application/json");
    reqHeader.append("Authorization", `Bearer ${user.token}`);

    let requestOptions = {
        method: 'GET',
        headers:reqHeader,
        redirect: 'follow'
    }

    fetch("https://tsamuel-brand-app.herokuapp.com/query", requestOptions)
        .then(response => response.json())
        .then(result => {
            //alert("article added successfully!")
            //console.log(result)

            let list = document.getElementById('query-content');
            
            result.forEach( query => {
                list.innerHTML += `
            <div class="query-item bg-3 margin">
                <label for="names" class="margin"><b>Names:</b>${query.name}</label> <br>
                <label for="names" class="margin"><b>Email:</b>${query.email}</label>
                <p class="message margin">
                    ${query.message}
                </p>

                <button class="col-s margin">Reply</button>
                <button onclick = "deleteQuery('${query._id}')" class="col-s margin">Delete</button>
            </div>
    `;
            });
           
        })
        .catch(error => console.log('error', error));
}

const deleteQuery = (id) => {
    let reqHeader = new Headers();
    reqHeader.append("Authorization", `Bearer ${user.token}`);

    let requestOptions = {
        method:'DELETE',
        headers: reqHeader,
        redirect:'follow'
    }
    fetch(`https://tsamuel-brand-app.herokuapp.com/query/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            location.reload();
        })
        .catch(error => console.log('error', error));
}  


const logout = () => {
  localStorage.removeItem("logedInUser");
  console.log('you are logout')
  location.reload();
};
  