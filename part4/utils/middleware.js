const logger = require('./logger')

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  const token = auth && auth.startsWith('Bearer ') ? auth.replace('Bearer ', '') : null
  req.token = token
  next()
}

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  // logger.error(error)
  logger.error(error.name)
  logger.error(error.message)

  if(error.name === 'AuthError')
    return response.status(401).send({ error: error.message })

  if(error.name === 'CastError')
    return response.status(400).send({ error: error.message })

  if(error.name === 'MissingFields')
    return response.status(400).send({ error: error.message })

  if(error.name === 'ValidationError')
    return response.status(400).send({ error: error.message })

  if(error.name === 'MongoServerError' && error.message.includes('E11000'))
    return response.status(400).send({error: `${request.body.userName} is been used`})
}

module.exports = {
  tokenExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler
}