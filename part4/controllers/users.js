const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const error = require('../utils/error')

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.status(200).json(users)
})

userRouter.post('/', async (req, res, next) => {
  const { password, userName, name } = req.body

  if(!password)
    next(error('User validation failed: Path `password` is required.', 'ValidationError'))
  else if (password.length < 3)
    next(error(`Path password is shorter than the minimum allowed length (3)`, 'ValidationError'))

  const passwordHash = await bcrypt.hash(password, 10) // 10 is saltRound to decide how slower it take / how safe it is

  const newUser = new User({ passwordHash, name, userName })
  const result = await newUser.save()
  res.status(201).json(result)
})

module.exports = userRouter