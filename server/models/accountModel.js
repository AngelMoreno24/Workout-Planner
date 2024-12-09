const mongoose = require("mongoose");


const accountSchema = mongoose.Schema(
    {

        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type:String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        }
    },
    {
        timestamps:true
    }
);

const Account = mongoose.model('Account', accountSchema);

module.exports = Account; 