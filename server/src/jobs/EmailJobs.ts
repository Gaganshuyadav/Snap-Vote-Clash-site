import { Queue, Worker } from "bullmq";
import { QueueConnection, QueueOptions } from "../config/queue.js";
import { sendMail } from "../config/mail.service.js";


//email queue
const emailQueue = new Queue("emailQueue", {
    connection: QueueConnection,
    defaultJobOptions: QueueOptions,
});


//email producer
export const sendEmailWithQueue = async ({ to, subject, body}:{ to:string, subject:string, body:string}) =>{
    const sendEmailWithQueueResponse = await emailQueue.add("emailQueue", {
        to,
        subject,
        body
    });
}


//email worker
const emailWorker = new Worker("emailQueue", async ( job)=>{


    try{
        await sendMail(job.data); 
    }
    catch(err){
        throw new Error("Error in Sending the Email");
    }
    

},{
    connection: QueueConnection, 
    concurrency:1,
})

emailWorker.on("failed", ( job, err)=>{
    console.log(err.message);  
})















