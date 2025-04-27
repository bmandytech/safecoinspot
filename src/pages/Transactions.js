// src/pages/Transactions.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chat from '../components/Chat';
import ProofUpload from '../components/ProofUpload';
import EscrowStatus from '../components/EscrowStatus';

const Transactions = () => {
  const [transactionId, setTransactionId] = useState(null); // Transaction ID for current trade
  const [transactionDetails, setTransactionDetails] = useState(null); // Store transaction details
  const [paymentStatus, setPaymentStatus] = useState('pending'); // Payment status: 'pending', 'paid', 'completed'
  const [proofOfPayment, setProofOfPayment] = useState(null); // Store proof of payment uploaded by the user
  const [disputeStatus, setDisputeStatus] = useState(null); // Store dispute status if applicable
  const [chatMessages, setChatMessages] = useState([]); // Store chat messages between buyer and seller

  // Function to fetch transaction details from the backend
  useEffect(() => {
    const fetchTransactionDetails = async () => {
      if (!transactionId) return;

      try {
        const response = await axios.get(`/api/transactions/${transactionId}`);
        setTransactionDetails(response.data);
      } catch (error) {
        console.error('Error fetching transaction details:', error);
      }
    };

    fetchTransactionDetails();
  }, [transactionId]);

  // Function to confirm payment
  const confirmPayment = async () => {
    try {
      const response = await axios.post(`/api/transactions/${transactionId}/confirm-payment`, {
        proofOfPayment,
      });

      if (response.data.status === 'success') {
        setPaymentStatus('paid');
        alert('Payment confirmed successfully');
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
      alert('Failed to confirm payment');
    }
  };

  // Function to raise a dispute
  const handleDispute = async () => {
    try {
      const response = await axios.post(`/api/transactions/${transactionId}/raise-dispute`);
      setDisputeStatus(response.data.status);
    } catch (error) {
      console.error('Error raising dispute:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Transaction Details</h2>

      {/* Transaction Information */}
      {transactionDetails ? (
        <div className="mb-8 p-4 border border-gray-300 rounded">
          <h3 className="text-2xl font-semibold">Transaction Summary</h3>
          <p>Transaction ID: {transactionDetails.transactionId}</p>
          <p>Coin Type: {transactionDetails.coinType}</p>
          <p>Amount: {transactionDetails.amount}</p>
          <p>Rate: {transactionDetails.rate}</p>
          <p>Fee: {transactionDetails.fee}</p>
          <p>Total: {transactionDetails.totalAmount}</p>
        </div>
      ) : (
        <p>Loading transaction details...</p>
      )}

      {/* Payment Confirmation Section */}
      {paymentStatus === 'pending' && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Confirm Payment</h3>
          <ProofUpload setProofOfPayment={setProofOfPayment} />
          <button
            onClick={confirmPayment}
            className="w-full bg-green-500 text-white p-2 rounded mt-4"
          >
            Confirm Payment
          </button>
        </div>
      )}

      {/* Escrow Status Section */}
      {paymentStatus === 'paid' && (
        <EscrowStatus transactionId={transactionId} setPaymentStatus={setPaymentStatus} />
      )}

      {/* Dispute Section */}
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

      {/* Chat Interface */}
      <Chat
        messages={chatMessages}
        setMessages={setChatMessages}
        transactionId={transactionId}
      />
    </div>
  );
};

export default Transactions;