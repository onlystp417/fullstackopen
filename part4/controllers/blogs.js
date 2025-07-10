const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogRouter.get('/:id', async (request, response, next) => {
  const result = await Blog.findById(request.params.id)
  response.status(200).json(result)
})

blogRouter.post('/', async (request, response, next) => {
  const newBlog = request.body

  if(!newBlog.hasOwnProperty('likes'))
    newBlog.likes = 0

  if(!newBlog.hasOwnProperty('title') || !newBlog.hasOwnProperty('url')) {
    const error = new Error('Missing required fields')
    error.name = 'MissingFields'
    next(error)
    return
  }

  const blog = new Blog(newBlog)

  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.put('/:id', async (request, response, next) => {
  const updatedBlog = request.body
  const result = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    { new: true, runValidators: true, overwrite: true }
  )
  response.status(200).json(result)
})

blogRouter.patch('/:id', async (request, response, next) => {
  const updatedBlog = { ...request.body }

  const result = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    { new: true, runValidators: true }
  )
  response.status(200).json(result)
})

blogRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter