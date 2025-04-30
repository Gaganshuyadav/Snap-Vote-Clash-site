"use client";
import { CommentType } from "@/types/types";
import { format} from "date-fns";

export default function ShowComment( { comment}:{ comment:CommentType}){

    console.log(comment)
    return(
        <div className="border-[2px] rounded m-[2px] shadow-md shadow-purple-200  border-gray-200  py-3 px-2">
            <div className="font-semibold text-lg">{comment?.content}</div>
            <div className="text-sm font-semibold text-gray-400 ">{ format(new Date(comment?.created_at), "eee PPP") }</div>
            <div></div>
        </div>
    )
}