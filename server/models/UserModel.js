// Importing mongoose, because we need it to make sense of our database
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"provide name"]   // No name, no user – seems fair enough
    },
    email:{
        type: String,
        required: [true,"provide email"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "provide password"]
    },
    profile_pic:{
        type: String,
        default: ""    // Totally fine if they don't want to grace us with their profile pic 
    }
},{
    timestamps: true
})

//fancy aah code
const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel