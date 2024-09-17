const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")

// Function to retrieve user details from the token stored in cookies
async function userDetails(request,response){
    try {
        // Retrieving the token from the cookies (if it exists)
        const token = request.cookies.token || ""

        // Using the helper function to extract user details from the token
        const user = await getUserDetailsFromToken(token)
        
        // Sending a 200 response with the user details if token is valid
        return response.status(200).json({
            message : "User Details",
            data : user
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = userDetails