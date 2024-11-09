const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const portfolioRoutes = require('./routes/portfolioRoutes');
const cors = require('cors');


dotenv.config();
const app = express();
app.use(express.json()); // Parses JSON bodies
app.use(cors());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Routes
app.use('/api/portfolio', portfolioRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
