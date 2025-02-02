const mongoose = require('mongoose')

const chatUserSchema = new mongoose.Schema(
  {
    fullName: String,
    email: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    timestamps: true
  }
)
const ChatUser = mongoose.model('chatUser', chatUserSchema)
module.exports = ChatUser
