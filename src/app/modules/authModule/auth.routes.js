const express = require('express')
const authControllers = require('./auth.controllers')
const requestValidator = require('../../middlewares/requestValidator')
const AuthValidation = require('./auth.validation')
// const authorization = require('../../middlewares/authorization')

const authRoute = express.Router()

// route for login
authRoute.post(
  '/login',
  requestValidator(AuthValidation.loginValidationZodSchema),
  authControllers.userLogin
)

// route for resend email verification link
authRoute.post('/email-verification/resend-code', authControllers.resendEmailVerificationLink)

// route for user email verify
authRoute.get(
    '/verify-email/:id',
    authControllers.userEmailVerify
)

// route for send password reset OTP
authRoute.post('/forget-password/send-otp/', authControllers.sendOTP)

// route for verify OTP
authRoute.post('/verify-otp', authControllers.verifyOTP)

// route for reset password
authRoute.post('/reset-password', authControllers.resetPassword)

// route for change password
authRoute.post('/change-password/:id', requestValidator(AuthValidation.changePasswordZodSchema), authControllers.changePassword)

// route for user stability
authRoute.post('/refresh-token',  authControllers.getAccessTokenByRefreshToken)


module.exports = authRoute
