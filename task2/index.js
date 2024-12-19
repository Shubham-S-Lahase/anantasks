const express = require("express");
const schedule = require("node-schedule");

const app = express();
app.use(express.json());

const taskQueue = [];

app.post("/api/process-task", (req, res) => {
  const { totalDuration = 3, data } = req.body;

  if (totalDuration < 1 || totalDuration % 1 !== 0) {
    return res.status(400).send({
      error:
        "Invalid totalDuration, total duratipn must be multiple of 10 or at least 10 minutes.",
    });
  }

  const task = {
    id: Date.now(),
    totalDuration,
    data,
    intervalsLeft: totalDuration,
  };

  taskQueue.push(task);

  res.status(200).send({
    message: `Task queued successfully! Task ID: ${task.id}`,
    status: "Queued",
  })

  processQueue();
});

const processQueue = () => {
  while (taskQueue.length > 0) {
    const task = taskQueue.shift();

    schedule.scheduleJob(taskQueue.indexOf.toString(), `*/1 * * * *`, () => {
      if (task.intervalsLeft > 1) {
        console.log(`Task ${task.id} is still running...`);
        task.intervalsLeft--;
      } else {
        console.log(`Task ${task.id} completed!`);
      }
    });
  }
};

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
