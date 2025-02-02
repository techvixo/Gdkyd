const { StatusCodes } = require('http-status-codes')

const notFound = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: "Route doesn't exist"
  })
}

module.exports = notFound
