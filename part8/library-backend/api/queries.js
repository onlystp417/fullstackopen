let { books, authors } = require('../mockDB')

function authorCount () {
  return authors.length
}

function bookCount () {
  return books.length
}

function allBooks (root, args) {
  const booksByAuthor = args.author
    ? books.filter(book => book.author === args.author)
    : books

  const booksByGenres = args.genre
    ? booksByAuthor.filter(book => book.genres.includes(args.genre))
    : booksByAuthor

  return booksByGenres.map(({ title, author, published, genres }) => (
    { title, author, published, genres }
  ))
}

function allAuthors () {
  return authors.map(author => {
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
}

module.exports = {
  authorCount,
  bookCount,
  allBooks,
  allAuthors
}