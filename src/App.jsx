import React, { useState } from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import WeatherApp from "./components/WeatherApp";
import { Copy, Eye, EyeOff } from "lucide-react";
import "./index.css";

function AuthWrapper() {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect: login,
    logout: auth0Logout,
    user,
  } = useAuth0();

  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const demoCredentials = {
    email: "careers@fidenz.com",
    password: "Pass#fidenz"
  };

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="text-6xl mr-4">🌤️</div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">Weather App</h1>
          </div>
          <p className="text-xl text-blue-600 mb-8">Get real-time weather information for cities worldwide</p>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-6 max-w-md">
            <p className="text-sm">Error: {error.message}</p>
          </div>
        )}

        
        <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-2xl p-6 mb-8 max-w-md w-full">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">🎭 Demo Account</h3>
            <p className="text-blue-600 text-sm opacity-90">
              Use these credentials to try the app without creating an account
            </p>
          </div>
          
          <div className="space-y-4">
           
            <div>
              <label className="block text-blue-600 text-sm font-medium mb-2">Email:</label>
              <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-2">
                <input
                  type="text"
                  value={demoCredentials.email}
                  readOnly
                  className="flex-1 bg-transparent text-black placeholder-blue-600 border-none outline-none text-sm"
                />
                <button
                  onClick={() => copyToClipboard(demoCredentials.email, 'email')}
                  className="ml-2 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  title="Copy email"
                >
                  {copiedField === 'email' ? (
                    <span className="text-green-300 text-xs">✓</span>
                  ) : (
                    <Copy size={16} className="text-blue-300" />
                  )}
                </button>
              </div>
            </div>

           
            <div>
              <label className="block text-blue-600 text-sm font-medium mb-2">Password:</label>
              <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={demoCredentials.password}
                  readOnly
                  className="flex-1 bg-transparent text-black placeholder-blue-200 border-none outline-none text-sm"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={16} className="text-blue-300" />
                  ) : (
                    <Eye size={16} className="text-blue-300" />
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard(demoCredentials.password, 'password')}
                  className="ml-2 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  title="Copy password"
                >
                  {copiedField === 'password' ? (
                    <span className="text-green-300 text-xs">✓</span>
                  ) : (
                    <Copy size={16} className="text-blue-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={login}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Login
          </button>
          <button
            onClick={signup}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-blue-600 text-sm">
            New users can create their own account or use the demo credentials above
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <WeatherApp />
    </div>
  );
}

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <AuthWrapper />
    </Auth0Provider>
  );
}

export default App;