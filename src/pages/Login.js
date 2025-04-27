import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';  // Add ReCAPTCHA component

const Login = ({ recaptchaEnabled }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [biometricError, setBiometricError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (recaptchaEnabled && !recaptchaToken) {
      setError('Please complete the reCAPTCHA');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, recaptchaToken }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('authToken', data.token);
        navigate('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  // Function to handle biometric login (face scan/fingerprint)
  const handleBiometricLogin = async () => {
    try {
      // For demonstration, this would interact with the WebAuthn API or your biometric solution.
      const bioLoginResponse = await fetch('http://localhost:5000/api/biometric-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send the necessary biometric data (e.g., face scan or fingerprint)
        body: JSON.stringify({ biometricData: 'example-data' }),
      });

      const data = await bioLoginResponse.json();

      if (data.success) {
        localStorage.setItem('authToken', data.token);
        navigate('/profile');
      } else {
        setBiometricError('Biometric authentication failed.');
      }
    } catch (err) {
      setBiometricError('An error occurred with biometric authentication.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form className="bg-gray-800 p-8 rounded-lg shadow-lg w-96" onSubmit={handleLogin}>
        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Login</h2>
        
        {/* Email and password input fields */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {/* Error messages */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {biometricError && <p className="text-red-500 text-sm mb-4">{biometricError}</p>}

        {/* Conditionally render reCAPTCHA */}
        {recaptchaEnabled && (
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={(token) => setRecaptchaToken(token)}
          />
        )}

        {/* Login button */}
        <button type="submit" className="w-full bg-yellow-500 text-gray-900 p-3 rounded">
          Login
        </button>
        
        {/* Biometric login button */}
        <button
          type="button"
          onClick={handleBiometricLogin}
          className="w-full mt-4 bg-blue-500 text-white p-3 rounded"
        >
          Login with Biometric Authentication
        </button>
      </form>
    </div>
  );
};

export default Login;