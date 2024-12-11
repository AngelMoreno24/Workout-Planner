const Workout = require('../models/workoutModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const addWorkout = async (req, res) => {
    try {
        const { category, name, sets, reps, weight, time } = req.body;
         
        const id = req.id;

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



const getWorkout = async (req, res) => {
    try {
        //const { category, name, sets, reps, weight, time } = req.body;
         
        const id = req.id;


        const workout = await Workout.where("accountId").equals(id);
        
        return res.status(201).json(workout);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};



module.exports = { addWorkout, getWorkout };