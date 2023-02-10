const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Nhập vào họ tên'],
      trim: true,
      minLength: [3, 'Độ dài tối thiểu của tên là 3 ký tự'],
      maxLength: [100, 'Tên quá dài'],
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
      type: String,
      required: true,
    },
    newpassword: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    email_confirmation: {
      type: String,
      required: false,
    },
    reset_password_token: {
      type: String,
      required: false,
    },
    reset_password_expiration: {
      type: String,
      required: false,
    },

  },
  // {
  //   timestamps: true,
  // },
)

// userSchema.pre('save', function (next) {
//   if (!this.isModified('password')) {
//     // only run if password is modified, otherwise it will change every time we save the user!
//     return next()
//   }
//
//   const password = this.password
//   const hashedPassword = bcrypt.hashSync(password)
//   this.password = hashedPassword
//   next()
// })
//
// // comparePassword
// userSchema.methods.comparePassword = function (password, hash) {
//   const isPasswordValid = bcrypt.compareSync(password, hash)
//   return isPasswordValid
// }
//
// // generateConfirmationToken
// userSchema.methods.generateConfirmationToken = function () {
//   const token = crypto.randomBytes(32).toString('hex')
//   this.confirmationToken = token
//   const date = new Date()
//
//   date.setDate(date.getDate() + 1)
//   this.confirmationTokenExpires = date
//
//   return token
// }

module.exports = mongoose.model('User', UserSchema)
