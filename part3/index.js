const express = require('express')
const app = express()
const PORT = process.env.PORT || 8001 // Use process.env.PORT for flexibility
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('./mango')
const Phone = require('./models/phone')

const { generateId } = require('./utils')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (req, res) => {
  res.send('<h1>Hello Phonebook</h1>')
})

app.get('/api/persons', (req, res) => {
  Phone.find({}).then(phones => res.status(200).json(phones))
})

app.get('/api/info', (req, res) => {
  Phone.find({}).then(phones => {
    const currentTime = new Date
    const totalPerson = phones.length

    res.status(200).send(`
      <p>Phonebook has info for ${totalPerson} people.</p>
      <p>${currentTime.toString()}</p>
    `)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Phone.findById({ id: req.params.id }).then(phone => {
    if(!phone) {
      return res.status(404).send('No person was found')
    }
    res.status(200).json(phone)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const isPersonExist = phonebook.some(person => person.id === id)

  if(isPersonExist) return res.status(404).send('Person is not in the phonebook')

  phonebook = phonebook.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  const phone = new Phone({ ...body })
  // const nameIsDuplicated = phonebook.some(person => person.name === body.name)

  if(!(body.name && body.number)) {
    return res.status(400).json({ 
      error: 'Content missing' 
    })
  }
  // else if(nameIsDuplicated) {
  //   return res.status(400).json({ 
  //     error: 'Name must be unique' 
  //   })
  // }

  phone.save().then(savedPhone => {
    res.status(201).json(savedPhone)
  })

})

app.listen(PORT)
console.log(`Server listen to port ${PORT}`)