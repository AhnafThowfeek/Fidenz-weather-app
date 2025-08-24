// Updated src/components/CityDetailView.jsx - Exact UI match
import React from 'react';
import { format } from 'date-fns';
import { 
  ArrowLeft,
  Navigation
} from 'lucide-react';

const CityDetailView = ({ weather, onBack }) => {
  const formatTime = (timestamp) => {
    return format(new Date(timestamp * 1000), 'h:mmaaa');
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
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

  const getCardColors = (cityName) => {
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

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-center mb-8 relative">
        <button 
          onClick={onBack}
          className="absolute left-0 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="text-3xl mr-3">🌤️</div>
        <h1 className="text-3xl font-bold text-white">Weather App</h1>
      </div>

      {/* Main weather card - exact match to your screenshot */}
      <div className="max-w-2xl mx-auto">
        <div className={`bg-gradient-to-br ${getCardColors(weather.name)} rounded-t-3xl p-8 text-white`}>
          {/* City name and date */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">{weather.name}, {weather.sys.country}</h2>
            <p className="text-blue-100 text-lg opacity-90">
              {format(new Date(), 'h:mmaaa, MMM d')}
            </p>
          </div>

          {/* Weather display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-8xl mr-6">{getWeatherIconName(weather.weather[0].description)}</span>
              <span className="text-2xl capitalize">{weather.weather[0].description}</span>
            </div>
            <div className="text-right">
              <div className="text-8xl font-bold mb-2">{Math.round(weather.main.temp)}°C</div>
              <div className="text-lg opacity-90">
                <p>Temp Min: {Math.round(weather.main.temp_min)}°C</p>
                <p>Temp Max: {Math.round(weather.main.temp_max)}°C</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details section */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-b-3xl p-8">
          <div className="grid grid-cols-3 gap-8 text-white">
            {/* Left column */}
            <div className="space-y-4">
              <div>
                <p className="text-gray-300 mb-1">Pressure:</p>
                <p className="text-lg font-medium">{weather.main.pressure}hPa</p>
              </div>
              <div>
                <p className="text-gray-300 mb-1">Humidity:</p>
                <p className="text-lg font-medium">{weather.main.humidity}%</p>
              </div>
              <div>
                <p className="text-gray-300 mb-1">Visibility:</p>
                <p className="text-lg font-medium">{(weather.visibility / 1000).toFixed(1)}km</p>
              </div>
            </div>

            {/* Center column - Wind */}
            <div className="flex flex-col items-center justify-center">
              <Navigation size={48} className="text-blue-300 mb-2" />
              <p className="text-xl font-bold">{weather.wind?.speed || 0}m/s</p>
              <p className="text-gray-300">{weather.wind?.deg || 0} Degree</p>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <div>
                <p className="text-gray-300 mb-1">Sunrise:</p>
                <p className="text-lg font-medium">{formatTime(weather.sys.sunrise)}</p>
              </div>
              <div>
                <p className="text-gray-300 mb-1">Sunset:</p>
                <p className="text-lg font-medium">{formatTime(weather.sys.sunset)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-12">
        <p className="text-blue-200 text-sm">2021 Fidenz Technologies</p>
      </footer>
    </div>
  );
};

export default CityDetailView;