"use server";

import axios, { AxiosError } from "axios";

export type errorsType = {
    name?: string
    email?: string
    password?: string
    confirm_password?: string
}

export type dataType = {
    name?: string
    email?: string
    password?: string
    confirm_password?: string
}


export type initialRespType = {
    success:boolean,
    message: string,
    data?: dataType,
    errors :{
        name?: string
        email?: string,
        password?:string 
        confirm_password?:string
    }
}



export const registerAction = async ( prev:initialRespType, formData:FormData ):Promise<initialRespType>=>{

    try{
        await axios.post(
            `${process.env.BACKEND_API_URL}/user/register`, 
            { name: formData.get("username"), email: formData.get("email"), password: formData.get("password"), confirm_password: formData.get("confirm-password") }, 
            { headers:{ "Content-Type":"application/json"}}
        );

        return{
            success:true,
            message:"Account Created Successfully, Please check your email and verify your email",
            errors:{}
        }
       
    }
    catch(err:unknown){
 
       if( err instanceof AxiosError){
          if(err?.status===422){

            const errorsObj:errorsType = {};

            err?.response?.data?.errors?.forEach((error:errorsType)=>{

                if( error["name"]!==undefined){
                    errorsObj.name = error["name"];
                }
                else if( error["email"]!==undefined){
                    errorsObj.email = error["email"];
                }
                else if( error["password"]!==undefined){
                    errorsObj.password = error["password"];
                }
                else if( error["confirm_password"]!==undefined){
                    errorsObj.confirm_password = error["confirm_password"];
                }

            })

            return { 
                success:false,
                message:"validation Error",
                errors: errorsObj
            }
          }
       }

       return{ 
        success:false,
        message:"Something went wrong", 
        errors:{}
        }
    }


} 


export const loginAction = async ( prev:initialRespType, formData:FormData ):Promise<initialRespType>=>{

    try{
        await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/login-check`, 
            { email: formData.get("email"), password: formData.get("password") }, 
            { headers:{ "Content-Type":"application/json"}}
        );

        return{
            success:true,
            message:"Login Validation Succcess",
            errors:{},
            data: {
                email: formData.get("email") as string,
                password: formData.get("password") as string
            }
        }
       
    }
    catch(err:unknown){
 
       if( err instanceof AxiosError){
          if(err?.status===422){  

            const errorsObj:errorsType = {};

            err?.response?.data?.errors?.forEach((error:errorsType)=>{

                if( error["email"]!==undefined){
                    errorsObj.email = error["email"];
                }
                if( error["password"]!==undefined){
                    errorsObj.password = error["password"];
                }

            })

            return { 
                success:false,
                message:"validation Error",
                errors: errorsObj
            }
          }
       }

       if( err instanceof AxiosError){
        if(err?.status===401){

            return{ 
                success:true,
                message:"Invalid Email or Password",
                errors:{}
            }
          }
        }
     }

       return{ 
        success:false,
        message:"Something went wrong", 
        errors:{}
        }
    }



















