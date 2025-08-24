// Updated src/components/WeatherDashboard.jsx - Exact UI match
import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import CityDetailView from './CityDetailView';
import LoadingSpinner from './LoadingSpinner';
import { weatherService } from '../services/weatherService';
import { Search, Plus } from 'lucide-react';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // All 8 cities from your JSON data
  const allCities = [
    'Colombo',
    'Tokyo', 
    'Liverpool',
    'Paris',
    'Sydney',
    'Boston',
    'Shanghai',
    'Oslo'
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        const promises = allCities.map(city => weatherService.getWeatherByCity(city));
        const results = await Promise.allSettled(promises);

        const successfulResults = results
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value);

        setWeatherData(successfulResults);
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

  const handleCityClick = (weather) => {
    setSelectedCity(weather);
  };

  const handleBackClick = () => {
    setSelectedCity(null);
  };

  const handleAddCity = () => {
    // Handle adding city functionality
    if (searchTerm.trim()) {
      console.log('Add city:', searchTerm);
      setSearchTerm('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCity();
    }
  };

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

  // Show detailed view if a city is selected
  if (selectedCity) {
    return (
      <CityDetailView 
        weather={selectedCity} 
        onBack={handleBackClick}
      />
    );
  }

  // Show dashboard with exact UI match
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Header with logo */}
      <div className="flex items-center justify-center mb-8">
        <div className="text-3xl mr-3">🌤️</div>
        <h1 className="text-3xl font-bold text-white">Weather App</h1>
      </div>

     

      {/* Weather cards in 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {weatherData.map((weather, index) => (
          <WeatherCard 
            key={weather.id} 
            weather={weather} 
            onClick={handleCityClick}
            cardIndex={index}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center mt-12">
        <p className="text-blue-200 text-sm">2021 Fidenz Technologies</p>
      </footer>
    </div>
  );
};

export default WeatherDashboard;