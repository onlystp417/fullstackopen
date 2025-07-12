const { createBaseModel } = require('../utils/model_helper')
const mongoose = require('mongoose')

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
  },
  blogs: {
    type: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Blog' }],
    default: []
  }
}, 'User')

module.exports = User