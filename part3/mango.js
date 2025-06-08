const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = "mongodb+srv://onlystp417:LeH7enYeE6PH0W7Z@cluster0.1uslvx3.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'JavaScript is interesting',
//   important: false,
// })

// note.save().then(result => {
//   console.log(result)
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})