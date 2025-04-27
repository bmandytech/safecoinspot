import React, { useState } from 'react';

const FeeCalculator = ({ amount }) => {
  const [fee, setFee] = useState(0);

  const calculateFee = () => {
    // Example: Fee is 1% of the amount
    setFee(amount * 0.01);
  };

  return (
    <div>
      <h3>Calculate Fee</h3>
      <p>Amount: ${amount}</p>
      <button onClick={calculateFee}>Calculate Fee</button>
      {fee > 0 && <p>Fee: ${fee}</p>}
    </div>
  );
};

export default FeeCalculator;