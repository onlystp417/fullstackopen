const { createBaseModel } = require('../utils/model_helper')
const mongoose = require('mongoose')

const Blog = createBaseModel({
  title: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  },
  author: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // the model name registered to mongoose
  },
  comments: {
    type: Array,
    default: []
  }
}, 'Blog')

module.exports = Blog