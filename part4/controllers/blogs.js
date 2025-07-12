const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const error = require('../utils/error')

const getTokenFrom = req => {
  const auth = req.get('authorization')
  return auth && auth.startsWith('Bearer ') ? auth.replace('Bearer ', '') : null
}

blogRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({})
  res.status(200).json(blogs)
})

blogRouter.get('/:id', async (req, res, next) => {
  const result = await Blog.findById(req.params.id)
  res.status(200).json(result)
})

blogRouter.post('/', async (req, res, next) => {
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  
  if(!decodedToken.id)
    return next(error('Token invalid', 'AuthError'))

  const user = await User.findById(decodedToken.id)
  if(!user)
    return next(error('User missing or invalid userId', 'CastError'))

  if(!req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('url'))
    return next(error('Missing required fields', 'MissingFields'))

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

blogRouter.patch('/:id', async (req, res, next) => {
  const updatedBlog = { ...req.body }

  const result = await Blog.findByIdAndUpdate(
    req.params.id,
    updatedBlog,
    { new: true, runValidators: true }
  )
  res.status(200).json(result)
})

blogRouter.delete('/:id', async (req, res, next) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = blogRouter