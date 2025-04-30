import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyCrypto from './pages/BuyCrypto';  // BuyCrypto page
import Navbar from './components/Navbar';  // Navbar component
import Wallet from './pages/Wallet';  // Wallet page
import Transactions from './pages/Transactions';  // Transactions page
import Login from './pages/Login';  // Login page
import Signup from './pages/Signup';  // Signup page
import Profile from './pages/Profile';  // Profile page (only accessible after login)
import Market from './pages/Market';  // Market page
import Support from './pages/Support';  // Support page
import PrivateRoute from './components/PrivateRoute';  // PrivateRoute component for protected pages

const App = () => {
  const [recaptchaEnabled, setRecaptchaEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching reCAPTCHA status from the backend or environment
  useEffect(() => {
    const fetchRecaptchaStatus = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'https://safecoinspot-api.onrender.com/api/get-recaptcha-status';
        const response = await fetch(apiUrl);
        const data = await response.json();
        setRecaptchaEnabled(data.recaptchaEnabled);  // Assume response contains recaptchaEnabled flag
      } catch (err) {
        setError('Failed to fetch reCAPTCHA status. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecaptchaStatus();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-darkBg text-white">
        <Navbar />  {/* Navbar visible on all pages */}
        <div className="p-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Routes>
              <Route path="/" element={<BuyCrypto />} />  {/* Default route */}
              <Route path="/wallet" element={<Wallet />} />  {/* Wallet page route */}
              <Route path="/transactions" element={<Transactions />} />  {/* Transactions page route */}
              
              {/* Pass recaptchaEnabled as prop to Login and Signup */}
              <Route 
                path="/login" 
                element={<Login recaptchaEnabled={recaptchaEnabled} />} 
              />  {/* Login page route */}
              
              <Route 
                path="/signup" 
                element={<Signup recaptchaEnabled={recaptchaEnabled} />} 
              />  {/* Signup page route */}
              
              <Route path="/market" element={<Market />} />  {/* Market page route */}
              <Route path="/support" element={<Support />} />  {/* Support page route */}
              
              {/* Private route for Profile page, only accessible after login */}
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } 
              />
            </Routes>
          )}
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </div>
    </Router>
  );
};

export default App;