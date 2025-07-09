const countBy = require('lodash/countBy')
const toPairs = require('lodash/toPairs')
const maxBy = require('lodash/maxBy')
const groupBy = require('lodash/groupBy');
const sumBy = require('lodash/sumBy');
const map = require('lodash/map');

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

const mostLikes = (blogs) => {
  if (!blogs.length)
    return 'No post yet'
  // const grouped = groupBy(blogs, 'author');

  // const authorLikes = map(grouped, (posts, author) => ({
  //   author,
  //   likes: sumBy(posts, 'likes'),
  // }));

  // return maxBy(authorLikes, 'likes');

  const countLikes = blogs.reduce((authorLikes, current) => {
    if(authorLikes.hasOwnProperty(current.author)) {
      authorLikes[current.author] += current.likes
    } else {
      authorLikes[current.author] = current.likes
    }
    return authorLikes
  }, {})
  
  const mostLikesAuthor = Object.keys(countLikes).reduce(
    (a, b) => countLikes[a] > countLikes[b] ? a : b 
  );

  return {
    author: mostLikesAuthor,
    likes: countLikes[mostLikesAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes
}