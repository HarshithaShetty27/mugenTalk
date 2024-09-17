const UserModel = require("../models/UserModel")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Function to check the user's password and generate a token
async function checkPassword (request,response){
        try {
            const { password, userId } =request.body      // Extracting user credentials from the request body
            const user = await UserModel.findById(userId)    // Finding the user by ID
            const verifyPassword = await bcryptjs.compare(password, user.password)   //Do you remember your password this time? 
            //bcryptjs.compare used to compare hashed passwords

            if(!verifyPassword){
                // Oops! Wrong password
                return response.status(400).json({
                    message : "Please check Password",
                    error : true
                })
            }
            // Preparing the data to be included in the JWT token (user's id and email)
            const tokenData = {
                id : user._id,
                email : user.email
            }

            const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn : '1d'})   // Generating the JWT token with a 1-day expiration time

            const cookieOptions ={      // Setting options for the secure cookie (HTTPS and secure flag)
                http : true,
                secure : true
            }

            // Setting the 'token' cookie and sending a 200 status response along with the token
            return response.cookie('token',token,cookieOptions).status(200).json({   
                message : "Login successful",
                token : token,      // Return the generated JWT token in the response
                success : true
            })
            
        } catch (error) {
            // Uh-oh, something went wrong (Time to blame it on the intern)
            return response.status(500).json({
                message : error.message || error,
                error : true
            })
        }
}

module.exports = checkPassword