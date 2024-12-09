// server/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const accountRoute = require('./routes/account'); // Import your account routes

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

app.use('/account', accountRoute); // Use the account routes for /account endpoint

// Handle any other routes...
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('Error connecting to database:', error);
  });

// Don't call app.listen() here
module.exports = app; // Export the app instance for use in tests