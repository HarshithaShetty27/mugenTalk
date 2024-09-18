// Logout function to clear the authentication token from cookies
async function logout(request,response){
    try {
        const cookieOptions ={      // Setting options for the secure cookie (HTTPS and secure flag)
            http : true,           // Indicating that the cookie is accessible via HTTP(S) only
            secure : true       // Ensuring the cookie is sent over HTTPS only
        }

        // Clearing the 'token' cookie by setting it to an empty string
        return response.cookie('token','',cookieOptions).status(200).json({
            message : "Session Timeout!",      
            success : true          
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message ||error,
            error : true
        })
    }
}

module.exports = logout