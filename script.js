const apiKey = "a40ea5f742ae9b8b64c23099caa358f4";

// Fetch Weather Data
const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }
    updateCurrentWeather(data);
    fetchForecast(city);
  } catch (error) {
    alert("An error occurred while fetching weather data.");
    console.log(error);
  }
};

// Update Current Weather
const updateCurrentWeather = (data) => {
  document.querySelector("#current-city").innerText = `${data.name} (${
    new Date().toISOString().split("T")[0]
  })`;
  document.querySelector(
    "#current-temp"
  ).innerText = `Temperature: ${data.main.temp}°C`;
  document.querySelector(
    "#current-wind"
  ).innerText = `Wind: ${data.wind.speed} M/S`;
  document.querySelector(
    "#current-humidity"
  ).innerText = `Humidity: ${data.main.humidity}%`;
  document.querySelector("#current-condition").innerText =
    data.weather[0].description;
  document.querySelector(
    "#current-icon"
  ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
};

// Fetch 5-Day Forecast
const fetchForecast = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    updateForecast(data.list);
  } catch (error) {
    alert("An error occurred while fetching weather forcast.");
    console.log(error);
  }
};

// Update Forecast Section
const updateForecast = (forecastList) => {
  const forecastElements = forecastList.filter(
    (item, index) => index % 8 === 0
  );
  const forecastContainer = document.querySelector("#forecastContainer");
  forecastContainer.innerHTML = "";
  forecastElements.forEach((forecast, index) => {
    const card = document.createElement("div");
    card.className = "bg-gray-200 p-4 rounded text-center";

    const dateElement = document.createElement("p");
    dateElement.className = "font-medium";
    dateElement.innerText = `(${forecast.dt_txt.split(" ")[0]})`;
    card.appendChild(dateElement);

    const iconElement = document.createElement("img");
    iconElement.className = "mx-auto w-10 h-10";
    iconElement.src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
    card.appendChild(iconElement);

    const tempElement = document.createElement("p");
    tempElement.innerText = `Temp: ${forecast.main.temp}°C`;
    card.appendChild(tempElement);

    const windElement = document.createElement("p");
    windElement.innerText = `Wind: ${forecast.wind.speed} M/S`;
    card.appendChild(windElement);

    const humidityElement = document.createElement("p");
    humidityElement.innerText = `Humidity: ${forecast.main.humidity}%`;
    card.appendChild(humidityElement);

    forecastContainer.appendChild(card);
  });
};

// Event Listeners
document.querySelector("#search-btn").addEventListener("click", () => {
  const city = document.querySelector("#city-input").value.trim();
  if (city) fetchWeatherData(city);
});

// document
//   .getElementById("current-location-btn")
//   .addEventListener("click", () => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const { latitude, longitude } = position.coords;
//       fetchWeatherDataByCoords(latitude, longitude);
//     });
//   });
