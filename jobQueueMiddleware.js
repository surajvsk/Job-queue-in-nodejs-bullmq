const Queue = require('bull');

const jobQueue = new Queue('tasks');

const jobQueueMiddleware = async (req, res, next) => {
  try {
    const { method, query, body } = req;
    console.log(':::::::',body)

    // Determine the task data based on the request method
    let taskData;
    if (method === 'GET') {
      taskData = query;
    } else {
      taskData = body;
    }

    // Add the task to the job queue
    const job = await jobQueue.add(taskData);

    // Attach the job ID to the request object for future reference
    req.jobId = job.id;

    next();
  } catch (error) {
    // Handle any errors that occur during job queue processing
    res.status(500).json({ error: 'An error occurred' });
  }
};


const getJobStatus = async (jobId) => {

  try {
    const job = await jobQueue.getJob(jobId);
    console.log('JOB::::::::::::::::', job)
    if (!job) {
      return { error: 'Job not found' };
    }

    if (job.finished()) {
      const result = await job.returnvalue;
      return { result };
    }
    // Job is still in progress
    return { status: 'Job in progress' };
  } catch (error) {
    return { error: 'An error occurred' };
  }
};

module.exports = { jobQueueMiddleware, jobQueue, getJobStatus };