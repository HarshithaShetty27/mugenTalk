const express = require('express')
const cors= require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')

const app=express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

const PORT =process.env.PORT || 8000

app.get('/',(request,response)=>{
    response.json({
        message:"Server running at Port "+ PORT
    })
})

connectDB().then (()=>{
    app.listen(PORT,()=>{
        console.log("Server is running at Port "+PORT )
    })
})
