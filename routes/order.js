const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')

const orderController = require('../controller/order')

router.get('/', orderController.fetchOrders)
router.post('/add-order-info', orderController.addOrderInfo)
router.put('/:id/deliver', orderController.updateOrderToDelivered)
router.get('/myorders/:id', orderController.getOrdersByUser)

module.exports = router