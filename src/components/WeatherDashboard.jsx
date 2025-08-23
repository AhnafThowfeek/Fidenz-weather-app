import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import LoadingSpinner from './LoadingSpinner';
import { weatherService } from '../services/weatherService';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultCities = ['Colombo', 'Tokyo', 'Liverpool', 'Sydney', 'Boston'];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch each city individually
        const promises = defaultCities.map(city => weatherService.getWeatherByCity(city));
        const results = await Promise.all(promises);

        setWeatherData(results);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError(err.response?.data?.message || 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();

    // Refresh every 5 minutes
    const interval = setInterval(fetchWeatherData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-blue-100">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {weatherData.map(weather => (
          <WeatherCard key={weather.id} weather={weather} />
        ))}
      </div>

      <footer className="text-center mt-12">
        <p className="text-blue-200 text-sm">2021 Fidenz Technologies</p>
      </footer>
    </div>
  );
};

export default WeatherDashboard;
