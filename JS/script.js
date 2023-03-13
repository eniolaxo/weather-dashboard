$(document).ready(function() {

  // Defining all the global scope variables that will be referenced later on:
  var searchInput = $("#search-input");
  var searchBtn = $("#search-button");
  var todayEl = $("#today");
  var forecastEl = $("#forecast");
  var apiKey = "b3383d2942e9787a370436f1cb6eb8a4";
  var searchHistory = $("#history");
  $("#today").attr("style", "border:0.5px solid black; padding-left:10px")

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
  
  function saveCity() {
    var gotArray = JSON.parse(localStorage.getItem("button"));
    if (gotArray) {
      for (i = 0; i < gotArray.length; i++) {
        var savedCityHist = $("<button>" + gotArray[i] + "</button>");
        savedCityHist.addClass("btn btn-outline-success");
        searchHistory.append(savedCityHist);
      }
      displayWeather(gotArray[0]);
    }
  }
  
  saveCity();  

  $(searchHistory).on("click", function(e) {
    var cityName = e.target.innerText
    todayEl.empty();
    forecastEl.empty();
    displayWeather(cityName, apiKey);
    
    })
  
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
  
  // make a function to display the current weather
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
function getFutureWeather(response) {
// Clear any previous data
forecastEl.empty();

// Create a header for the future weather forecast
$("<h3>").addClass("mt-3 mb-3").text("5-Day Forecast:").appendTo(forecastEl);

// Create a row to hold the 5-day forecast cards
var rowEl = $("<div>").addClass("row");

// Loop through the API response to get the forecast data for each of the 5 days
for (var i = 0; i < 5; i++) {
var index = i * 8;
var date = moment(response.list[index].dt_txt).format("DD/MM/YYYY");
var iconCode = response.list[index].weather[0].icon;
var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
var temp = (response.list[index].main.temp - 273.15).toFixed(1);
var humidity = response.list[index].main.humidity;
  
// Create a card to display the forecast data
var cardEl = $("<div>").addClass("col-md-2 ml-2 mb-2 bg-primary text-white rounded");
var cardBodyEl = $("<div>").addClass("card-body p-2");

// Create and append the elements to display the forecast data
$("<h5>").addClass("card-title").text(date).appendTo(cardBodyEl);
$("<img>").attr("src", iconUrl).appendTo(cardBodyEl);
$("<p>").addClass("card-text").text("Temp: " + temp + "°C").appendTo(cardBodyEl);
$("<p>").addClass("card-text").text("Humidity: " + humidity + "%").appendTo(cardBodyEl);

cardEl.append(cardBodyEl);
rowEl.append(cardEl);
}

// Append the row of forecast cards to the forecast element
forecastEl.append(rowEl);
}



}); //closing brackets for document.ready and the main function.

