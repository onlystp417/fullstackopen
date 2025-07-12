const mongoose = require('mongoose')

const createBaseModel = (definition, modelName) => {
  const baseSchema = mongoose.Schema(definition)
  baseSchema.set('toJSON', {
    transform: (document, returnObject) => {
      returnObject.id = returnObject._id.toString()

      delete returnObject._id
      delete returnObject.__v
    }
  })

  return mongoose.model(modelName, baseSchema)
}

module.exports = { createBaseModel }