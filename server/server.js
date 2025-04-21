import express from "express";
import './config/db.js'
import { Server } from "socket.io";
import http from "http"
import { socketHandler } from "./socket/index.socket.js";


const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors : {
        origin : "http://localhost:5173",
        methods : ['GET','POST','PUT','DELETE']
    }
})

socketHandler(io)

server.listen(3000,() => {
    console.log('🚀 server is a running on 3000 ......')
})