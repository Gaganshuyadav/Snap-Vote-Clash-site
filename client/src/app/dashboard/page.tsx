"use client"
import React, { useEffect } from 'react';
import authOptions, { CustomUser } from "../api/auth/[...nextauth]/auth";
import { getSession, useSession } from 'next-auth/react';
import AddClash from '@/components/clash/AddClash';
import { fetchAllClashes } from '@/actions/clash/fetchAllClashes';
import { Button } from '@/components/ui/button';



const Home = () => {

    const session =  useSession(authOptions);

    const handleData = ()=>{

        if(session?.data?.user){
            fetchAllClashes(session.data.user as CustomUser);
        }
    }

    console.log(session)
    


  return (
    <div className='border-2 border-red-300 h-[100vh] w-[99vw] overflow-hidden p-0'>
        
        <div className='border-2 flex items-center justify-end p-2 pr-8'>
          <AddClash user={session?.data?.user as CustomUser}/>
        </div>
        <Button onClick={handleData}>Click me</Button>
        
        <div>

        </div>
        {/* <p className='w-full'>{JSON.stringify(session)}</p> */}
    </div>
  )
}

export default Home;

















