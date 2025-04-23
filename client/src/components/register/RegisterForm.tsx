"use client";

import { initialRespType, registerAction } from '@/actions/auth/authActions';
import Link from 'next/link';
import React, { useActionState, useEffect, useState } from 'react'
import FormButtonLoading from '../loading/FormButtonLoading';

function RegisterForm(){

    const initialState:initialRespType = {
        success:false,
        message:"",
        errors:{}
    }

    const [ state, formAction]  = useActionState( registerAction, initialState);
  

    const [ onTypeRemoveErrorReRender, setOnTypeRemoveErrorReRender] = useState(false);
    
    const onTypeRemoveError = (errorType: "name" | "email" | "password" | "confirm_password")=>{

      if( state?.errors && state?.errors[errorType]!==undefined && state.errors[errorType]!==""){ 
        state.errors[errorType] = "" ; 
        setOnTypeRemoveErrorReRender(!onTypeRemoveErrorReRender);
      }


    }


    //render when user type on input which have validation type error message on action of onTypeRemoveError()
    useEffect(()=>{

    },[onTypeRemoveErrorReRender]);



    return(
        <div>
        <form
          noValidate
          className="bg-white p-8 rounded shadow-md w-96"
          action={formAction}
        >

          <h1 className="text-2xl text-pink-500 font-bold text-center mb-6">Register</h1>
          
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input onChange={()=>{onTypeRemoveError("name")}} type="text" name='username' id="username" className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500" required />
            { state?.errors && state?.errors?.name?.trim()!==undefined && state?.errors?.name?.trim()!=="" && <div className='text-red-400 text-sm tracking-wide pl-1'>{state?.errors?.name}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input onChange={()=>{onTypeRemoveError("email")}} type="email" name='email' id="email" className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500" required />
            { state?.errors && state?.errors?.email && <div className='text-red-400 text-sm tracking-wide pl-1'>{state?.errors?.email}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input onChange={()=>{onTypeRemoveError("password")}} type="password" name="password" id="password" className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500" required />
            { state?.errors && state?.errors?.password && <div className='text-red-400 text-sm tracking-wide pl-1'>{state?.errors?.password}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input onChange={()=>{onTypeRemoveError("confirm_password")}} type="password" name="confirm-password" id="confirm-password" className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500" required />
            { state?.errors && state?.errors?.confirm_password && <div className='text-red-400 text-sm tracking-wide pl-1'>{state?.errors?.confirm_password}</div>}
          </div>

          <FormButtonLoading BtnName='Create Account' ButtonBgColor='bg-pink-500' />
          
          <p className="mt-4 text-center">
            Already Have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </form>
    </div>
    )
}

export { RegisterForm};