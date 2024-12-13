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


const getDateWorkout = async (req, res) => {
    try {
        const id = req.id; // User ID from request
        const { date } = req.body; // Get the specified date from query parameters (format: YYYY-MM-DD)

        if (!date) {
            return res.status(400).json({ message: "Date is required." });
        }

        // Aggregate query
        const workouts = await Workout.aggregate([
            {
                // Match workouts for the specified accountId and date
                $match: {
                    accountId: id,
                    createdAt: {
                        // Filter by the date range (start and end of the specified day)
                        $gte: new Date(`${date}T00:00:00.000Z`),
                        $lt: new Date(`${date}T23:59:59.999Z`),
                    },
                },
            },
            {
                // Optionally, sort by creation date (newest first)
                $sort: { createdAt: -1 },
            },
        ]);

        return res.status(200).json(workouts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};


module.exports = { addWorkout, getWorkout, getDateWorkout };