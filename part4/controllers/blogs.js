const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then((blogs) => response.status(200).json(blogs))
    .catch(error => next(error))
})

blogRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(error => next(error))
})

blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save()
    .then((result) => response.status(201).json(result))
    .catch(error => next(error))
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

blogRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))

})

module.exports = blogRouter