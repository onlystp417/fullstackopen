const express = require('express')
const app = express()
const PORT = process.env.PORT || 8001 // Use process.env.PORT for flexibility
const morgan = require('morgan')
const cors = require('cors')

const { generateId } = require('./utils')

let phonebook = require('./db.json')

app.use(cors())
app.use(express.json())
// app.use(morgan('tiny'))
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// app.use(morgan('tiny', {
//   skip: function (req, res) { return res.statusCode < 400 }
// }))

app.get('/', (req, res) => {
  res.send('<h1>Hello Phonebook</h1>')
})

app.get('/api/persons', (req, res) => {
  res.status(200).json(phonebook)
})

app.get('/api/info', (req, res) => {
  const currentTime = new Date
  const totalPerson = phonebook.length
  res.status(200).send(`
    <p>Phonebook has info for ${totalPerson} people.</p>
    <p>${currentTime.toString()}</p>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = phonebook.find(person => person.id === id)
  
  if(!person) {
    return res.status(404).send('No person was found')
  }

  res.status(200).json(person)
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
  const nameIsDuplicated = phonebook.findIndex(person => person.name === body.name)

  if(!(body.name && body.number)) {
    return res.status(400).json({ 
      error: 'Content missing' 
    })
  } else if(nameIsDuplicated) {
    return res.status(400).json({ 
      error: 'Name must be unique' 
    })
  }

  const person = {
    id: generateId(phonebook),
    ...body
  }

  phonebook = phonebook.concat(person)

  res.status(201).json(person)
})

app.listen(PORT)
console.log(`Server listen to port ${PORT}`)