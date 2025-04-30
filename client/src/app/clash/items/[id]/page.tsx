"use server";

import { fetchClash } from "@/actions/clash/fetchClash";
import { authOptions, CustomUser } from "@/app/api/auth/[...nextauth]/auth";
import { ClashType } from "@/app/dashboard/page";
import { AddClashItems } from "@/components/clashItems/AddClashItems";
import ShowClashItemsWithComment from "@/components/clashItems/ShowClashItemsWithComment";
import { ClashFetchType } from "@/types/types";
import { getServerSession } from "next-auth";



const page = async ( { params, searchParams}:{ params:{ id:string}, searchParams:Record<string, string|number>}) => {

  const data = await params;

  //fetch clash
  const clash:ClashFetchType = await fetchClash(data?.id);

  const session =  await getServerSession(authOptions);

  
    return (
      <div>
        <div className="p-4">
          <h1 className="text-4xl font-bold text-purple-500 ml-10">{clash?.title}</h1>
          <h2 className="text-lg text-gray-600 font-semibold ml-10 text-violet-400">{clash?.description}</h2>
        </div>
        {
          clash?.clashItems.length > 1 
          ?
          (<ShowClashItemsWithComment clash={clash}/>)
          :
          (<AddClashItems clash={clash} user={session?.user as CustomUser}/>)

        }
      </div>
  )
}
 
export default page;

