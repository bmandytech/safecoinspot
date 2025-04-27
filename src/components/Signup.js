import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';  // Assuming you already have this context
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // for navigation after successful signup

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);  // for error handling
  const navigate = useNavigate();  // for redirecting to login or dashboard

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the signup request to the backend
      const response = await axios.post('http://localhost:5000/api/signup', { email, password });

      // If signup is successful, navigate to login page
      if (response.status === 201) {
        alert('Signup successful! Please log in.');
        navigate('/login');  // Redirect to login page after successful signup
      }
    } catch (error) {
      // Handle errors here
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);  // Show message if user exists
      } else {
        setError('Error signing up. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Create Account</h2>
        
        {/* Show error message if exists */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md">Sign Up</button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500">Already have an account? </span>
          <a href="/login" className="text-blue-500">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;