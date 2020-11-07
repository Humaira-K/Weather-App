function formatDate(timestamp) {
let date = new Date(timestamp);
let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
let day = days[date.getDay()];

 let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
let month = months[date.getMonth()];


  return `${day} ${month} ${date},${formatTime(timestamp)}`;
}

function formatTime(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
return `${hours}:${minutes}`;
}

function weatherCondition(response) {
let cityElement = document.querySelector("#city");
let currentTemp = document.querySelector("#current-temp");
let currentHumidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind");
let weatherDescription = document.querySelector("#description");
let minimumTemp = document.querySelector("#current-minimum"); 
let maximumTemp = document.querySelector("#current-maximum"); 
let feelsLike = document.querySelector("#feels-like");
let sunrise = document.querySelector("#sunrise");
let sunset = document.querySelector("#sunset");
let pressure = document.querySelector("#weather-pressure");
let iconElement = document.querySelector("#icon");
// date element
let dateElement = document.querySelector("#date-time");

dateElement.innerHTML = formatDate(response.data.dt * 1000);

celsiusTemperature = response.data.main.temp;

cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
currentTemp.innerHTML = Math.round(celsiusTemperature);
currentHumidity.innerHTML = Math.round(response.data.main.humidity);
windSpeed.innerHTML = Math.round(response.data.wind.speed);
weatherDescription.innerHTML = response.data.weather[0].main;
minimumTemp.innerHTML = Math.round(response.data.main.temp_min);
maximumTemp.innerHTML = Math.round(response.data.main.temp_max);
feelsLike.innerHTML = Math.round(response.data.main.feels_like);
sunrise.innerHTML = formatTime(response.data.sys.sunrise * 1000);
sunset.innerHTML = formatTime(response.data.sys.sunset * 1000);
pressure.innerHTML = Math.round(response.data.main.pressure);
iconElement.setAttribute("alt", response.data.weather[0].description);
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

console.log(response.data);
}

function searchCity(city) {
  let apiKey = "c4e8686879553a92040532234f03a66e";
  let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
 let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "c4e8686879553a92040532234f03a66e";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function clickFahrenheit(event) {
  event.preventDefault();
 
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatureElement = document.querySelector("#current-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function clickCelsius(event) {
  event.preventDefault();
 
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", clickFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", clickCelsius);

let currentLocationButton= document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
