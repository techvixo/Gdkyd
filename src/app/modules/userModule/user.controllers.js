/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes')
const sendResponse = require('../../../shared/sendResponse')
const fileUploader = require('../../../utils/fileUploader')
const IdGenerator = require('../../../utils/idGenerator')
const CustomError = require('../../errors')
const {
  createVerification
} = require('../varificationModule/verification.services')
const userServices = require('./user.services')
const { server_base_url } = require('../../../config')
const sendMail = require('../../../utils/sendEmail')

// controller for create new user
const createUser = async (req, res) => {
  const userData = req.body

  const userId = IdGenerator.generateUserId()
  const userImagePath = await fileUploader(
    req.files,
    `user-image-${userData.userName}`,
    'image'
  )

  const expireDate = new Date()
  expireDate.setMinutes(expireDate.getMinutes() + 30)

  userData.userId = userId
  userData.image = userImagePath
  userData.verification = {
    code: IdGenerator.generateCode(),
    expireDate
  }

  const user = await userServices.createUser(userData)
  if (!user) {
    throw new CustomError.BadRequestError('Failed to create new user!')
  }

  const { password, ...userInfoAcceptPass } = user.toObject()

  // send email verification mail
  const content = `Your veirfication code is ${userData?.verification?.code}`
  // const verificationLink = `${server_base_url}/v1/auth/verify-email/${user._id}?userCode=${userData.verification.code}`
  // const content = `Click the following link to verify your email: ${verificationLink}`
  const mailOptions = {
    from: 'guangdongkyd@gmail.com',
    to: req.body.email,
    subject: 'GDKYD - Email Verification',
    text: content
  }

  sendMail(mailOptions)

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'User creation successfull',
    data: userInfoAcceptPass
  })
}

// Controller for getting all users
const getAllUsers = async (req, res) => {
  const users = await userServices.getAllUser()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Users retrieved successfully',
    data: users
  })
}

// controller for get specific user
const getSpecificUser = async (req, res) => {
  const { id } = req.params
  const user = await userServices.getSpecificUser(id)
  if (!user) {
    throw new CustomError.BadRequestError('No user found!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'User found successfull',
    data: user
  })
}

// controller for delete specific user
const deleteSpecificUser = async (req, res) => {
  const { id } = req.params
  const user = await userServices.deleteSpecificUser(id)
  if (!user.deletedCount) {
    throw new CustomError.BadRequestError('Failed to delete user!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'User delete successfull'
  })
}

// controller for update specific user
const updateSpecificUser = async (req, res) => {
  const { id } = req.params
  const data = req.body
  if (data.userId || data.email || data.password) {
    throw new CustomError.BadRequestError(
      "You can't update usesrId, email and password directly!"
    )
  }
  const updatedUser = await userServices.updateSpecificUser(id, data)
  if (!updatedUser.modifiedCount) {
    throw new CustomError.BadRequestError('Failed to update user!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'User update successfull'
  })
}

// controller for change profile image of specific user
const changeUserProfileImage = async (req, res) => {
  const { id } = req.params
  const files = req.files

  const user = await userServices.getSpecificUser(id)

  const userImagePath = await fileUploader(
    files,
    `user-image-${user.userName}`,
    'image'
  )
  const updateUser = await userServices.updateSpecificUser(id, {
    image: userImagePath
  })

  if (!updateUser.modifiedCount) {
    throw new CustomError.BadRequestError(
      'Failed to change user profile image!'
    )
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'User profile change successfull'
  })
}

// controller for send get in touch email
const sendGetInTouch = async (req, res) => {
  const data = req.body

  const textContent = `
  Name: ${data.name}
  Phone Number: ${data.phone}
  Email: ${data.email}

  Enquery: ${data.enquery}

  Editional-info: ${data.editionalInfo}
  `

  const mailOptions = {
    from: 'guangdongkyd@gmail.com',
    to: 'guangdongkyd@gmail.com',
    subject: 'GDKYD - Customer Enquery',
    text: textContent
  }

  sendMail(mailOptions)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'email sended successfull'
  })
}

module.exports = {
  createUser,
  getAllUsers,
  getSpecificUser,
  deleteSpecificUser,
  updateSpecificUser,
  changeUserProfileImage,
  sendGetInTouch,
}
