const UserModel = require("../models/UserModel")

// Async function to check if the provided email exists in the database
async function checkEmail(request, response){
    try {
        const {email} = request.body

        const checkEmail = await UserModel.findOne({email}).select("-password")  //don't send password to the frontend - cuz Why tf wud u do that!?

        // Oh wow, no user with that email? What a shocker!
        if(!checkEmail){
            return response.status(400).json({
                message : "User with this email ID doesn't exist",
                error : true 
            })
        }

        //The email exists. Let’s celebrate by sending this totally useful data back to the frontend
        return response.status(200).json({
            message : "Verify Email",
            success : true,
            data : checkEmail
        })

    } catch (error) {
        //it's always the server's fault, right?
        return response.status(500).json({
            message : error.message || error,
            error : true   // Just in case you didn't realize, yes, this is an error
        })
    }
}

module.exports = checkEmail