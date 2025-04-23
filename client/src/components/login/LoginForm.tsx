"use client";
import { errorsType, initialRespType, loginAction } from "@/actions/auth/authActions";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import FormButtonLoading from "../loading/FormButtonLoading";
import { signIn, useSession} from "next-auth/react";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import NextAuth from "next-auth";
// import { useRouter, useSearchParams, useParams } from 'next/navigation';

export default function LoginForm() {

    const initialState:initialRespType = {
            success:false,
            message:"",
            errors:{} as errorsType
    }

    const [ state, formAction] = useActionState( loginAction, initialState);


    const [ onTypeRemoveErrorReRender, setOnTypeRemoveErrorReRender] = useState(false);
    
        const onTypeRemoveError = (errorType: "email" | "password" )=>{

        if( state?.errors && state?.errors[errorType]!==undefined && state.errors[errorType]!==""){ 
            state.errors[errorType] = "" ; 
            setOnTypeRemoveErrorReRender(!onTypeRemoveErrorReRender);
        }
    
    
    }
    
    
    //render when user type on input which have validation type error message on action of onTypeRemoveError()
    useEffect(()=>{
    
    },[onTypeRemoveErrorReRender]);



    //for login message
    useEffect(()=>{

        if( state.message==="Login Validation Succcess"){
            signIn("credentials", {
                email: state.data?.email,
                password: state.data?.password,
                redirect: true,
                callbackUrl: "/dashboard"
            });
            toast("Login Successfully");
        }

        if( state.message==="Invalid Email or Password"){
            toast("Invalid Email or Password");
        }

    },[state]);


    // const a1 = useParams();
    // const a2 = useSearchParams();
    // const a3 = useRouter();
    // console.log(a1);
    // console.log(a2.get("as"));
    // console.log(a3);



    //check if login already
    const session = useSession( NextAuth(authOptions));

    if(session?.status==="authenticated"){
       redirect("/dashboard");
    }


    return (
        <>
            <form 
                noValidate
                className="bg-white p-8 rounded shadow-md w-96"
                action={formAction}
            >

                <h1 className="text-2xl font-bold text-pink-500 text-center mb-6">Login</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input onChange={()=>{onTypeRemoveError("email")}} type="email" name='email' id="email" className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500" />
                    { state?.errors && state?.errors?.email && <div className='text-red-400 text-sm tracking-wide pl-1'>{state?.errors?.email}</div>}
                </div>

                <div className="mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input onChange={()=>{onTypeRemoveError("password")}} type="password" name='password' id="password" className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500" />
                    { state?.errors && state?.errors?.password && <div className='text-red-400 text-sm tracking-wide pl-1'>{state?.errors?.password}</div>}
                </div>

                <p className="mt-0 ml-1 mb-4">
                    <Link href="/register" className="text-gray-500 underline hover:text-pink-500  text-sm">Forgot Password</Link>
                </p>

                <FormButtonLoading BtnName="Login" ButtonBgColor="bg-pink-500" />

                <p className="mt-4 text-center">
                    Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
                </p>

            </form>
        </>
    )
}