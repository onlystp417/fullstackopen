
const { v4: uuidv4 } = require('uuid')
let { books, authors } = require('../mockDB')

function addBook (root, args) {
  const authorIsSaved = authors.findIndex(author => author.name === args.author)
  if(authorIsSaved < 0) {
    authors.push({
      name: args.author,
      id: uuidv4()
    })
  }
  const newBook = { ...args, id: uuidv4() }
  books.push(newBook)
  return newBook
}

function editAuthor (root, args) {
  const authorToEdit = authors.find(author => author.name === args.name)
  if(!authorToEdit) return null
  authorToEdit.born = args.born
  authors = authors.map(author => author.name === args.name
    ? authorToEdit
    : author
  )
  return authorToEdit
}

module.exports = {
  addBook,
  editAuthor
}