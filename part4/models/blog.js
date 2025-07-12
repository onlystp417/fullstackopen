const { createBaseModel } = require('../utils/model_helper')
const mongoose = require('mongoose')

const Blog = createBaseModel({
  title: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // the model name registered to mongoose
  }
}, 'Blog')

module.exports = Blog