/*
Task name: User endpoints

Requirements
  1.  We need to create CRUD endpoints
  2.  The entries (users) can just be saved in a noSQL database (Bonus for using Firebase Realtime Database)
  3.  Each user should have the following data entries: 
        id, name, zip code, latitude, longitude, timezone
  4.  When creating a user, allow input for name and zip code.  
      (Fetch the latitude, longitude, and timezone - Documentation: https://openweathermap.org/current) 
  5.  When updating a user, Re-fetch the latitude, longitude, and timezone (if zip code changes)
  6.  Connect to a ReactJS front-end
  * feel free to add add something creative you'd like

  API Key: 7afa46f2e91768e7eeeb9001ce40de19
*/

// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send('triggering  "/" endpoint...');
// });
// app.listen(8080,()=>{
//   console.log("Server is running");
// });

// backend/server.js
// backend/app.js or server.js
const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Import and use user routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// A simple route to verify the server is running
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

const PORT =  8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
