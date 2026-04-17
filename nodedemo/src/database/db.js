const mongoose = require('mongoose');
const env = require('dotenv');

env.config();

const connectDB = async () => {
    await mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => console.log('Error connecting to MongoDB:', error));
};

module.exports = connectDB;
