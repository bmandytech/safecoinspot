// src/pages/Wallet.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DepositForm from '../components/DepositForm';
import WithdrawForm from '../components/WithdrawForm';

const Wallet = () => {
  const [walletData, setWalletData] = useState(null); // Wallet balances and details
  const [selectedCoin, setSelectedCoin] = useState('BTC'); // Default selected coin
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch wallet balances and transaction history
  useEffect(() => {
    const fetchWalletData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/wallets`);
        setWalletData(response.data);
        setTransactionHistory(response.data.transactions);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  // Handle coin selection change
  const handleCoinSelection = (e) => {
    setSelectedCoin(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Wallet</h2>

      {loading ? (
        <p>Loading wallet data...</p>
      ) : (
        <div>
          {/* Display wallet balance for the selected coin */}
          <div className="mb-8 p-4 border border-gray-300 rounded">
            <h3 className="text-2xl font-semibold">Balance</h3>
            <div className="flex justify-between">
              <p>Selected Coin: {selectedCoin}</p>
              <p>
                {walletData ? (
                  <>
                    <strong>{walletData[selectedCoin].balance}</strong> {selectedCoin}
                  </>
                ) : (
                  '0'
                )}
              </p>
            </div>
          </div>

          {/* Coin Selection Dropdown */}
          <div className="mb-8">
            <label htmlFor="coin-select" className="text-lg font-semibold">
              Select Coin:
            </label>
            <select
              id="coin-select"
              value={selectedCoin}
              onChange={handleCoinSelection}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
            >
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">Tether (USDT)</option>
              {/* Add more coins here */}
            </select>
          </div>

          {/* Deposit Section */}
          <DepositForm coin={selectedCoin} />

          {/* Withdraw Section */}
          <WithdrawForm
            selectedCoin={selectedCoin}
            setWithdrawAmount={setWithdrawAmount}
            withdrawAmount={withdrawAmount}
          />

          {/* Transaction History Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold">Transaction History</h3>
            {transactionHistory.length > 0 ? (
              <ul>
                {transactionHistory.map((transaction) => (
                  <li key={transaction.id} className="p-2 border-b border-gray-300">
                    <p>Transaction ID: {transaction.id}</p>
                    <p>
                      Amount: {transaction.amount} {transaction.coin}
                    </p>
                    <p>Status: {transaction.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transactions found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;