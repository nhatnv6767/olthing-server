const mongoose = require('mongoose')
const valid = require('validator')

const productSchema = mongoose.Schema(
  {
    sku: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    parent: {
      type: String,
      required: true,
      trim: true,
    },
    children: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [String],
    image: {
      type: String,
      required: true,
      validate: [valid.isURL, 'sai đường dẫn'],
    },
    originalPrice: {
      type: Number,
      required: true,
      min: [0, 'Giá không thể là số âm'],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Giá không thể là số âm'],
    },
    relatedImages: [
      {
        type: String,
        required: true,
        validate: [valid.isUrl, 'sai đường dẫn'],
      }],
    description: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    colors: [String],
    type: String,
    itemInfo: String,
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'inActive'],
    },
  }, {
    timestamps: true,
  },
)

const Product = mongoose.model('Products', productSchema)
module.exports = Product