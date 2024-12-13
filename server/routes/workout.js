const express = require('express');
const { addWorkout, getWorkout, getDateWorkout } = require('../controllers/workoutController.js');
const { verifyToken } = require("../middeware/validateToken.js");


const router = express.Router();

router.post("/add", verifyToken, addWorkout);
router.post("/get", verifyToken, getWorkout);
router.post("/getDate", verifyToken, getDateWorkout);

module.exports = router;