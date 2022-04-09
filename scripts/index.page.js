const itemForm = document.getElementById('itemForm');
const dynamicContent = document.getElementById('comments-list');

//get request 
function getRequestFunction(){
    axios.get('https://project-1-api.herokuapp.com/comments?api_key=037ccb3f-b3ad-450d-b10c-5c8d2ebdab07')
    .then((result) =>{
        const commentsFromServer = result.data;
        console.log(commentsFromServer.sort(function(x, y){
            return y.timestamp - x.timestamp;}))
        displayComment(commentsFromServer)
    })
    .catch(error =>{
        console.log(error);
    });
}

getRequestFunction();

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
    .then((result) => {
        getRequestFunction()
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

    let timeStampVariable = timeStampNode.innerText = new Date(commentToAdd.timestamp)
    let month = timeStampVariable.getMonth()+1 
    let day = timeStampVariable.getDate();
    let year = timeStampVariable.getFullYear();
  
    if(day<10){
        day='0'+day
    };

    if(month<10){
        month = '0' + month;
    };
  
    timeStampVariable = month + '/' + day + '/' + year;
    timeStampNode.innerText = timeStampVariable

    commentNode.innerText = commentToAdd.comment;
    avatarContainerNode.innerHTML = avatarNode.outerHTML;
    rowContainerNode.innerHTML= nameNode.outerHTML + timeStampNode.outerHTML
    inputContainerNode.innerHTML = rowContainerNode.outerHTML + commentNode.outerHTML;
    innerContainerNode.innerHTML= avatarContainerNode.outerHTML + inputContainerNode.outerHTML;
    outerContainerNode.innerHTML= innerContainerNode.outerHTML + dividerNode.outerHTML;
        
    return outerContainerNode;
}
