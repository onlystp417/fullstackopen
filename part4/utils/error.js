const error = (message, name) => {
  const errorObj = new Error(message)
  name && (errorObj.name = name)

  return errorObj
}

module.exports = error