import { Queue, Worker } from "bullmq";
import { QueueConnection, QueueOptions } from "../config/queue.js";
import { prisma } from "../prisma-client/PrismaClient.js";
//comment queue
const commentQueue = new Queue("commentQueue", {
    connection: QueueConnection,
    defaultJobOptions: QueueOptions
});
//comment queue
export const commentAddQueue = async ({ clashId, comment }) => {
    const commentQueueProducer = commentQueue.add("commentQueue", {
        clashId,
        comment
    });
};
//comment worker
export const commentWorkerForTakingIO = (io) => {
    const commentWorker = new Worker("commentQueue", async (job) => {
        console.log("worker executing comment request");
        const { clashId, comment } = job.data;
        //add comment in database
        const commentDB = await prisma.comment.create({
            data: {
                clash_id: clashId,
                content: comment
            }
        });
        io.emit("send-comment", commentDB);
    }, {
        connection: QueueConnection,
        concurrency: 1
    });
};
