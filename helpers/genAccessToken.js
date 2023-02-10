const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.generateAccessToken = (user = {}) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '24h',
    },
  )
}