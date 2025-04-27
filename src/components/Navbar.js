// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-darkBg p-4 flex justify-between items-center">
      <div className="text-binance text-2xl">Crypto App</div>
      <div>
        <Link to="/" className="text-white px-4 py-2">Home</Link>
        <Link to="/wallet" className="text-white px-4 py-2">Wallet</Link>
        <Link to="/transactions" className="text-white px-4 py-2">Transactions</Link>
      </div>
    </nav>
  );
};

export default Navbar;