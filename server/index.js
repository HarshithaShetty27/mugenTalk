const express = require('express')   // Express framework for creating the server
const cors= require('cors')     // CORS middleware for handling Cross-Origin requests
require('dotenv').config()    // Load environment variables from a .env file
const connectDB = require('./config/connectDB')  // Importing the database connection and router
const router = require('./routes/index')      // Router for handling API routes
const cookiesParser = require('cookie-parser')  // Middleware to parse cookies from requests    
const {app,server} = require('./socket/index')

// const app=express()

// Configure CORS to allow requests from the frontend URL specified in .env
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true        // We'll allow cookies, cuz why not
}))

// Middleware to parse incoming JSON requests
app.use(express.json())
// Middleware to parse cookies
app.use(cookiesParser())

const PORT =process.env.PORT || 8080   // Setting the server port, either from environment variable or default to 8080

// Basic route to check if the server is running
app.get('/',(request,response)=>{
    response.json({
        message:"Server running at Port "+ PORT
    })
})

// api endpoints handled through the router, '/api' is the base route
app.use('/api',router)


// Connect to the database and start the server only after a successful connection
connectDB().then (()=>{
    server.listen(PORT,()=>{
        console.log("Server is running at Port "+PORT )   
    })
})
