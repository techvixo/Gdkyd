const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true
    },
    sender: {
      type: String,
      enum: ['user', 'admin'],
      required: true
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ['unread', 'read'],
      default: 'unread'
    }
  },
  {
    timestamps: true
  }
)
const Message = mongoose.model('message', messageSchema)
module.exports = Message
