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

describe('favorite blog', () => {
  test('of empty list is "No post yet"', () => {
    const blogs = []

    assert.deepEqual(listHelper.favoriteBlog(blogs), 'No post yet')
  })

  test('when list has only one blog, get the only post', () => {
    const blogs = [
      {
        title: 'How my parents divorced happily',
        author: 'John Corner',
        url: 'www.mediem.com/kj3j490kdhjsjh',
        likes: 5674
      }
    ]

    assert.deepStrictEqual(listHelper.favoriteBlog(blogs),
      {
        title: 'How my parents divorced happily',
        author: 'John Corner',
        url: 'www.mediem.com/kj3j490kdhjsjh',
        likes: 5674
      }
    )
  })

  test('of a bigger list, get the most liked post', () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }  
    ]

    assert.deepStrictEqual(listHelper.favoriteBlog(blogs),
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }
    )
  })

  test('with mutiple most popular blogs, get any of them', () => {
    const blogs = [
      {
        title: 'How my parents divorced happily',
        author: 'John Corner',
        url: 'www.mediem.com/kj3j490kdhjsjh',
        likes: 10100
      },
      {
        title: 'The yesterday vibes',
        author: 'King Lee',
        url: 'www.mediem.com/dklf8923lrkjd',
        likes: 10100
      },
      ,
      {
        title: 'Make money wiser',
        author: 'kevin Brown',
        url: 'www.mediem.com/z30ijfsm89fhj8',
        likes: 5
      }
    ]

    assert.deepStrictEqual(listHelper.favoriteBlog(blogs),
      {
        title: 'How my parents divorced happily',
        author: 'John Corner',
        url: 'www.mediem.com/kj3j490kdhjsjh',
        likes: 10100
      }
    )
  })
})

describe('Author with most blogs', () => {
  test('of empty blogs is "No post yet"', () => {
    const blogs = []

    assert(listHelper.mostBlog(blogs), 'No post yet')
  })

  test('when list has only one blog, get the only author and count 1', () => {
    const blogs = [{
      title: 'How people work after covid-19',
      author: 'Kevin Brown',
      url: 'www.mediem.com/owiu4rlkdj',
      likes: 12937
    }]

    assert(listHelper.mostBlog(blogs), {
      author: 'Kevin Brown',
      blogs: 1
    })
  })

    test('of a bigger list, get the most-blogs author', () => {
      const blogs = [
        {
          title: 'How my parents divorced happily',
          author: 'John Corner',
          url: 'www.mediem.com/kj3j490kdhjsjh',
          likes: 10100
        },
        {
          title: 'The yesterday vibes',
          author: 'King Lee',
          url: 'www.mediem.com/dklf8923lrkjd',
          likes: 10100
        },
        {
          title: 'Make money wiser',
          author: 'Kevin Brown',
          url: 'www.mediem.com/z30ijfsm89fhj8',
          likes: 5
        },
        {
          title: 'University Law',
          author: 'King Lee',
          url: 'www.mediem.com/sdkfoihnk',
          likes: 2368
        },
        {
          title: 'How lyrics of 50 cent songs harm teenagers',
          author: 'King Lee',
          url: 'www.mediem.com/9ufjkdjslk',
          likes: 1002
        },
        {
          title: 'How people work after covid-19',
          author: 'Kevin Brown',
          url: 'www.mediem.com/owiu4rlkdj',
          likes: 12937
        }
      ]

      assert(listHelper.mostBlog(blogs), {
        author: 'King Lee',
        blogs: 3
      })
    })

    test('with mutiple most-blogs author, get any of them', () => {
      const blogs = [
        {
          title: 'The Labubu Phenomenon',
          author: 'Kevin Brown',
          url: 'www.mediem.com/doc32eon93jkbe',
          likes: 51023
        },
        {
          title: 'How my parents divorced happily',
          author: 'John Corner',
          url: 'www.mediem.com/kj3j490kdhjsjh',
          likes: 10100
        },
        {
          title: 'The yesterday vibes',
          author: 'King Lee',
          url: 'www.mediem.com/dklf8923lrkjd',
          likes: 10100
        },
        {
          title: 'Make money wiser',
          author: 'Kevin Brown',
          url: 'www.mediem.com/z30ijfsm89fhj8',
          likes: 5
        },
        {
          title: 'University Law',
          author: 'King Lee',
          url: 'www.mediem.com/sdkfoihnk',
          likes: 2368
        },
        {
          title: 'How lyrics of 50 cent songs harm teenagers',
          author: 'King Lee',
          url: 'www.mediem.com/9ufjkdjslk',
          likes: 1002
        },
        {
          title: 'How people work after covid-19',
          author: 'Kevin Brown',
          url: 'www.mediem.com/owiu4rlkdj',
          likes: 12937
        }
      ] 

      const result = listHelper.mostBlog(blogs)
      const expected = { author: 'Kevin Brown', blogs: 3} || { author: 'King Lee', blogs: 3 }

      assert(result, expected)
    })
})

describe('Author with most likes', () => {
  test('of empty blogs is "No post yet"', () => {
    const blogs = []

    assert(listHelper.mostLikes(blogs), 'No post yet')
  })

  test('when list has only one blog, get the only author and count 1', () => {
    const blogs = [{
      title: 'How people work after covid-19',
      author: 'Kevin Brown',
      url: 'www.mediem.com/owiu4rlkdj',
      likes: 12937
    }]

    assert(listHelper.mostBlog(blogs), {
      author: 'Kevin Brown',
      blogs: 1
    })
  })

    test('of a bigger list, get the most-likes author', () => {
      const blogs = [
        {
          title: 'How my parents divorced happily',
          author: 'John Corner',
          url: 'www.mediem.com/kj3j490kdhjsjh',
          likes: 10100
        },
        {
          title: 'The yesterday vibes',
          author: 'King Lee',
          url: 'www.mediem.com/dklf8923lrkjd',
          likes: 530
        },
        {
          title: 'Make money wiser',
          author: 'Kevin Brown',
          url: 'www.mediem.com/z30ijfsm89fhj8',
          likes: 5
        },
        {
          title: 'University Law',
          author: 'King Lee',
          url: 'www.mediem.com/sdkfoihnk',
          likes: 2368
        },
        {
          title: 'How lyrics of 50 cent songs harm teenagers',
          author: 'King Lee',
          url: 'www.mediem.com/9ufjkdjslk',
          likes: 1002
        },
        {
          title: 'How people work after covid-19',
          author: 'Kevin Brown',
          url: 'www.mediem.com/owiu4rlkdj',
          likes: 12937
        }
      ]

      assert(listHelper.mostBlog(blogs), {
        author: 'Kevin Brown',
        blogs: 12942
      })
    })

    test('with mutiple most-blogs author, get any of them', () => {
      const blogs = [
        {
          title: 'The Labubu Phenomenon',
          author: 'Kevin Brown',
          url: 'www.mediem.com/doc32eon93jkbe',
          likes: 105
        },
        {
          title: 'How my parents divorced happily',
          author: 'John Corner',
          url: 'www.mediem.com/kj3j490kdhjsjh',
          likes: 28
        },
        {
          title: 'The yesterday vibes',
          author: 'King Lee',
          url: 'www.mediem.com/dklf8923lrkjd',
          likes: 100
        },
        {
          title: 'Make money wiser',
          author: 'Kevin Brown',
          url: 'www.mediem.com/z30ijfsm89fhj8',
          likes: 5
        },
        {
          title: 'University Law',
          author: 'King Lee',
          url: 'www.mediem.com/sdkfoihnk',
          likes: 20
        }
      ] 

      const result = listHelper.mostBlog(blogs)
      const expected = { author: 'Kevin Brown', likes: 120} || { author: 'King Lee', likes: 120 }

      assert(result, expected)
    })
})