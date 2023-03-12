$(document).ready(function() {

// Defining all the global scope variables that will be referenced later on:
var searchInput = $("#search-input");
var searchBtn = $("#search-button");
var todayEl = $("#today");
var forecastEl = $("#forecast");
var apiKey = "b3383d2942e9787a370436f1cb6eb8a4";
var searchHistory = $("<div>").attr("id", "search-history");
$("body").append(searchHistory);


 // Emptying the "today" and "forecast" elements before displaying new data to ensure that the page only shows data for the most recently searched city, rather than accumulating data for all previously searched cities. 
 $(searchBtn).on("click", function(event){
  // event.preventDefault since it's a button in a form
  event.preventDefault();
  todayEl.empty();
  forecastEl.empty();

  // capturing the value of the input city of the form using trim() to get rid of any white space
  var city = searchInput.val().trim();
  // calling the generateBtn function to create a button based on the user input
  generateBtn(city);
  // make an API call to get the city co-ordinates and display the current and future weather
  displayWeather(city, apiKey);
});


// make a function to generate a button based on the user input and store it in the local storage
function generateBtn(city) {
  var storeBtn = JSON.parse(localStorage.getItem("button")) || [];
  storeBtn.push(city);
  localStorage.setItem("button", JSON.stringify(storeBtn));

  // create a button with the city name as its text
  var savedBtn = $("<button>");
  savedBtn.addClass("btn btn-outline-success");
  savedBtn.text(city);
  // append the button to the search history section
  searchHistory.append(savedBtn);
}

 //----------------------------------------------//
// API Calls

 // make a function to display the current and future weather for a given city
 function displayWeather(city, apiKey) {
  var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
  // make an API call to get the city co-ords
  $.ajax({
    url: apiUrl,
    method: "GET",
  }).then(function(response) {
    var lat = response[0].lat;
    var lon = response[0].lon;

    // API calls for co-ords to get the present weather
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey,
      method: "GET",
    }).then(function(response1) {
      // call the function to display the current weather
      getCurrentWeather(response1);
    });

    // API calls for co-ords to get the future weather
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey,
      method: "GET",
    }).then(function(response2) {
      // call the function to display the future weather
      getFutureWeather(response2);
    });
  });
}
// --------------------------------------------- //
// Functions

// What I need:

// city name
// The date
// An icon representation of weather conditions
// The temperature var temp = $("#temperature");
// temp.innerhtml = data.main.temp
// The humidity
// The wind speed

function getCurrentWeather(responses) {
  // Extracting data from the JSON object returned from the API
  var cityName = responses.name;
  var date = moment().format("DD/MM/YYYY");
  var iconCode = responses.weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  var temperature = "Temp: " + (responses.main.temp - 273.15).toFixed(1) + "°C";
  var humidity = "Humidity: " + responses.main.humidity + "%";


  // Creating and appending the elements to display the data
  var cityEl = $("<h3>").text(cityName + " (" + date + ")");
  var iconEl = $("<img>").attr("src", iconUrl);
  var tempEl = $("<p>").addClass("card-text").text(temperature);
  var humidEl = $("<p>").addClass("card-text").text(humidity);
  var windEl = $("<p>").addClass("card-text").text("Wind speed: " + responses.wind.speed + " kph");

  todayEl.append(cityEl, iconEl, tempEl, humidEl, windEl);
}

// --------------------------- //
// function getFutureWeather
// Instead of making another ajax call and repeating myself just to get the future weather, I should make a for loop that goes over it 5 times for 5 days. 
})

                            





