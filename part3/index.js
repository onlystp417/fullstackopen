const express = require('express')
const app = express()
const PORT = 8001

const { generateId } = require('./utils')

let phonebook = require('./db.json')

app.use(express.json())

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
  const isPersonExist = phonebook.findIndex(person => person.id === id)

  if(isPersonExist < 0) return res.status(404).send('Person is not in the phonebook')

  phonebook = phonebook.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  console.log(body)

  if(!(body.name && body.number)) {
    return res.status(400).json({ 
      error: 'Content missing' 
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