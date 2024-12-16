const express = require('express')
const requestValidator = require('../../middlewares/requestValidator')
const UserValidationZodSchema = require('./user.validation')
const userControllers = require('./user.controllers')
// const authorization = require('../../middlewares/authorization')

const userRouter = express.Router()

// userRouter.use(authorization('admin'))

// create user
userRouter.post(
  '/create',
  requestValidator(UserValidationZodSchema.createUserZodSchema),
  userControllers.createUser
)

userRouter.get('/all', userControllers.getAllUsers)

// get specific user
userRouter.get('/:id', requestValidator(UserValidationZodSchema.getSpecificUserZodSchema), userControllers.getSpecificUser)

// delete specific user
userRouter.delete('/delete/:id', requestValidator(UserValidationZodSchema.getSpecificUserZodSchema), userControllers.deleteSpecificUser)

// update specific user
userRouter.patch('/update/:id', userControllers.updateSpecificUser)

// change profile image of specific user
userRouter.patch('/update/profile-picture/:id', userControllers.changeUserProfileImage)

// route for send email for customer enquery
userRouter.post('/email/customer-enquery', userControllers.sendGetInTouch)

module.exports = userRouter
