require('dotenv').config()
const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI

exports.makeDb = async () => {
  try {
    mongoose.set('useCreateIndex', true)
    await mongoose.connect(
      MONGO_URI,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
    )
    mongoose.set('useFindAndModify', false)
    console.log('mongodb connection success!')
  } catch (err) {
    console.log('mongodb connection failed!', err.message)
  }
}

