const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUri = process.env.MONGODB_URI
mongoose.connect(mongoUri, { family: 4 })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err.message))

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
