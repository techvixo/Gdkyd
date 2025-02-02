const express = require('express')
require('express-async-errors')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const { rateLimit } = require('express-rate-limit')
const fileUpload = require('express-fileupload')
const globalErrorHandler = require('./app/middlewares/globalErrorHandler')
const notFound = require('./app/middlewares/notFound')
const Router = require('./app/routers/version1')
const { StatusCodes } = require('http-status-codes')
const sendResponse = require('./shared/sendResponse')
const cookieParser = require('cookie-parser');

const app = express()

// global middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(fileUpload())
app.use('/v1/uploads', express.static(path.join('uploads')))

const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: 'Too many attempts from your IP. Please retry in 15 minutes'
})

app.use(morgan('dev'))
// app.use(limiter)

// application middleware
app.use('/v1', Router)

app.get('/health_check', (req, res) => {
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: "success",
    message: "Server is working",
  })
})

// error handling middlewares
app.use(globalErrorHandler)
app.use(notFound)

module.exports = app
