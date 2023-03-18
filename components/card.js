import React from 'react'

const Card = (props) => {
    const{data}=props;

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
    <div className="forecast-card">
    <h2>{data.city.name}, {data.city.country}</h2>
    <div className="current-weather">
      <img src={getIconUrl(data.list[0].weather[0].icon)} alt={data.list[0].weather[0].description} />
      <p>{formatTemperature(data.list[0].main.temp)}</p>
      <p>{data.list[0].weather[0].description}</p>
    </div>
    <div className="five-day-forecast">
      {data.list.slice(1, 6).map((item) => (
        <div key={item.dt} className="forecast-item">
          <p className="date">{formatDate(item.dt)}</p>
          <img src={getIconUrl(item.weather[0].icon)} alt={item.weather[0].description} />
          <p className="temperature">{formatTemperature(item.main.temp)}</p>
          <p className="description">{item.weather[0].description}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Card