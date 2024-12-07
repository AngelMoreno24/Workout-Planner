const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require("dotenv");
dotenv.config();


const app = express();

app.use(express.json());

//Handle CORS policy: allow all oirigins with default of cors(*)
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/api", (req, res) => {
  res.json({"users": ["a","b"]})
})

app.use("/account", "./routes/account")

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
