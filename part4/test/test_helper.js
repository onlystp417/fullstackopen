const { beforeEach } = require('node:test')
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'How my parents divorced happily',
    author: 'John Corner',
    url: 'www.mediem.com/kj3j490kdhjsjh',
    likes: 5674
  },
  {
    title: 'The yesterday vibes',
    author: 'King Lee',
    url: 'www.mediem.com/dklf8923lrkjd',
    likes: 10021
  }
]

const dataInitialize = () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })
}

module.exports = {
  initialBlogs,
  dataInitialize
}