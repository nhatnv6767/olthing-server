require('dotenv').config()
const express = require('express')
const { getLogger } = require('nodemailer/lib/shared')

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.send('Apps worked successfully'))

app.use((err, req, res, next) => {
  if (res.headersSend) return next(err)
  res.status(400).json({ message: err.message })
})

const PORT = process.env.PORT || 5055

app.listen(PORT, () => console.log(`server running on port ${PORT}`))