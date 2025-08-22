const Book = require('../models/Book')
const Author = require('../models/Author')
const User = require('../models/User')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

async function addBook (root, args, { currentUser }) {
  if(!currentUser) throw new GraphQLError('Unauthorized')

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

async function editAuthor (root, args, { currentUser }) {
  try {
    if(!currentUser) throw new GraphQLError('Unauthorized')

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

async function createUser (root, args) {
  const { username, favoriteGenre, password } = args
  try {
    const newUser = await User.create({
      username,
      favoriteGenre,
      password
    })
    return newUser
  } catch(error) {
    throw new GraphQLError('Creating user faild', {
      extensions: {
        code: 'BAD_INPUT',
        error: error.message
      }
    })
  }
}

async function login (root, args) {
  const { username, password } = args

  try {
    const user = await User.findOne({ username })

    if(!user && user.password !== password) {
      throw new Error('Username or password incorrect')
    }

    const userForToken = {
      username,
      id: user.id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    return { token }
  } catch(error) {
    throw new GraphQLError('Login faild', {
      extensions: {
        code: 'BAD_AUTH',
        error: error.message
      }
    })
  }



}

module.exports = {
  addBook,
  editAuthor,
  createUser,
  login
}