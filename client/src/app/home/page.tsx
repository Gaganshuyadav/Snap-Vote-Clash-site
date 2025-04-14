"use client"
import React, { useEffect } from 'react';
import authOptions from "../api/auth/[...nextauth]/auth";
import { getSession, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';

const Home = () => {

    const session =  useSession(authOptions);
    

  return (
    <div>
        <div>Hello, i am coming home</div>
        <p>{JSON.stringify(session)}</p>
    </div>
  )
}

export default Home;















