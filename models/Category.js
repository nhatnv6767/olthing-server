const mongoose = require('mongoose')
const valid = require('validator')

const categorySchema = mongoose.Schema({
  parent: {
    type: String,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    required: true,
    validate: [valid.isUrl, 'sai đường dẫn'],
  },
  children: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ['Show', 'Hide'],
    default: 'Show',
  },
}, {
  timestamps: true,
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category