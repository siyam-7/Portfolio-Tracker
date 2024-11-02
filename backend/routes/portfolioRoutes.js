const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio'); // Import the Portfolio model

// Create a new portfolio entry
router.post('/', async (req, res) => {
    try {
        const newEntry = new Portfolio(req.body);
        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all portfolio entries
router.get('/', async (req, res) => {
    try {
        const entries = await Portfolio.find();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific portfolio entry by ID
router.get('/:id', async (req, res) => {
    try {
        const entry = await Portfolio.findById(req.params.id);
        if (!entry) return res.status(404).json({ message: 'Entry not found' });
        res.json(entry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an existing portfolio entry
router.put('/:id', async (req, res) => {
    try {
        const updatedEntry = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedEntry) return res.status(404).json({ message: 'Entry not found' });
        res.json(updatedEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a portfolio entry by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedEntry = await Portfolio.findByIdAndDelete(req.params.id);
        if (!deletedEntry) return res.status(404).json({ message: 'Entry not found' });
        res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
