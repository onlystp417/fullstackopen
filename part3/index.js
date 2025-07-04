const express = require('express')
const app = express()
const PORT = process.env.PORT || 8001 // Use process.env.PORT for flexibility
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('./mongo')
const Phone = require('./models/phone')

// custom middleware
const errorMiddleware = (error, request, response, next) => {
  console.log(error.message);
  
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  
  next(error)
}

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(errorMiddleware) // use custom middleware in the last line

app.get('/', (req, res) => {
  res.send('<h1>Hello Phonebook</h1>')
})

app.get('/api/persons', (req, res, next) => {
  Phone.find({})
    .then(phones => res.status(200).json(phones))
    .catch(error => next(error))
})

app.get('/api/info', (req, res, next) => {
  Phone.countDocuments()
    .then(count => {
      const currentTime = new Date
      
      res.status(200).send(`
      <p>Phonebook has info for ${count} people.</p>
      <p>${currentTime.toString()}</p>
    `)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Phone.findById({ id: req.params.id })
    .then(phone => res.status(200).json(phone))
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Phone.findByIdAndDelete(id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  const phone = new Phone({ ...body })

  if(!(body.name && body.number)) {
    return res.status(400).json({ 
      error: 'Content missing' 
    })
  }

  phone.save()
    .then(savedPhone => res.status(201).json(savedPhone))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { number } = req.body
  const id = req.params.id

  Phone.findByIdAndUpdate(id, { number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => res.status(201).json(updatedPerson))
    .catch(error => next(error))
})

app.listen(PORT)
console.log(`Server listen to port ${PORT}`)