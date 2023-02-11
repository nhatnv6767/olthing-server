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