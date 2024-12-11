const express = require('express');
const { addWorkout, getWorkout } = require('../controllers/workoutController.js');
const { verifyToken } = require("../middeware/validateToken.js");


const router = express.Router();

router.post("/add", verifyToken, addWorkout);
router.post("/get", verifyToken, getWorkout);


module.exports = router;