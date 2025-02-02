const jwtHelpers = require('../../../helpers/helper.jwt')
const CustomError = require('../../errors')
const authServices = require('./auth.services')
const config = require('../../../config')
const sendResponse = require('../../../shared/sendResponse')
const { StatusCodes } = require('http-status-codes')
const {
  createLoginHistory
} = require('../loginHistoryModule/loginHistory.services')
const userServices = require('../userModule/user.services')
const User = require('../userModule/user.model')
const IdGenerator = require('../../../utils/idGenerator')
const sendMail = require('../../../utils/sendEmail')

// controller for user login
const userLogin = async (req, res) => {
  const { email, password } = req.body
  const user = await authServices.getUserByEmail(email)

  if (!user) throw new CustomError.BadRequestError('Invalid email or password!')

  // check the password is correct
  const isPasswordMatch = await user.comparePassword(password)

  if (!isPasswordMatch)
    throw new CustomError.BadRequestError('Invalid email or password')

  // generate token
  const payload = {
    userId: user.userId,
    email: user.email,
    role: user.role
  }
  const accessToken = jwtHelpers.createToken(
    payload,
    config.jwt_access_token_secret,
    config.jwt_access_token_expiresin
  )

  const refreshToken = jwtHelpers.createToken(
    payload,
    config.jwt_refresh_token_secret,
    config.jwt_refresh_token_expiresin
  )

  const userInfo = {
    userId: user.userId,
    email: user.email,
    phone: user.phone,
    _id: user._id,
    accessToken,
    refreshToken,
    isVerified: user.isEmailVerified
  }

  // create a login history
  await createLoginHistory({
    userId: user.userId,
    ipAddress: req.headers['x-forwarded-for'],
    userAgent: req.headers['user-agent']
  })

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true
  }
  res.cookie('refresh_token', refreshToken, cookieOptions)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Login successfull',
    data: userInfo
  })
}

// controller for resend email verification link
const resendEmailVerificationLink = async (req, res) => {
  const { email } = req.body
  const code = IdGenerator.generateCode()
  const expireDate = new Date()
  expireDate.setMinutes(expireDate.getMinutes() + 5)
  const verification = {
    code: code,
    expireDate
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new CustomError.BadRequestError('No user found!')
  }

  user.verification = verification
  await user.save()

  // send email verification mail
  const content = `Your veirfication code is ${verification?.code}`
  // const verificationLink = `${config.server_base_url}/v1/auth/verify-email/${user._id}?userCode=${verification.code}`
  // const content = `Click the following link to verify your email: ${verificationLink}`
  const mailOptions = {
    from: 'guangdongkyd@gmail.com',
    to: req.body.email,
    subject: 'GDKYD - Email Verification',
    text: content
  }

  sendMail(mailOptions)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Email verification code resend successfull'
  })
}

// controller for verify email
const userEmailVerify = async (req, res) => {
  const { userCode } = req.query
  const userId = req.params.id
  const user = await userServices.getSpecificUser(userId)
  const isVerificationCodeMatch = await user.compareVerificationCode(userCode)
  if (!isVerificationCodeMatch) {
    throw new CustomError.BadRequestError('Invalid code!')
  }

  if (!user) throw new CustomError.BadRequestError('User not found!')

  const now = new Date()
  if (user.verification.expireDate && user.verification.expireDate < now) {
    throw new CustomError.BadRequestError(
      'Sorry, Email verification Code using date expired!'
    )
  }

  // update the email verification status of user
  await User.findByIdAndUpdate(user._id, { isEmailVerified: true })

  // set null verification object in user model
  await User.findByIdAndUpdate(user._id, {
    verification: { code: null, expireDate: null }
  })

  res.status(StatusCodes.OK).send(`<html>
    <head>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f9fafb; /* Soft background */
                color: #333;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }

            .message {
                background-color: white;
                color: #333;
                padding: 30px 40px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                max-width: 500px;
                text-align: center;
                border: 1px solid #e0e0e0;
            }

            .message h1 {
                font-size: 24px;
                color: #4CAF50;
                margin-bottom: 20px;
            }

            .message p {
                font-size: 16px;
                color: #666;
                margin-bottom: 30px;
            }

            button {
                padding: 12px 25px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 18px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: background-color 0.3s ease, box-shadow 0.3s ease;
            }

            button:hover {
                background-color: #45a049;
                box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
            }

            button:active {
                background-color: #3e8e41;
            }

        </style>
    </head>
    <body>
        <div class="message">
            <h1>Email Verified!</h1>
            <p>Your email has been successfully verified. You can now continue to the dashboard.</p>
        </div>

        
    </body>
</html>
`)
}

// controller for send otp
const sendOTP = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new CustomError.BadRequestError('Missing email in request body!')
  }

  const user = await authServices.getUserByEmail(email)
  if (!user) {
    throw new CustomError.BadRequestError('User not found!')
  }

  const code = IdGenerator.generateCode()
  const expireDate = new Date()
  expireDate.setMinutes(expireDate.getMinutes() + 5)
  const verification = {
    code,
    expireDate
  }

  user.verification = verification
  await user.save()

  // send verification mail
  const textContent = `
  Hi ${user.fullName},
  
  You have requested to reset your password. Please use the following One-Time Password (OTP) to complete the process. This OTP is valid for 5 minutes.
  
  Your OTP: ${code}
  
  If you did not request this, please ignore this email and your password will remain unchanged.
  
  For security reasons, do not share this OTP with anyone.
  
  Best regards,
  Wintech Team
  
  Need help? Contact our support team at support@wintech.com.
  © 2024 Wintech. All rights reserved.
  `

  const mailOptions = {
    from: 'guangdongkyd@gmail.com',
    to: email,
    subject: 'GDKYD - Password Reset OTP',
    text: textContent
  }

  sendMail(mailOptions)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Password reset otp sended.'
  })
}

// controller for verify otp
const verifyOTP = async (req, res) => {
  const email = req.body.email
  const userOTP = req.body.otp

  if (!userOTP) {
    throw new CustomError.BadRequestError('Missing OTP in request body!')
  }

  const user = await authServices.getUserByEmail(email)
  if (!user) {
    throw new CustomError.BadRequestError('User not found!')
  }

  const isMatchOTP = await user.compareVerificationCode(userOTP)
  if (!isMatchOTP) {
    throw new CustomError.BadRequestError('Invalid OTP!')
  }

  // generate token
  const payload = {
    userId: user.userId,
    email: user.email,
    role: user.role
  }

  const accessToken = jwtHelpers.createToken(
    payload,
    config.jwt_access_token_secret,
    config.jwt_access_token_expiresin
  )

  const refreshToken = jwtHelpers.createToken(
    payload,
    config.jwt_refresh_token_secret,
    config.jwt_refresh_token_expiresin
  )

  // set null verification object in user model
  await User.findByIdAndUpdate(user._id, {
    verification: { code: null, expireDate: null }
  })

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'OTP match successfull',
    data: {
      email: user.email,
      role: user.role,
      phone: user.phone,
      _id: user._id,
      userId: user.userId,
      isEmailVerified: user.isEmailVerified,
      accessToken
    }
  })
}

// controller for reset password
const resetPassword = async (req, res) => {
  const email = req.body.email
  const newPassword = req.body.newPassword

  if (!email || !newPassword) {
    throw new CustomError.BadRequestError(
      'Missing new password in request body!'
    )
  }

  const user = await authServices.getUserByEmail(email)
  if (!user) {
    throw new CustomError.BadRequestError('User not found!')
  }

  user.password = newPassword
  await user.save()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Password reset successfull'
  })
}

// controller for change password
const changePassword = async (req, res) => {
  const userId = req.params.id
  const { oldPassword, newPassword } = req.body

  const user = await User.findById(userId)
  if (!user) {
    throw new CustomError.BadRequestError('User not found!')
  }

  // compare user given old password and database saved password
  const isOldPassMatch = await user.comparePassword(oldPassword)
  if (!isOldPassMatch) {
    throw new CustomError.BadRequestError('Wrong password')
  }

  user.password = newPassword
  await user.save()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Password change successfull'
  })
}

// controller for get access token by refresh token
const getAccessTokenByRefreshToken = async (req, res) => {
  const { refresh_token } = req.cookies
  const actualRefreshToken = refresh_token.split(' ')[1]

  const tokenPayload = jwtHelpers.verifyToken(
    actualRefreshToken,
    config.jwt_refresh_token_secret
  )
  if (!tokenPayload) {
    throw new CustomError.BadRequestError('Invalid refresh token!')
  }

  const user = await authServices.getUserByEmail(tokenPayload.email)
  if (!user) {
    throw new CustomError.BadRequestError('User not found!')
  }

  const payload = {
    userId: user.userId,
    email: user.email,
    role: user.role
  }

  const newAccessToken = jwtHelpers.createToken(
    payload,
    config.jwt_access_token_secret,
    config.jwt_access_token_expiresin
  )

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true
  }

  res.cookie('refresh_token', actualRefreshToken, cookieOptions)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message:
      'New access token created using refresh token. User logged In successful',
    data: {
      accessToken: newAccessToken
    }
  })
}

module.exports = {
  userLogin,
  resendEmailVerificationLink,
  userEmailVerify,
  sendOTP,
  verifyOTP,
  resetPassword,
  changePassword,
  getAccessTokenByRefreshToken
}
