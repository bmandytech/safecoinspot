// src/pages/BuyCrypto.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CoinSelector from '../components/CoinSelector';
import RateDisplay from '../components/RateDisplay';
import FeeCalculator from '../components/FeeCalculator';
import TransactionSummary from '../components/TransactionSummary';
import Chat from '../components/Chat';
import EscrowStatus from '../components/EscrowStatus';
import axios from 'axios';

const BuyCrypto = () => {
  const [coinType, setCoinType] = useState('BTC'); // Default coin type
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(null);
  const [fee, setFee] = useState(0);
  const [transactionSummary, setTransactionSummary] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [proofOfTransfer, setProofOfTransfer] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [disputeStatus, setDisputeStatus] = useState(null);

  // Simulate fetching live rates (replace with your API or service)
  useEffect(() => {
    const fetchRate = async () => {
      const fetchedRate = 50000; // Example rate, replace with real API logic
      setRate(fetchedRate);
    };

    fetchRate();
  }, [coinType]);

  // Handle form submission (e.g., initiate the transaction)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const calculatedFee = calculateFee(amount);
    setFee(calculatedFee);

    // Call API to create transaction or escrow
    const response = await axios.post('/api/create-transaction', {
      coinType,
      amount,
      rate,
      fee: calculatedFee,
    });

    setTransactionSummary({
      coinType,
      amount,
      rate,
      fee: calculatedFee,
      totalAmount: amount * rate + calculatedFee,
      transactionId: response.data.transactionId,
    });

    // Set initial payment status to "pending"
    setPaymentStatus('pending');
  };

  // Function to calculate fees (simple example, replace with actual logic)
  const calculateFee = (amount) => {
    return amount * 0.02; // 2% fee
  };

  // Function to handle proof of transfer upload
  const handleProofUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate file upload process
      setProofOfTransfer(file);
      alert('Proof of transfer uploaded!');
    }
  };

  // Function to handle dispute
  const handleDispute = async () => {
    // Simulate dispute process
    const response = await axios.post('/api/handle-dispute', {
      transactionId: transactionSummary.transactionId,
    });
    setDisputeStatus(response.data.status);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Buy Crypto</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CoinSelector coinType={coinType} setCoinType={setCoinType} />
        <RateDisplay rate={rate} />
        <FeeCalculator amount={amount} setAmount={setAmount} calculateFee={calculateFee} />
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Initiate Transaction
        </button>
      </form>

      {transactionSummary && (
        <TransactionSummary summary={transactionSummary} />
      )}

      {/* Payment Proof Upload Section */}
      {paymentStatus === 'pending' && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Upload Proof of Transfer</h3>
          <input 
            type="file" 
            onChange={handleProofUpload} 
            className="mt-2 p-2 border border-gray-300 rounded" 
          />
        </div>
      )}

      {/* Display Escrow Status */}
      {paymentStatus === 'pending' && (
        <EscrowStatus 
          paymentStatus={paymentStatus} 
          setPaymentStatus={setPaymentStatus} 
        />
      )}

      {/* Chat Interface */}
      <Chat 
        messages={chatMessages} 
        setMessages={setChatMessages} 
        transactionId={transactionSummary ? transactionSummary.transactionId : null} 
      />

      {/* Dispute Handling */}
      <div className="mt-8">
        {disputeStatus ? (
          <p className="text-red-500">{disputeStatus}</p>
        ) : (
          <button 
            onClick={handleDispute} 
            className="w-full bg-red-500 text-white p-2 rounded mt-4"
          >
            Raise a Dispute
          </button>
        )}
      </div>

      <div className="mt-8">
        <Link to="/wallet" className="text-blue-500">
          Go to Wallet
        </Link>
      </div>
    </div>
  );
};

export default BuyCrypto;