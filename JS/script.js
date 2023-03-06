// When a user searches for a city they are presented with current and future conditions for that city
// and that city is added to the search history

// Defining all the global scope variables that will be referenced later on:
var searchInput = $("#search-input");
var searchBtn = $("#search-button");
var todayEl = $("#today");
var forecastEl = $("#forecast");
var apiKey = "b3383d2942e9787a370436f1cb6eb8a4";


// When a user clicks 'search' it should display the weather forecast
// Firstly, I should do a click event on the button.

$(searchBtn).on("click", function(event){
// event.preventDefault since it's a button in a form
  event.preventDefault();


}
)



// When a user views the current weather conditions for that city they are presented with:
// The city name
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// The wind speed



// When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
// The date
// An icon representation of weather conditions
// The temperature
// The humidity



// When a user click on a city in the search history they are again presented with current and 
// future conditions for that city