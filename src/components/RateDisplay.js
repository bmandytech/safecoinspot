import React from 'react';

const RateDisplay = ({ rate }) => {
  return (
    <div>
      <h3>Current Rate</h3>
      <p>{rate} USD</p>
    </div>
  );
};

export default RateDisplay;