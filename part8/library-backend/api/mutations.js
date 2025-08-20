const Book = require('../models/Book')
const Author = require('../models/Author')

async function addBook (root, args) {
  let author = await Author.findOne({ name: args.author })
  if(!author) {
    author = await Author.create({ name: args.author })
  }

  const newBook = await Book.create({
    ...args,
    author: author.id
  })

  return {
    ...newBook.toJSON(),
    author: author.toJSON()
  }
}

async function editAuthor (root, args) {
  const editedAuthor = await Author.findByIdAndUpdate(
    args.id,
    { born: args.born },
    { new: true }
  )
  return editedAuthor
}

module.exports = {
  addBook,
  editAuthor
}