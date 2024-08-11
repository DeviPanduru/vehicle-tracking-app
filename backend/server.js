// backend/server.js  
const express = require('express');  
const cors = require('cors');  
const fs = require('fs');  
const app = express();  
const PORT = 5000;  

app.use(cors());  
app.use(express.json());  

// Dummy Data  
const vehicleData = JSON.parse(fs.readFileSync('data.json'));  

// API Endpoint to get vehicle location and route  
app.get('/api/location', (req, res) => {  
  res.json(vehicleData);  
});  

// Start server  
app.listen(PORT, () => {  
  console.log(`Server is running on http://localhost:${PORT}`);  
});