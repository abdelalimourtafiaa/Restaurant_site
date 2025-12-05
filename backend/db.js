const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing MongoDB connection');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/le_gourmet_royal', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        isConnected = db.connections[0].readyState;
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        // Don't exit process in serverless, just throw
        throw err;
    }
};

module.exports = connectDB;
