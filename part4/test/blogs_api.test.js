const { describe, test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('../libs/mongo')
const supertest = require('supertest')
const app =   require('../app')
const testHelper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe.only('Test Blogs API', () => {
  testHelper.dataInitialize(Blog, 'blogs')

  describe('GET - /api/blogs', () => {
    test('Blogs are returned as JSON', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  
    test('All blogs are returned', async () => {
      const res = await api.get('/api/blogs')
  
      assert.strictEqual(res.body.length, testHelper.initialData.blogs.length)
    })
  
    test('Blog identity field is "id", not "_id"', async () => {
      const res = await api.get('/api/blogs')
      for(let blog of res.body) {
        assert.ok(blog.hasOwnProperty('id'))
        assert.ok(!blog.hasOwnProperty('_id'))
      }
    })
  })

  describe.only('POST - /api/blogs', () => {
    test('A valid blog content can be added', async () => {
      const newBlog = {
        title: 'Backend learning road map',
        author: 'Zack Vincene',
        url: 'www.mediem.com/Backend_learning_road_map',
        likes: 3936
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await testHelper.dataInDb(Blog)
  
      assert.strictEqual(blogsAtEnd.length, testHelper.initialData.blogs.length + 1)
      
      const titles = blogsAtEnd.map(blog => blog.title)
      assert(titles.includes('Backend learning road map'))
    })
  
    test('Initial "likes" as value 0 while it is a missing field', async () => {
      const newBlogMissingLikes = {
        title: 'Backend learning road map',
        author: 'Zack Vincene',
        url: 'www.mediem.com/Backend_learning_road_map'
      }
  
      await api
        .post('/api/blogs')
        .send(newBlogMissingLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await testHelper.dataInDb(Blog)
      
      const blogJustAdded = blogsAtEnd[blogsAtEnd.length - 1]
      assert(blogJustAdded.hasOwnProperty('likes'))
      assert.strictEqual(blogJustAdded.likes, 0)
    })
  
    test('Bad request 400 while "title" or "url" properties are missing', async () => {
      const newBlogMissingFields = {
        author: 'Zack Vincene',
        likes: 134
      }
  
      await api
        .post('/api/blogs')
        .send(newBlogMissingFields)
        .expect(400)
    })
  })

  describe('DELETE - /api/blogs/:id', () => {
    test('Successfully deletion respond status 204', async () => {
      const currentBlogs = await testHelper.dataInDb(Blog)
      const blogIdToBeDeleted = currentBlogs.find(blog => blog.title === 'How my parents divorced happily').id

      await api.delete(`/api/blogs/${blogIdToBeDeleted}`)
        .expect(204)

      const blogsAtEnd = await testHelper.dataInDb(Blog)
      const isBlogInData = blogsAtEnd.find(blog => blog.id === blogIdToBeDeleted)

      assert.strictEqual(isBlogInData, undefined)
    })
  })

  describe('PATCH - /api/blogs/:id', () => {
    test('Update likes of blog and get the right likes', async () => {
      const currentBlogs = await testHelper.dataInDb(Blog)
      const blogToBeUpdated = currentBlogs.find(blog => blog.title === 'The yesterday vibes')
      const likes = blogToBeUpdated.likes + 1

      await api.patch(`/api/blogs/${blogToBeUpdated.id}`)
        .send({ likes })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await testHelper.dataInDb(Blog)
      const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToBeUpdated.id)

      assert.strictEqual(updatedBlog.likes, blogToBeUpdated.likes + 1)
    })
  })
})

after(async () => await mongoose.connection.close())