import React, { useEffect, useState } from 'react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=43.7&longitude=-79.42&current_weather=true`);
        const data = await res.json();
        setWeather(data.current_weather);
      } catch (err) {
        console.error('Error fetching weather:', err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="widget">
      <h2>Weather</h2>
      {weather ? (
        <div>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Windspeed: {weather.windspeed} km/h</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
