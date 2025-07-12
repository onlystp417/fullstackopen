const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const error = require('../utils/error')

userRouter.post('/', async (req, res) => {
  const { password, userName, name } = req.body

  if(!password)
    throw error('User validation failed: Path `password` is required.', 'ValidationError')
  else if (password.length < 3)
    throw error(`Path password is shorter than the minimum allowed length (3)`, 'ValidationError')

  const passwordHash = await bcrypt.hash(password, 10) // 10 is saltRound to decide how slower it take / how safe it is

  const newUser = new User({ passwordHash, name, userName })
  const result = await newUser.save()
  res.status(201).json(result)
})

module.exports = userRouter