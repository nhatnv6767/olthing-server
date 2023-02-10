require('dotenv').config()
const express = require('express')

const db = require('./config/db')

// app initialization
const app = express()

// middleware
app.use(express.json())

// connect db
db.makeDb()

// routes
// app.use('/api/products')

// root route
app.get('/', (req, res) => res.send('Apps worked successfully'))

app.use((err, req, res, next) => {
  if (res.headersSend) return next(err)
  res.status(400).json({ message: err.message })
})

const PORT = process.env.PORT || 5055

app.listen(PORT, () => console.log(`server running on port ${PORT}`))