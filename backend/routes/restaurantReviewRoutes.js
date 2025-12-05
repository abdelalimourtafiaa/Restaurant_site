const express = require('express');
const router = express.Router();
const RestaurantReview = require('../models/RestaurantReview');
const authMiddleware = require('../middleware/authMiddleware');

// Get all restaurant reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await RestaurantReview.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a restaurant review
router.post('/', async (req, res) => {
    const { author, rating, category, comment } = req.body;

    try {
        const newReview = new RestaurantReview({ author, rating, category, comment });
        await newReview.save();
        res.json(newReview);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a restaurant review (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const review = await RestaurantReview.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        await review.deleteOne();
        res.json({ message: 'Review removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
