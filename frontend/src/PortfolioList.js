import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PortfolioList = () => {
    const [portfolios, setPortfolios] = useState([]);

    useEffect(() => {
        // Fetch portfolio data from the backend API
        const fetchPortfolios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/portfolio');
                setPortfolios(response.data); // Store data in state
            } catch (error) {
                console.error('Error fetching portfolio data', error);
            }
        };
        fetchPortfolios();
    }, []); // Empty array means this effect runs only once (on mount)

    return (
        <div>
            <h1>Portfolio List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Asset Name</th>
                        <th>Quantity</th>
                        <th>Purchase Price</th>
                        <th>Purchase Date</th>
                    </tr>
                </thead>
                <tbody>
                    {portfolios.map((portfolio) => (
                        <tr key={portfolio._id}>
                            <td>{portfolio.assetName}</td>
                            <td>{portfolio.quantity}</td>
                            <td>{portfolio.purchasePrice}</td>
                            <td>{new Date(portfolio.purchaseDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PortfolioList;
