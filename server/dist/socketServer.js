import { Server } from "socket.io";
import { createServer } from "http";
import { app } from "./index.js";
import { env } from "./config/env.config.js";
import { votingChangeQueue } from "./jobs/VotingJobs.js";
import { commentAddQueue, commentWorkerForTakingIO } from "./jobs/CommentJobs.js";
//web socket and its routes
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
/*nedded to get the io  from here , cause you can give under the connection( otherwise if pass with comment queue in socket then this error occurs:- data: JSON.stringify(typeof this.data === 'undefined' ? {} : this.data), [0] ^ [0] TypeError: Converting circular structure to JSON [0] --> starting at object with constructor 'Server' [0] | property 'sockets' -> object with constructor 'Namespace' [0] --- property 'server' closes the circle [0] at JSON.stringify (<anonymous>) ) */
commentWorkerForTakingIO(io);
io.on("connection", (socket) => {
    socket.on("send-comment", async (data) => {
        if (!data?.clashId || !data.comment) {
            return;
        }
        //add comment in database and also send with socketio
        commentAddQueue({ ...data });
    });
    socket.on("increase-count", async (data) => {
        if (!data?.clashId || !data?.clashItemId) {
            return;
        }
        //increase count in clash item DB with queue
        votingChangeQueue({ countType: "increase-count", clashItemId: data.clashItemId, count: data.count });
        io.emit("increase-count", { ...data, count: data.count + 1 });
    });
    socket.on("decrease-count", async (data) => {
        if (!data?.clashId || !data?.clashItemId) {
            return;
        }
        //decrease count in clash item DB with queue
        votingChangeQueue({ countType: "decrease-count", clashItemId: data.clashItemId, count: data.count });
        io.emit("decrease-count", { ...data, count: data.count - 1 });
    });
});
const PORT = env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    console.log(process.env.PORT);
});
