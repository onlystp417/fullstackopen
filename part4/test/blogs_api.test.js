const { describe, test, after, afterEach } = require('node:test')
const assert = require('node:assert')
const { beforeEach } = require('node:test')
const mongoose = require('../libs/mongo')
const supertest = require('supertest')
const app =   require('../app')
const testHelper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('Test Blogs API', () => {
  let userId, token
  beforeEach(async () => {
    await testHelper.dataInitialize(Blog, 'blogs')
    await User.deleteMany({})
    await api
      .post('/api/users')
      .send(testHelper.initialData.users[0])

    const loginRes = await api  
      .post('/api/login')
      .send(testHelper.initialData.users[0])

    userId = loginRes.body.id
    token = loginRes.body.token
  })

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

  describe('POST - /api/blogs', () => {
    test('A valid blog content can be added', async () => {
      const newBlog = {
        title: 'Backend learning road map',
        url: 'www.mediem.com/Backend_learning_road_map',
        userId
      }

      const res = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await testHelper.dataInDb(Blog)
      const usersAtEnd = await testHelper.dataInDb(User)
      const userAtEnd = usersAtEnd.find(user => user.id === userId)
      // blogs is deep array, toJSON only do the forst layer fields in user
      const userBlogsAtEnd = userAtEnd.blogs.map(blog => blog.toJSON())
  
      assert.strictEqual(blogsAtEnd.length, testHelper.initialData.blogs.length + 1)
      assert.strictEqual(res.body.userId, userId)
      assert(userBlogsAtEnd.includes(res.body.id))
      
      const titles = blogsAtEnd.map(blog => blog.title)
      assert(titles.includes('Backend learning road map'))
    })
  
    test('Initial "likes" as value 0 while it is a missing field', async () => {
      const newBlogMissingLikes = {
        title: 'Backend learning road map',
        url: 'www.mediem.com/Backend_learning_road_map',
        userId
      }
  
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogMissingFields)
        .expect(400)
    })

    test('Status code 401 Unauthorized if a token is not provided', async () => {
      const newBlogMissingLikes = {
        title: 'Backend learning road map',
        url: 'www.mediem.com/Backend_learning_road_map',
        userId
      }
  
      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ')
        .send(newBlogMissingLikes)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('DELETE - /api/blogs/:id', () => {
    test('Successfully deletion respond status 204', async () => {
      const newBlog = {
        title: 'Backend learning road map',
        url: 'www.mediem.com/Backend_learning_road_map',
        userId
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)

      const currentUser = await User.findById(userId)
      const blogIdToBeDeleted = currentUser.blogs[0]

      const res = await api
        .delete(`/api/blogs/${blogIdToBeDeleted}`)
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await testHelper.dataInDb(Blog)
      const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToBeUpdated.id)

      assert.strictEqual(updatedBlog.likes, blogToBeUpdated.likes + 1)
    })
  })
})

after(async () => await mongoose.connection.close())