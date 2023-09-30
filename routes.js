// routes.js
const express = require('express');
const { jobQueueMiddleware } = require('./jobQueueMiddleware');
const { getJobStatus } = require('./jobsController');

const router = express.Router();

router.get('/job/:jobId', getJobStatus);

module.exports = router;