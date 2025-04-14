import { ConnectionOptions } from "bullmq"
import { env } from "./env.config.js"

export const QueueConnection:ConnectionOptions = {
        host: String(env.QUEUE_HOST) as string,
        port: Number(env.QUEUE_PORT) as number,
}


export const QueueOptions = {
    attempts:3,
    backoff:{
        type:"exponential",
        delay: 1000
    },
    removeOnComplete:{
        count:3
    },
    removeOnFail:false,
}











