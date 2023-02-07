showNav();

function showList() {
    let token = localStorage.getItem('token')
    if (token) {
        token = JSON.parse(token)

        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/blogs',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            success: (blogs) => {
                let html = `<div id="carouselExampleIndicators" class="carousel slide" >
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../BE/public/images/iphone.jpg" class="d-block w-100" alt="..." width="100%" height="400px">
    </div>
    <div class="carousel-item">
      <img src="../BE/public/images/iphone.jpg" class="d-block w-100" alt="..." width="100%" height="400px">
    </div>
    <div class="carousel-item">
      <img src="../BE/public/images/iphone.jpg" class="d-block w-100" alt="..." width="100%" height="400px">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
                            <div class="row row-cols-1 row-cols-md-3 g-4">`;
                if (token.role === 'admin') {
                    blogs.map(item => {
                        $.ajax({
                            type: 'GET',
                            url: `http://localhost:3000/likes/countLike/${item.id}`,
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + token.token
                            },
                            success: (likes) => {
                                html += `<div class="col">
                                  <div class="card" style="width: 18rem;">
                                   <img src="${item.image}" width="200px" height="200px" class="card-img-top" alt="...">
                                   <div class="card-body">
                                    <h5 class="card-title">${item.nameCategory}</h5>
                                    <h6 class="card-title">${item.status},${item.date}</h6>
                                    <h6 class="card-title">${item.username}</h6>
                                    <h6 class="card-title">${likes[0].likes} <a href="#" class="btn btn-primary" onclick="checkLike(${item.id}, ${token.idUser})">Like</a></h6>
                                    <p class="card-text">${item.content}</p>
                                    <a href="#" class="btn btn-primary" onclick="remove(${item.id})">Delete</a>
                                    <a  href="#"  class="btn btn-primary " onclick="showComment(${item.id})">Comment</a>
                                   </div>
                                 </div>
                                </div>`
                                html += `</div>`
                                $('#tbody').html(html)
                            }
                        })

                    })

                } else {
                    blogs.map(item => {
                        $.ajax({
                            type: 'GET',
                            url: `http://localhost:3000/likes/countLike/${item.id}`,
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + token.token
                            },
                            success: (likes) => {
                                html += `<div class="col">
                                  <div class="card" style="width: 18rem;">
                                   <img src="${item.image}" width="200px" height="200px" class="card-img-top" alt="...">
                                   <div class="card-body">
                                    <h5 class="card-title">${item.nameCategory}</h5>
                                    <h6 class="card-title">${item.status},${item.date}</h6>
                                    <h6 class="card-title">${item.username}</h6>
                                    <h6 class="card-title">${likes[0].likes} <a href="#" class="btn btn-primary" onclick="checkLike(${item.id}, ${token.idUser})">Like</a></h6>
                                    <p class="card-text">${item.content}</p>
                                    <a  href="#"  class="btn btn-primary " onclick="showComment(${item.id})">Comment</a>
                                   </div>
                                 </div>
                                </div>`
                                html += `</div>`
                                $('#tbody').html(html)
                            }
                        })

                    })
                }
            }
        })
    }
}

function showComment(id) {
    let token = localStorage.getItem('token')
    if (token) {
        token = JSON.parse(token)
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/comments/showComment/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            success: (comments) => {
                let html = `
                <p>${token.username}</p>
                <input id="comment" placeholder="Comment">
                <button onclick="commentSave(${id},${token.idUser})">Save</button>
                <br>
                <br>
                <hr>`;
                ;
                comments.map(item =>{
                    html += `
                <h6>${item.username}</h6>
                <p>${item.comment}</p>
                <hr>
                   `})
                $('#body').html(html)

            }
        })
    }
}

function checkLike(idBlog, idUser){
    let token = localStorage.getItem('token')
    token = JSON.parse(token)
    let like ={
        user: idUser,
        blog: idBlog
    }
    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/likes/checkLike`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token
        },
        data: JSON.stringify(like),
        success: () => {
            showHome();
        }
    })
}

function commentSave(idBlog,idUser) {
    let user = idUser;
    let blog = idBlog;
    let comment = $('#comment').val();
    let Comment = {
        user:user,
        blog: blog,
        comment: comment
    };
    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/comments/commentSave`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(Comment),
        success: () => {
            showComment(idBlog);
        }
    })


}

function getCategoriesCreate() {
    let token = localStorage.getItem('token')
    if (token) {
        token = JSON.parse(token)
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/blogs/getCategories',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            success: (categories) => {
                // console.log(categories)
                let Categories = ``;
                for (const category of categories) {
                    Categories += `
                    <option value=${category.id}>${category.name}</option>
                `
                }
                $('#categoryAdd').html(Categories);
            }
        })
    }
}

function showFormAdd() {
    let token = localStorage.getItem('token')
    token = JSON.parse(token)
    $('#body').html(` 
 <div  style="display: flex; justify-content: center">
 <form style="width: 50%">
 <div> <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Content</label>
    <input type="text" class="form-control" id="content" aria-describedby="emailHelp"  >
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Status</label>
    <input type="text" class="form-control" id="status">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Image</label>
    <input type="file" id="fileButton" onchange="uploadImage(event)">
             <div id="imgDiv"></div>
  </div>
   <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Date</label>
    <input type="text" class="form-control" id="date">
  </div>
  <div>
    <label for="exampleInputPassword1" class="form-label">Category</label>
  <select id="categoryAdd">
<!--             <option selected>Category</option>-->
             </select>
</div>
  
  <button class="btn btn-primary" onclick="add()">Add</button>
   </div>
</form>
</div>
 
`)
    getCategoriesCreate();
}

function showHome() {
    $('#body').html(`
        <div id="tbody"></div>
   `)
    showList();
}

function showNav() {
    let token = localStorage.getItem('token');
    token = JSON.parse(token)
    if (token) {
        if (token.role === 'member') {
            $('#nav').html(`

<nav class="navbar" style="background-color: #e3f2fd;">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">${token.username}</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#" onclick="showHome()">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" onclick="showFormAdd()">Add</a>
        </li>
         <li class="nav-item">
          <a class="nav-link" href="#" onclick="logout()">LogOut</a>
        </li>
     
        <li class="nav-item">
          <a class="nav-link" onclick="showMyList()">My List</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onkeyup="searchProduct(this.value)">
<!--        <button class="btn btn-outline-success" type="submit">Search</button>-->
      </form>
    </div>
  </div>
</nav>

    `)
        } else {
            $('#nav').html(`
<nav class="navbar" style="background-color: #e3f2fd;">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">${token.username}</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#" onclick="showHome()">Home</a>
        </li>
       
         <li class="nav-item">
          <a class="nav-link" href="#" onclick="logout()">LogOut</a>
        </li>
     
        <li class="nav-item">
          <a class="nav-link" onclick="userManager()">User Manager</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onkeyup="searchProduct(this.value)">
<!--        <button class="btn btn-outline-success" type="submit">Search</button>-->
      </form>
    </div>
  </div>
</nav>

    `)
        }

    } else {
        $('#nav').html(`
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
   
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        
       
         <li class="nav-item">
          <a class="nav-link" href="#" onclick="showFormLogin()" style="color: blue">Login</a>
        </li>
     
        <li class="nav-item">
          <a class="nav-link" onclick="showFormRegister()" style="color: red">Register</a>
        </li>
      </ul>
  
    </div>
  </div>
</nav>

    `)
    }
}

function showMyList() {
    let token = localStorage.getItem('token')
    if (token) {
        token = JSON.parse(token)
        console.log(token, 2)
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/blogs/myList/${token.idUser}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            success: (blogs) => {
                let html = '';

                blogs.map(item => {
                    html += `<div class="card" style="width: 18rem;">
                                  <img src="${item.image}" class="card-img-top" alt="...">
                                  <div class="card-body">
                                    <h5 class="card-title">${item.nameCategory}</h5>
                                    <h6 class="card-title">${item.status},${item.date}</h6>
                                     <h6 class="card-title">${item.username}</h6>
                                    <p class="card-text">${item.content}</p>
                                    <a href="#" class="btn btn-primary" onclick="remove(${item.id})">Delete</a>
                                    <a href="#" class="btn btn-primary" onclick="showFormEdit(${item.id})">Edit</a>

                                  </div>
                                </div>`
                })
                $('#tbody').html(html)
            }


        })

    }

}

function userManager() {
    let token = localStorage.getItem('token')
    if (token) {
        token = JSON.parse(token)
        // console.log(token.role)
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/auth',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            success: (users) => {
                // console.log(users);
                let html = '';
                users.map(item => {
                    html += `<tr>
             <td>${item.id}</td>
            <td>${item.username}</td>
            <td>${item.role}</td>
            <td><button onclick="lock(${item.id})">${item.status}</button></td>
            <td><button onclick="deleteRemove(${item.id})">Delete</button></td>
        </tr>`
                })
                $('#tbody').html(html)
            }
        })
    }
}

function lock(id) {
    if (confirm('lock ?')) {
        let token = localStorage.getItem('token')
        if (token) {
            token = JSON.parse(token)
            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/auth/lock/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token.token
                },
                success: () => {
                    userManager();
                }
            })
        }
    }

}

function add() {
    let token = localStorage.getItem('token')
    if (token) {
        token = JSON.parse(token)
        let content = $('#content').val();
        let status = $('#status').val();
        let image = localStorage.getItem('image')
        let date = $('#date').val();
        let user = token.idUser;
        let category = $('#categoryAdd').val();
        let blog = {
            content: content,
            status: status,
            image: image,
            date: date,
            user: user
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/blogs',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            data: JSON.stringify(blog),

            success: (newBlog) => {
                let idBlog = newBlog.id;
                let blogCategory = {
                    idBlog: idBlog,
                    idCategory: category
                }
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3000/blogs/blogCategory',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token.token
                    },
                    data: JSON.stringify(blogCategory),

                    success: (blogCategory) => {
                        showHome()
                    }
                })

            }
        })
    }
}

function remove(id) {
    if (confirm('You are sure?')) {
        let token = localStorage.getItem('token')
        if (token) {
            token = JSON.parse(token)
            $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/blogs/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token.token
                },
                success: () => {
                    showHome();
                }
            })
        }
    }
}

function showFormEdit(id) {
    let token = localStorage.getItem('token')
    if (token) {
        token = JSON.parse(token)
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/blogs/findById/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            success: (blogs) => {
                $('#body').html(`
 <div  style="display: flex; justify-content: center">
 <form style="width: 50%">
 <div> <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Content</label>
    <input type="text" class="form-control" id="content" aria-describedby="emailHelp" value="${blogs.content}" >
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Image</label>
    <input type="file" id="fileButton" onchange="uploadImage(event)">
             <div id="imgDiv"><img src="${blogs.image}" alt=""></div>
  </div>
  <button type="submit" class="btn btn-primary" onclick="edit()">Edit</button>
   </div>
</form>
</div>
 
`)
            }
        })

    }
}

function edit(id) {
    let token = localStorage.getItem('token')
    if (token) {
        token = JSON.parse(token)
        let content = $('#content').val();
        let image = localStorage.getItem('image')
        let blog = {
            content: content,
            image: image,
        }
        $.ajax({
            type: 'PUT',
            url: `http://localhost:3000/blogs/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            data: JSON.stringify(blog),

            success: () => {
                showHome()
            }
        })
    }
}

function uploadImage(e) {
    let fbBucketName = 'images';
    let uploader = document.getElementById('uploader');
    let file = e.target.files[0];
    let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            uploader.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        }, function () {
            let downloadURL = uploadTask.snapshot.downloadURL;
            document.getElementById('imgDiv').innerHTML = `<img src="${downloadURL}" alt="">`
            localStorage.setItem('image', downloadURL);
        });
}

function searchProduct(value) {
    let token = localStorage.getItem('token')
    if (token) {
        token = JSON.parse(token)
        let name = value.toLowerCase()
        console.log(name)
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/blogs/search/findByName?name=${name}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token
            },
            data: JSON.stringify(name),
            success: (products) => {
                $("#body").html(`
  
  <table class="table" border="1">
  <thead>
    <tr>
      <td>ID</td>
            <td>Content</td>
            <td>Status</td>
            <td>Image</td>
            <td>Date</td>
            <td>Username</td>
            <td>Category</td>
            <td colspan="2">Action</td>
    </tr>
  </thead>
  <tbody id="tbody">
  </tbody>
</table>
    `)
                let html = ''
                products.map(item => {
                    html += `<tr>
            <td>${item.id}</td>
            <td>${item.content}</td>
            <td>${item.status}</td>
            <td><img style="height: 200px;width: 200px" src="${item.image}" alt=""></td>
            <td>${item.date}</td>
            <td>${item.username}</td>
            <td>${item.nameCategory}</td>
            <td><button onclick="remove(${item.id})">Delete</button></td>
            <td><button onclick="showFormEdit(${item.id})">Edit</button></td>                  
                         </tr>`
                })
                $("#tbody").html(html)
            }
        })
    }
}

function showFormLogin() {
    $('#body').html(` 
 <div class="login-box">
  <h2>Login</h2>
  <form>
    <div class="user-box">
      <input id="username" type="text" name="" required="">
      <label>Username</label>
    </div>
    <div class="user-box">
      <input id="password" type="password" name="" required="">
      <label>Password</label>
    </div>
    <a href="#" onclick="login()">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Login
    </a>
    <a href="#" onclick="showFormRegister()">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Register
     
    </a>
    
  </form>
</div>
<link rel="stylesheet" href="../BE/public/blog.css">
            
`)
}

function login() {
    let username = $('#username').val();
    let password = $('#password').val();

    let user = {
        username: username,
        password: password
    }
    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/auth/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(user),

        success: (token) => {
            if (token === "Username is not existed" || token === 'Password is wrong') {
                alert('Can not')
                showNav();
            } else {
                localStorage.setItem('token', JSON.stringify(token));
                showNav();
                showHome();
            }


        }
    })
}

function logout() {
    localStorage.clear();
    showFormLogin();
    showNav();
}

function showFormRegister() {
    $('#body').html(` 
 <div class="login-box">
  <h2>Register</h2>
  <form>
    <div class="user-box">
      <input id="username" type="text" name="" required="">
      <label>Username</label>
    </div>
    <div class="user-box">
      <input id="password" type="password" name="" required="">
      <label>Password</label>
    </div>
    <a href="#" onclick="signup()">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Register
    </a>
    <a href="#" onclick="showFormLogin()">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Login
    </a>
  </form>
</div>
<link rel="stylesheet" href="../BE/public/blog.css">
            
`)
}

function signup() {
    let username = $('#username').val();
    let password = $('#password').val();

    let user = {
        username: username,
        password: password
    }
    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/auth/signup`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(user),

        success: (user) => {
            if (user === 'Username registered') {
                alert('Username registered')
            } else {
                showFormLogin()
            }

        }
    })
}