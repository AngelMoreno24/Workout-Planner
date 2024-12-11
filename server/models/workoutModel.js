const mongoose = require("mongoose");


const workoutSchema = mongoose.Schema(
    {

        category: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        sets: {
            type: String,
            required: true
        },
        reps: {
            type: String,
            required: true
        },
        weight: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        accountId: {
            type: String,
            required: true
        }

    },
    {
        timestamps:true
    }
);

const Workout = mongoose.model('workouts', workoutSchema);

module.exports = Workout; 