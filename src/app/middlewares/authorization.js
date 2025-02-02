const { jwt_access_token_secret } = require('../../config')
const jwtHelpers = require('../../helpers/helper.jwt')
const CustomError = require('../errors')

const authorization = (...requiredRoles) => {
  return async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      throw new CustomError.UnAuthorizedError('Unauthorized access!')
    }

    const userPayload = jwtHelpers.verifyToken(token, jwt_access_token_secret)

    req.user = userPayload

    // Guard for role
    if (requiredRoles.length && !requiredRoles.includes(userPayload.role)) {
      throw new CustomError.ForbiddenError('Forbidden!')
    }
    next()
  }
}


module.exports = authorization;