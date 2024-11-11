import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockDataComponent = () => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const [symbol, setSymbol] = useState('');  // For the stock symbol input

  const handleFetchData = () => {
    if (symbol) {
      axios.get(`http://localhost:5005/fetch-stock/${symbol}`)
        .then(response => {
          setStockData(response.data);
        })
        .catch(err => {
          setError('Error fetching stock data: ' + err.message);
        });
    }
  };

  // Function to check if the stock symbol is for an Indian stock or a US stock
  const getPrice = (data) => {
    // Check if symbol contains `.NS` or `.BSE` which are typically used for Indian stocks
    if (data.symbol.includes('.NS') || data.symbol.includes('.BSE') || data.symbol.includes('.ns') || data.symbol.includes('.bse')) {
      return `₹${data.price}`;  // Indian stock price (INR)
    } else {
      return `$${data.price}`;  // US stock price (USD)
    }
  };

  return (
    <div>
      <h2>Stock Data</h2>

      {/* Input field for stock symbol */}
      <input
        type="text"
        placeholder="Enter stock symbol (e.g., RELIANCE.NS or AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button onClick={handleFetchData}>Fetch Stock Data</button>

      {/* Error message if there's an issue */}
      {error && <p>{error}</p>}

      {/* Show stock data if available */}
      {stockData && (
        <div>
          <h3>Stock Data for {stockData.symbol}</h3>
          <p>Price: {getPrice(stockData)}</p> {/* Conditional price display */}
          <p>Timestamp: {stockData["time-stamp"]}</p>
        </div>
      )}

      {/* Loading state */}
      {!stockData && !error && <p>Loading...</p>}
    </div>
  );
};

export default StockDataComponent;
