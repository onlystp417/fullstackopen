const mongoose = require('mongoose')

require('dotenv').config()

const uri = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err.message))

module.exports = mongoose