import React, { useState, useEffect } from 'react';

const CoinSelector = () => {
    // State to store the list of coins
    const [coins, setCoins] = useState([]);
    // State to store the selected coin
    const [selectedCoin, setSelectedCoin] = useState('');

    // Fetch the list of available coins from your backend (or a third-party API)
    useEffect(() => {
        // Replace with your actual API endpoint to fetch available coins
        const fetchCoins = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/coins'); // Update to your actual API endpoint
                const data = await response.json();
                
                if (response.ok) {
                    setCoins(data.coins); // Assuming the response contains a 'coins' array
                } else {
                    console.error('Failed to fetch coins:', data.message);
                }
            } catch (error) {
                console.error('Error fetching coins:', error);
            }
        };

        fetchCoins();
    }, []);

    // Handle coin selection
    const handleCoinSelect = (coin) => {
        setSelectedCoin(coin);
        console.log(`Selected Coin: ${coin}`);
    };

    return (
        <div className="coin-selector">
            <h2>Select a Cryptocurrency</h2>
            
            <div className="coin-list">
                {coins.length > 0 ? (
                    coins.map((coin) => (
                        <button
                            key={coin.id}
                            className={`coin-item ${coin.symbol === selectedCoin ? 'selected' : ''}`}
                            onClick={() => handleCoinSelect(coin.symbol)}
                        >
                            <img src={coin.logoUrl} alt={coin.name} className="coin-logo" />
                            <span>{coin.name} ({coin.symbol})</span>
                        </button>
                    ))
                ) : (
                    <p>Loading coins...</p>
                )}
            </div>

            {selectedCoin && (
                <div className="selected-coin">
                    <h3>You have selected: {selectedCoin}</h3>
                </div>
            )}
        </div>
    );
};

export default CoinSelector;