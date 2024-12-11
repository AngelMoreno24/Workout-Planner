const express = require('express');
const { addWorkout } = require('../controllers/workoutController.js');



const router = express.Router();

router.post("/add", addWorkout);

module.exports = router;