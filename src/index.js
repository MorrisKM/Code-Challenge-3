let listdiv = document.getElementById('list-wrapper');
let mainSection = document.getElementById('mainSection');
let blogAuthor = document.getElementById('blogAuthor');
let blogimage = document.getElementById('blog-img');
let blogTitle = document.getElementById("blog-title");
let blogContents = document.getElementById("blog-contents");
let modal = document.getElementById('modal');
let newBlog = document.getElementById('add-button');
let close = document.getElementById('close');
let form = document.getElementById('newBlog');
let editMode= false;
let editBlogId = null;


//loading data from db.js
window.addEventListener('DOMContentLoaded', async ()=> {
    let db = await fetch('http://localhost:3000/blogs');
    let data = await db.json();
    let activeBlogPre = null;

    blogAuthor.textContent = `Written By: ${data[0].author}, published on: ${data[0].blogTime}`
    blogimage.style.backgroundImage = `url(${data[0].blogImage})`;
    blogTitle.textContent = `${data[0].blogTitle}`;
    blogContents.textContent = `${data[0].blogContents}`;

    for(let x of data){

        let blogPre = document.createElement('div');
        listdiv.appendChild(blogPre)
        blogPre.classList.add("blog-pre")
        
        let blogPreImage = document.createElement('div');
        blogPreImage.classList.add('img-pre');
        blogPre.appendChild(blogPreImage);
        blogPreImage.style.backgroundImage = `url(${x.blogImage})`

        let blogPreC = document.createElement('div');
        blogPreC.classList.add('blog-pre-c');
        blogPre.appendChild(blogPreC);

        let edits = document.createElement('div');
        edits.classList.add('edits');

        let deleter = document.createElement('div');
        deleter.classList.add('deleter')
        deleter.textContent = 'X';

        let editor = document.createElement('div');
        editor.classList.add('editor');
        editor.textContent = 'E';
        edits.appendChild(deleter);
        edits.appendChild(editor)
        blogPre.appendChild(edits);

        let dateAdded = document.createElement('p')
        blogPreC.appendChild(dateAdded);
        dateAdded.textContent = `${x.author}, ${x.blogTime}`

        let blogPreHeading = document.createElement('p');
        blogPreHeading.classList.add('blogPreHeading')
        blogPreC.appendChild(blogPreHeading)
        blogPreHeading.textContent = `${x.blogTitle}`

        let blogPreContent = document.createElement('p')
        blogPreC.appendChild(blogPreContent);
        blogPreContent.textContent = `${x.blogContents}`

        blogPre.addEventListener('click', async ()=> {
            blogAuthor.textContent = `Written By: ${x.author}, Published on: ${x.blogTime}`
            blogimage.style.backgroundImage = `url(${x.blogImage})`;
            blogTitle.textContent = `${x.blogTitle}`;
            blogContents.textContent = `${x.blogContents}`;

            if (activeBlogPre) {
                const prevEdits = activeBlogPre.querySelector('.edits');
                if (prevEdits) {
                    prevEdits.style.visibility = 'hidden'; 
                }
            }
            edits.style.visibility = 'visible';
            activeBlogPre = blogPre;
        })

        deleter.addEventListener('click', async () => {
            let confirmation = confirm('Are You sure you want to delete the blog?')
            if (confirmation) {
                await fetch(`http://localhost:3000/blogs/${x.id}`, {
                    method: 'DELETE',
                })
                alert('blog deleted')
            }else{alert('delete cancelled')}
        })

        editor.addEventListener('click', () => {
            let confirmation = confirm('Continue to edit window?')
            if (confirmation) {
                modal.style.visibility = 'visible';
                mainSection.style.filter = 'blur(10px)';
                mainSection.style.pointerEvents = 'none';
                form.blogImage.value = `${x.blogImage}`;
                form.blogTitle.value = `${x.blogTitle}`;
                form.blogContents.value = `${x.blogContents}`;

                editMode = true;
                editBlogId= x.id;
            }
        })
    }
})

//taking input from form and add to db using 'POST'

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let formData = new FormData(form);
    let obj = Object.fromEntries(formData.entries());
    obj.blogTime = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;

    if(obj.blogImage && obj.blogContents && obj.blogContents && obj.author){
        try{
            let response;
            if(editBlogId && editMode){
                response = await fetch(`http://localhost:3000/blogs/${editBlogId}`, {
                    method: 'PUT',
                    body: JSON.stringify(obj)
                });
            }else{
                response = await fetch('http://localhost:3000/blogs', {
                    method: 'POST',
                    body: JSON.stringify(obj)
                });
            }
            if(!response.ok) throw new Error('response not Okay');

        const data = await response.json();
        alert('blog added successfully')

        form.reset();
        editMode = false;
        editBlogId = null;
        }catch{
            alert('blog not uploaded' + error.message)
        }
    }else{alert('please fill in all the fields')}
})

newBlog.addEventListener('click', () => {
    modal.style.visibility = 'visible';
    mainSection.style.filter = 'blur(10px)';
    mainSection.style.pointerEvents = 'none'
})
close.addEventListener('click', () => {
    modal.style.visibility = 'hidden';
    mainSection.style.filter = 'blur(0)';
})
