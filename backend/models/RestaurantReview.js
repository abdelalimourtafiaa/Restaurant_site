const mongoose = require('mongoose');

const restaurantReviewSchema = new mongoose.Schema({
    author: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    category: { type: String, required: true, enum: ['Service', 'Qualité', 'Hygiène', 'Rapidité'] },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RestaurantReview', restaurantReviewSchema);
