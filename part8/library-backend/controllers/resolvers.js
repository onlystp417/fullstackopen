
const { v4: uuidv4 } = require('uuid')
import { books, authors } from '../mockDB'

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      const booksByAuthor = args.author
        ? books.filter(book => book.author === args.author)
        : books
      const booksByGenres = args.genre
        ? booksByAuthor.filter(book => book.genres.includes(args.genre))
        : booksByAuthor

        return booksByGenres.map(({ title, author, published, genres }) => (
          { title, author, published, genres }
        ))
    },
    allAuthors: () => authors.map(author => {
      let bookCount = 0
      books.forEach(book => {
        if(book.author === author.name)
          bookCount += 1
      })
      return {
        ...author,
        name: author.name,
        bookCount
      }
    })
  },
  Mutation: {
    addBook: (root, args) => {
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
    },
    editAuthor: (root, args) => {
      const authorToEdit = authors.find(author => author.name === args.name)
      if(!authorToEdit) return null
      authorToEdit.born = args.born
      authors = authors.map(author => author.name === args.name
        ? authorToEdit
        : author
      )
      return authorToEdit
    }
  }
}

export default resolvers