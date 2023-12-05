var forecastCardSection = document.getElementById("forecast-cards");
var forecastSection = document.getElementById("forecast");

var parkList = [];
var parkCodesList = [];

var getParkName = function () {

    //grab park name from url query string.
    var queryString = document.location.search;

    //parse parkCode from Url Turn next line back on after testing
    var parkCode = queryString.split("=")[1];

    var apiUrl = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=LlVYiDWyyOiv7SJeWDVIbQAJ2mMuYi64fapw7tEA";

    fetch(apiUrl).then(function (response) {
        //request was successful
        if (response.ok) {
            response.json().then(function (data) {

                //get parkName from api call that uses parkCode
                var parkName = data.data[0].fullName;
                document.querySelector("title").innerText = parkName;

                //assign parkName to h1 element
                document.querySelector("header > h1").innerText = parkName;

                //add parkName to localStorage to load on index.html next time
                updateParkList(parkName, parkCode);

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

var loadParkList = function () {

    //load parks and their codes to create history button with links
    var loadedList = JSON.parse(localStorage.getItem("parks"));
    var loadedCodeList = JSON.parse(localStorage.getItem("codes"));

    if (!loadedList) {
        return;
    }
    else {
        for (var i = 0; i < loadedList.length; i++) {
            //recreate cityList array from localstorage
            parkList.push(loadedList[i]);
            parkCodesList.push(loadedCodeList[i]);
        }
    }
}

var saveParkList = function () {
    localStorage.setItem("parks", JSON.stringify(parkList));
    localStorage.setItem("codes", JSON.stringify(parkCodesList));
}

var updateParkList = function (parkName, parkCode) {

    if (parkList.includes(parkName)) {
        return;
    }
    else {
        //add park input to array
        parkList.push(parkName);
        parkCodesList.push(parkCode);
        saveParkList();
    }
};

var genParkInfo = function (data) {

    //select #park-info data div
    var parkInfoDiv = document.getElementById("park-info");
    //create ul to append to park data div
    var parkInfoList = document.createElement("ul");
    parkInfoList.className = "info-list";
    //append to div
    parkInfoDiv.appendChild(parkInfoList);

    //create array for each data point we want to include
    var infoArray = [];

    var parkDescription = data.data[0].description;
    infoArray.push(parkDescription);

    //create list item for each data point we want to capture
    var parkAddress = data.data[0].addresses[0];
    var parkAddressListItem;
    if (parkAddress) {
        parkAddressListItem = "Address: " + "\n" + parkAddress.line1 + "\n" + parkAddress.city + ", " + parkAddress.stateCode + " " + parkAddress.postalCode;
    } else {
        parkAddressListItem = "Address: " + "N/A"
    }
    infoArray.push(parkAddressListItem);

    var parkHours = data.data[0].operatingHours[0].description;
    var parkHoursListItem;
    if (parkHours) {
        parkHoursListItem = "Park Hours: " + parkHours;
    } else {
        parkHoursListItem = "Park Hours: " + "N/A"
    }
    infoArray.push(parkHoursListItem);

    var parkFees = data.data[0].entranceFees;
    var parkFeesListItem;
    if (parkFees[0]) {
        let parkFeesDescription = parkFees[0].description
        parkFeesListItem = "Park Fees: " + parkFeesDescription;
    } else {
        parkFeesListItem = "Park Fees: " + "N/A"
    }
    infoArray.push(parkFeesListItem);

    var parkActivitiesListLength = data.data[0].activities.length;
    var parkActivities = "Park Activities: ";
    for (var i = 0; i < parkActivitiesListLength; i++) {
        //have to use conditional otherwise end up with comma after last activity
        if (i == parkActivitiesListLength - 1) {
            parkActivities += data.data[0].activities[i].name
        }
        else {
            parkActivities += data.data[0].activities[i].name + ", ";
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

var genParkImages = function (data) {

    //select #park-images data div
    var parkImageDiv = document.getElementById("park-images");

    //use for loop to create img tag with src the url of each image from the data
    //and append to the div
    for (var i = 0; i < data.data[0].images.length; i++) {

        //create cell that mirrors container two card grid
        var imageCell = document.createElement("div");
        imageCell.className = "cell small-6 image-div-cell";
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
                console.error("Location Not Available");
                displayForecast(false)
            }
        })
        .catch(function (error) {
            console.error("Unable to connect");
            displayForecast(false)
        });
};

var displayForecast = function (weatherData) {
    if (weatherData) {
        // i from 0 to 5 will diplay current day + 4 days in the future
        // note that daily[0] is the current day's forecast
        for (let i = 0; i < 5; i++) {
            //the json for the weather api gives the date in unix time
            var parkUnix = weatherData.daily[i + 1].dt;
            //convert unix to date format
            var date = new Date(parkUnix * 1000);
            //convert date format to mm/dd/yyyy
            var parkDate = date.toLocaleDateString("en-us");

            var parkTemp = "Temp: " + weatherData.daily[i].temp.day + "°F";
            var parkWind = "Wind Speed: " + weatherData.daily[i].wind_speed + " mph"; // MPH
            var parkHumidity = "Humidity: " + weatherData.daily[i].humidity + "%";

            var parkIconUrl = 'http://openweathermap.org/img/wn/' + weatherData.daily[i].weather[0].icon + '@2x.png' // img src
            var parkIconImage = document.createElement("img");
            parkIconImage.setAttribute("src", parkIconUrl);

            var forecastArray = [];

            forecastArray.push(parkDate, parkTemp, parkWind, parkHumidity);

            //create card for each set of data
            var forecastCard = document.createElement("div");
            forecastCard.className = "forecast-card cell large-auto card-section grid-x";
            //append card to forecast section
            forecastCardSection.appendChild(forecastCard);
            forecastCard.appendChild(parkIconImage);

            //create ul for each card
            var forecastList = document.createElement("ul");
            forecastList.setAttribute('style', "list-style:none");
            forecastList.className = "cell"
            //append ul to card
            forecastCard.appendChild(forecastList);;

            for (var n = 0; n < forecastArray.length; n++) {

                //create li element for each data to append to ul
                var forecastListItem = document.createElement("li");
                forecastListItem.innerText = forecastArray[n];
                forecastList.appendChild(forecastListItem);
            }
        }
    } else {
        let noWeatherMessage = document.createElement("p");
        noWeatherMessage.innerText = "Sorry! No weather available at this location!";
        noWeatherMessage.setAttribute('style', "text-align:center;");

        forecastSection.appendChild(noWeatherMessage)
    }

};

loadParkList();

getParkName();