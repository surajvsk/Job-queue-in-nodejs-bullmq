// app.js
const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());

// Apply the job queue middleware to the desired route
app.get('/data', jobQueueMiddleware, (req, res) => {
  // Process the job queue task and fetch data from the database
  // Example: Query the database, perform calculations, etc.
  
  // Retrieve the data and send the response
  const data = { /* Your fetched data */ };
  res.json(data);
});

// Mount the routes
app.use('/', routes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});