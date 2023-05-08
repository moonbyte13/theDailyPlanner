import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    // your login logic here
    history.push('/dashboard');
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log('Google Login successful:', response);
    console.log('history:', history);
    // handle the response from the Google API here
    // for example, you can use the Google API access token to access the user's calendar
  
    // Redirect to the Dashboard component
    history.push('/dashboard');
  };
  

  const handleGoogleLoginFailure = (response) => {
    console.log(response);
    // handle the login failure here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-lg" onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-6">
          <button type="submit" className="w-full py-2 px-4 rounded-lg text-white bg-blue-500 hover:bg-blue-600">
            Login
          </button>
        </div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy={'single_host_origin'}
        />
      </form>
    </div>
  );
}

export default LoginPage;
