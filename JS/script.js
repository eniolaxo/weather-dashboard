$(document).ready(function() {

// When a user searches for a city they are presented with current and future conditions for that city
// and that city is added to the search history

// Defining all the global scope variables that will be referenced later on:
var searchInput = $("#search-input");
var searchBtn = $("#search-button");
var todayEl = $("#today");
var forecastEl = $("#forecast");
var storeBtn = [];
var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q="; 
var apiKey = "b3383d2942e9787a370436f1cb6eb8a4";


// Emptying the "today" and "forecast" elements before displaying new data to ensure that the page only shows data for the most recently searched city, rather than accumulating data for all previously searched cities. 
$(searchBtn).on("click", function(event){
  // event.preventDefault since it's a button in a form
    event.preventDefault();
    todayEl.empty();
    forecastEl.empty();

  // we have to capture the value of whatever the input city of the form is
// using trim() to get rid of any white space
var city = searchInput.val().trim();

// making a button to contain the searches with JavaScript
if (searchInput.val()) {
  var savedBtn = $("<button>");
  savedBtn.addClass("btn btn-outline-success");
if (storeBtn.length < 5) {
 console.log(storeBtn);
 localStorage.setItem("button", JSON.stringify(storeBtn));
}}
// searchCity(city);

  

// Make an API call to get the city co-ords
$.ajax({
  url: apiUrl + city + "&limit=1&appid=" + apiKey,
  method: "GET"
}).then(function(response) {
  lat = response[0].lat;
  lon = response[0].lon;

  // API calls for co-ords to get the present weather
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey,
    method: "GET"
  }).then(function(response1) {
    getCurrentWeather(response1);

// call for 5 days worth:
$.ajax({
  url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey,
  method: "GET"
}).then(function(fiveDaysWorth) {
  getCurrentWeather(fiveDaysWorth); // I'll need to make a getCurrentWeather function later on
})
})
})
})



// third function that'll show the current weather on the dashboard
// what I need:
// city name
// The date
// An icon representation of weather conditions
// The temperature var temp = $("#temperature");
// temp.innerhtml = data.main.temp
// The humidity
// The wind speed



// I need to ajax fetch the URL to get the data 
//after I get the data I can make a call to the 5th function

// 5th function: the purpose of this is to get the data for all 5 days to show up - it's a repeat of the 3rd function.
// I need 5 days worth of cards to represent the weather for those days
// use JS to build a card, then create a for loop to generate 5 of them in total
//youtube how to append and make html elements in Javascript

// create a function called 'saveCity'. the point of this is to send something to localstorage and do an array of 'city' content that's been saved
// push var city to a global cities array and then do JSON stringify to local storage.
// within the first function make an automatic call to the save function

// load function 

// json parse local storage, load local storage call at the bottom of the page.
// now, create an if statement. also make a variable that equals the json parse

// final function: make a btn function. append javascript, create a html el and do a forloop to go through 5 cities. get the cities array,
// then use a forloop to go through all 5 citirs, then for each city, create a button and set its value to the city name.                                                                                                      

// When a user clicks 'search' it should display the weather forecast
// Firstly, I should do a click event on the button.



})

