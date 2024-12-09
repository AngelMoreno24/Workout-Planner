// server/start.js
const app = require('./index'); // Import the app from index.js

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});