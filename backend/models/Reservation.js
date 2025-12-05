const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    guests: { type: Number, required: true },
    date_time: { type: Date, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'cancelled'] }
});

module.exports = mongoose.model('Reservation', reservationSchema);
