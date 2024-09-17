const jwt = require('jsonwebtoken')    // Importing JWT for token verification
const UserModel = require('../models/UserModel')

// Function to extract and return user details from a given JWT token
const getUserDetailsFromToken = async(token) =>{

    // Check if the token is present; if not, return a session timeout message
    if(!token){
        return {
            message : "Session Time-out!",
            logout : true
        }
    }

    // Verifying the token using the secret key stored in environment variables
    const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY)

    // Fetching the user details from the database using the user ID extracted from the token
    // Excluding the password field from the result using 'select'
    const user = await UserModel.findById(decode.id).select('-password')

    return user
}

module.exports = getUserDetailsFromToken