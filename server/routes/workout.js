const express = require('express');
const { addWorkout } = require('../controllers/workoutController.js');
const { verifyToken } = require("../middeware/validateToken.js");


const router = express.Router();

router.post("/add", verifyToken, addWorkout);

module.exports = router;