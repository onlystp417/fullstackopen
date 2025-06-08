const mongoose = require('mongoose')
require('dotenv').config()

console.log(process.argv)

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2] || process.env.MONGODB_PASSWORD
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://onlystp417:${password}@cluster0.1uslvx3.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phone = mongoose.model('phone', phoneSchema)

const phone = new Phone({ name, number })

phone.save().then(result => {
  console.log(`added ${result.name} number ${result.number} to phonebook`)
  mongoose.connection.close()
})

