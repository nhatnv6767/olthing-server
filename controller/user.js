const bcrypt = require('bcryptjs')

const User = require('../models/User')
const genAccTkn = require('../helpers/genAccessToken')
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../utils/validators')

exports.postLogin = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const { errors, valid } = validateLoginInput(email, password)

    if (!valid) {
      return res.status(401).json({
        errors
      })
    }

    const user = await User.findOne({
      email,
    })
    if (!user) {
      return res.status(401).json({
        error: "Email or mật khẩu không chính xác"
      })
    }

    const isEqual = await bcrypt.compare(password, user.password)

    if (!isEqual) {
      return res.status(401).json({
        error: "Email or mật khẩu không chính xác"
      })
    }

    const token = genAccTkn.generateAccessToken(user)
    return res.status(200).json({
      id: user.id,
      token,
      tokenExpiration: "24h"
    })

  } catch (err) {
    res.status(500)
  }
}

exports.postRegister = async (req, res) => {
  try {

    const name = req.body.name
    const username = req.body.username
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password

    const { valid, errors } = validateRegisterInput(
      name, username, email, phone, password
    )

    if (!valid) {
      return res.status(401).json({
        errors,
      })
    }
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(401).json({
        error: "Xin lỗi! Email đã có người sử dụng"
      })
    }

    const hasedPassword = await bcrypt.hash(password, 12)

    const user = new User({
      name,
      username,
      email,
      phone,
      role: "user",
      password: hasedPassword,
      orders: []
    })

    await user.save()

    res.status(200).json({
      message: "Đã đăng ký thành công tài khoản"
    })

  } catch (err) {
    res.status(500)
  }
}