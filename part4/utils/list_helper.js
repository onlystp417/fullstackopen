const countBy = require('lodash/countBy')
const toPairs = require('lodash/toPairs')
const maxBy = require('lodash/maxBy')

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, currentPost) => {
    return sum += currentPost.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if(!blogs.length)
    return 'No post yet'

  return blogs.reduce((favorite, current) => {
    return current.likes > favorite.likes ? current : favorite
  }) // if initialValue is not specified, it will initialed the first item in the array
}

const mostBlog = (blogs) => {
  if (!blogs.length)
    return 'No post yet'

  // const most = maxBy(toPairs(countBy(blogs, 'author')), item => item[1])
  const countBlogs = blogs.reduce((authorBlogs, current) => {
    if(authorBlogs.hasOwnProperty(current.author)) {
      authorBlogs[current.author] += 1 
    } else {
      authorBlogs[current.author] = 1
    }

    return authorBlogs
  }, {})

  const mostAuthor = Object.keys(countBlogs).reduce(
    (a, b) => countBlogs[a] > countBlogs[b] ? a : b 
  );

  return {
    author: mostAuthor,
    blogs: countBlogs[mostAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog
}