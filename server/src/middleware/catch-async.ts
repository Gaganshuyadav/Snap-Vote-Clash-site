import { NextFunction, Request, Response } from "express";

//higher order functions
const catchAsyncErrors = ( fn:Function)=>{
    return function( req:Request, res:Response, next:NextFunction){
        fn( req, res, next).catch((err:Error)=>next(err));
    }
}

class errorHandler extends Error{
    public statusCode;
    constructor( message:string, statusCode:number){
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}


export { catchAsyncErrors , errorHandler};