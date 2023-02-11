const Product = require('../models/Product')
const { cloudinary } = require('../utils/cloudinary')

exports.fetchProducts = async (req, res) => {
  try {
    const pageSize = 12
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
      ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
      : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).
      limit(pageSize).
      skip(pageSize * (page - 1))

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    })

  } catch (e) {
    res.status(500)
  }
}

exports.addProduct = async (req, res) => {
  try {
    const name = req.body.product_name;
    const description = req.body.product_description;
    const type = req.body.product_type;
    const price = req.body.product_price
    const color = req.body.product_color
    const total_in_stock = req.body.total_in_stock
    const image_public_id = req.body.image_public_id
    const file = req.files.file;

    const product = new Product({
      name,
      description,
      type,
      images: file.name,
      image_public_id,
      price,
      color,
      reviews: [],
      total_in_stock,
      createdAt: new Date().toISOString(),
    })

    await product.save()
    return res.status(200).json({
      message: "Đã thêm 1 sản phẩm"
    })

  } catch (e) {
    res.status(500)
  }
}