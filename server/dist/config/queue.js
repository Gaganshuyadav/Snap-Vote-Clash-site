import { env } from "./env.config.js";
export const QueueConnection = {
    host: String(env.QUEUE_HOST),
    port: Number(env.QUEUE_PORT),
};
export const QueueOptions = {
    attempts: 3,
    backoff: {
        type: "exponential",
        delay: 1000
    },
    removeOnComplete: {
        count: 3
    },
    removeOnFail: false,
};
