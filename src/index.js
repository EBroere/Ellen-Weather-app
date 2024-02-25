function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    displayWeather(response.data);
  });
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

  let formattedDay = days[date.getDay()];
  let formattedDate = `${formattedDay} ${hours}:${minutes}`;
  return formattedDate;
}

function displayWeather(data) {
  let temperature = Math.round(data.temperature.current);
  let city = data.city;
  let country = data.country;
  let formattedDate = formatDate(new Date(data.time * 1000));
  let conditionDescription = data.condition.description;
  let iconUrl = data.condition.icon_url;
  let humidity = data.temperature.humidity;
  let windSpeed = data.wind.speed;
  let feelsLike = data.temperature.feels_like;
  let pressure = data.temperature.pressure;
  let longitude = data.coordinates.longitude;
  let latitude = data.coordinates.latitude;

  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector(".current-temperature-value");
  let iconElement = document.querySelector("icon");
  let conditionElement = document.querySelector(".current-condition");
  let humidityElement = document.querySelector(".current-humidity");
  let windElement = document.querySelector(".current-wind");
  let detailsElement = document.querySelector(".current-details");
  let dateElement = document.querySelector("#current-date");
  icon.innerHTML = `<img src="${iconUrl}" />`;

  cityElement.innerHTML = `${city}, <br /> <small>${country}</small>`;
  temperatureElement.innerHTML = temperature;

  if (dateElement) {
    dateElement.innerHTML = formatDate(new Date(data.time * 1000));
  }
  if (conditionElement) {
    conditionElement.innerHTML = conditionDescription;
  }

  if (humidityElement) {
    humidityElement.innerHTML = `<strong>${humidity}%</strong>`;
  }
  if (windElement) {
    windElement.innerHTML = `<strong>${windSpeed}km/h</strong>`;
  }

  detailsElement.innerHTML = `Day & Time: <strong>${formattedDate}</strong></strong>, <br /> Condition: <strong>${conditionDescription}</strong><br />
  <span>Coordinates: lat. <strong>${latitude}</strong>, long. <strong>${longitude}</strong></span><br />
  Humidity: <strong>${humidity}%</strong>, Wind: <strong>${windSpeed}km/h</strong>, <br />
  Feels Like: <strong>${feelsLike}°C</strong>, Pressure: <strong>${pressure} hPa</strong>, <br />`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (event) {
  search(event);
  searchCity("Groningen");
});

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
