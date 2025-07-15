const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const error = require('../utils/error')

loginRouter.post('/', async (req, res) => {
  const { password, userName } = req.body

  if(!password || !userName)
    return next('Missing password or userName', 'MissingFields')

  const user = await User.findOne({ userName })
  const passwordCorrect = user && await bcrypt.compare(password, user.passwordHash)
  // console.log('user', user)
  // console.log('passwordCorrect', passwordCorrect)

  if (!passwordCorrect)
    return next(error('Invalid username or password', 'AuthError'))

  const userForToken = {
    userName: user.userName,
    id: user._id.toString()
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).send({
    token,
    userName: user.userName,
    name: user.name,
    id: user._id.toString()
  })
})

module.exports = loginRouter

