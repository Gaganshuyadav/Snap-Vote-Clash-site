"use client"

import { io} from "socket.io-client";

const socket = io( process.env.NEXT_PUBLIC_BACKEND_API_URL);

export { socket};









