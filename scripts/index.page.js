const itemForm = document.getElementById('itemForm');
const dynamicContent = document.getElementById('comments-list');

//get request 

const getCommentsFromServer = async()=>{
    
    try{
        const result = await axios.get('https://project-1-api.herokuapp.com/comments?api_key=037ccb3f-b3ad-450d-b10c-5c8d2ebdab07')
        const commentsFromServer = result.data;
        console.log(commentsFromServer.sort(function(a, b){
            return b.timestamp - a.timestamp;}))
        showAllComments(commentsFromServer)
    
    }catch(error){
        console.log(error);
    };
}

getCommentsFromServer();

let showAllComments = (commentsToDisplay)=>{
    let displayContainer = document.querySelector('#comments-list'); 
    displayContainer.innerHTML = '';
    let dividerNode = document.createElement('div');
    dividerNode.classList.add("comment-section__divider");
    displayContainer.appendChild(dividerNode);

    commentsToDisplay.forEach(commentToDisplay => {
        displayContainer.appendChild(displayComment(commentToDisplay));    
    }); 
}


//this is the HTML form. userInput is the new comment/user input 


itemForm.addEventListener('submit', function (event){
    event.preventDefault();
   
    const nameInputVal = event.target.nameInput.value;
    event.target.nameInput.value = '';
    const commentInputVal=event.target.commentInput.value;
    event.target.commentInput.value = '';

    
    // if (nameInputVal === ""){
        
    //     return false
    // }

    

    if(nameInputVal.length>0){
        document.querySelector(".comment-section__field").classList.add("comment-section__field--success")
    }

    if (nameInputVal===""){
        document.querySelector(".comment-section__field").classList.add("comment-section__field--error")
        return false
    } ///this only works the first time for some reason... 
    
    if(commentInputVal.length>0){
        document.querySelector(".comment-section__field-block").classList.add("comment-section__field-block--success")
    }

    if (commentInputVal===""){
        document.querySelector(".comment-section__field-block").classList.add("comment-section__field-block--error")
        return false
    }


    let userInput = {
        name:nameInputVal,
        timestamp: new Date(),
        comment:commentInputVal,
    }

//post request 

    axios.post('https://project-1-api.herokuapp.com/comments?api_key=037ccb3f-b3ad-450d-b10c-5c8d2ebdab07',{
        "name": userInput.name,
        "comment": userInput.comment
    },
    {   'Content-Type':'application/json'

    })
    .then((result) => {
        getCommentsFromServer()
    })
    .catch(error => {
        console.log(error);
    })
    itemForm.reset();
});

const displayComment=(commentToAdd)=>{
    let dividerNode = document.createElement('div');
    dividerNode.classList.add("comment-section__divider");
    let outerContainerNode = document.createElement('div');
    outerContainerNode.classList.add("comment-section__outer-container");
    let innerContainerNode = document.createElement('div');
    innerContainerNode.classList.add("comment-section__inner-container");
    let avatarContainerNode = document.createElement('div');
    avatarContainerNode.classList.add("comment-section__avatar-container--previous");
    let avatarNode = document.createElement('div');
    avatarNode.classList.add("comment-section__avatar");
    let inputContainerNode = document.createElement('div');
    inputContainerNode.classList.add("comment-section__input-container");
    let rowContainerNode=document.createElement('div');
    rowContainerNode.classList.add("comment-section__row-container");
    let nameNode = document.createElement ('span');
    nameNode.classList.add("comment-section__name");
    let timeStampNode = document.createElement ('span');
    timeStampNode.classList.add("comment-section__timestamp");
    let commentNode = document.createElement('li');
    commentNode.classList.add("comment-section__comment");
    
    let buttonContainerNode=document.createElement('div');
    buttonContainerNode.classList.add("comment-section__button-container")
    let likeButtonNode=document.createElement('button');
    likeButtonNode.classList.add("comment-section__like-button")
    let thumbsUpIconNode=document.createElement('i');
    thumbsUpIconNode.classList.add("fa", "fa-thumbs-up")
    let numberOfLikesNode=document.createElement('span');
    numberOfLikesNode.classList.add("comment-section__like-count");
    
    numberOfLikesNode.innerText=commentToAdd.likes;
   
    
    likeButtonNode.appendChild(thumbsUpIconNode);
    likeButtonNode.appendChild(numberOfLikesNode);
   
    let deleteButtonNode=document.createElement('button');
    deleteButtonNode.classList.add("comment-section__delete-button");
    let deleteIconNode=document.createElement('i');
    deleteIconNode.classList.add("fa","fa-trash")

    deleteButtonNode.appendChild(deleteIconNode);

   
    nameNode.innerText = commentToAdd.name;

    let timestampToDate = timeStampNode.innerText = new Date(commentToAdd.timestamp)
    let month = timestampToDate.getMonth()+1 
    let day = timestampToDate.getDate();
    let year = timestampToDate.getFullYear();

  
    if(day<10){
        day='0'+day
    };

    if(month<10){
        month = '0' + month;
    };

    timestampToDate = month + '/' + day + '/' + year;
    timeStampNode.innerText = timestampToDate

    commentNode.innerText = commentToAdd.comment;
    avatarContainerNode.appendChild(avatarNode);
    rowContainerNode.appendChild(nameNode);
    rowContainerNode.appendChild(timeStampNode);
    inputContainerNode.appendChild(rowContainerNode);
    inputContainerNode.appendChild(commentNode);
    buttonContainerNode.appendChild(likeButtonNode);
    buttonContainerNode.appendChild(deleteButtonNode);

    innerContainerNode.appendChild(avatarContainerNode);
    innerContainerNode.appendChild(inputContainerNode);

    outerContainerNode.appendChild(innerContainerNode)
    outerContainerNode.appendChild(buttonContainerNode)
    outerContainerNode.appendChild(dividerNode)

    likeButtonNode.addEventListener("click",()=>{
        console.log(likeButtonNode)
       
        axios.put(`https://project-1-api.herokuapp.com/comments/${commentToAdd.id}/like?api_key=037ccb3f-b3ad-450d-b10c-5c8d2ebdab07`,{
            "likes":1
        })
        .then((result)=>{
            
            getCommentsFromServer()
        })
        .catch(error=>{
            console.log(error)
        })
    });

    deleteButtonNode.addEventListener("click",()=>{
        axios.delete(`https://project-1-api.herokuapp.com/comments/${commentToAdd.id}?api_key=037ccb3f-b3ad-450d-b10c-5c8d2ebdab07`)
       
        .then((result)=>{
            
            getCommentsFromServer()
        })
        .catch(error=>{
            console.log(error)
        })
    });


        
    return outerContainerNode;
}

