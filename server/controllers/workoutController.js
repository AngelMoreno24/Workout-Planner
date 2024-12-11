const Workout = require('../models/workoutModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Function
const addWorkout = async (req, res) => {
    try {
        const { category, name, sets, reps, weight, time, id } = req.body;
         

        if(!category || !name || !sets || !reps || !weight || !time){

            return res.status(401).json({ message: "required info missing" });
        }

        const newWorkout = {
            category,
            name,
            sets,
            reps,
            weight,
            time,
            accountId: id
        };

        const workout = await Workout.create(newWorkout);
        
        return res.status(201).json(workout);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};



module.exports = { addWorkout };