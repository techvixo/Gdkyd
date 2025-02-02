const { StatusCodes } = require('http-status-codes')

const devErrorResponse = (error, res) => {
  return res.status(error.statusCode).json({
    error: error.message,
    errorTrace: error.stack
  })
}

const prodErrorResponse = (error, res) => {
  return res.status(error.statusCode).json({
    error: error.message
  })
}

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  err.message = err.message || 'Something went wrong, try again later'

  if (err.name === 'ValidationError') {
    err.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    err.statusCode = StatusCodes.BAD_REQUEST
  }

  if (err.code && err.code === 11000) {
    err.message = `${Object.keys(err.keyValue)} is already exist!`
    err.statusCode = StatusCodes.BAD_REQUEST // 400
  }

  if (process.env.NODE_ENV?.trim() === 'development') {
    devErrorResponse(err, res)
  } else if (process.env.NODE_ENV?.trim() === 'production') {
    prodErrorResponse(err, res)
  }
}

module.exports = globalErrorHandler
