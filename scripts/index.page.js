const itemForm = document.getElementById('itemForm');
const dynamicContent = document.getElementById('comments-list');

//get request 

const getCommentsFromServer = async()=>{
    try{
        const result =await axios.get('https://project-1-api.herokuapp.com/comments?api_key=037ccb3f-b3ad-450d-b10c-5c8d2ebdab07')
        const commentsFromServer = result.data;
        console.log(commentsFromServer.sort(function(a, b){
            return b.timestamp - a.timestamp;}))
        showAllComments(commentsFromServer)
    }catch(error){
       console.log(error)
   }}

getCommentsFromServer();

const showAllComments = (commentsToDisplay)=>{
    const displayContainer = document.querySelector('#comments-list'); 
    displayContainer.innerHTML = '';
    const dividerNode = document.createElement('div');
    dividerNode.classList.add("comment-section__divider");
    displayContainer.appendChild(dividerNode);

    commentsToDisplay.forEach(commentToDisplay => {
        displayContainer.appendChild(displayComment(commentToDisplay));    
    }); 
}

//this is the HTML form. userInput is the new comment/user input 
itemForm.addEventListener('submit', async(event)=>{
    event.preventDefault();
   
    const nameInputVal = event.target.nameInput.value;
    event.target.nameInput.value = '';
    const commentInputVal=event.target.commentInput.value;
    event.target.commentInput.value = '';

    const userInput = {
        name:nameInputVal,
        timestamp: new Date(),
        comment:commentInputVal,
    }

    try{
        const result = await axios.post ('https://project-1-api.herokuapp.com/comments?api_key=037ccb3f-b3ad-450d-b10c-5c8d2ebdab07',{
            "name": userInput.name,
            "comment": userInput.comment
        },
        {   'Content-Type':'application/json'
        })
        getCommentsFromServer()
    }catch(error){
            console.log(error)
    }
})

const displayComment=(commentToAdd)=>{
    const dividerNode = document.createElement('div');
    dividerNode.classList.add("comment-section__divider");
    const outerContainerNode = document.createElement('div');
    outerContainerNode.classList.add("comment-section__outer-container");
    const innerContainerNode = document.createElement('div');
    innerContainerNode.classList.add("comment-section__inner-container");
    const avatarContainerNode = document.createElement('div');
    avatarContainerNode.classList.add("comment-section__avatar-container--previous");
    const avatarNode = document.createElement('div');
    avatarNode.classList.add("comment-section__avatar");
    const inputContainerNode = document.createElement('div');
    inputContainerNode.classList.add("comment-section__input-container");
    const rowContainerNode=document.createElement('div');
    rowContainerNode.classList.add("comment-section__row-container");
    const nameNode = document.createElement ('span');
    nameNode.classList.add("comment-section__name");
    const timeStampNode = document.createElement ('span');
    timeStampNode.classList.add("comment-section__timestamp");
    const commentNode = document.createElement('li');
    commentNode.classList.add("comment-section__comment");
    
    const buttonContainerNode=document.createElement('div');
    buttonContainerNode.classList.add("comment-section__button-container")
    const likeButtonNode=document.createElement('button');
    likeButtonNode.classList.add("comment-section__button")
    const thumbsUpIconNode=document.createElement('i');
    thumbsUpIconNode.classList.add("fa", "fa-thumbs-up")
    const numberOfLikesNode=document.createElement('span');
    numberOfLikesNode.classList.add("comment-section__like-count");
    
    numberOfLikesNode.innerText=commentToAdd.likes;
   
    
    likeButtonNode.appendChild(thumbsUpIconNode);
    likeButtonNode.appendChild(numberOfLikesNode);
   
    const deleteButtonNode=document.createElement('button');
    deleteButtonNode.classList.add("comment-section__button");
    const deleteIconNode=document.createElement('i');
    deleteIconNode.classList.add("fa","fa-trash")

    deleteButtonNode.appendChild(deleteIconNode);

   
    nameNode.innerText = commentToAdd.name;

    let timestampToDate = timeStampNode.innerText = new Date(commentToAdd.timestamp)
    const timestamp=commentToAdd.timestamp
    let month = timestampToDate.getMonth()+1 
    let day = timestampToDate.getDate();
    const year = timestampToDate.getFullYear();

  
    if(day<10){
        day='0'+day
    };

    if(month<10){
        month = '0' + month;
    };

    const timespan = {
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000
      };
      
      function dynamicTimestamp(timestamp) {
        var timeElapsed = Date.now() - timestamp;
        if (timeElapsed > timespan.day * 30) {
          return timestampToDate;
        } else if (timeElapsed > timespan.day * 7) {
          return timestampToDate;
        } else if (timeElapsed > timespan.day) {
          return Math.floor(timeElapsed/ timespan.day) + "days ago";
        } else if (timeElapsed > timespan.hour) {
          return Math.floor(timeElapsed / timespan.hour) + "hours ago";
        } else if (timeElapsed > timespan.minute) {
          return Math.floor(timeElapsed/ timespan.minute) + "minutes ago";
        }
        return "Just now";
      }
     
    dynamicTimestamp(timestamp);

    timestampToDate = month + '/' + day + '/' + year;
    timeStampNode.innerText = dynamicTimestamp(timestamp)

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

    likeButtonNode.addEventListener("click",async()=>{
        console.log(likeButtonNode)
       
        try {
            const result = await axios.put(`https://project-1-api.herokuapp.com/comments/${commentToAdd.id}/like?api_key=037ccb3f-b3ad-450d-b10c-5c8d2ebdab07`,{
            "likes":1
        })
            getCommentsFromServer()
        }catch(error){
            console.log(error)
        }
    });

    deleteButtonNode.addEventListener("click",async()=>{
        try{
            const result = await axios.delete(`https://project-1-api.herokuapp.com/comments/${commentToAdd.id}?api_key=037ccb3f-b3ad-450d-b10c-5c8d2ebdab07`)
            getCommentsFromServer()
        }catch(error){
            console.log(error)
        }
    });  
    return outerContainerNode;
}

