const express = require('express');
const messageControllers = require('./message.controllers')

const messageRouter = express.Router();

messageRouter.post('/start-chat', messageControllers.startChatWithUser)
messageRouter.post('/chat-user/send-message', messageControllers.sendMessageFromChatUser)
messageRouter.post('/admin/send-message', messageControllers.sendMessageFromAdmin)
messageRouter.get('/user/all', messageControllers.getAllChatUserMessages)
messageRouter.get('/mark-as-read/:userEmail', messageControllers.messageMarkAsRead)
messageRouter.patch('/edit/:messageId', messageControllers.editMessage)
messageRouter.delete('/delete/:messageId', messageControllers.deleteSpecificMessage)
messageRouter.delete('/delete/all/:email', messageControllers.clearChatHistory)

module.exports = messageRouter