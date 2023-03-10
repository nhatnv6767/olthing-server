require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fileUpload = require('express-fileupload')

const db = require('./config/db')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')

// app initialization
const app = express()

// middleware
// app.use(express.json())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
// connect db
db.makeDb()

// routes
app.use('/products', productRoutes)
app.use('/user', userRoutes)
app.use('/order', orderRoutes)

// root route
app.get('/', (req, res) => res.send('Apps worked successfully'))

app.use((err, req, res, next) => {
  if (res.headersSend) return next(err)
  res.status(400).json({ message: err.message })
})

const PORT = process.env.PORT || 5055

app.listen(PORT, () => console.log(`server running on port ${PORT}`))