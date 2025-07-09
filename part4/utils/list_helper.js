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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}