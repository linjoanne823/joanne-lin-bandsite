const itemForm = document.getElementById('itemForm');
const dynamicContent = document.getElementById('comments-list');

let comments = [
    {
        name: 'Connor Walton',
        timeStamp: '02/17/2021',
        comment: 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.'
    },
    {
        name: 'Emilie Beach',
        timeStamp: '01/09/2021',
        comment: 'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.'
    },
    {
        name: 'Miles Acosta',
        timeStamp: '12/20/2020',
        comment:"I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

itemForm.addEventListener('submit', function (event){
  event.preventDefault();
  const nameInputVal = event.target.nameInput.value; 
  event.target.nameInput.value = '';
  const commentInputVal=event.target.commentInput.value;
  event.target.commentInput.value = '';

  let newCommentObject = {
      name:nameInputVal,
      timeStamp: new Date(),
      comment:commentInputVal,
  }
  
  comments.unshift(newCommentObject);
  let unorderedList = document.querySelector('#comments-list');
  for (let i=0;i<comments.length;i++){
    let commentObject = comments[i]
    displayComment(commentObject, unorderedList);

  }
});

let addComment=(commentObject, unorderedList)=>{
    
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

        nameNode.innerText = commentObject.name;
        timeStampNode.innerText = commentObject.timeStamp;
        commentNode.innerText = commentObject.comment;

        avatarContainerNode.innerHTML = avatarNode.outerHTML;
        rowContainerNode.innerHTML= nameNode.outerHTML + timeStampNode.outerHTML
        inputContainerNode.innerHTML = rowContainerNode.outerHTML + commentNode.outerHTML;
        innerContainerNode.innerHTML= avatarContainerNode.outerHTML + inputContainerNode.outerHTML;
        
        outerContainerNode.innerHTML= innerContainerNode.outerHTML + dividerNode.outerHTML;

      
      
        unorderedList.appendChild(outerContainerNode);
       


       
  
}

let displayComment = ()=>{
    let unorderedList = document.querySelector('#comments-list');
    unorderedList.innerHTML = '';
    let dividerNode = document.createElement('div');
    dividerNode.classList.add("comment-section__divider");
    unorderedList.appendChild(dividerNode);
   
    for (let i=0;i<comments.length;i++){
        let commentObject = comments[i]
        addComment(commentObject, unorderedList);
        
    } 
}

displayComment();








