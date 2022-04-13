
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
      
    let dividerNode = document.createElement('div');
    dividerNode.classList.add("shows-section__divider");
    let innerContainerNode = document.createElement('div');
    innerContainerNode.classList.add("shows-section__inner-container");

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
    let dayOfTheWeek=standardDateFormat.toLocaleString("en-US", { weekday: "short"});
    let year = standardDateFormat.toLocaleString("en-US", { year: "numeric"});
    let month = standardDateFormat.toLocaleString("en-US", { month: "short"});
    let day = standardDateFormat.toLocaleString("en-US", { day: "numeric"});

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
          

    dateContainerNode.innerHTML = dateHeaderNode.outerHTML + dateNode.outerHTML;
    venueContainerNode.innerHTML = venueHeaderNode.outerHTML + venueNode.outerHTML;
    locationContainerNode.innerHTML = locationHeaderNode.outerHTML + locationNode.outerHTML;
    buttonContainerNode.innerHTML =  buttonNode.outerHTML;

    innerContainerNode.innerHTML = dateContainerNode.outerHTML + venueContainerNode.outerHTML + locationContainerNode.outerHTML + buttonContainerNode.outerHTML;
    tableHeaderContainerNode.innerHTML = dateTableHeaderNode.outerHTML + venueTableHeaderNode.outerHTML + locationTableHeaderNode.outerHTML+ emptyNode.outerHTML;
          
    showsTable.appendChild(tableHeaderContainerNode);
    showsTable.appendChild(innerContainerNode);
    showsTable.appendChild(dividerNode);

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
  






 
