const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for now, or configure for your frontend domain
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/dishes', require('./routes/dishRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/restaurant-reviews', require('./routes/restaurantReviewRoutes'));

app.get('/', (req, res) => {
    res.send('Le Gourmet Royal API is running');
});

// Only start server if run directly (local dev)
if (require.main === module) {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    });
}

module.exports = app;
