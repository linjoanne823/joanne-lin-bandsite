// const itemForm = document.getElementById('itemForm');
// const dynamicContent = document.getElementById('comments-list');


//     axios.get('https://project-1-api.herokuapp.com/comments?api_key=037ccb3f-b3ad-450d-b10c-5c8d2ebdab07')
//     .then((result) =>{
//         console.log(result.data);
//         displayComment(result.data)
//     })

//     .catch(error =>{
//         console.log(error);
//     });


// itemForm.addEventListener('submit', function (event){
//   event.preventDefault();
//   const nameInputVal = event.target.nameInput.value; 
//   event.target.nameInput.value = '';
//   const commentInputVal=event.target.commentInput.value;
//   event.target.commentInput.value = '';

//   let newCommentObject = {
//       name:nameInputVal,
//       timestamp: new Date(),
//       comment:commentInputVal,
//   }

//   let month = newCommentObject.timestamp.getMonth() +1;
//   let day = newCommentObject.timestamp.getDate();
//   let year = newCommentObject.timestamp.getFullYear();

//   if(day<10){
//       day='0'+day
//   };

//   if(month<10){
//       month = '0' + month;
//   }

//   newCommentObject.timestamp = month + '/' + day + '/' + year;

//   comments.unshift(newCommentObject);
//   let commentList = document.querySelector('#comments-list');
//   for (let i=0;i<comments.length;i++){
//     let commentObject = comments[i]
//     displayComment(commentObject);

//   }
// });

// let addComment=(commentObject)=>{
    
//         let dividerNode = document.createElement('div');
//         dividerNode.classList.add("comment-section__divider");
//         let outerContainerNode = document.createElement('div');
//         outerContainerNode.classList.add("comment-section__outer-container");
//         let innerContainerNode = document.createElement('div');
//         innerContainerNode.classList.add("comment-section__inner-container");
//         let avatarContainerNode = document.createElement('div');
//         avatarContainerNode.classList.add("comment-section__avatar-container--previous");
//         let avatarNode = document.createElement('div');
//         avatarNode.classList.add("comment-section__avatar");
//         let inputContainerNode = document.createElement('div');
//         inputContainerNode.classList.add("comment-section__input-container");
//         let rowContainerNode=document.createElement('div');
//         rowContainerNode.classList.add("comment-section__row-container");
//         let nameNode = document.createElement ('span');
//         nameNode.classList.add("comment-section__name");
//         let timeStampNode = document.createElement ('span');
//         timeStampNode.classList.add("comment-section__timestamp");
//         let commentNode = document.createElement('li');
//         commentNode.classList.add("comment-section__comment");

//         nameNode.innerText = commentObject.name;
//         timeStampNode.innerText = commentObject.timestamp;
//         commentNode.innerText = commentObject.comment;

//         avatarContainerNode.innerHTML = avatarNode.outerHTML;
//         rowContainerNode.innerHTML= nameNode.outerHTML + timeStampNode.outerHTML
//         inputContainerNode.innerHTML = rowContainerNode.outerHTML + commentNode.outerHTML;
//         innerContainerNode.innerHTML= avatarContainerNode.outerHTML + inputContainerNode.outerHTML;
        
//         outerContainerNode.innerHTML= innerContainerNode.outerHTML + dividerNode.outerHTML;

//         return outerContainerNode;        
// }

// let displayComment = (comments)=>{
//     let commentList = document.querySelector('#comments-list');
//     commentList.innerHTML = '';
//     let dividerNode = document.createElement('div');
//     dividerNode.classList.add("comment-section__divider");
//     commentList.appendChild(dividerNode);

//     for (let i=0;i<comments.length;i++){
//         let commentObject = comments[i];
//         commentList.appendChild(addComment(commentObject));
//     } 
    
// }

// displayComment();



const itemForm = document.getElementById('itemForm');
const dynamicContent = document.getElementById('comments-list');

//get request 
axios.get('https://project-1-api.herokuapp.com/comments?api_key=037ccb3f-b3ad-450d-b10c-5c8d2ebdab07')
.then((result) =>{
    const commentsFromServer = result.data;
    console.log(commentsFromServer);
    displayComment(commentsFromServer)
})
.catch(error =>{
    console.log(error);
});

//this is the HTML form. userInput is the new comment/user input 
itemForm.addEventListener('submit', function (event){
    event.preventDefault();
    const nameInputVal = event.target.nameInput.value;
    event.target.nameInput.value = '';
    const commentInputVal=event.target.commentInput.value;
    event.target.commentInput.value = '';
    let userInput = {
        name:nameInputVal,
        timestamp: new Date(),
        comment:commentInputVal,
    }
    let month = userInput.timestamp.getMonth() +1;
    let day = userInput.timestamp.getDate();
    let year = userInput.timestamp.getFullYear();
  
    if(day<10){
        day='0'+day
    };

    if(month<10){
        month = '0' + month;
    };
  
    userInput.timestamp = month + '/' + day + '/' + year;
//post request 

    axios.post('https://project-1-api.herokuapp.com/comments?api_key=037ccb3f-b3ad-450d-b10c-5c8d2ebdab07',{
        "name": userInput.name,
        "comment": userInput.comment
    })
    .then((result, userInput) => {
        const commentsFromServer = result.data;
        console.log (commentsFromServer.unshift(userInput));
        displayComment(commentsFromServer.forEach(userInput))
    })
    .catch(error => {
        console.log(error);
    })
   
    
});



let addComment=(commentToAdd)=>{
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
    nameNode.innerText = commentToAdd.name;
    timeStampNode.innerText = commentToAdd.timestamp;
    commentNode.innerText = commentToAdd.comment;
    avatarContainerNode.innerHTML = avatarNode.outerHTML;
    rowContainerNode.innerHTML= nameNode.outerHTML + timeStampNode.outerHTML
    inputContainerNode.innerHTML = rowContainerNode.outerHTML + commentNode.outerHTML;
    innerContainerNode.innerHTML= avatarContainerNode.outerHTML + inputContainerNode.outerHTML;
    outerContainerNode.innerHTML= innerContainerNode.outerHTML + dividerNode.outerHTML;
        
    return outerContainerNode;
}

let displayComment = (commentsToDisplay)=>{
    let displayContainer = document.querySelector('#comments-list'); 
    displayContainer.innerHTML = '';
    let dividerNode = document.createElement('div');
    dividerNode.classList.add("comment-section__divider");
    displayContainer.appendChild(dividerNode);
    commentsToDisplay.forEach(commentToDisplay => {
        displayContainer.appendChild(addComment(commentToDisplay));
        
    });
}





