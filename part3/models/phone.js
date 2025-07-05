const mongoose = require('mongoose')

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: String,
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('phone', phoneSchema)