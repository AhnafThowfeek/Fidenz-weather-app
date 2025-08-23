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
      console.error('Error fetching weather data for city:', error.response?.data || error.message);
      throw error;
    }
  }
}

export const weatherService = new WeatherService();
