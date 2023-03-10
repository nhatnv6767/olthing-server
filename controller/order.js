const Order = require('../models/Order')

exports.addOrderInfo = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      companyName,
      email,
      phone,
      country,
      address,
      city,
      postCode,
      orderNotes,
      totalPrice,
      orderItems,
    } = res.body

    const order = new Order({
      userId,
      user_first_name: firstName,
      user_last_name: lastName,
      company_name: companyName,
      user_email: email,
      user_phone: phone,
      user_country: country,
      user_address: address,
      user_city: city,
      user_postcode: postCode,
      user_order_notes: orderNotes,
      totalPrice,
      orderItems,
    })

    await order.save()
    res.status(200).json({
      message: 'Đã thêm đặt hàng thành công',
    })

  } catch (e) {
    res.status(500)
  }
}

exports.fetchOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
  } catch (err) {
    res.status(500)
  }
}

exports.updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    const updateOrder = await order.save()
    res.json(updateOrder)
  } else {
    res.status(404)
    throw new Error("Không tìm thấy đơn đặt hàng")
  }
}

exports.getOrdersByUser = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.id })
    if (!order) return res.status(404).
      json({ msg: "Đơn đặt hàng không tồn tại" })
    res.status(200).json(order)
  } catch (e) {
    res.status(500)
  }
}