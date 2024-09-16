const UserModel = require("../models/UserModel")
const bcryptjs = require('bcryptjs')  //cuz apparently we need to keep their passwords safe

async function registerUser(request, response){
    try{
        // Destructuring request body, because typing 'request.body.whatever' is way too much work
        const {name, email, password, profile_pic} = request.body

        const checkEmail =  await UserModel.findOne({email})   // find if the email already exists in the database

        if (checkEmail){
            return response.status(400).json({
                message: "User Already exists",
                error : true
            })
        }

        // password -> hashPassword using bcrypt

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await  bcryptjs.hash(password,salt)  // Hashing the password, because that's what all the cool apps (like random password generator) do

        const payload = {
            name, 
            email,
            profile_pic,
            password : hashPassword
        }

        // Creating a new user and saving it to the database
        const user = new UserModel(payload)
        const userSave = await user.save()

        return response.status(201).json({
            message : "User created successfully",
            data : userSave, // Send back the user data
            success : true 
        })

    } catch(error){
        // If things go south, we'll just blame the server, as usual
        return response.status(500).json({
            message : error.message || error,  // Either tell us what went wrong or we'll make it up
            error : true
        })
    }
}

module.exports = registerUser