const express = require('express')
require('./libs/mongo') // connet to MongoDB
const { errorHandler, unknownEndpoint, requestLogger } = require('./utils/middleware')
const app = express()

// controllers
const blogRouter = require('./controllers/blogs')

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)
app.use('/api/blogs', blogRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app