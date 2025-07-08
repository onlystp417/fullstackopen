const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, currentPost) => {
    return sum += currentPost.likes
  }, 0)
}

module.exports = {
  dummy,
  totalLikes
}