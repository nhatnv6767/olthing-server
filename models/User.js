const mongoose = require('mongoose')
const validator = require('validator')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, 'Vui lòng cung cấp email chính xác'],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'Cần nhập vào email'],
    },
    password: {
      type: String,
      required: [true, 'Cần nhập vào mật khẩu'],
      minLength: [6, 'Mật khẩu cần ít nhất 6 ký tự'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    name: {
      type: String,
      required: [true, 'Nhập vào họ tên'],
      trim: true,
      minLength: [3, 'Độ dài tối thiểu của tên là 3 ký tự'],
      maxLength: [100, 'Tên quá dài'],
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        'Xin hãy cung cấp số điện thoại chính xác'],
    },
    shippingAddress: String,
    imageURL: {
      type: String,
      validate: [validator.isURL, 'Cần cung cấp đường dẫn chính xác'],
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: 'inactive',
      enum: ['active', 'inactive', 'blocked'],
    },

    confirmationToken: String,
    confirmationTokenExpires: Date,

    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    // only run if password is modified, otherwise it will change every time we save the user!
    return next()
  }

  const password = this.password
  const hashedPassword = bcrypt.hashSync(password)
  this.password = hashedPassword
  next()
})

// comparePassword
userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash)
  return isPasswordValid
}

// generateConfirmationToken
userSchema.methods.generateConfirmationToken = function () {

}