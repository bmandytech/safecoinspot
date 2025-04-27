import React from 'react';

const EscrowStatus = ({ status }) => {
  return (
    <div>
      <h3>Escrow Status</h3>
      <p>Status: {status}</p>
    </div>
  );
};

export default EscrowStatus;