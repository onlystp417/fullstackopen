const { describe, test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('../libs/mongo')
const supertest = require('supertest')
const app =   require('../app')
const testHelper = require('./test_helper')

const api = supertest(app)

describe.only('Test Blogs API', () => {
  testHelper.dataInitialize()

  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('All blogs are returned', async () => {
    const res = await api.get('/api/blogs')

    assert.strictEqual(res.body.length, testHelper.initialBlogs.length)
  })

  test('Blog identity field is "id", not "_id"', async () => {
    const res = await api.get('/api/blogs')
    for(let blog of res.body) {
      assert.ok(blog.hasOwnProperty('id'))
      assert.ok(!blog.hasOwnProperty('_id'))
    }
  })

  test('A valid blogs content can be added', async () => {
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

    const blogsAtEnd = await testHelper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length + 1)
    
    const titles = blogsAtEnd.map(blog => blog.title)
    assert(titles.includes('Backend learning road map'))
  })

  test.only('Initial "likes" as value 0 while it is a missing field', async () => {
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

    const blogsAtEnd = await testHelper.blogsInDb()
    
    const blogJustAdded = blogsAtEnd[blogsAtEnd.length - 1]
    assert(blogJustAdded.hasOwnProperty('likes'))
    assert.strictEqual(blogJustAdded.likes, 0)
  })
})

after(async () => await mongoose.connection.close())