require('dotenv').config()
const mongoose = require('mongoose')
const e = require('express')

mongoose.set('strictQuery', false)

const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('mongodb connection success!')
  } catch (err) {
    console.log('mongodb connection failed!', err.message)
  }
}

module.exports = connectDB