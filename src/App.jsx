import React from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import WeatherApp from "./components/WeatherApp";
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

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  if (isLoading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        {error && <p className="text-red-500">Error: {error.message}</p>}
        <button
          onClick={signup}
          className="bg-blue-500 text-white px-4 py-2 rounded m-2"
        >
          Signup
        </button>
        <button
          onClick={login}
          className="bg-green-500 text-white px-4 py-2 rounded m-2"
        >
          Login
        </button>
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
