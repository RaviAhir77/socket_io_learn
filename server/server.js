import express from "express";
import './config/db.js'
import { Server } from "socket.io";
import http from "http"


const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors : {
        origin : "http://localhost:5173",
        methods : ['GET','POST','PUT','DELETE']
    }
})

io.on('connection',(socket) => {
    console.log('🟢 new client is a connected : ',socket.id)


    socket.on('disconnect',() => {
        console.log('🔴 client disconnected .....',socket.id)
    })
})

server.listen(3000,() => {
    console.log('🚀 server is a running on 3000 ......')
})