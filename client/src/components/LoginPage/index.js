import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function LoginPage() {
  const history = useHistory();
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [error, setError] = useState(null);

  const handleCredentialResponse = useCallback((response) => {
    console.log('Google Login successful. ID token:', response.credential);
    
    // Get the user's information from the JWT token
    const decodedToken = jwtDecode(response.credential);
    const user = {
      name: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture,
    };
    
    console.log('User information:', user);
    localStorage.setItem('user', JSON.stringify(user));
    
    history.push('/dashboard');
    window.location.reload();
  }, [history]);
  

  useEffect(() => {
    let checkGapiInterval;

    const onGoogleApiLoad = async () => {
      try {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: true,
          prompt_parent_id: 'g_id_signin'
        });

        console.log('Google API client initialized');
        setGapiLoaded(true);
      } catch (error) {
        console.error('Failed to initialize Google API client:', error);
        setError('Failed to initialize Google API client: ' + error.message);
      }
    };

    if (window.google && window.google.accounts) {
      onGoogleApiLoad();
    } else {
      checkGapiInterval = setInterval(() => {
        if (window.google && window.google.accounts) {
          clearInterval(checkGapiInterval);
          onGoogleApiLoad();
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(checkGapiInterval);
        if (!gapiLoaded) {
          setError('Google API client library failed to load within the expected time. Check your network connection and make sure the script is included in your HTML file.');
        }
      }, 10000);
    }

    return () => {
      if (checkGapiInterval) {
        clearInterval(checkGapiInterval);
      }
    };
  }, [gapiLoaded, handleCredentialResponse]);

  useEffect(() => {
    if (gapiLoaded) {
      console.log('Rendering Google Sign-In button');
      window.google.accounts.id.renderButton(document.getElementById('g_id_signin'), {
        theme: 'outline',
        size: 'large'
      });
    }
  }, [gapiLoaded]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!gapiLoaded) {
    return <div>Loading Google API client...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div id="g_id_signin"></div>
    </div>
  );
}

export default LoginPage;
