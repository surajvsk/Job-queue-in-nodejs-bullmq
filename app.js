// app.js

const express = require('express');
const app = express();
const {
  exec
} = require('child_process');
const routes = require('./routes');
const { jobQueueMiddleware , getJobStatus} = require('./jobQueueMiddleware');
const {
  powerShellFinalHeaderScript
} = require("./utils/headerFinalizer");
app.use(express.json());

// Apply the job queue middleware to the desired route
app.post('/data', jobQueueMiddleware, async  (req, res) => {
  // Process the job queue task and fetch data from the database
  // Example: Query the database, perform calculations, etc.
  console.log('req.body:::::::::', req.body)
  // Retrieve the data and send the response
  console.log('jobId::::::::', req.jobId)
  const data = { /* Your fetched data */ };
  
  getJobStatus(req.jobId).then(result=>{
    console.log('HERE:::::', result)
    res.json({
      job_id: req.jobId,
      req: req.body,
      result: result
    });
  })



});

// Mount the routes
app.use('/', routes);

app.listen(5000, () => {
  console.log('Server started on port 3000');
});