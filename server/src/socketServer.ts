import { Server, Socket } from "socket.io";
import { createServer} from "http";
import { app } from "./index.js";
import { env } from "./config/env.config.js";
import { prisma } from "./prisma-client/PrismaClient.js";


//web socket and its routes
const server = createServer(app);

const io = new Server( server, {
    cors:{
        origin:"*"
    }
})


io.on("connection",  ( socket:Socket)=>{

    socket.on("send-comment", async (data:{ clashId:string, comment:string})=>{

        if( !data?.clashId || !data.comment){
            return;
        }
        
        //add comment in database
        const commentDB = await prisma.comment.create({
            data:{
                clash_id: data.clashId,
                content: data.comment
                
            }
        })

        io.emit("send-comment", commentDB);
        

    });

    socket.on("increase-count", async (data:{ clashId:string, clashItemId: string, count:number})=>{

        if( !data?.clashId || !data?.clashItemId ){
            return;
        }



        //increase count in clash item DB
        const clashItemDB = await prisma.clashItem.update({
            where:{
                id: data.clashItemId
            },
            data: {
                count: data.count+1
            }
        })

        io.emit("increase-count", { clashId: clashItemDB.clash_id, clashItemId: clashItemDB.id, count:clashItemDB.count} )
        

    });
    
    socket.on("decrease-count", async (data:{ clashId:string, clashItemId:string, count:number})=>{

        if( !data?.clashId || !data?.clashItemId ){
            return;
        }



        //increase count in clash item DB
        const clashItemDB = await prisma.clashItem.update({
            where:{
                id: data.clashItemId
            },
            data: {
                count: data.count>0 ? data.count-1 : 0
            }
        })

        io.emit("decrease-count", { clashId: clashItemDB.clash_id, clashItemId: clashItemDB.id, count:clashItemDB.count} )
        

    });



})



const PORT = env.PORT || 8080;
server.listen( PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    console.log(process.env.PORT);
})


