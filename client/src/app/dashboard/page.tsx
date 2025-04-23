
import { CustomUser, authOptions } from "../api/auth/[...nextauth]/auth";
import AddClash from '@/components/clash/AddClash';
import { fetchAllClashes } from '@/actions/clash/fetchAllClashes';
import { getServerSession, ISODateString } from 'next-auth';
import { ClashCard } from "@/components/clash/clashcard/ClashCard";

export type ClashType = {
  id?: string,
  user_id?: string,
  title?: string,
  description?: string,
  image?: string,
  expired_at?: ISODateString,
  created_at?: ISODateString

}

const Home = async() => {

    const session =  await getServerSession(authOptions);
    let allClashes = [];

    if(session?.user){
        allClashes = await fetchAllClashes(session.user as CustomUser);
    }
    


  return (
    <div className='border-2 border-red-300 min-h-[100vh] w-[99vw] overflow-hidden p-0'>
        
        <div className='border-2 flex items-center justify-end p-2 pr-8'>
          <AddClash user={session?.user as CustomUser} />
        </div>

        <div className='border-2 flex items-center flex-wrap justify-start p-2 pr-8 min-h-[70vh] mx-auto'>
          {
            allClashes?.map(( clash:ClashType, i:number)=>{
              return(
                <ClashCard key={i} clash={clash} user={session?.user as CustomUser} />
              )
            })
          }
        </div>
      
    </div>
  )
}

export default Home;

















