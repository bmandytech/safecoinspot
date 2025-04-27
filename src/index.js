import React from 'react';
import ReactDOM from 'react-dom'; // Changed to match React 17 import
import App from './App'; // Ensure App.js is properly named with capital 'A'
import './styles/tailwind.css'; // Import Tailwind CSS
import {disableReactDevTools} from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production ') disableReactDevTools()

// Create a root element and render the App component
const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);