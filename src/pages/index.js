import React, { useState } from 'react';
import Card from '../../components/card';

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

      // Filter the forecast data to show only the current weather and next 5 days with 3-hour intervals
      const filteredForecast = data.list.filter((item, index) => {
        // Show the first item (current weather)
        if (index === 0) {
          return true;
        }

        // Show the next 5 days with 3-hour intervals
        const currentDate = new Date(item.dt * 1000);
        const prevDate = new Date(data.list[index - 1].dt * 1000);
        return currentDate.getDate() !== prevDate.getDate() || (currentDate.getHours() % 3 === 0 && prevDate.getHours() % 3 !== 0);
      });

      // Update the forecast state with the filtered data
      setForecast({
        ...data,
        list: filteredForecast,
      });

      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch weather data');
      setForecast(null);
    }
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
            <Card data={forecast}/>
          )}
        </div>
      );
}

export default WeatherForecast;
