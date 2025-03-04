import cluster from "node:cluster";
import os from "node:os"

const numberOfCPUs = os.cpus().length; // get the number of CPUs

export const setupCluster = (startServer) => {
    if (cluster.isPrimary) {
        console.log(`Primary process ${process.pid} is running`);

        // Fork workers (create child processes)
        for (let i = 0; i < numberOfCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died. Restarting...`);
            cluster.fork();
        })
    }else{
        startServer();
    }
}

