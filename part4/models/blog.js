const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

// transform data before sent to frontend
blogSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()

    delete returnObject._id
    delete returnObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog