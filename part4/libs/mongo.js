const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')
const logger = require('../utils/logger')

mongoose.set('strictQuery',false)

mongoose.connect(MONGODB_URI, { family: 4 })
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error(`Connection error: ${err.message}`))

module.exports = mongoose