const { createBaseModel } = require('../utils/model_helper')

const User = createBaseModel({
  userName: {
    type: String,
    required: true,
    minLength: 3,
    unique: true
  },
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  passwordHash: {
    type: String,
    required: true
  }
}, 'User')

module.exports = User