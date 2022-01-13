


var getParkName = function() {

    //grab park name from url query string. Turn next line on after testing
    //var queryString = document.location.search;
    //or whatever Preston makes the href include when accessing the second page,
    //if he doesn't specific, I'll use the parkcode

    //parse parkCode from Url Turn next line back on after testing
    //var parkCode = queryString.split("=")[1];

    var apiUrl = "https://developer.nps.gov/api/v1/parks?parkCode=abli&api_key=LlVYiDWyyOiv7SJeWDVIbQAJ2mMuYi64fapw7tEA";
    //var apiUrl = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=LlVYiDWyyOiv7SJeWDVIbQAJ2mMuYi64fapw7tEA";

    fetch(apiUrl).then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data) {

                //get parkName from api call that uses parkCode
                var parkName = data.data[0].fullName;

                //assign parkName to h1 element
                document.querySelector("header > h1").innerText = parkName;

                //generate park info function
                genParkInfo(data);
        
                //generate park images
                genParkImages(data);
        
                //generate forecast
                genForecast(data);
            });
        }
        //takes you to the homepage if you don't have a parkcode to parse as the
        //url query
        else {
            document.location.replace("./index.html");
        }
    });  
};

var genParkInfo = function(data) {

    //select #park-info data div
    

    //create li to append to park data div

    //append park data div to flex container so that its to the left of
    //images div
};

var genParkImages = function(data) {
    //create images div

    //create img and append to images div

    //append images div to flex container so that it's to the right of
    //images div
}

var genForecast = function(data) {
    //create forecast section if not hardcoded

    //loop through forecast data and create forecast cards

        //create ul for each card
        
        //create li element for each data to append to ul

        //append ul to card

        //append card to forecast section
};

//getParkName();


    
// var Testing = function() {

//     var apiUrl = "https://developer.nps.gov/api/v1/parks?parkCode=abli&api_key=LlVYiDWyyOiv7SJeWDVIbQAJ2mMuYi64fapw7tEA";
    
//     fetch(apiUrl).then(function(response) {
//         //request was successful
//         if (response.ok) {
//             response.json().then(function(data) {


//                 console.log(data);
//                 //get parkName from api call that uses parkCode
//                 console.log(data.data[0].fullName);
//                 var parkName = data.data[0].fullName;

//                 //pass response data to dom function
//                 document.querySelector("header > h1").innerText = parkName;
//             });
//         };
//     });
// };

// Testing();

getParkName();