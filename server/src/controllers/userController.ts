
import { json, NextFunction, Request, Response } from "express";
import { catchAsyncErrors, errorHandler } from "../middleware/catch-async.js";
import { loginSchema, registerSchema } from "../validations/authValidations.js";
import { date, ZodError } from "zod";
import { formatErrors } from "../helper/zodError.js";
import { prisma } from "../prisma-client/PrismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";
// import path from "path";
// import ejs from "ejs"
// import { fileURLToPath } from "url";
// import { sendEmailWithQueue } from "../jobs/EmailJobs.js";

class UserController {

    //register
    public register = catchAsyncErrors( async (req: Request, res: Response, next: NextFunction) =>{
        
        const body:{ name:string, email:string, password:string, confirm_password:string} = req.body;
        
        try{
            registerSchema.parse(req.body);
        }
        catch(err){
            if(err instanceof ZodError){
                formatErrors(err)
                return res.status(422).json({ errorName: "Validation Failed", errors: formatErrors(err)});
            }
        }

        //check if user exist previously
        const findUser = await prisma.user.findUnique({ where:{ email: body.email }});

        if(findUser){
            return res.json({ success:false, message:"User Already Exist"});
        }

        //convert password into hashed password( Encrypt password)
        const hashedPassword = await bcrypt.hash( body.password, 10);


        //create email verification token
        const emailVerificationToken = await jwt.sign({ email: body.email}, env.JSON_WEB_TOKEN_SECRET )

        //create new user
        const user = await prisma.user.create({
            data:{
                name: body.name,
                email: body.email,
                password: hashedPassword,
                email_verification_token: emailVerificationToken
            }
        })

        //send email to user for verification of email
        // const _dirname = path.dirname(fileURLToPath(import.meta.url));
        // const viewsPath = path.resolve(_dirname,"../views");
      
        // const html = await ejs.renderFile(viewsPath+"/user/email-verify-request.ejs",{ url: `${env.CLIENT_APP_URL}/verify-email?email=${body.email}&token=${emailVerificationToken}`});

        //add email in queue for sending email
        // await sendEmailWithQueue({ to: body.email, subject:"Email Verification", body:html});


        res.status(201).json({
            success: true,
            message: "Check Your Email, we are sending email for verification",
        });
    });


    //login check
    public loginCheck = catchAsyncErrors( async( req:Request, res:Response, next:NextFunction)=>{

        const body:{ email:string, password:string } = req.body;
        
        try{
            loginSchema.parse(req.body);
        }
        catch(err){
            if(err instanceof ZodError){
                formatErrors(err)
                return res.status(422).json({ errorName: "Validation Failed", errors: formatErrors(err)});
            }
        }

        //check if user exist 
        const findUser = await prisma.user.findUnique({ where:{ email: body.email }});

        if(!findUser){
            return res.status(401).json({ success:false, message:"Invalid Email or Password"});
        }

        //check if password is correct or not by comparing with hashed password( Encrypt password)
        const isPasswordMatched = await bcrypt.compare( body.password, findUser.password);

        if(!isPasswordMatched){
            return res.status(401).json({ success:false, message:"Invalid Email or Password"});
        }

        return res.status(200).json({
            success:true,
            message:"user check successfull"
        })
    })


    //login user
    public login = catchAsyncErrors( async (req: Request, res: Response, next: NextFunction) =>{
        
        const body:{ email:string, password:string } = req.body;
     
        
        try{
            loginSchema.parse(req.body);
        }
        catch(err){
            if(err instanceof ZodError){
                formatErrors(err)
                return res.status(422).json({ errorName: "Validation Failed", errors: formatErrors(err)});
            }
        }

        //check if user exist 
        const findUser = await prisma.user.findUnique({ where:{ email: body.email }});

        if(!findUser){
            return res.status(401).json({ success:false, message:"Invalid Email or Password"});
        }

        //check if password is correct or not by comparing with hashed password( Encrypt password)
        const isPasswordMatched = await bcrypt.compare( body.password, findUser.password);

        if(!isPasswordMatched){
            return res.status(401).json({ success:false, message:"Invalid Email or Password"});
        }

        //generate jwt token
        const token = await jwt.sign( { userId: findUser.id, email: findUser.email}, env.JSON_WEB_TOKEN_SECRET, { expiresIn: "5d"});


        res.status(200).json({
            success: true,
            message: "Login Successfully",
            data:{ 
                userId: findUser.id,
                name: findUser.name,
                email: findUser.email,
                createdAt: findUser.created_at,
                updatedAt: findUser.updated_at,
                token
            }
        });
    });


    //user info
    public getUser = ( req:Request, res:Response, next:NextFunction)=>{

        res.status(200).json({
            success:true,
            data: req.user,
        }) 

    }



    //verify email
    public verifyEmail = catchAsyncErrors( async ( req:Request, res:Response, next:NextFunction)=>{

        const { email, token} = req.query;

        //check if not empty
        if( !email || !token){
            return res.json({ success:false, message:"Invalid email or token" });
        }

        //check if email exist
        const user = await prisma.user.findUnique({where:{ email:email as string}});

        
        //check verification token
        if(user && user.email_verification_token===token){

            //now update verification
            await prisma.user.update(
                { 
                    where:{ email:email as string}, 
                    data:{ is_email_verified:true, email_verified_at: new Date().toISOString()}
                })

            return res.redirect(`${env.CLIENT_APP_URL}/login`);
        }
        else{
            return res.redirect("/user/verification-error");
        }


    })

    
    //verify email error
    public verifyEmailError =( req:Request, res:Response, next:NextFunction)=>{
        
        res.json({ success:false, message:"Something went Wrong"});
    }

    //reset password token




}


export const userController = new UserController();















