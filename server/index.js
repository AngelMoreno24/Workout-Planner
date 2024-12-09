const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require("dotenv");
const accountRoute = require("./routes/account");

dotenv.config();

const app = express();

app.use(express.json());

//Handle CORS policy: allow all oirigins with default of cors(*)
app.use(cors());

const PORT = process.env.PORT || 5000;


app.use("/account", accountRoute)

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })
