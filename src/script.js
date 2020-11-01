let now = new Date();

let date = now.getDate();
let hours = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

let year = now.getFullYear();

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

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${month} ${date}, ${year} ${hours}`;

// h1 change based on text search

function weatherCondition(response) {
 document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#current-temp").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#humidity").innerHTML = Math.round(
response.data.main.humidity);
document.querySelector("#wind").innerHTML = Math.round(
response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.weather[0].main;
document.querySelector("#current-minimum").innerHTML = Math.round(
response.data.main.temp_min);
document.querySelector("#feels-like").innerHTML = Math.round(
response.data.main.feels_like);
document.querySelector("#sunrise").innerHTML = Math.round(
response.data.sys.sunrise);
document.querySelector("#sunset").innerHTML = Math.round(
response.data.sys.sunset);
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
