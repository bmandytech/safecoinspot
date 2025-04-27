// src/components/WithdrawForm.js

import React, { useState } from 'react';
import axios from 'axios';

const WithdrawForm = ({ selectedCoin, setWithdrawAmount, withdrawAmount }) => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state for the withdrawal process
  const [error, setError] = useState('');  // Error state to handle any errors
  const [success, setSuccess] = useState('');  // Success state to show a success message

  // Basic validation for form fields
  const validateForm = () => {
    if (!withdrawAmount || withdrawAmount <= 0) {
      setError('Please enter a valid amount');
      return false;
    }
    if (!recipientAddress) {
      setError('Please enter a recipient address');
      return false;
    }
    setError('');  // Clear error if all fields are valid
    return true;
  };

  const handleWithdraw = async () => {
    if (!validateForm()) return;  // Only proceed if validation passes

    setLoading(true);  // Set loading state to true

    try {
      const response = await axios.post(`/api/wallets/withdraw`, {
        coin: selectedCoin,
        amount: withdrawAmount,
        address: recipientAddress,
      });
      setSuccess(`Withdrawal successful: ${response.data.transactionId}`);
      setWithdrawAmount('');  // Reset withdraw amount after success
      setRecipientAddress('');  // Reset recipient address after success
    } catch (error) {
      console.error('Error withdrawing:', error);
      setError('Withdrawal failed, please try again.');
    } finally {
      setLoading(false);  // Set loading state to false once done
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold">Withdraw {selectedCoin}</h3>

      {/* Withdraw Amount */}
      <input
        type="number"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 mt-2 border border-gray-300 rounded"
        disabled={loading}
      />

      {/* Recipient Address */}
      <input
        type="text"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        placeholder="Recipient Address"
        className="w-full p-2 mt-2 border border-gray-300 rounded"
        disabled={loading}
      />

      {/* Error message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Success message */}
      {success && <p className="text-green-500 mt-2">{success}</p>}

      {/* Submit Button */}
      <button
        onClick={handleWithdraw}
        className="w-full bg-red-500 text-white p-2 rounded mt-4"
        disabled={loading}  // Disable button while loading
      >
        {loading ? 'Processing...' : 'Withdraw'}
      </button>
    </div>
  );
};

export default WithdrawForm;