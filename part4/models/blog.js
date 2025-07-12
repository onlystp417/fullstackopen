const { createBaseModel } = require('../utils/model_helper')

const Blog = createBaseModel({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  }
}, 'Blog')

module.exports = Blog