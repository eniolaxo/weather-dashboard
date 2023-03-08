// When the user clicks on the search button, the application empties the "today" and "forecast" elements, gets the city name from the search input, saves the search to local storage, and then makes two AJAX requests to the OpenWeather API: one to get the city's latitude and longitude, and another to get the current weather and the next five days of weather forecast.






// The response from the API for the current weather is passed to a function called getCurrentWeather, which creates a card element and appends it to the "today" element. The card shows the city name, the date, an icon representing the weather conditions, the temperature, humidity, and wind speed.

// The response from the API for the next five days of weather forecast is passed to a function called getFiveDays, which loops through the forecast data and creates a card element for each day, appending it to the "forecast" element. Each card shows the date, an icon representing the weather conditions, the temperature, and the humidity.

// When the user clicks on one of the saved search buttons, the application empties the "today" and "forecast" elements, gets the city name from the button text, and then makes two AJAX requests to the OpenWeather API to get the current weather and the next five days of weather forecast for that city. The response is passed to the same functions that were used for the search button.

// The application loads the saved searches from local storage on page load and creates a button for each saved search, appending it to the "history" element.