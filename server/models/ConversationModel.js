const mongoose = require('mongoose')

const messageSchema = new mongoose.schema({
    text : {
        type : String,
        default : ""
    },
    imageUrl : {
        type: String,
        default : ""
    },
    videoUrl : {
        type : String,
        default : ""
    },
    //ghosted?
    seen : {
        type : Boolean,
        default : false
    }
},{
    //because we all need to know exactly when someone ignored our message
    timestamps: true
})

const conversationSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    },
    receiver : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    },
    messages : [                                 //Array of messages
        {
            type : mongoose.Schema.ObjectId,     // Each message gets its own ObjectId
            ref : 'Message'
        }
    ]
},{
    timestamps : true
})

const MessageModel = mongoose.model('Message',messageSchema)
const ConversationModel = mongoose.model('Conversation',conversationSchema)

module.exports = {
    MessageModel,
    ConversationModel
}