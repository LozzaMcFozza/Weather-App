function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  let apiKey = "a5tbfe342e99647c146b3o3b0ff80356";
  let city = "${searchInputElement.value}";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature-value");
  let temperature = Math.round(response.data.temperature.current);

  temperatureElement.innerHTML = `${temperature}`;
  console.log(response.data.temperature.current);
  console.log(response.data.temperature.humidity);

  displayHumidity(response);
}

function displayHumidity(response) {
  let humidityElement = document.querySelector("#current-humidity");
  let humidity = Math.round(response.data.temperature.humidity);

  humidityElement.innerHTML = `${humidity}%`;

  displayWindSpeed(response);
}

function displayWindSpeed(response) {
  let speedElement = document.querySelector("#current-speed");
  let speed = response.data.wind.speed;

  speedElement.innerHTML = `${speed}km/h`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
