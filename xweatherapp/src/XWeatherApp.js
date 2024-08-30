
import React, { useState } from 'react';

const XWeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setLoading(true);
    setError(null);
    setWeatherData(null); 

    fetch(`https://api.weatherapi.com/v1/current.json?key=a8bb63fb965140a6958123546243004&q=${city}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => {
        alert('Failed to fetch weather data');
        setError('Failed to fetch weather data');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={`${error ? 'error' : ''}`}>
      <div className="input-container">
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city name" 
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p className="loading-message">Loading data...</p>}

      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default XWeatherApp;