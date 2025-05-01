"use client";
import { ChangeEvent, useRef, useState } from "react"
import { UploadIcon } from "../icons/UploadIcon"
import { Button } from "../ui/button"
import axios from "axios";
import { ClashFetchType } from "@/types/types";
import { CustomUser } from "@/app/api/auth/[...nextauth]/auth";
import { useRouter } from "next/navigation";


export const AddClashItems = ( { clash, user}:{ clash:ClashFetchType, user:CustomUser}) => {

    const leftImageRef = useRef<HTMLImageElement|null>( null);
    const rightImageRef = useRef<HTMLImageElement|null>(null); 
    const [ loading, setLoading] = useState(false);
    const [ uploadedImages, setUploadedImages] = useState<Array<{image:File|null}>>([{ image:null}, { image:null}]);
    const router = useRouter();


     const handleImageUpload = ( e:ChangeEvent<HTMLInputElement>, idx:number)=>{
        
        if(e.target.files===null || e.target.files.length < 1 || leftImageRef.current===null || rightImageRef.current===null) {
            console.log("return")
            return;
        }

        //now show image in ui
        idx===0 ? (leftImageRef.current.src = URL.createObjectURL(e.target.files[0])):(rightImageRef.current.src = URL.createObjectURL(e.target.files[0]));

        //set image
        const updatingImages = [ ...uploadedImages];
        updatingImages[idx].image = e?.target?.files[0] as File;
        setUploadedImages(updatingImages);
     }



     const handleClashItemsSubmit = async ()=>{

        if(uploadedImages[0].image===null || uploadedImages[1].image===null){
            return;
        }
        
        const formData = new FormData();
        formData.append("id", clash.id);
        uploadedImages?.forEach((imageObj)=>{

            if(imageObj.image!==null){
                formData.append("images",imageObj.image);
            }
            
        });
        
        setLoading(true);
       
        try{
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/clash/items`, 
                formData
                ,
                { 
                    headers:{ "Content-Type":"multipart/form-data", "Authorization":`Bearer ${user?.token}` }
                } );
                
                router.push("/dashboard");


          }
          catch(err){
            console.log(err);
          }

          setLoading(false);

    };


    return (
        <div>
            { loading && (<div className="text-3xl text-black">Loading...</div>)}
            <div className="mt-10">
                <div className=" flex h-[300px] flex-wrap lg:flex-nowrap justify-center items-center overflow-x-auto overflow-y-none">

                    {/* First Block */}
                    <div className={` ${uploadedImages[0].image===null && "border-2" }  mr-0 lg:mr-8  hover:bg-gray-100 border-gray-300 rounded-lg w-[500px] h-full flex justify-center items-center border-dashed h-[500px] flex-col relative`}>
                        <input
                            type="file"
                            className="text-transparent absolute w-full h-full z-20"
                            accept="image/*"
                            onChange={(e)=>{ handleImageUpload( e, 0)}}
                        />
                        <img ref={leftImageRef} className={`${uploadedImages[0].image!==null && " w-full h-full rounded shadow-xl shadow-gray-600"} `} />

                        {
                            uploadedImages[0].image===null
                            &&
                            (<div className="flex absolute h-full w-full z-10 items-center justify-center">
                                <UploadIcon/>
                            </div>)
                        }

                    </div>

                    {/* VS Block */}
                    <div className="flex w-full lg:w-auto justify-center items-center ">
                        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                            VS
                        </h1>
                    </div>

                    {/* Second Block */}
                    <div className={` ${uploadedImages[1].image===null && "border-2" } ml-0 lg:ml-8 hover:bg-gray-100 border-gray-300 rounded-lg w-[500px] h-full flex justify-center items-center border-dashed h-[500px] flex-col relative`}>
                    <input
                            type="file"
                            className="text-transparent absolute w-full h-full z-20"
                            accept="image/*"
                            onChange={(e)=>{ handleImageUpload( e, 1)}}
                        />
                            <img ref={rightImageRef} className={`${uploadedImages[1].image!==null && " w-full h-full rounded shadow-xl shadow-gray-600" } `} />

                        {
                            uploadedImages[1].image===null
                            &&
                            (<div className="flex absolute h-full w-full z-10 items-center justify-center">
                                <UploadIcon/>
                            </div>)
                        }

                    </div>
                </div>

                <div className="text-center mt-4 ">
                    <Button onClick={handleClashItemsSubmit} className="bg-gradient-to-r from-pink-400 to-purple-500 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 transition px-8 py-6 tracking-wider">Submit</Button>
                </div>
            </div>
        </div>
    )
}









