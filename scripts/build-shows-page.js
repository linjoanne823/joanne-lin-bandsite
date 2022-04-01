
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

  let showsSection=(showsObject, showsTable)=>{
      
          let dividerNode = document.createElement('div');
          dividerNode.classList.add("shows-section__divider");
          let innerContainerNode = document.createElement('div');
          innerContainerNode.classList.add("shows-section__inner-container");

       
          let dateContainerNode = document.createElement('div');
          dateContainerNode.classList.add("shows-section__column-container");
          let dateHeaderNode = document.createElement('div');
          dateHeaderNode.classList.add("shows-section__mobile-header");
          let dateNode = document.createElement ('div');
          dateNode.classList.add("shows-section__date");

          let venueContainerNode = document.createElement('div');
          venueContainerNode.classList.add("shows-section__column-container");
          let venueHeaderNode = document.createElement('div');
          venueHeaderNode.classList.add("shows-section__mobile-header");
          let venueNode = document.createElement ('div');
          venueNode.classList.add("shows-section__venue");

          let locationContainerNode=document.createElement('div');
          locationContainerNode.classList.add("shows-section__column-container");
          let locationHeaderNode=document.createElement('div');
          locationHeaderNode.classList.add("shows-section__mobile-header");
          let locationNode = document.createElement('div');
          locationNode.classList.add("shows-section__location");
        
          
          let buttonContainerNode=document.createElement('div');
          buttonContainerNode.classList.add("shows-section__column-container");
          let emptyNode=document.createElement('div');
          emptyNode.classList.add("shows-section__empty");
          let buttonNode = document.createElement('button');
          buttonNode.classList.add("shows-section__button");
          buttonNode.innerText = "BUY TICKETS";

        //table header for tablet and desktop 
          let dateTableHeaderNode=document.createElement('div');
          dateTableHeaderNode.classList.add("shows-section__table-header");
          let venueTableHeaderNode=document.createElement('div');
          venueTableHeaderNode.classList.add("shows-section__table-header");
          let locationTableHeaderNode=document.createElement ('div');
          locationTableHeaderNode.classList.add("shows-section__table-header");

          let tableHeaderContainerNode=document.createElement('div');
          tableHeaderContainerNode.classList.add("shows-section__table-header-container");


        // header and text for mobile. This will be disabled on tablet and desktop 
          dateHeaderNode.innerText = "DATE";
          dateNode.innerText = showsObject.date;
          venueHeaderNode.innerText = "VENUE";
          venueNode.innerText = showsObject.venue;
          locationHeaderNode.innerText= "LOCATION";
          locationNode.innerText = showsObject.location;
          emptyNode.innerText= '\u00A0';

        //table header for tablet and desktop (td)
          dateTableHeaderNode.innerText ="DATE";
          venueTableHeaderNode.innerText ="VENUE";
          locationTableHeaderNode.innerText ="LOCATION";
          
        
     



          dateContainerNode.innerHTML = dateHeaderNode.outerHTML + dateNode.outerHTML;
          venueContainerNode.innerHTML = venueHeaderNode.outerHTML + venueNode.outerHTML;
          locationContainerNode.innerHTML = locationHeaderNode.outerHTML + locationNode.outerHTML;
          buttonContainerNode.innerHTML = emptyNode.outerHTML + buttonNode.outerHTML;

          innerContainerNode.innerHTML = dateContainerNode.outerHTML + venueContainerNode.outerHTML + locationContainerNode.outerHTML + buttonContainerNode.outerHTML;
          tableHeaderContainerNode.innerHTML = dateTableHeaderNode.outerHTML + venueTableHeaderNode.outerHTML + locationTableHeaderNode.outerHTML+ emptyNode.outerHTML;
          
   
          showsTable.appendChild(tableHeaderContainerNode);
          showsTable.appendChild(innerContainerNode);
          showsTable.appendChild(dividerNode);


          
            innerContainerNode.addEventListener("click", function(){
                let selectedRow = document.getElementsByClassName("shows-section__inner-container--active");
                for (let i=0;i<selectedRow.length;i++){
                    selectedRow[i].classList.remove("shows-section__inner-container--active");
                }
                innerContainerNode.classList.add("shows-section__inner-container--active")
          });
        }
  
  let displayShows = ()=>{
      let showsTable = document.querySelector('#table');
     
      for (let i=0;i<shows.length;i++){
          let showsObject = shows[i]
          showsSection(showsObject, showsTable);
          
      } 
  }
  
  displayShows();





 
