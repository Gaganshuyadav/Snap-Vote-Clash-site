import { NextFunction, Request, Response } from "express";
import { errorHandler } from "./catch-async.js";




export const errorHandlingMiddleware = (err:errorHandler, req:Request, res:Response, next:NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    res.status(statusCode).send({ success:false, message:"Something went wrong "}); 
};