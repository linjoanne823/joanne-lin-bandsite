
//get request 

const getShowsFromServer = async ()=>{
    try{
        const result = await axios.get('https://project-1-api.herokuapp.com/showdates?api_key=037ccb3f-b3ad-450d-b10c-5c8d2ebdab07')
        const showsFromServer = result.data;
        console.log(showsFromServer)
        showAllShows(showsFromServer)
    }catch(error){
        console.log(error);
    }};

getShowsFromServer();
  
const displayShow=(showDetails, showsTable)=>{
    const innerContainerNode = document.createElement('div');
    innerContainerNode.classList.add("shows-section__inner-container");
    const dividerNode = document.createElement('div');
    dividerNode.classList.add("shows-section__divider");

    const dateContainerNode = document.createElement('div');
    dateContainerNode.classList.add("shows-section__column-container");
    const dateHeaderNode = document.createElement('div');
    dateHeaderNode.classList.add("shows-section__mobile-header");
    const dateNode = document.createElement ('div');
    dateNode.classList.add("shows-section__text--date");

    const venueContainerNode = document.createElement('div');
    venueContainerNode.classList.add("shows-section__column-container");
    const venueHeaderNode = document.createElement('div');
    venueHeaderNode.classList.add("shows-section__mobile-header");
    const venueNode = document.createElement ('div');
    venueNode.classList.add("shows-section__text--venue");

    const locationContainerNode=document.createElement('div');
    locationContainerNode.classList.add("shows-section__column-container");
    const locationHeaderNode=document.createElement('div');
    locationHeaderNode.classList.add("shows-section__mobile-header");
    const locationNode = document.createElement('div');
    locationNode.classList.add("shows-section__text--location");
        
    const buttonContainerNode=document.createElement('div');
    buttonContainerNode.classList.add("shows-section__column-container");
    const emptyNode=document.createElement('div');
    emptyNode.classList.add("shows-section__empty");
    const buttonNode = document.createElement('button');
    buttonNode.classList.add("shows-section__button");
    buttonNode.innerText = "BUY TICKETS";

    const dateTableHeaderNode=document.createElement('div');
    dateTableHeaderNode.classList.add("shows-section__table-header--date");
    const venueTableHeaderNode=document.createElement('div');
    venueTableHeaderNode.classList.add("shows-section__table-header--venue");
    const locationTableHeaderNode=document.createElement ('div');
    locationTableHeaderNode.classList.add("shows-section__table-header--location");

    const tableHeaderContainerNode=document.createElement('div');
    tableHeaderContainerNode.classList.add("shows-section__table-header-container");

    dateHeaderNode.innerText = "DATE";
    
    const unixTimestamp = showDetails.date;
    const standardDateFormat = new Date(parseInt(unixTimestamp));
    const days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfTheWeek=days[standardDateFormat.getDay()];
    const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const month=months[standardDateFormat.getMonth()];
    const day = standardDateFormat.getDate();
    const year = standardDateFormat.getFullYear();

    const humanDateFormat = dayOfTheWeek + " " + month + " " + day + " " + year;

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
  
  const showAllShows = (showsToDisplay)=>{
      const showsTable = document.querySelector('#table');
      showsToDisplay.forEach(showToDisplay=>{
          showsTable.appendChild(displayShow(showToDisplay, showsTable))
      })
}
