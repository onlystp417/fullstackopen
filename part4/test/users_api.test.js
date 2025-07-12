const { describe, test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('../libs/mongo')
const supertest = require('supertest')
const app =   require('../app')
const testHelper = require('./test_helper')
const User = require('../models/user')

const api =supertest(app)

describe.only('Test Users API', () => {
  testHelper.dataInitialize(User, 'users')
  
  describe.only('POST - /api/users', () => {
    test.only('A valid user content can be added', async () => {
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
    
    test.only('Duplicated username cannot be added', async () => {
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
  })

})