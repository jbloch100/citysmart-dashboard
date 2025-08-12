import React from 'react';
import WeatherWidget from '../components/WeatherWidget';
import NewsWidget from '../components/NewsWidget';

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <h1>CitySmart Dashboard</h1>
      <div className="widgets">
        <WeatherWidget />
        <NewsWidget />
      </div>
    </div>
  );
};

export default DashboardPage;
