const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.userData = decoded
    req.userId = decoded.userId
    next()
  } catch (e) {
    return res.status(401).json({
      message: 'Xác thực thất bại',
    })
  }
}