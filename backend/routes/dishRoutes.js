const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');
const authMiddleware = require('../middleware/authMiddleware');

// Get all dishes
router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a dish (Admin only)
router.post('/', authMiddleware, async (req, res) => {
    const { name, description, price, category, image_url } = req.body;

    try {
        const newDish = new Dish({ name, description, price, category, image_url });
        const dish = await newDish.save();
        res.json(dish);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a dish (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    const { name, description, price, category, image_url } = req.body;

    try {
        let dish = await Dish.findById(req.params.id);
        if (!dish) return res.status(404).json({ message: 'Dish not found' });

        dish.name = name || dish.name;
        dish.description = description || dish.description;
        dish.price = price || dish.price;
        dish.category = category || dish.category;
        dish.image_url = image_url || dish.image_url;

        await dish.save();
        res.json(dish);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a dish (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        if (!dish) return res.status(404).json({ message: 'Dish not found' });

        await dish.deleteOne();
        res.json({ message: 'Dish removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
