import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '895284fb2d2c50a520ea537456963d9c';

  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) {
      return 'https://cdn-icons-png.flaticon.com/512/1779/1779927.png'; // thunderstorm
    } else if (weatherId >= 300 && weatherId < 500) {
      return 'https://cdn-icons-png.flaticon.com/512/1779/1779940.png'; // drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
      return 'https://cdn-icons-png.flaticon.com/512/1779/1779940.png'; // rain
    } else if (weatherId >= 600 && weatherId < 700) {
      return 'https://cdn-icons-png.flaticon.com/512/1779/1779937.png'; // snow
    } else if (weatherId >= 700 && weatherId < 800) {
      return 'https://cdn-icons-png.flaticon.com/512/1779/1779938.png'; // mist
    } else if (weatherId === 800) {
      return 'https://cdn-icons-png.flaticon.com/512/1779/1779931.png'; // clear
    } else {
      return 'https://cdn-icons-png.flaticon.com/512/1779/1779935.png'; // clouds
    }
  };

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod === '404') {
        setError('City not found. Please try again.');
        setWeatherData(null);
        return;
      }

      setWeatherData(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  const convertToFahrenheit = (temp) => {
    return Math.round(temp);
  };

  return (
    <div className="app">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={fetchWeather}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/954/954591.png" 
            alt="search"
            className="search-icon"
          />
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {weatherData && (
        <div className="weather-container">
          <div className="weather-info">
            <img
              src={getWeatherIcon(weatherData.weather[0].id)}
              alt={weatherData.weather[0].main}
              className="weather-icon"
            />
            <h1>{convertToFahrenheit(weatherData.main.temp)}°F</h1>
            <h2>{weatherData.name}</h2>
            <p className="weather-description">
              {weatherData.weather[0].description}
            </p>
          </div>

          <div className="weather-details">
            <div className="detail-box">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/1779/1779945.png" 
                alt="humidity" 
                className="detail-icon"
              />
              <div className="detail-info">
                <p className="detail-value">{weatherData.main.humidity}%</p>
                <p className="detail-label">Humidity</p>
              </div>
            </div>

            <div className="detail-box">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/1779/1779943.png" 
                alt="wind" 
                className="detail-icon"
              />
              <div className="detail-info">
                <p className="detail-value">{Math.round(weatherData.wind.speed)} mph</p>
                <p className="detail-label">Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;