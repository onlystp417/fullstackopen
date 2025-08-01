const mongoose = require('mongoose')

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d+/.test(v);
      },
      message: props => `${props.value} is not a valid phone number: xx-xxxxx or xxx-xxxxx`
    },
    required: [true, 'User phone number required']
  }
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('phone', phoneSchema)