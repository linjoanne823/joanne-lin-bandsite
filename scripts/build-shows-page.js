
// let button = document.querySelector('button');

let shows = [
    {
        date: 'Mon Sept 06 2021',
        venue: 'Ronald Lane',
        location: 'San Francisco, CA'
    },
    {
        date: 'Tue Sept 21 2021',
        venue: 'Pier 3 East',
        location: 'San Francisco, CA'
    },
    {
        date: 'Fri Oct 15 2021',
        venue: 'View Lounge',
        location: 'San Francisco, CA'
    },
    {
        date: 'Sat Nov 06 2021',
        venue: 'Hyatt Agency',
        location: 'San Francisco, CA'
    },
    {
        date: 'Fri Nov 26 2021',
        venue: 'Moscow Center',
        location: 'San Francisco, CA'
    },
    {
        date: 'Wed Dec 15 2021',
        venue: 'Press Club',
        location: 'San Francisco, CA'
    }
]

  let showsSection=(showsObject, unorderedList)=>{
      
          let dividerNode = document.createElement('div');
          dividerNode.classList.add("shows-section__divider");
          let innerContainerNode = document.createElement('div');
          innerContainerNode.classList.add("shows-section__inner-container");
        //   let inputContainerNode = document.createElement('div');
        //   inputContainerNode.classList.add("shows-section__input-container");
          let dateHeaderNode = document.createElement('li');
          dateHeaderNode.classList.add("shows-section__li");
          let dateNode = document.createElement ('div');
          dateNode.classList.add("shows-section__date");

          let venueHeaderNode = document.createElement('li');
          venueHeaderNode.classList.add("shows-section__li");
          let venueNode = document.createElement ('div');
          venueNode.classList.add("shows-section__venue");

          let locationHeaderNode=document.createElement('li');
          locationHeaderNode.classList.add("shows-section__li");
          let locationNode = document.createElement('div');
          locationNode.classList.add("shows-section__location");
        
          let buttonNode = document.createElement('button');
          buttonNode.classList.add("shows-section__button");
          buttonNode.innerText = "BUY TICKETS";

          dateHeaderNode.innerText = "DATE";
          dateNode.innerText = showsObject.date;
          venueHeaderNode.innerText = "VENUE";
          venueNode.innerText = showsObject.venue;
          locationHeaderNode.innerText= "LOCATION";
          locationNode.innerText = showsObject.location;
  
        //   avatarContainerNode.innerHTML = avatarNode.outerHTML;
          innerContainerNode.innerHTML = dateHeaderNode.outerHTML + dateNode.outerHTML + venueHeaderNode.outerHTML + venueNode.outerHTML + locationHeaderNode.outerHTML + locationNode.outerHTML + buttonNode.outerHTML;
        //   innerContainerNode.innerHTML= avatarContainerNode.outerHTML + inputContainerNode.outerHTML;
          
          unorderedList.appendChild(innerContainerNode);
          unorderedList.appendChild(dividerNode);
    
  }
  
  let displayShows = ()=>{
      let unorderedList = document.querySelector('#table');
    
     
      for (let i=0;i<shows.length;i++){
          let showsObject = shows[i]
          showsSection(showsObject, unorderedList);
          
      } 
  }
  
  displayShows();
  
  