const express = require('express');
const app = express();
const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes); // User authentication routes
app.use('/api/transactions', transactionRoutes); // Transactions routes

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
