"use server"
import LoginForm from '@/components/login/LoginForm';
import React from 'react'

const Login = () => {

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoginForm/>
      </div>
    );
}

export default Login;
