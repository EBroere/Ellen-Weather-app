function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  let apiKey = "bd30oafc2f7e9f6a35bab68ba504ft6c";
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
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector(".current-temperature-value");
  let iconElement = document.querySelector("icon");
  let conditionElement = document.querySelector(".current-condition");
  let humidityElement = document.querySelector(".current-humidity");
  let windElement = document.querySelector(".current-wind");
  let detailsElement = document.querySelector(".current-details");
  let dateElement = document.querySelector("#current-date");

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
  icon.innerHTML = `<img src="${iconUrl}" />`;

  cityElement.innerHTML = `${city}, <br /> <small>${country}</small>`;
  temperatureElement.innerHTML = temperature;

  if (dateElement) {
    dateElement.innerHTML = formatDate(new Date(data.time * 1000));
  }

  if (conditionElement) {
    let capitalizedDescription =
      conditionDescription.charAt(0).toUpperCase() +
      conditionDescription.slice(1);
    conditionElement.innerHTML = conditionDescription;
    conditionElement.innerHTML =
      "<strong>" + capitalizedDescription + "</strong>";
  }

  if (humidityElement) {
    humidityElement.innerHTML = `<strong>${humidity}%</strong>`;
  }
  if (windElement) {
    windElement.innerHTML = `<strong>${windSpeed}km/h</strong>`;
  }

  detailsElement.innerHTML = `Day & Time: <strong>${formattedDate}</strong>, 
  <br /> 
  Condition: <span class="current-condition">${conditionDescription}</span>,
  <br />
  <span>Coordinates: lat. <strong>${latitude}</strong>, long. <strong>${longitude}</strong></span>,
  <br />
  Humidity: <strong>${humidity}%</strong>, Wind: <strong>${windSpeed}km/h</strong>, <br />
  Feels Like: <strong>${feelsLike}°C</strong>, Pressure: <strong>${pressure} hPa</strong>, <br />`;

  getForecast(data.city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (event) {
  search(event);
});

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

document.addEventListener("DOMContentLoaded", function () {
  searchCity("Groningen");
});

function searchCity(city) {
  let apiKey = "bd30oafc2f7e9f6a35bab68ba504ft6c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    displayWeather(response.data);
  });
}

function getForecast(city) {
  let apiKey = "9t5b364c049odb68c86a10ac1444f04e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayIndex = date.getDay();
  return days[dayIndex];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
    <div class="weather-forecast-icon"><img src= "${
      day.condition.icon_url
    }" class= "weather-forecast-icon"/></div>
    <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
        <strong>${Math.round(day.temperature.maximum)}°</strong>
      </div>
      <div class="weather-forecast-temperature">${Math.round(
        day.temperature.minimum
      )}°</div>
    </div>
  </div>
`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
