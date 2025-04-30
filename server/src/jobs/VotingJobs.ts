import { Queue, Worker } from "bullmq";
import { QueueConnection, QueueOptions } from "../config/queue.js";

//voting queue
const votingQueue = new Queue("votingQueue", {
    connection: QueueConnection,
    defaultJobOptions: QueueOptions
})


//voting queue
// export const 





