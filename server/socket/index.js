const express = require('express')
const { Server } = require('socket.io')
const http  = require('http')

const app = express()

// socket connections
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
})


//running at http://localhost:8080/

io.on('connection',(socket)=>{
    console.log("Connect user",socket.id)


    //disconnect
    io.on('disconnect',()=>{
        console.log('Disconnected user',socket.id)
    })
})

module.exports={
    app,
    server
}