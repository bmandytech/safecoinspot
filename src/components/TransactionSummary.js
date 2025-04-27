import React from 'react';

const TransactionSummary = ({ transaction }) => {
  return (
    <div>
      <h3>Transaction Summary</h3>
      <p>Coin: {transaction.coin}</p>
      <p>Amount: ${transaction.amount}</p>
      <p>Fee: ${transaction.fee}</p>
      <p>Total: ${transaction.amount - transaction.fee}</p>
    </div>
  );
};

export default TransactionSummary;