// jobsController.js
const { jobQueue } = require('./jobQueueMiddleware');

const getJobStatus = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await jobQueue.getJob(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.finished()) {
      const result = await job.returnvalue;
      return res.json({ result });
    }

    // Job is still in progress
    return res.json({ status: 'Job in progress' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { getJobStatus };