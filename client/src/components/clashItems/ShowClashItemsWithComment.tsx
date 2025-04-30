"use client"
import { ClashFetchType, CommentType } from '@/types/types';
import ClashItemCard from '../clash/clash-item-card/ClashItemCard';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import ShowComment from '../clash/comment/ShowComment';
import { useEffect, useState } from 'react';
import { socket } from '@/providers/SocketProvider';

const ShowClashItemsWithComment = ( { clash}:{ clash:ClashFetchType }) => {


    const [ textArea, setTextArea] = useState(""); 
    const [ newCommentsWithWS, setNewCommentsWithWS] = useState<Array<CommentType>>(clash?.comments||[]);

    const handleSubmitComment = ()=>{

        if(textArea.trim()===""){
            return;
        }
        socket.emit("send-comment", { clashId: clash.id, comment: textArea});
        setTextArea("");
    }


   //when new comment add then add in real time
   const newCommentAddEvent = ( data:CommentType)=>{

        if( !clash?.id || data.clash_id!==clash?.id){
            return;
        }

        newCommentsWithWS.push(data);
        setNewCommentsWithWS( [ ...newCommentsWithWS]);
    };

   useEffect(()=>{

    socket.on("send-comment", newCommentAddEvent);

    return ()=>{
        socket.off("send-comment", newCommentAddEvent);
    }
    
   },[ socket]);


  return (
    <div>
        {/* first box ( voting component)*/}
        <div className="mt-5">

            <div className=" flex h-[400px] flex-wrap lg:flex-nowrap justify-center items-center overflow-x-auto overflow-y-none">

                {/* First Block */}
                <ClashItemCard clash={clash} imageIdx={0}/>

                {/* VS Block */}
                <div className="flex w-full lg:w-auto justify-center items-center mr-10">
                    <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                        VS
                    </h1>
                </div>

                {/* Second Block */}
                <ClashItemCard clash={clash} imageIdx={1} />

            </div>
        </div>

        {/* second box (comment component)*/}
        <div>

            <div className='w-11/12 md:w-10/12 lg:w-8/12 m-auto flex flex-col items-center'>
                <Textarea onChange={(e)=>setTextArea(e.target.value)} className='mt-2 mb-1' value={textArea} placeholder='Type your Suggestions'></Textarea>
                <Button className='w-full' onClick={ handleSubmitComment} >Submit Comment</Button>
            </div>

            <div className='ml-2  mt-2 m-auto'>
                <div className='w-10/12 m-auto'>

            
                {
                    newCommentsWithWS?.map((comment:CommentType,i:number)=>{

                        return(
                            <ShowComment key={i} comment={comment}/>
                        )
                    })
                }
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default ShowClashItemsWithComment;

