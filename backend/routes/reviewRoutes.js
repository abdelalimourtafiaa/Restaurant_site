const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Dish = require('../models/Dish');
const authMiddleware = require('../middleware/authMiddleware');

// Get reviews for a dish
router.get('/:dishId', async (req, res) => {
    try {
        const reviews = await Review.find({ dish_id: req.params.dishId });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a review
router.post('/', async (req, res) => {
    const { dish_id, author, rating, comment } = req.body;

    try {
        const newReview = new Review({ dish_id, author, rating, comment });
        await newReview.save();

        // Update average rating
        const reviews = await Review.find({ dish_id });
        const avg = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

        await Dish.findByIdAndUpdate(dish_id, { average_rating: avg });

        res.json(newReview);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a review (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        await review.deleteOne();
        res.json({ message: 'Review removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
