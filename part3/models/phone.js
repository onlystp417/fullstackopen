const mongoose = require('mongoose')

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

module.exports = mongoose.model('phone', phoneSchema)