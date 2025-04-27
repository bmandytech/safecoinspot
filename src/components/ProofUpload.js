import React, { useState } from 'react';

const ProofUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      alert('File uploaded successfully!');
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div>
      <h3>Upload Proof</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ProofUpload;