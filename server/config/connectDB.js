const mongoose = require('mongoose')

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)

        const connection= mongoose.connection
        connection.on('connected',()=>{
            console.log("Connected to Database")
        })
         // In case MongoDB decides to act up 
        connection.on('error',(error)=>{
            console.log("Something went wrong in MongoDB",error)
        })
    } catch(error){
        // If something goes wrong (and it probably will), we’ll log this as if we’re surprised
        console.log("Something is wrong",error)
    }
}

module.exports = connectDB