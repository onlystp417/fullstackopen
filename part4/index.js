const app = require('./app')
const { PORT } = require('./utils/config')
const logger = require('./utils/logger')

app.listen(PORT, () => {
  console.log('PORT', PORT)
  logger.info(`Server running on port ${PORT}`)
})
