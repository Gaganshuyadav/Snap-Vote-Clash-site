import rateLimit from "express-rate-limit";

export const appLimiter = rateLimit({
    windowMs: 60*60*1000,
    limit: 10000,
    standardHeaders:"draft-8",                      
    message:{
        error:{
            code:429,
            message:"Too Many Requests",
            description: "You have exceeded the allowed number of requests. Please try again later."
        }
    },
    skip: (req,res)=>{
        return req.path==="/user/get-user";
    }
})

