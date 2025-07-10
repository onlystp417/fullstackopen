const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
  } catch (exception) {
    next(eception)
  }
})

blogRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(error => next(error))
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

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch(exception) {
    next(exception)
  }
})

blogRouter.put('/:id', (request, response, next) => {
  const updatedBlog = request.body

  Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    { new: true, runValidators: true, overwrite: true }
  )
    .then(result => response.status(200).json(result))
    .catch(error => next(error))
})

blogRouter.patch('/:id', (request, response, next) => {
  const updatedBlog = { ...request.body }

  Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    { new: true, runValidators: true }
  )
    .then(result => response.status(200).json(result))
    .catch(error => next(error))
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogRouter