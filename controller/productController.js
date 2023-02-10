const Product = require('../models/Product')

module.exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.send({
      message: 'Đã thêm sản phẩm thành công',
    })
  } catch (err) {
    res.status(500).send({
      message: err.message,
    })
  }
}

module.exports.addAllProducts = async (req, res) => {
  try {
    await Product.deleteMany()
    const result = await Product.insertMany(req.body)
    res.send({
      message: 'Đã thêm các sản phẩm thành công',
      result,
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    })
  }
}
// get all category
module.exports.getShowingProducts = async (req, res) => {
  try {
    const result = await Product.find({ status: 'active' })
    res.json({
      success: true,
      products: result,
    })
  } catch (err) {
    res.status(500).send({
      message: err.message,
    })
  }
}

// getDiscountProduct
module.exports.getDiscountProduct = async (req, res) => {
  
}