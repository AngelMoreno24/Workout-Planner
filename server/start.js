
const mongoose = require('mongoose');
const app = require('./index');

const PORT = process.env.PORT || 5000;
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
    });