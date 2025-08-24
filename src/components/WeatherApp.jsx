import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import WeatherDashboard from './WeatherDashboard';
import LoadingSpinner from './LoadingSpinner';

const WeatherApp = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="weather-bg">
      <div className="container mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="text-6xl mr-4">🌤️</div>
                <h1 className="text-4xl md:text-6xl font-bold text-white">Weather App</h1>
              </div>
              <p className="text-xl text-blue-100 mb-8">Please login to access weather information</p>
              <LoginButton />
            </div>
          </div>
        ) : (
          <div>
            <header className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white hidden md:block">Welcome, {user?.email}</span>
                <LogoutButton />
              </div>
            </header>
            <WeatherDashboard />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;