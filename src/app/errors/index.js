const BadRequestError = require('./error.badRequest')
const ForbiddenError = require('./error.forbidden')
const NotFoundError = require('./error.notFound')
const UnAuthorizedError = require('./error.unAuthorized')

const CustomError = {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnAuthorizedError
}

module.exports = CustomError
