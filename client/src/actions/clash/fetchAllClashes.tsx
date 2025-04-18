

import { CustomUser } from "@/app/api/auth/[...nextauth]/auth";

export const fetchAllClashes = async ( user:CustomUser)=>{

    console.log("fetch ------------- ");
    
    try{
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/clash/`, 
            { 
                next: { revalidate: 20}, 
                method:"GET", 
                headers:{ "Content-Type":"multipart/form-data", "Authorization":`Bearer ${user?.token}` }
            } );

        const data = await res.json();
        console.log(data);
      }
      catch(err){
        console.log(err);
      }
}


