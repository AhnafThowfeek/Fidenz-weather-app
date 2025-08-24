// Updated src/components/WeatherCard.jsx - Exact UI match
import React from 'react';
import { format } from 'date-fns';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Zap,
  Eye,
  Droplets,
  Gauge,
  Wind,
  Sunrise,
  Sunset,
  X,
  Navigation,
  Snowflake
} from 'lucide-react';

const WeatherCard = ({ weather, onClick, cardIndex = 0 }) => {
  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('clear')) return <Sun className="text-white" size={32} />;
    if (conditionLower.includes('cloud') && conditionLower.includes('few')) return <Cloud className="text-white" size={32} />;
    if (conditionLower.includes('cloud') && conditionLower.includes('broken')) return <Cloud className="text-white" size={32} />;
    if (conditionLower.includes('rain')) return <CloudRain className="text-white" size={32} />;
    if (conditionLower.includes('snow')) return <CloudSnow className="text-white" size={32} />;
    if (conditionLower.includes('mist')) return <Cloud className="text-white" size={32} />;
    if (conditionLower.includes('thunder')) return <Zap className="text-white" size={32} />;
    
    return <Cloud className="text-white" size={32} />;
  };

  const getCardColors = (cityName, condition, temp) => {
    // Predefined colors for each city to match your screenshots
    const cityColors = {
      'Colombo': 'from-blue-400 to-blue-600',
      'Tokyo': 'from-purple-500 to-purple-700', 
      'Liverpool': 'from-green-400 to-green-600',
      'Sydney': 'from-orange-400 to-orange-600',
      'Boston': 'from-red-400 to-red-600',
      'Shanghai': 'from-teal-400 to-teal-600',
      'Oslo': 'from-indigo-400 to-indigo-600',
      'Paris': 'from-pink-400 to-pink-600'
    };

    return cityColors[cityName] || 'from-blue-400 to-blue-600';
  };

  const formatTime = (timestamp) => {
    return format(new Date(timestamp * 1000), 'h:mmaaa');
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(weather);
    }
  };

  const getWeatherIconName = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('clear')) return '☀️';
    if (conditionLower.includes('cloud') && conditionLower.includes('few')) return '⛅';
    if (conditionLower.includes('cloud') && conditionLower.includes('broken')) return '☁️';
    if (conditionLower.includes('rain')) return '🌧️';
    if (conditionLower.includes('snow')) return '❄️';
    if (conditionLower.includes('mist')) return '🌫️';
    if (conditionLower.includes('thunder')) return '⛈️';
    return '☁️';
  };

  return (
    <div className="relative">
      {/* X button */}
      <button className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors">
        <X size={20} />
      </button>

      {/* Main card */}
      <div 
        className={`bg-gradient-to-br ${getCardColors(weather.name, weather.weather[0].description, weather.main.temp)} rounded-2xl p-6 text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
        onClick={handleCardClick}
      >
        {/* City header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold">{weather.name}, {weather.sys.country}</h2>
          <p className="text-blue-100 text-sm opacity-90">
            {format(new Date(), 'h:mmaaa, MMM d')}
          </p>
        </div>

        {/* Weather display */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <span className="text-4xl mr-3">{getWeatherIconName(weather.weather[0].description)}</span>
            <span className="text-lg capitalize opacity-90">{weather.weather[0].description}</span>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</div>
            <div className="text-sm opacity-90 mt-1">
              <p>Temp Min: {Math.round(weather.main.temp_min)}°C</p>
              <p>Temp Max: {Math.round(weather.main.temp_max)}°C</p>
            </div>
          </div>
        </div>
      </div>

      {/* Details section - outside the colored card */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-b-2xl p-4 -mt-2 pt-6">
        <div className="grid grid-cols-3 gap-4 text-sm text-white">
          <div>
            <p className="opacity-75">Pressure: <span className="font-medium">{weather.main.pressure}hPa</span></p>
            <p className="opacity-75">Humidity: <span className="font-medium">{weather.main.humidity}%</span></p>
            <p className="opacity-75">Visibility: <span className="font-medium">{(weather.visibility / 1000).toFixed(1)}km</span></p>
          </div>
          <div className="flex items-center justify-center">
            <Navigation size={24} className="text-blue-300 mr-2" />
            <div className="text-center">
              <p className="font-medium">{weather.wind?.speed || 0}m/s</p>
              <p className="text-xs opacity-75">{weather.wind?.deg || 0} Degree</p>
            </div>
          </div>
          <div>
            <p className="opacity-75">Sunrise: <span className="font-medium">{formatTime(weather.sys.sunrise)}</span></p>
            <p className="opacity-75">Sunset: <span className="font-medium">{formatTime(weather.sys.sunset)}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;