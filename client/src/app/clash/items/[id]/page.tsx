"use server";

import { fetchClash } from "@/actions/clash/fetchClash";
import { AddClashItems } from "@/components/clashItems/AddClashItems";

const page = async ( { params, searchParams}:{ params:{ id:string}, searchParams:Record<string, string|number>}) => {

  const data = await params;

  //fetch clash
  const clash = await fetchClash(data?.id);
  console.log(clash)


  
    return (
      <div>
        <div className="p-4">
          <h1 className="text-3xl font-bold text-purple-500">This is a Large Header</h1>
          <h2 className="text-sm text-gray-600 font-semibold text-violet-400">This is a Small Header</h2>
        </div>
        { JSON.stringify(clash)}
        <AddClashItems/>
      </div>
  )
}
 
export default page;

