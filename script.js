import { API_KEY, API_URL, API_IMAGE_URL } from "./config.js";

const fetchWeatherData = async (query) => {
  try {
    const { city } = query;
    const response = city
      ? await fetch(
          `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
      : await fetch(
          `${API_URL}/weather?lat=${query?.latitude}&lon=${query?.longitude}&appid=${API_KEY}&units=metric`
        );
    const data = await response.json();
    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }
    updateCurrentWeather(data);
    fetchForecast(query);
    addToRecentCities(city || data.name);
  } catch (error) {
    alert("An error occurred while fetching weather data.");
    console.log(error);
  }
};

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
  ).src = `${API_IMAGE_URL}/${data.weather[0].icon}@2x.png`;
};

const fetchForecast = async (query) => {
  try {
    const { city } = query;
    const response = city
      ? await fetch(
          `${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
        )
      : await fetch(
          `${API_URL}/forecast?lat=${query?.latitude}&lon=${query?.longitude}&appid=${API_KEY}&units=metric`
        );
    const data = await response.json();
    updateForecast(data.list);
  } catch (error) {
    alert("An error occurred while fetching weather forecast.");
    console.log(error);
  }
};

const updateForecast = (forecastList) => {
  const forecastElements = forecastList.filter(
    (item, index) => index % 8 === 0
  );
  const forecastContainer = document.querySelector("#forecastContainer");
  forecastContainer.innerHTML = "";
  forecastElements.forEach((forecast) => {
    const card = document.createElement("div");
    card.className = "bg-blue-400 text-white p-4 rounded text-center";

    const dateElement = document.createElement("p");
    dateElement.className = "font-medium";
    dateElement.innerText = `(${forecast.dt_txt.split(" ")[0]})`;
    card.appendChild(dateElement);

    const iconElement = document.createElement("img");
    iconElement.className = "mx-auto";
    iconElement.src = `${API_IMAGE_URL}/${forecast.weather[0].icon}@2x.png`;
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

const addToRecentCities = (city) => {
  let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
  if (!recentCities.includes(city)) {
    recentCities = [city, ...recentCities.slice(0, 4)];
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
    updateRecentCitiesDropdown(recentCities);
  }
};

const updateRecentCitiesDropdown = (recentCities) => {
  const dropdown = document.querySelector("#recent-cities-dropdown");
  const list = document.querySelector("#recent-cities-list");
  list.innerHTML = "";
  recentCities.forEach((city) => {
    const listItem = document.createElement("li");
    listItem.className = "cursor-pointer hover:bg-gray-100 p-2";
    listItem.innerText = city;
    listItem.addEventListener("click", () => fetchWeatherData({ city }));
    list.appendChild(listItem);
  });
  dropdown.classList.remove("hidden");
};

const loadRecentCities = () => {
  const recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
  if (recentCities.length > 0) {
    updateRecentCitiesDropdown(recentCities);
  }
};

const updateClock = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  document.querySelector("#hour").innerText = hours % 12 || 12;
  document.querySelector("#minutes").innerText = minutes
    .toString()
    .padStart(2, "0");
  document.querySelector("#seconds").innerText = seconds
    .toString()
    .padStart(2, "0");
  document.querySelector("#ampm").innerText = ampm;
};

document.querySelector("#search-btn").addEventListener("click", () => {
  const city = document.querySelector("#city-input").value.trim();
  if (city) fetchWeatherData({ city });
});

document
  .querySelector("#current-location-btn")
  .addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          fetchWeatherData({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        () => alert("Unable to fetch current location.")
      );
    }
  });

setInterval(updateClock, 1000);
loadRecentCities();
