# Weather Dashboard

A responsive weather dashboard that shows current weather and a 5-day forecast for any city. It includes a live clock and recently searched cities for quick access.

## Features

- Current weather with temperature, wind speed, humidity, and condition.
- 5-day weather forecast with detailed metrics.
- Live clock with time and AM/PM format.
- Search for the weather by city name.
- Use your current location to fetch weather data.
- Recently searched cities dropdown.

## Setup Instructions
### Don't forget to replace the API_KEY in the config.example.js file with your OPENWEATHER API KEY.
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
2. Update config.js with your OpenWeatherMap API key:
   ```bash
   export const API_KEY = "your_openweather_api_key";
   export const API_URL = "https://api.openweathermap.org/data/2.5/";
   export const API_IMAGE_URL = "https://openweathermap.org/img/wn";

4. Open index.html with a live server, as this is bound under the CORS Policy. Opening with a live server will help you access the project, which will function seamlessly.

## Technologies Used
* HTML, CSS (Tailwind CSS), JavaScript
* OpenWeatherMap API
* Geolocation API
