let now = new Date();

let date = now.getDate();
let hours = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

let day = days[now.getDay()];

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

let month = months[now.getMonth()];
let year = now.getFullYear();

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${month} ${date}, ${year} ${hours}`;


function weatherCondition(response) {
let cityElement = document.querySelector("#city");
let currentTemp = document.querySelector("#current-temp");
let currentHumidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind");
let weatherDescription = document.querySelector("#description");
let minimumTemp = document.querySelector("#current-minimum"); 
let feelsLike = document.querySelector("#feels-like");
let sunrise = document.querySelector("#sunrise");
let sunset = document.querySelector("#sunset");

cityElement.innerHTML = response.data.name;
currentTemp.innerHTML = Math.round(response.data.main.temp);
currentHumidity.innerHTML = Math.round(response.data.main.humidity);
windSpeed.innerHTML = Math.round(response.data.wind.speed);
weatherDescription.innerHTML = response.data.weather[0].main;
minimumTemp.innerHTML = Math.round(response.data.main.temp_min);
feelsLike.innerHTML = Math.round(response.data.main.feels_like);
sunrise.innerHTML = response.data.sys.sunrise;
sunset.innerHTML = response.data.sys.sunset * 1000;

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

function clickFarenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = Math.round(22 * 1.8 + 32);
}

let clickInputFarenheit = document.querySelector("#fahrenheit");
clickInputFarenheit.addEventListener("click", clickFarenheit);

function clickCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = 22;
}

let clickInputCelsius = document.querySelector("#celsius");
clickInputCelsius.addEventListener("click", clickCelsius);


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton= document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
