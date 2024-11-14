import React, { useState } from 'react';
import axios from 'axios';

const StockDataComponent = ({ setSelectedSymbol }) => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const [symbol, setSymbol] = useState('');

  const handleFetchData = () => {
    if (symbol) {
      setSelectedSymbol(symbol); // Update the selected symbol
      axios.get(`http://localhost:5005/fetch-stock/${symbol}`)
        .then(response => {
          setStockData(response.data);
          setError(null); // Clear any previous error messages
        })
        .catch(err => {
          setError('Error fetching stock data: ' + err.message);
          setStockData(null); // Clear any previous data
        });
    }
  };

  // Update getPrice function to handle undefined or missing data
  const getPrice = (data) => {
    // Make sure data and symbol exist
    if (!data || !data.symbol) {
      return 'Symbol not available';
    }
    
    // Check if the symbol has a known suffix like '.ns' or '.bse'
    const symbolLowerCase = data.symbol.toLowerCase();
    
    if (symbolLowerCase.includes('.ns') || symbolLowerCase.includes('.bse')) {
      return `₹${data.price}`;
    } else if (data.price !== undefined) {
      return `$${data.price}`;
    } else {
      return 'Price not available';
    }
  };

  return (
    <div>
      <h2>Stock Data</h2>
      <input
        type="text"
        placeholder="Enter stock symbol (e.g., AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button onClick={handleFetchData}>Fetch Stock Data</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {stockData && (
        <div>
          <h3>Stock Data for {stockData.symbol}</h3>
          <p>Currency: {stockData["currency"]}</p>
          <p>Price: {getPrice(stockData)}</p>
          <p>Timestamp: {stockData["time-stamp"]}</p>
          <p></p>
        </div>
      )}
    </div>
  );
};

export default StockDataComponent;
