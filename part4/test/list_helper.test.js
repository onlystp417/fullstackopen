const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  
  assert.strictEqual(listHelper.dummy(blogs), 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []

    assert.strictEqual(listHelper.totalLikes(blogs), 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const blogs = [
      {
        title: 'How my parents divorced happily',
        author: 'John Corner',
        url: 'www.mediem.com/kj3j490kdhjsjh',
        likes: 5674
      }
    ]

    assert.strictEqual(listHelper.totalLikes(blogs), 5674)
  })
  
  test('of a bigger list is caculated right', () => {
    const blogs = [
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
      },
      ,
      {
        title: 'Make money wiser',
        author: 'kevin Brown',
        url: 'www.mediem.com/z30ijfsm89fhj8',
        likes: 2
      }
    ]

    assert.strictEqual(listHelper.totalLikes(blogs), 15697)
  }) 
})
