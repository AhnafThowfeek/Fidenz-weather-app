// Enhanced src/services/weatherService.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

if (!API_KEY) {
  console.error('Error: OpenWeather API key is missing. Please check your .env file.');
}

class WeatherService {
  // Enhanced method to get weather for multiple cities by IDs
  async getWeatherForCities(cityIds) {
    const cacheKey = cityIds.join(',');
    const cachedData = cache.get(cacheKey);
    
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return cachedData.data;
    }

    try {
      const response = await axios.get(`${BASE_URL}/group`, {
        params: {
          id: cityIds.join(','),
          units: 'metric',
          appid: API_KEY,
        },
      });

      const weatherData = response.data.list;
      cache.set(cacheKey, { data: weatherData, timestamp: Date.now() });

      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error.response?.data || error.message);
      throw error;
    }
  }

  // Get weather for a single city by name
  async getWeatherByCity(cityName) {
    const cacheKey = `city_${cityName}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return cachedData.data;
    }

    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: cityName,
          units: 'metric',
          appid: API_KEY,
        },
      });

      const weatherData = response.data;
      cache.set(cacheKey, { data: weatherData, timestamp: Date.now() });

      return weatherData;
    } catch (error) {
      console.error(`Error fetching weather data for ${cityName}:`, error.response?.data || error.message);
      throw error;
    }
  }

  // New method: Get weather for all predefined cities using batch API
  async getAllCitiesWeather() {
    // City IDs from your JSON data
    const cityIds = [1248991, 1850147, 2644210, 2988507, 2147714, 4930956, 1796236, 3143244];
    
    try {
      return await this.getWeatherForCities(cityIds);
    } catch (error) {
      // Fallback: fetch cities individually if batch fails
      console.warn('Batch fetch failed, falling back to individual requests');
      const cityNames = ['Colombo', 'Tokyo', 'Liverpool', 'Paris', 'Sydney', 'Boston', 'Shanghai', 'Oslo'];
      
      const promises = cityNames.map(async (cityName) => {
        try {
          return await this.getWeatherByCity(cityName);
        } catch (err) {
          console.warn(`Failed to fetch weather for ${cityName}:`, err.message);
          return null;
        }
      });

      const results = await Promise.all(promises);
      return results.filter(result => result !== null);
    }
  }

  // Clear cache method
  clearCache() {
    cache.clear();
  }

  // Get cache statistics
  getCacheStats() {
    return {
      size: cache.size,
      keys: Array.from(cache.keys())
    };
  }
}

export const weatherService = new WeatherService();