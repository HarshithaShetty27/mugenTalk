const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")
const UserModel = require("../models/UserModel")

async function updateUserDetails(request, response){
    try {
        // Retrieving the token from the cookies
        const token = request.cookies.token || ""

        // Using helper function to extract the user details from the token
        const user = await getUserDetailsFromToken(token) 

        // Extracting new user data (name and profile_pic) from the request body
        const {name, profile_pic} = request.body
        
         // Updating the user's information in the database using the user ID
        const updateUser = await UserModel.updateOne({_id : user._id},{
            name,
            profile_pic
        })

        const userInformation = await UserModel.findById(user._id)

        // Sending a success response with the updated user information
        return response.json({
            message : "User updated successfully!",
            data : userInformation,
            success : true
        })

    } catch (error) {
        response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = updateUserDetails