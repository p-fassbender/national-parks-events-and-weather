# National Parks, Park Info and Weather Forecast

## Table of Contents

-   [Introduction](#introduction)
-   [Techonologies Used](#technologies-used)
-   [Links](#links)
-   [User Story](#user-story)
-   [Features](#features)
-   [Installation](#installation)
-   [Screenshot](#screenshot)

## Introduction

The available APIs shaped our project because we needed server-side APIs that would give us enough free calls each day and logically go together. For example NBA events and weather wouldn't necessarily go together because NBA games are played inside. From there we decided to use two HTML pages, each with their own .js file, sharing the same foundation CSS framework and a shared CSS file created by us.

Following project guidelines we used a modal to capture and validate user input and generate dynamic HTML elements (park cards) that link to a second page; created with entirely dynamic HTML so we can display different park information, depending upon which 'park card' is clicked on the first page. The second page, single.html uses the open weather API to generate a five day forecast.

The final feature to highlight is our usage of browser localStorage. Any park card from index.html that was selected will created a history link beneath the search button so if users leave the single.html page, they can easily go back to it without having to do another modal search and figure out which park they viewed previously.

## Technologies Used

-   HTML 5
-   JavaScript
-   Jquery
-   CSS
-   Foundation by Zurb

---

## Links

## The following is a link to the deployed website.

https://p-fassbender.github.io/national-parks-info-and-weather/

## The following is a link to the GitHub Repo.

https://github.com/p-fassbender/national-parks-info-and-weather

---

## USER STORY

AS AN outdoor enthusiast
I WANT to see information about, and a weather forecast for, a national park
SO THAT I can plan a trip accordingly

## FEATURES

GIVEN a parks dashboard with form inputs

-   WHEN I search for a state, THEN I am presented with a list of national parks found in that state.
-   WHEN I click on a national park, THEN I am presented with information about the park, images of it and the weather forecast.
-   WHEN I view the park information, THEN I am presented with a description, address, entrance fees, available activities and images of the park.
-   WHEN I view the park forecast, THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed and the humidity.
-   WHEN I view the information page, THEN I have a button to take me back to the homepage.
-   WHEN I select a national park from the homepage, THEN it is saved into a list of recently viewed parks in local storage.
-   WHEN I load the parks dashboard homepage, THEN I am presented with a list of saved parks.

## Installation

-   To clone repository

```
git clone git@github.com:p-fassbender/national-parks-info-and-weather.git
```

-   Install Dependencies

1. Ensure you have Node.js installed on your machine. The budget tracker application will be invoked by entering node server.js in the command line.
2. All NPM packages required for this application (Express, Compression, Mongoose, Lite-Server and Morgan) are already listed as dependencies in the package.json file. Run the command 'npm i' command in your terminal at the root directory level to install the packages.

-   Open the index.html file in your default browser. (Chrome recommended)

## Screenshot

![Webpage titled "National Parks" features ](./assets/national-parks-screenshot.gif)
