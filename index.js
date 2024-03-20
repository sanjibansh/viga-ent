// Import module
const connectionString = require('./models/models');
const PriceService = require('./src/priceService');
const priceService = new PriceService(connectionString);

// Import required libraries
const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// API endpoint to calculate delivery costs
app.get('/', async (req, res) => {
  try {
    //const { zone, organization_id, total_distance, type } = req.query;
    const zone = req.query['param1'];
    const organization_id=parseInt(req.query['param2']);
    const total_distance=parseInt(req.query['param3']);
    const type=req.query['param4'];

    //const { param1: zone, param2: organization_id, param3: total_distance, param4: type } = req.query;
    const totalPrice= await priceService.calculatePrice(zone,organization_id,total_distance,type);
    return res.json({'Price' : totalPrice}); // Convert back to euros
  } catch (error) {
    console.error('Error calculating price:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
