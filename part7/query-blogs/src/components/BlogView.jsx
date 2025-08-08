import { useState } from 'react'
import { useLocation } from 'react-router'
import { useBlogQuery, useBlogsMutation } from '../hooks/useBlogs'

const Blog = () => {
  const { state: blogId } = useLocation()
  const { data: blog } = useBlogQuery(blogId)
  const { updateBlog } = useBlogsMutation()
  const [comment, setComment] = useState('')

  function handleComment(e) {
    e.preventDefault()
    const commentedBlog = {
      ...blog,
      comments: blog.comments.concat(comment)
    }
    updateBlog.mutate(commentedBlog)
    setComment('')
  }

  return (
    <>
      <h2>{ blog.title }</h2>
      <p>{ blog.likes } likes</p>
      <p>Added by <b><i>{ blog.author }</i></b></p>
      <hr />
      <h3>Comments:</h3>
      <ul>
        { (blog?.comments || []).map((comment, index) => (
          <li key={index}>{ comment }</li>
        ))}
      </ul>
      <hr />
      <form onSubmit={ handleComment }>
        <label htmlFor="comment">
          <span>Add comment: </span>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </label>
        <button>Add</button>
      </form>
    </>
  )
}

export default Blog