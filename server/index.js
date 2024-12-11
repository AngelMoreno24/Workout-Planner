// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const accountRoute = require('./routes/account'); // Import your account routes
const workoutRoute = require('./routes/workout'); // Import your account routes

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

app.use('/account', accountRoute); // Use the account routes for /account endpoint
app.use('/workout', workoutRoute); // Use the account routes for /account endpoint



// Don't call app.listen() here
module.exports = app; // Export the app instance for use in tests