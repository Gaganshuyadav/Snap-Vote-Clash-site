

import { CustomUser } from "@/app/api/auth/[...nextauth]/auth";

export const fetchAllClashes = async ( user:CustomUser)=>{

    
    try{
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/clash/`, 
            { 
                next: { revalidate: 40, tags: ["refetchdashboard"]}, 
                method:"GET", 
                headers:{ "Content-Type":"multipart/form-data", "Authorization":`Bearer ${user?.token}` }
            } );

        const data = await res.json();
        return data.data;

      }
      catch(err){
        console.log(err);
      }

      return null;

      
}


