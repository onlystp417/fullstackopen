const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const error = require('../utils/error')
const { tokenExtractor } = require('../utils/middleware')

blogRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({})
  res.status(200).json(blogs)
})

blogRouter.get('/:id', async (req, res, next) => {
  const result = await Blog.findById(req.params.id)
  res.status(200).json(result)
})

blogRouter.post('/', tokenExtractor, async (req, res, next) => {
  const user = await User.findById(req.userId)

  if(!user)
    return next(error('User missing or invalid userId', 'CastError'))

  if(!req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('url'))
    return next(error('Missing required fields', 'MissingFields'))

  if(user._id.toString() !== req.userId)
    return next(error('Forbidden: You are not allowed to access this resource', 'AuthError'))

  const blog = new Blog({
    ...req.body,
    userId: user._id
  })

  const savedBlog = await blog.save()

  user.blogs.push(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (req, res, next) => {
  const updatedBlog = req.body
  const result = await Blog.findByIdAndUpdate(
    req.params.id,
    updatedBlog,
    { new: true, runValidators: true, overwrite: true }
  )
  res.status(200).json(result)
})

blogRouter.patch('/:id', tokenExtractor, async (req, res, next) => {
  const updatedBlog = { ...req.body }

  const result = await Blog.findByIdAndUpdate(
    req.params.id,
    updatedBlog,
    { new: true, runValidators: true }
  )
  res.status(200).json(result)
})

blogRouter.delete('/:id', tokenExtractor, async (req, res, next) => {
  const user = await User.findById(req.userId)
  const deleteBlog = await Blog.findById(req.params.id)

  if(!user)
    return next(error('User missing or invalid userId', 'CastError'))

  if(!deleteBlog)
    return next(error('Blog not found with the given id', 'CastError'))

  if(deleteBlog.userId.toString() !== user._id.toString())
    return next(error('Forbidden: You are not allowed to access this resource', 'AuthError'))

  await Blog.findByIdAndDelete(req.params.id)
  user.blogs = user.blogs.filter(blogId => blogId.toString() !== req.params.id)
  await user.save()
  res.status(204).end()
})

module.exports = blogRouter