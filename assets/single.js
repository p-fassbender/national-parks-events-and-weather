var forecastSection = document.getElementById("forecast");

var getParkName = function() {

    //grab park name from url query string.
    var queryString = document.location.search;

    //parse parkCode from Url Turn next line back on after testing
    var parkCode = queryString.split("=")[1];

    var apiUrl = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=LlVYiDWyyOiv7SJeWDVIbQAJ2mMuYi64fapw7tEA";

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
                getParkWeather(data.data[0].latitude, data.data[0].longitude);
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
    var parkInfoDiv = document.getElementById("park-info");
    //create ul to append to park data div
    var parkInfoList = document.createElement("ul");
    //append to div
    parkInfoDiv.appendChild(parkInfoList);

    //create array for each data point we want to include
    var infoArray = [];

    var parkDescription = data.data[0].description;
    infoArray.push(parkDescription);

    //create list item for each data point we want to capture
    var parkAddress = data.data[0].addresses[0];
    var parkAddressListItem = "Address: " + "\n" + parkAddress.line1 + "\n" + parkAddress.city + ", " + parkAddress.stateCode + " " + parkAddress.postalCode;
    infoArray.push(parkAddressListItem);

    var parkHours = "Park Hours: " + data.data[0].operatingHours[0].description;
    infoArray.push(parkHours);

    var parkFees = "Park Fees: " + data.data[0].entranceFees[0].description;
    infoArray.push(parkFees);

    var parkActivitiesListLength = data.data[0].activities.length;
    var parkActivities = "Park Activities: ";
    for (var i = 0; i < parkActivitiesListLength; i ++) {
        //have to use conditional otherwise end up with comma after last activity
        if (i==parkActivitiesListLength - 1) {
            parkActivities+= data.data[0].activities[i].name
        }
        else {
            parkActivities+= data.data[0].activities[i].name + ", ";
        };
    }
    infoArray.push(parkActivities);

    //loop through array creating li's to append to ul
    for (var i = 0; i < infoArray.length; i++) {
        var parkListItemEl = document.createElement("li");
        parkListItemEl.innerText = infoArray[i];
        parkInfoList.appendChild(parkListItemEl);
    }
};

var genParkImages = function(data) {
    
    //select #park-images data div
    var parkImageDiv = document.getElementById("park-images cardGrid");

    //use for loop to create img tag with src the url of each image from the data
    //and append to the div
    for (var i = 0; i < data.data[0].images.length; i++) {
        
        //create cell mirroring container two card grid
        var imageCell=document.createElement("div");
        imageCell.className = "cell";
        parkImageDiv.appendChild(imageCell);

        //create card div
        var imageCard = document.createElement("div");
        imageCard.className = "card";
        imageCell.appendChild(imageCard);

        //create card divider for description
        var cardDivider = document.createElement("div");
        cardDivider.className = "card-divider";
        //add text of description of image;
        cardDivider.innerText = data.data[0].images[i].title;
        imageCard.appendChild(cardDivider);

        //create img tag for card
        var imageImage = document.createElement("img");
        imageImage.setAttribute("src", data.data[0].images[i].url)
        imageCard.appendChild(imageImage);
    };
};

const PRESTON_WEATHER_APIKEY = "b53e99656ff24a5b5005671f604cde31"
function getParkWeather(lat, lon) {
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=" + PRESTON_WEATHER_APIKEY;

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (weatherData) {
                    displayForecast(weatherData);
                });
            }
            else {
                alert("Error: Location Not Available");
            }
        })
        .catch(function (error) {
            alert("Unable to connect");
        });
};

var displayForecast = function(weatherData) {
    // i from 0 to 5 will diplay current day + 4 days in the future
    // note that daily[0] is the current day's forecast
    for (let i = 0; i < 5; i++) {
        var parkTemp = "Temp: " + weatherData.daily[i].temp.day +"°F";
        var parkWind = "Wind Speed: " + weatherData.daily[i].wind_speed + " mph"; // MPH
        var parkHumidity = "Humidity: " + weatherData.daily[i].humidity + "%";

        var parkIconUrl = 'http://openweathermap.org/img/wn/' + weatherData.daily[i].weather[0].icon + '@2x.png' // img src
        var parkIconImage = document.createElement("img");
        parkIconImage.setAttribute("src", parkIconUrl);

        var forecastArray = [];

        forecastArray.push(parkTemp, parkWind, parkHumidity);

        //create card for each set of data
        var forecastCard = document.createElement("div");
        //append card to forecast section
        forecastSection.appendChild(forecastCard);

        //create ul for each card
        var forecastList = document.createElement("ul");
        //append ul to card
        forecastCard.appendChild(forecastList);
        //append forecast icon to beginning of ul this might cause issues that a list
        //has an <img> tag instead of an li, but I can live with it if it works for
        //CSS purposes
        forecastList.appendChild(parkIconImage);            


        for (var n = 0; n<forecastArray.length; n++) {

            //create li element for each data to append to ul
            var forecastListItem = document.createElement("li");
            forecastListItem.innerText = forecastArray[n];
            forecastList.appendChild(forecastListItem);
        }
    }
};

getParkName();