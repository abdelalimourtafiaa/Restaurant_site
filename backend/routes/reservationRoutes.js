const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const authMiddleware = require('../middleware/authMiddleware');

// Create a reservation
router.post('/', async (req, res) => {
    const { name, email, phone, guests, date_time } = req.body;

    try {
        const newReservation = new Reservation({ name, email, phone, guests, date_time });
        await newReservation.save();
        res.json(newReservation);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all reservations (Admin only)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ date_time: 1 });
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update reservation status (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    const { status } = req.body;

    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

        reservation.status = status;
        await reservation.save();
        res.json(reservation);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete reservation (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

        await reservation.deleteOne();
        res.json({ message: 'Reservation removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
