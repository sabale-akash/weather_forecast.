import React, { useState } from 'react';

const API_KEY = 'a4e61765764b429f9b3477d99a2e034f';

const WeatherForecast = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
      const data = await response.json();
      setForecast(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch weather data');
      setForecast(null);
    }
  };

  const getIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/w/${iconCode}.png`;
  };

  const formatTemperature = (temperature) => {
    return `${Math.round(temperature)}°C`;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="weather-forecast-container">
      <div className="background"></div>
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span className="sr-only">Enter a city</span>
          <input type="text" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Enter a city" />
        </label>
        <button type="submit">Get Forecast</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {forecast && (
        <div className="forecast-card">
          <h2>{forecast.city.name}, {forecast.city.country}</h2>
          <div className="current-weather">
            <img src={getIconUrl(forecast.list[0].weather[0].icon)} alt={forecast.list[0].weather[0].description} />
            <p>{formatTemperature(forecast.list[0].main.temp)}</p>
            <p>{forecast.list[0].weather[0].description}</p>
          </div>
          <div className="five-day-forecast">
            {forecast.list.slice(1, 6).map((item) => (
              <div key={item.dt} className="forecast-item">
                <p className="date">{formatDate(item.dt)}</p>
                <img src={getIconUrl(item.weather[0].icon)} alt={item.weather[0].description} />
                <p className="temperature">{formatTemperature(item.main.temp)}</p>
                <p className="description">{item.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
