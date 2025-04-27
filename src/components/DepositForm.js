// src/components/DepositForm.js
import React, { useState } from 'react';
import axios from 'axios';

const DepositForm = ({ coin }) => {
  const [depositAmount, setDepositAmount] = useState('');

  const handleDeposit = async () => {
    try {
      const response = await axios.post(`/api/wallets/deposit`, {
        coin,
        amount: depositAmount,
      });
      alert(`Deposit successful: ${response.data.transactionId}`);
    } catch (error) {
      console.error('Error depositing:', error);
      alert('Deposit failed');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold">Deposit {coin}</h3>
      <input
        type="number"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 mt-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleDeposit}
        className="w-full bg-blue-500 text-white p-2 rounded mt-4"
      >
        Deposit
      </button>
    </div>
  );
};

export default DepositForm;