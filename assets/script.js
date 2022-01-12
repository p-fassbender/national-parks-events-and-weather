var searchFormEl = document.getElementById("state-search-form");

//get the modal form to accept a state and populate the container 2 info
var getParkInfo = function (event) {

    var stateInputEl = document.querySelector("#state");
    var stateAbbr = stateInputEl.value.trim();  
    
    //need to add query parameter and hopefully be able to use state without having to convert state to anything queryable
    var apiUrl = "uhttps://developer.nps.gov/api/v1/parks?" + stateAbbr + "&api_key=LlVYiDWyyOiv7SJeWDVIbQAJ2mMuYi64fapw7tEA";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(generateCards(data));
            }
        })
        .catch(function(error) {
            //notice this '.catch()' getting chained onto the end of the '.then()' method
            console.log(error);
        });
}


    //prevent default reload for form submission

    //make form entry uppercase to match json data

    //if the form entry is not a valid two letter state initial, don't accpt input and let user know

    //else
        
        //empty container two
    
        //take state initials input and filter api data to create an array with that state's park identifier

            //loop through the array and generate a card for each park

            //set href of card to info-page

//ZACH START

//when a card is clicked in container two

    //create an div in the dynamic divs section with the 

    //set dynamic div link href to that info-page

    //save the parkname to local storage to load in the dynamic divs section when the
    //page is loaded

//ZACH END    

//create a loadParks() function

    //get array of park names from local storage

    //loop through array to generate dynamic divs of parks that we've looked at



//add event listener for form submission
searchFormEl.addEventListener("submit", getParkInfo);

//add event listener for when a card is clicked in container two



//call loadParks() function