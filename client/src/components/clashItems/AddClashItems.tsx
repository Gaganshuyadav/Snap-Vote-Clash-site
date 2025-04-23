import { UploadIcon } from "../icons/UploadIcon"



export const AddClashItems = () => {

    return (
        <div>
            <div className="mt-10">
                <div className="border-2 flex h-[300px] flex-wrap lg:flex-nowrap justify-between items-center overflow-x-auto">

                    {/* First Block */}
                    <div className="border-2 ml-6 border-gray-300 rounded-lg w-[500px] h-full flex justify-center items-center border-dashed h-[500px] flex-col relative">
                        <input
                            type="file"
                            className="text-transparent absolute w-full h-full z-20"
                            accept="image/*"
                        />
                        <div className=" absolute h-full w-full z-10">
                            <UploadIcon/>
                        </div>

                    </div>

                    {/* VS Block */}
                    <div className="flex w-full lg:w-auto justify-center items-center">
                        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                            VS
                        </h1>
                    </div>

                    {/* Second Block */}
                    <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
                        <input
                            type="file"
                            // className="hidden"
                            accept="image/*"
                        />
                        <div
                            className="w-full flex justify-center items-center rounded-md border border-dashed p-2 h-[300px]"

                        >

                            <h1 className="flex space-x-2 text-xl">
                            </h1>

                        </div>

                    </div>


                </div>

                <div className=" border-2 text-center mt-4">
                    Button
                </div>
            </div>
        </div>
    )
}









