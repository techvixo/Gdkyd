const jwt = require('jsonwebtoken')

const createToken = (payload, secret, expireTime) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: expireTime
  })
  return `Bearer ${token}`
}

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret)
}

const jwtHelpers = {
  createToken,
  verifyToken
}

module.exports = jwtHelpers
