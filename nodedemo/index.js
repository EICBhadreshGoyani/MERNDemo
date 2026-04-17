const express = require('express');
const cors = require('cors');

const connectDB = require('./src/database/db');
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// CORS middleware
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Parse Body JSON and URL-encoded request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define authentication routes
app.use('/api/auth', authRoutes);

// Define user routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
