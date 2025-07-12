const { createBaseModel } = require('../utils/model_helper')

const Blog = createBaseModel({
  title: String,
  author: String,
  url: String,
  likes: Number,
}, 'Blog')

module.exports = Blog