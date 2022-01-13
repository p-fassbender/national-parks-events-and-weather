var searchFormEl = document.getElementById("user-form");
var cardContainer = document.querySelector("#card-container");

var cardGridEl = document.querySelector("#cardGrid");
cardGridEl.classList.add("grid-x", "grid-padding-x", "large-up-3", "medium-up-2");

// FOR TESTING PURPOSES just swap out the variable in the fetch for your respective key
const PRESTON_APIKEY = "gRg3msbXZYdm1ZHaSXELITGBKWoGyvlYw22RFgz9";
const TONY_APIKEY = "LlVYiDWyyOiv7SJeWDVIbQAJ2mMuYi64fapw7tEA";

//get the modal form to accept a state and populate the container 2 info
var getParkInfo = function (event) {

    event.preventDefault();

    var stateInputEl = document.querySelector("#state");
    var stateAbbr = (stateInputEl.value.trim()).toUpperCase();

    console.log(stateAbbr);

    //need to add query parameter and hopefully be able to use state without having to convert state to anything queryable
    var apiUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateAbbr + "&api_key=" + PRESTON_APIKEY + "&limit=10";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    //this function on the following line was Preston's first issue. Feel free to rename function
                    generateCards(data);

                    if (data.total > 10) {
                        //create a link with the following href, and append to  I don't believe there is an L at the end of htm

                        //var theHref = "<a href='https://www.nps.gov/state/" + stateAbbr + "/index.htm'>Link to National Park Service site for your selected state</a>"
                        var theHref = document.createElement("a")
                        theHref.setAttribute("href", 'https://www.nps.gov/state/' + stateAbbr + '/index.htm')
                        theHref.innerText = "Link to National Park Service site for your selected state";
                        cardContainer.appendChild(theHref);
                    }
                    else if (data.total == 0) {
                        $("#invalid-input").text("The state code you entered is invalid, or there are no National Parks in the selected state.");
                    }
                });
            }
            //else if () {               
            //if the form entry is not a valid two letter state initial, don't accpt input and let user know
            //};
        })
        .catch(function (error) {
            //notice this '.catch()' getting chained onto the end of the '.then()' method
            console.log(error);
        });
}


//else

function generateCards(data) {
    cardGridEl.innerText="";
    
    // loops through the data response from the state code api fetch and creates/displays a card for the national parks in that state
    for (let i = 0; i < data.data.length; i++) {
        // gets info from the data response and assigns it to variables
        var parkName = data.data[i].fullName;
        var imgURL = data.data[i].images[0].url;
        var parkCode = data.data[i].parkCode;

        // dynamically create elements that make up the cards 
        var cellEl = document.createElement("div");
        cellEl.classList.add("cell");

        var anchorEl = document.createElement("a");
        anchorEl.setAttribute("href", "./single.html?parkCode=" + parkCode);

        var cardEl = document.createElement("div");
        cardEl.className = "card";
        cardEl.setAttribute("style", "width: 300px; max-height: 300px");

        var cardDividerEl = document.createElement("div");
        cardDividerEl.className = "card-divider";
        cardDividerEl.innerHTML = "<h4>" + parkName + "</h4>";

        var cardImgEl = document.createElement("img");
        cardImgEl.src = imgURL;
        cardImgEl.setAttribute("alt", "A beautiful image of the state park");

        // append the pieces of the card together and then append them to the page
        cardEl.appendChild(cardDividerEl);
        cardEl.appendChild(cardImgEl);
        anchorEl.appendChild(cardEl);
        cellEl.appendChild(anchorEl);
        cardGridEl.appendChild(cellEl);
    }
}


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