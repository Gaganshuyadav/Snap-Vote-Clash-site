import { Queue, Worker } from "bullmq";
import { QueueConnection, QueueOptions } from "../config/queue.js";
import { prisma } from "../prisma-client/PrismaClient.js";
//voting queue
const votingQueue = new Queue("votingQueue", {
    connection: QueueConnection,
    defaultJobOptions: QueueOptions
});
//voting queue
export const votingChangeQueue = async ({ countType, clashItemId, count }) => {
    const votingChangeProducer = await votingQueue.add("votingQueue", {
        countType,
        clashItemId,
        count
    });
};
//voting worker
export const votingWorker = new Worker("votingQueue", async (job) => {
    console.log("worker executing voting request");
    const { countType, count, clashItemId } = job.data;
    let clashItemDB;
    if (countType === "increase-count") {
        //increase count in clash item DB
        clashItemDB = await prisma.clashItem.update({
            where: {
                id: clashItemId
            },
            data: {
                count: count + 1
            }
        });
    }
    else {
        //decrease count in clash item DB
        clashItemDB = await prisma.clashItem.update({
            where: {
                id: clashItemId
            },
            data: {
                count: count > 0 ? count - 1 : 0
            }
        });
    }
}, {
    connection: QueueConnection,
    concurrency: 1
});
