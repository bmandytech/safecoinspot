import React, { useState, useEffect } from 'react';

const CoinSelector = () => {
    const [coins, setCoins] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/coins'); // Replace with actual backend URL
                const data = await response.json();

                if (response.ok) {
                    setCoins(data.coins || []);
                    setError('');
                } else {
                    setError(data.message || 'Failed to load coins.');
                }
            } catch (err) {
                setError('Network error: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCoins();
    }, []);

    const handleCoinSelect = (coinSymbol) => {
        setSelectedCoin(coinSymbol);
        console.log(`Selected Coin: ${coinSymbol}`);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Select a Cryptocurrency</h2>

            {loading ? (
                <p className="text-gray-500">Loading coins...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {coins.map((coin) => (
                        <button
                            key={coin.id}
                            className={`flex flex-col items-center p-3 border rounded transition-all duration-200 ${
                                selectedCoin === coin.symbol ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                            }`}
                            onClick={() => handleCoinSelect(coin.symbol)}
                        >
                            <img src={coin.logoUrl} alt={coin.name} className="w-10 h-10 mb-2 rounded-full" />
                            <span className="text-sm font-medium text-gray-700 text-center">
                                {coin.name} ({coin.symbol})
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {selectedCoin && (
                <div className="mt-6 p-3 bg-gray-100 rounded text-gray-800 font-semibold">
                    ? You have selected: {selectedCoin}
                </div>
            )}
        </div>
    );
};

export default CoinSelector;