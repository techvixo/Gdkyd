const ChatUser = require("./chatUser.model")
const Message = require("./message.model")

// service for get all message by userEmail
const getAllMessageByUserEmail = async(userEmail) => {
    return await Message.find({userEmail})
}

// service for create message 
const createMessage = async(data) => {
    return await Message.create(data)
}

// service for create new chatUser
const createChatUser = async(data) => {
    return await ChatUser.create(data)
}

// service for get chatUser by email
const getChatUserByEmail = async(email) => {
    return await ChatUser.findOne({email})
}

// service for update message status
const updateMessageStatus = async(userEmail, status) => {
    return await Message.updateOne({userEmail}, status, {
        runValidators: true
    })
}

// service for find message by message id
const getMessageById = async(messageId) => {
    return await Message.findOne({_id: messageId})
}

// service for delete message by message id
const deleteMessageById = async(messageId) => {
    return await Message.deleteOne({_id: messageId})
}

// service for delete all message of a chat user
const deleteAllMessageOfAChatUser = async(userEmail) => {
    return await Message.deleteMany({userEmail})
}

module.exports = {
    getAllMessageByUserEmail,
    createMessage,
    createChatUser,
    getChatUserByEmail,
    updateMessageStatus,
    getMessageById,
    deleteMessageById,
    deleteAllMessageOfAChatUser,
}