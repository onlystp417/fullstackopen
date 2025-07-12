const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res) => {
  const { password, userName, name } = req.body

  if(!password) {
    const error = new Error('User validation failed: Path `password` is required.')
    error.name === 'ValidationError'
    throw error
  }

  const passwordHash = await bcrypt.hash(password, 10) // 10 is saltRound to decide how slower it take / how safe it is

  const newUser = new User({ passwordHash, name, userName })
  const result = await newUser.save()
  res.status(201).json(result)
})

module.exports = userRouter