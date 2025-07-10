const { describe, test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('../libs/mongo')
const supertest = require('supertest')
const app =   require('../app')
const testHelper = require('./test_helper')

const api = supertest(app)

testHelper.dataInitialize()

describe('Test Blog API', () => {
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
    for(blog of res.body) {
      assert.ok(blog.hasOwnProperty('id'))
      assert.ok(!blog.hasOwnProperty('_id'))
    }
  })
})

after(async () => await mongoose.connection.close())