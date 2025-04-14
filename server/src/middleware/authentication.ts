import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma-client/PrismaClient.js";
import { catchAsyncErrors } from "./catch-async.js";
import { env } from "../config/env.config.js";


export const authentication =catchAsyncErrors( async( req:Request, res:Response, next:NextFunction)=>{
    const authToken = req.headers["authorization"];

    if(!authToken){
        return res.status(401).json({
            success: false,
            message:"Invalid Credentials"
        })
    }

    const token = authToken.split(" ")[1];

    await jwt.verify(token,  env.JSON_WEB_TOKEN_SECRET, async ( err:any, decoeded:unknown)=>{

        if(err){
            return res.status(401).json({
                success: false,
                message: "Invalid token",
                err:err,
            })
        }

        try{
            const { userId, email } = decoeded as { userId:string, email:string} ;

            //find user
            const findUser = await prisma.user.findUnique({ where: { email, id: userId}});
            
            if(!findUser){
                return res.status(401).json({
                    success: false,
                    message: "Invalid token"
                })
            }

            req.user = { 
                userId: findUser.id,
                name: findUser.name,
                email: findUser.email,
                createdAt: findUser.created_at,
                updatedAt: findUser.updated_at,
            } 

            next();
        }
        catch(err){
            console.log(err)
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }
    });

    
});