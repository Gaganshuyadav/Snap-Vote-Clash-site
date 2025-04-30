"use client"
import { socket } from '@/providers/SocketProvider';
import { ClashFetchType } from '@/types/types'
import React, { useEffect, useState } from 'react'

const ClashItemCard = ({ clash, imageIdx}:{ clash:ClashFetchType, imageIdx:number}) => {

    const [ isVoteClicked, setIsVoteClicked] = useState(false);
    const [ voteCount, setVoteCount] = useState(clash?.clashItems[imageIdx]?.count || 0)

    const handleVoteButton = ( isTrue:boolean)=>{
      
      if( isTrue===true){
        setIsVoteClicked(true);
        socket.emit("increase-count", { clashId: clash.id, clashItemId: clash?.clashItems[imageIdx]?.id, count: voteCount });
      }

      if( isTrue===false && voteCount>0){
        setIsVoteClicked(false);
        socket.emit("decrease-count", { clashId: clash.id,  clashItemId: clash?.clashItems[imageIdx]?.id, count: voteCount  });
      }
      
    }



    //increase count event
    const increaseCountEvent = ( data:{ clashId:string, clashItemId:string, count:number})=>{
      
      if( !clash?.id || data?.clashItemId!==clash.clashItems[imageIdx]?.id){
        return;
      }

      setVoteCount((prev)=>data.count);

    }

    //decrease count event
    const decreaseCountEvent = ( data:{ clashId:string, clashItemId:string, count:number})=>{
      if( !clash?.id || data?.clashItemId!==clash.clashItems[imageIdx]?.id){
        return;
      }

      setVoteCount((prev)=>data.count); 
    }

    useEffect(()=>{

      socket.on("increase-count", increaseCountEvent);

      socket.on("decrease-count", decreaseCountEvent);

      return ()=>{

        socket.off("increase-count", increaseCountEvent);

        socket.off("decrease-count", decreaseCountEvent);
      }

    },[socket]);

  return (
    <div className='flex flex-col items-center'>
        <div className={` mr-0 lg:mr-8 rounded-lg w-[500px] h-full flex justify-center items-center h-[500px] flex-col relative`}>
            <img src={ clash?.clashItems[imageIdx]?.image } className={`w-full h-full rounded shadow-xl shadow-gray-600"} `} />
        </div>
        <div className='font-semibold text-xl m-2 text-purple-600'>{voteCount}</div>
        {
          isVoteClicked
          ?
          (
            // clicked
            <div  onClick={(e)=>{ handleVoteButton(false)}} className='bg-black w-30 m-2 rounded-lg px-[8px] py-[4px] flex items-center justify-around transition'>
                <div className='text-white text-2xl'>Vote</div>
                <svg width="28px" height="28px" fill="#ffffff" version="1.1" id="Capa_1" viewBox="0 0 47 47" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="Layer_1_27_"> <g> <path d="M44.732,23.195l-4.528-0.001c-1.25,0.001-2.265,1.014-2.267,2.264v19.164c0,1.252,1.017,2.266,2.267,2.266h4.528 c1.252,0,2.268-1.014,2.268-2.266v-19.16C47,24.21,45.984,23.195,44.732,23.195z M42.927,44.521 c-0.726,0.727-1.903,0.727-2.629,0s-0.726-1.902,0-2.628c0.726-0.728,1.904-0.728,2.629,0 C43.652,42.618,43.652,43.794,42.927,44.521z"></path> <path d="M29.078,9.795c0.197-2.889,0.969-4.351,1.238-7.204c0.154-1.626-1.549-2.479-4.647-2.479 c-3.098,0-4.298,2.773-4.648,3.718c-0.774,2.092,0,8.985,0,12.394c0,2.686-4.805,4.16-10.303,4.169C3.155,20.408,0,18.6,0,23.345 c0,1.642,1.013,2.973,2.265,2.972c-1.252,0-2.266,1.334-2.265,2.974c0,1.64,1.013,2.974,2.265,2.971 C1.013,32.264,0.001,33.595,0,35.233c0,1.645,1.015,2.973,2.265,2.975c-1.25-0.002-2.265,1.33-2.264,2.975 c0,1.643,1.013,2.972,2.264,2.972c0,0,3.219,0.003,15.429,0.003c12.21,0,16.671,0,16.671,0c0.625,0,1.131-0.507,1.132-1.134 V25.82c0.001-0.183-0.045-0.362-0.129-0.524C35.367,25.296,28.535,17.773,29.078,9.795z"></path> </g> </g> </g> </g></svg>
            </div>)
          :
            // unclicked
          (<div  onClick={(e)=>{ handleVoteButton(true)}} className='bg-black m-2 w-30 rounded-lg px-2 flex items-center justify-around transition'>
                <div className='text-white text-2xl'>Vote</div>
                <svg width="40px" height="40px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(0,0), scale(1)"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="1.152"></g><g id="SVGRepo_iconCarrier"> <path d="M20.22 9.55C19.79 9.04 19.17 8.75 18.5 8.75H14.47V6C14.47 4.48 13.24 3.25 11.64 3.25C10.94 3.25 10.31 3.67 10.03 4.32L7.49 10.25H5.62C4.31 10.25 3.25 11.31 3.25 12.62V18.39C3.25 19.69 4.32 20.75 5.62 20.75H17.18C18.27 20.75 19.2 19.97 19.39 18.89L20.71 11.39C20.82 10.73 20.64 10.06 20.21 9.55H20.22ZM5.62 19.25C5.14 19.25 4.75 18.86 4.75 18.39V12.62C4.75 12.14 5.14 11.75 5.62 11.75H7.23V19.25H5.62ZM17.92 18.63C17.86 18.99 17.55 19.25 17.18 19.25H8.74V11.15L11.41 4.9C11.45 4.81 11.54 4.74 11.73 4.74C12.42 4.74 12.97 5.3 12.97 5.99V10.24H18.5C18.73 10.24 18.93 10.33 19.07 10.5C19.21 10.67 19.27 10.89 19.23 11.12L17.91 18.62L17.92 18.63Z" fill="#ffffff"></path> </g></svg>
            </div>)
        }
   </div>
  )
}

export default ClashItemCard


