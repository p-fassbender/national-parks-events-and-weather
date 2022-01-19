var searchFormEl = document.getElementById("user-form");
var cardContainer = document.querySelector("#card-container");
var linkDivEl = document.querySelector("#linkDiv");
linkDivEl.setAttribute("style", "margin: 10px 0 20px 0");
var invalidTextEl = document.querySelector("#invalid-input");
<<<<<<< HEAD
var cardGridEl = document.getElementById("cardGrid");

//var parkList = [];

=======
>>>>>>> 627634dc6c70d89d23bc4964a8e1a1c1a51dacbf
var cardGridEl = document.querySelector("#cardGrid");

// FOR TESTING PURPOSES just swap out the variable in the fetch for your respective key
const PRESTON_APIKEY = "gRg3msbXZYdm1ZHaSXELITGBKWoGyvlYw22RFgz9";
const TONY_APIKEY = "LlVYiDWyyOiv7SJeWDVIbQAJ2mMuYi64fapw7tEA";

//get the modal form to accept a state and populate the container 2 info
var getParkInfo = function (event) {
    event.preventDefault();

    //clear out previous elements
    linkDivEl.innerText="";
    invalidTextEl.innerText="";
    cardGridEl.innerText="";
    
    // gets text input from the modal and assigns it to a variable
    var stateInputEl = document.querySelector("#state");
    var stateAbbr = (stateInputEl.value.trim()).toUpperCase();

    //fetch the first 10 national park datas from the national park service api
    var apiUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateAbbr + "&api_key=" + TONY_APIKEY + "&limit=10";
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    //if the form entry is not a valid two letter state initial, don't accept input and let user know
                    if (data.total==465 || data.total==0) {
                        $("#invalid-input").text("The state code you entered is invalid, or there are no National Parks in the selected state.");
                        return false;
                    }
                    else {
                        // pass fetched data into generateCards function
                        generateCards(data);
                    }
                    // if a state has more than 10 mational parks then provide a link to the national parks website for that state
                    if (data.total > 10) {
                        var theHref = document.createElement("a");
                        theHref.setAttribute("href", 'https://www.nps.gov/state/' + stateAbbr + '/index.htm');
                        theHref.setAttribute("target", '_blank');
                        theHref.innerText = "Click here to see more national parks in " + stateAbbr;
                        linkDivEl.appendChild(theHref);
                        cardContainer.appendChild(linkDivEl);
                    }
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

//generate card links using api data from getParkInfo
function generateCards(data) {
    // loops through the data response from the state code api fetch and creates/displays a card for the national parks in that state
    for (let i = 0; i < data.data.length; i++) {
        // gets info from the data response and assigns it to variables
        var parkName = data.data[i].fullName;
        var imgURL = data.data[i].images[0].url;
        var parkCode = data.data[i].parkCode;

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
        cardGridEl.appendChild(anchorEl);
    }
}

var loadParks = function () {

    //load the list of parks and codes
    var loadedList = JSON.parse(localStorage.getItem("parks"));
    var loadedCodeList = JSON.parse(localStorage.getItem("codes"));

    if (!loadedList) {
        return;
    }
    else {
        for (var i =0; i<loadedList.length; i++) {        
            populateButtons(loadedList[i], loadedCodeList[i]);
        }
    }  
}

var populateButtons = function(parkName, parkCode) {

    var newButton = document.createElement("a");

    //add button text and styles
    newButton.className = "medium-6 button cell width-100";
    newButton.id = "history-button"
    newButton.setAttribute("style", "display: block");
    newButton.setAttribute("href", "./single.html?parkCode=" + parkCode);
    newButton.innerText=parkName;

    //append button to make visible and use
    document.getElementById("left-column").appendChild(newButton);
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

//call loadParks() function
loadParks();