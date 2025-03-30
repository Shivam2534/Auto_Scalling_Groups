import cluster from "cluster";
import os from "os";
import { app } from "./index";

const cpus = os.cpus().length;

if (cluster.isPrimary) {
  console.log("Marter PID:", process.pid);

  // it is starting a workrs
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  console.log("Worker PID:", process.pid);

  app.listen(3000, () => {
    console.log("server is running on port 3000");
  });
}
