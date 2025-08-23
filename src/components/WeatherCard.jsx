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
  X 
} from 'lucide-react';

const WeatherCard = ({ weather, isExpanded = false, onClose }) => {
  const getWeatherIcon = (condition) => {
    const iconMap = {
      'clear sky': Sun,
      'few clouds': Cloud,
      'scattered clouds': Cloud,
      'broken clouds': Cloud,
      'overcast clouds': Cloud,
      'light rain': CloudRain,
      'moderate rain': CloudRain,
      'heavy rain': CloudRain,
      'rain': CloudRain,
      'light snow': CloudSnow,
      'snow': CloudSnow,
      'thunderstorm': Zap,
      'mist': Cloud,
      'fog': Cloud,
    };
    
    const IconComponent = iconMap[condition.toLowerCase()] || Cloud;
    return <IconComponent className="text-white" size={isExpanded ? 64 : 48} />;
  };

  const getCardColor = (condition, temp) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('rain')) return 'from-blue-500 to-blue-700';
    if (conditionLower.includes('snow')) return 'from-blue-300 to-blue-500';
    if (conditionLower.includes('thunder')) return 'from-purple-600 to-purple-800';
    if (conditionLower.includes('clear')) {
      return temp > 25 ? 'from-orange-400 to-red-500' : 'from-yellow-400 to-orange-500';
    }
    if (conditionLower.includes('cloud')) return 'from-gray-500 to-gray-700';
    if (conditionLower.includes('mist') || conditionLower.includes('fog')) return 'from-gray-400 to-gray-600';
    
    // Temperature-based fallback
    if (temp > 30) return 'from-red-500 to-red-700';
    if (temp > 20) return 'from-orange-400 to-orange-600';
    if (temp > 10) return 'from-green-400 to-green-600';
    return 'from-blue-400 to-blue-600';
  };

  const formatTime = (timestamp) => {
    return format(new Date(timestamp * 1000), 'h:mmaaa');
  };

  return (
    <div className={`weather-card rounded-2xl p-6 text-white transition-all duration-300 hover:scale-105 animate-slide-up ${
      isExpanded ? 'max-w-lg' : ''
    }`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">{weather.name}</h2>
          <p className="text-blue-100 text-sm">
            {format(new Date(), 'h:mmaaa, MMM d')}
          </p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X size={24} />
          </button>
        )}
      </div>

      {/* Main weather display */}
      <div className={`bg-gradient-to-br ${getCardColor(weather.weather[0].description, weather.main.temp)} rounded-xl p-6 mb-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getWeatherIcon(weather.weather[0].description)}
            <div className="ml-4">
              <p className="text-lg capitalize">{weather.weather[0].description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl md:text-5xl font-bold">{Math.round(weather.main.temp)}°C</div>
            <div className="text-sm">
              <p>Min: {Math.round(weather.main.temp_min)}°C</p>
              <p>Max: {Math.round(weather.main.temp_max)}°C</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weather details grid */}
      <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <Gauge size={20} className="mx-auto mb-1 text-blue-300" />
            <p className="font-medium">Pressure</p>
            <p>{weather.main.pressure}hPa</p>
          </div>
          <div className="text-center">
            <Wind size={20} className="mx-auto mb-1 text-blue-300" />
            <p className="font-medium">Wind</p>
            <p>{weather.wind?.speed || 0}m/s {weather.wind?.deg || 0}°</p>
          </div>
          <div className="text-center">
            <Sunrise size={20} className="mx-auto mb-1 text-blue-300" />
            <p className="font-medium">Sunrise</p>
            <p>{formatTime(weather.sys.sunrise)}</p>
          </div>
          <div className="text-center">
            <Droplets size={20} className="mx-auto mb-1 text-blue-300" />
            <p className="font-medium">Humidity</p>
            <p>{weather.main.humidity}%</p>
          </div>
          <div className="text-center">
            <Eye size={20} className="mx-auto mb-1 text-blue-300" />
            <p className="font-medium">Visibility</p>
            <p>{(weather.visibility / 1000).toFixed(1)}km</p>
          </div>
          <div className="text-center">
            <Sunset size={20} className="mx-auto mb-1 text-blue-300" />
            <p className="font-medium">Sunset</p>
            <p>{formatTime(weather.sys.sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;