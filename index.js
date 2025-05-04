require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const summaryRoutes = require('./routes/summary');
const transactionRoutes = require('./routes/transactions');
const categoryRoutes = require('./routes/categories');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error:', error));

// Routes
app.use('/summary', summaryRoutes);
app.use('/transactions', transactionRoutes);
app.use('/categories', categoryRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to CashTrackr API');
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server started at port:${PORT}`));