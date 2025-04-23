




export const fetchClash = async ( clashId:string)=>{

    
    try{
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/clash/${clashId}`, 
            { 
                headers:{ "Content-Type":"multipart/form-data" }
            } );

        const data = await res.json();
        return data.data;

      }
      catch(err){
        console.log(err);
      }

      return null;

      
}




