const Book = require('../models/Book')
const Author = require('../models/Author')
const { GraphQLError } = require('graphql')

async function addBook (root, args) {
  let author = await Author.findOne({ name: args.author })
  if(!author) {
    try {
      author = await Author.create({ name: args.author })
    } catch(error) {
      throw new GraphQLError('Creating the author failed', {
        extensions: {
          code: 'BAD_INPUT',
          error: error.message
        }
      })
    }
  }

  try {
    const newBook = await Book.create({
      ...args,
      author: author.id
    })
    return {
      ...newBook.toJSON(),
      author: author.toJSON()
    }
  } catch(error) {
    throw new GraphQLError('Creating the book failed', {
      extensions: {
        code: 'BAD_INPUT',
        error: error.message
      }
    })
  }
}

async function editAuthor (root, args) {
  try {
    const editedAuthor = await Author.findByIdAndUpdate(
      args.id,
      { born: args.born },
      { new: true }
    )
    return editedAuthor
  } catch(error) {
    throw new GraphQLError('Updating the author failed', {
      extensions: {
        code: 'BAD_INPUT',
        error: error.message
      }
    })
  }
}

module.exports = {
  addBook,
  editAuthor
}