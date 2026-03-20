const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send('MyStore API is running...');
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('MongoDB connected!');
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });