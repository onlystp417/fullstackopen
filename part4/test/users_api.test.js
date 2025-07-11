const { describe, test, after } = require('node:test')
const assert = require('node:assert')
require('../libs/mongo')
const supertest = require('supertest')
const app =   require('../app')
const testHelper = require('./test_helper')
const User = require('../models/user')

const api =supertest(app)

describe('Test Users API', () => {
  testHelper.dataInitialize(User, 'users')

  describe('GET - /api/users', () => {
    test('Blogs are returned as JSON', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  
    test('All blogs are returned', async () => {
      const res = await api.get('/api/users')
  
      assert.strictEqual(res.body.length, testHelper.initialData.users.length)
    })

    test('Blog identity field is "id", not "_id"', async () => {
      const res = await api.get('/api/users')
      for(let user of res.body) {
        assert.ok(user.hasOwnProperty('id'))
        assert.ok(!user.hasOwnProperty('_id'))
      }
    })
  })
  
  describe('POST - /api/users', () => {
    test('A valid user content can be added', async () => {
      const newUser = {
        userName: 'onlystp',
        name: 'Jin Hsieh',
        password: 'alibuda8877'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await testHelper.dataInDb(User)
      assert.strictEqual(usersAtEnd.length, testHelper.initialData.users.length + 1)
  
      const userNames = usersAtEnd.map(user => user.userName )
      assert(userNames.includes('onlystp'))
    })
    
    test('Duplicated username cannot be added', async () => {
      const usersAtStart = await testHelper.dataInDb(User)

      const newUser = {
        userName: 'root',
        name: 'Heisenberg White',
        password: 'bilibalapon'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(result.body.error, `${newUser.userName} is been used`)

      const usersAtEnd = await testHelper.dataInDb(User)
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('Password and userName must be atleast 3 chars long', async () => {
      const usersAtStart = await testHelper.dataInDb(User)

      const newUser = {
        userName: 'ro',
        name: 'Heisenberg White',
        password: 'bilibalapon'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(result.body.error.includes('shorter than the minimum allowed length (3)'))

      const usersAtEnd = await testHelper.dataInDb(User)
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })

})