const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');

// Load environment variables
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error: ", err));

// Example route to call the Python service
app.get('/fetch-stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const response = await axios.get(`http://localhost:5001/stock/${symbol}`); // Call to the Python service
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from Python service:", error.message);
        res.status(500).json({ message: "Error fetching data from Python service", error: error.message });
    }
});

// Start the Express server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Node.js server running on port ${PORT}`));
