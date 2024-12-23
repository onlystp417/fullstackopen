const express = require('express')
const app = express()
const PORT = 8001

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

app.listen(PORT)
console.log(`Server listen to port ${PORT}`)