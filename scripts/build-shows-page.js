
//get request 

axios.get('https://project-1-api.herokuapp.com/showdates?api_key=037ccb3f-b3ad-450d-b10c-5c8d2ebdab07')
    .then((result) =>{
        const showsFromServer = result.data;
        console.log(showsFromServer)
        showAllShows(showsFromServer)
    })
    .catch(error =>{
        console.log(error);
    });

    
let displayShow=(showDetails, showsTable)=>{
      
    
    let innerContainerNode = document.createElement('div');
    innerContainerNode.classList.add("shows-section__inner-container");
    let dividerNode = document.createElement('div');
    dividerNode.classList.add("shows-section__divider");

    let dateContainerNode = document.createElement('div');
    dateContainerNode.classList.add("shows-section__column-container");
    let dateHeaderNode = document.createElement('div');
    dateHeaderNode.classList.add("shows-section__mobile-header");
    let dateNode = document.createElement ('div');
    dateNode.classList.add("shows-section__text--date");

    let venueContainerNode = document.createElement('div');
    venueContainerNode.classList.add("shows-section__column-container");
    let venueHeaderNode = document.createElement('div');
    venueHeaderNode.classList.add("shows-section__mobile-header");
    let venueNode = document.createElement ('div');
    venueNode.classList.add("shows-section__text--venue");

    let locationContainerNode=document.createElement('div');
    locationContainerNode.classList.add("shows-section__column-container");
    let locationHeaderNode=document.createElement('div');
    locationHeaderNode.classList.add("shows-section__mobile-header");
    let locationNode = document.createElement('div');
    locationNode.classList.add("shows-section__text--location");
        
    let buttonContainerNode=document.createElement('div');
    buttonContainerNode.classList.add("shows-section__column-container");
    let emptyNode=document.createElement('div');
    emptyNode.classList.add("shows-section__empty");
    let buttonNode = document.createElement('button');
    buttonNode.classList.add("shows-section__button");
    buttonNode.innerText = "BUY TICKETS";

    let dateTableHeaderNode=document.createElement('div');
    dateTableHeaderNode.classList.add("shows-section__table-header--date");
    let venueTableHeaderNode=document.createElement('div');
    venueTableHeaderNode.classList.add("shows-section__table-header--venue");
    let locationTableHeaderNode=document.createElement ('div');
    locationTableHeaderNode.classList.add("shows-section__table-header--location");

    let tableHeaderContainerNode=document.createElement('div');
    tableHeaderContainerNode.classList.add("shows-section__table-header-container");

    dateHeaderNode.innerText = "DATE";
    
    let unixTimestamp = showDetails.date;
    let standardDateFormat = new Date(parseInt(unixTimestamp));
    let days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let dayOfTheWeek=days[standardDateFormat.getDay()];
    let months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let month=months[standardDateFormat.getMonth()];
    let day = standardDateFormat.getDate();
    let year = standardDateFormat.getFullYear();


    let humanDateFormat = dayOfTheWeek + " " + month + " " + day + " " + year;

    dateNode.innerText = humanDateFormat

    venueHeaderNode.innerText = "VENUE";
    venueNode.innerText = showDetails.place;
    locationHeaderNode.innerText= "LOCATION";
    locationNode.innerText = showDetails.location;
    emptyNode.innerText= '\u00A0';

    dateTableHeaderNode.innerText ="DATE";
    venueTableHeaderNode.innerText ="VENUE";
    locationTableHeaderNode.innerText ="LOCATION";
          

    dateContainerNode.appendChild(dateHeaderNode); 
    dateContainerNode.appendChild(dateNode);

    venueContainerNode.appendChild(venueHeaderNode);
    venueContainerNode.appendChild(venueNode);

    locationContainerNode.appendChild(locationHeaderNode);
    locationContainerNode.appendChild(locationNode);

    buttonContainerNode.appendChild(buttonNode);

    innerContainerNode.appendChild(dateContainerNode);
    innerContainerNode.appendChild(venueContainerNode);
    innerContainerNode.appendChild(locationContainerNode);
    innerContainerNode.appendChild(buttonContainerNode);
    

    tableHeaderContainerNode.appendChild(dateTableHeaderNode);
    tableHeaderContainerNode.appendChild(venueTableHeaderNode);
    tableHeaderContainerNode.appendChild(locationTableHeaderNode);
    tableHeaderContainerNode.appendChild(emptyNode);

    showsTable.appendChild(tableHeaderContainerNode);
    showsTable.appendChild(innerContainerNode);
    
    innerContainerNode.addEventListener("click", function(){
        const selectedRow = document.getElementsByClassName("shows-section__inner-container--active");
        const selectedRowArray = Array.from(selectedRow)
        selectedRowArray.forEach(row=>{
            row.classList.remove("shows-section__inner-container--active");
        })
        innerContainerNode.classList.add("shows-section__inner-container--active")
    });
    return innerContainerNode;
    
}
  
  let showAllShows = (showsToDisplay)=>{
      let showsTable = document.querySelector('#table');
      showsToDisplay.forEach(showToDisplay=>{
          showsTable.appendChild(displayShow(showToDisplay, showsTable))
      })
}
