const { StatusCodes } = require('http-status-codes')
const sendResponse = require('../../../shared/sendResponse')
const CustomError = require('../../errors')
const messageServices = require('./message.services')
const Message = require('./message.model')

// controller for start-chat with user by email
const startChatWithUser = async (req, res) => {
  const data = req.body

  const chatUser = await messageServices.getChatUserByEmail(data.email)

  if (!chatUser) {
    const chatUser = await messageServices.createChatUser(data)
    if (!chatUser) {
      throw new CustomError.BadRequestError('Failed to start chat!')
    }
  }

  // fetch previous message if any
  const messages = await messageServices.getAllMessageByUserEmail(data.email)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Chat start successfull.',
    data: {
      fullName: chatUser.fullName,
      email: chatUser.email,
      previousMessages: messages
    }
  })
}

// controller for send-message from chat user
const sendMessageFromChatUser = async (req, res) => {
  const { email, message } = req.body
  if (!message || !email) {
    throw new CustomError.BadRequestError('Missing data in request body!')
  }

  const chatUser = await messageServices.getChatUserByEmail(email)
  if (!chatUser) {
    throw new CustomError.BadRequestError('Chat user not found!')
  }

  const messagePayload = {
    userEmail: email,
    sender: 'user',
    message
  }

  const result = await messageServices.createMessage(messagePayload)
  if (!result) {
    throw new CustomError.BadRequestError('Failed to send message!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Message send successful.'
  })
}

// controller for send-message from admin
const sendMessageFromAdmin = async (req, res) => {
  const { chatUserEmail, message } = req.body
  if (!message || !chatUserEmail) {
    throw new CustomError.BadRequestError('Missing data in request body!')
  }

  const chatUser = await messageServices.getChatUserByEmail(chatUserEmail)
  if (!chatUser) {
    throw new CustomError.BadRequestError('Chat user not found!')
  }

  const messagePayload = {
    userEmail: chatUserEmail,
    sender: 'admin',
    message
  }

  const result = await messageServices.createMessage(messagePayload)
  if (!result) {
    throw new CustomError.BadRequestError('Failed to send message!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Message send successful.'
  })
}

// controller for get all chat-user messages
const getAllChatUserMessages = async (req, res) => {
  // Find all unique user emails in the Message collection
  const userEmails = await Message.distinct('userEmail')

  // Get messages grouped by user email with sorting
  const userMessages = await Promise.all(
    userEmails.map(async (email) => {
      const messages = await Message.find({ userEmail: email }).sort({
        createdAt: 1
      })

      const hasUnread = messages.some((msg) => msg.status === 'unread')

      const latestMessageTimestamp = messages[messages.length - 1].createdAt

      return { email, messages, hasUnread, latestMessageTimestamp }
    })
  )

  // Sort: unread users at the top, then by latest message createdAt descending
  const sortedUserMessages = userMessages.sort((a, b) => {
    if (a.hasUnread !== b.hasUnread) {
      return a.hasUnread ? -1 : 1 // Place users with unread messages on top
    }
    return b.latestMessageTimestamp - a.latestMessageTimestamp // Sort by latest message timestamp
  })

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Messages retrive successfull.',
    data: sortedUserMessages
  })
}

// controller for message mark-as-read
const messageMarkAsRead = async (req, res) => {
  const { userEmail } = req.params
  const chatUser = await messageServices.getChatUserByEmail(userEmail)
  if (!chatUser) {
    throw new CustomError.BadRequestError('Chat user not found!')
  }

  const updatedMessage = await messageServices.updateMessageStatus(userEmail, {
    status: 'read'
  })
  if (!updatedMessage.modifiedCount) {
    throw new CustomError.BadRequestError('Failed to mark message as read!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Message mark as read successfull.'
  })
}

// controller for edit message
const editMessage = async (req, res) => {
  const { messageId } = req.params
  const { newContent } = req.body

  const currentMsg = await messageServices.getMessageById(messageId)
  if (!currentMsg) {
    throw new CustomError.BadRequestError('No message found for edit!')
  }

  currentMsg.message = newContent
  await currentMsg.save()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Message edit successfull.'
  })
}

// controlller for delete specific message
const deleteSpecificMessage = async (req, res) => {
  const { messageId } = req.params

  const deletedMsg = await messageServices.deleteMessageById(messageId)
  if (!deletedMsg.deletedCount) {
    throw new CustomError.BadRequestError('Failed to delete message')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Message delete successful.'
  })
}

// controller for clear chat history of a chat user
const clearChatHistory = async (req, res) => {
  const { email } = req.params

  const deletedAll = await messageServices.deleteAllMessageOfAChatUser(email)
  if (!deletedAll.deletedCount) {
    throw new CustomError.BadRequestError('Failed to delete messages')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Messages delete successful.'
  })
}

module.exports = {
  startChatWithUser,
  sendMessageFromChatUser,
  sendMessageFromAdmin,
  getAllChatUserMessages,
  messageMarkAsRead,
  editMessage,
  deleteSpecificMessage,
  clearChatHistory,
}
