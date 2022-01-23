# national-parks-info-and-weather

The aim of this project was to conceive and execute a design with your team that solves a real-world problem by integrating data received from multiple server-side API requests to create an interactive front-end project.

## Technologies Used
* HTML 5
* JavaScript
* Jquery
* CSS
* Foundation by Zurb


---

## How and Why
The available APIs shaped our project because we needed server-side APIs that would give us enough free calls each day and logically go together. For example NBA events and weather wouldn't necessarily go together because NBA games are played inside. From there we decided to use two HTML pages, each with their own .js file, sharing the same foundation CSS framework and a shared CSS file created by us.

Following project guidelines we used a modal to capture and validate user input and generate dynamic HTML elements (park cards) that link to a second page; created with entirely dynamic HTML so we can display different park information, depending upon which 'park card' is clicked on the first page. The second page, single.html uses the open weather API to generate a five day forecast.

The final feature to highlight is our usage of browser localStorage. Any park card from index.html that was selected will created a history link beneath the search button so if users leave the single.html page, they can easily go back to it without having to do another modal search and figure out which park they viewed previously.

## Things We learned
Learning a new front-end open source CSS toolkit, Foundation by Zurb, was one of the more challenging tasks. Sifting through documentation to match our mock-up and even find the right source scripts proved difficult. After exploring Foundation, it seems like it has a lot of capability that we could use once we understand importing node packages and modules better. This would allow us to take advantage of customized SASS and produce an even better product. We're very pleased with what we were able to generate.

Our Team also became much more familiar with project management using GitHub. We took advantage of the Project Kanban board, GitHub Issues, and mastered Branch Management and push/pull requests.

## What makes this project stand out?
The depth of information we can get from our APIs make this project standout, as well as the mobilly responsive and beautiful UI. We used free images from unsplash.com and Foundation classes, along with our own style sheet, to achieve the latter. Our APIs give us useful information that any National Park enthusiast would appreciate; we will keep this page bookmarked and use it as a hiking/tourist resource.

---

![Webpage titled "National Parks" features ](./assets/national-parks-screenshot.gif)

---

## The following is a link to the live website.
https://p-fassbender.github.io/national-parks-events-and-weather/

## The following is a link to the GitHub Repo.
https://github.com/p-fassbender/national-parks-info-and-weather 

## USER STORY
AS AN outdoor enthusiast
I WANT to see information about, and a weather forecast for, a national park
SO THAT I can plan a trip accordingly

## ACCEPTANCE CRITERIA
GIVEN a parks dashboard with form inputs

* WHEN I search for a state, THEN I am presented with a list of national parks found in that state.
* WHEN I click on a national park, THEN I am presented with information about the park, images of it and the weather forecast.
* WHEN I view the park information, THEN I am presented with a description, address, entrance fees, available activities and images of the park.
* WHEN I view the park forecast, THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed and the humidity.
* WHEN I view the information page, THEN I have a button to take me back to the homepage.
* WHEN I select a national park from the homepage, THEN it is saved into a list of recently viewed parks in local storage.
* WHEN I load the parks dashboard homepage, THEN I am presented with a list of saved parks.