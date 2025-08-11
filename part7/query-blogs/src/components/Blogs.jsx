import { useState, useMemo } from 'react'
import { useBlogsQuery, useBlogsMutation } from '../hooks/useBlogs'
import { useAuth } from '../contexts/authContext'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const Blogs = () => {
  const auth = useAuth()
  const { data: blogs } = useBlogsQuery()
  const { createBlog, updateBlog, deleteBlog } = useBlogsMutation()
  const [desc, setDesc] = useState(true)
  const activeStyle = { backgroundColor: '#292e2a', color: 'white' }

  const blogsForUI = useMemo(() => {
    const sorted = [...blogs].sort((a, b) => {
      return desc
        ? b.likes - a.likes // desc
        : a.likes - b.likes // asc
    })
    return sorted.map(blog => ({ ...blog, user: auth }))
  }, [blogs, auth, desc])

  const handleDesc = (sortType) => {
    sortType === 'desc' ? setDesc(true) : setDesc(false)
  }

  return (
    <>
      <Togglable buttonLable="Add blog">
        <BlogForm onCreateBlog={ createBlog.mutate } />
      </Togglable>
      <hr />
      <div className="d-flex-content">
        <h2>Blogs</h2>
        <div>
          <button onClick={ () => handleDesc('desc') } style={ desc ? activeStyle : null }>▼</button>
          <button onClick={ () => handleDesc('asc') } style={ desc ? null : activeStyle }>▲</button>
        </div>
      </div>
      <div>
        { blogsForUI.map(blog => <Blog
          key={ blog.id }
          blog={ blog }
          onUpdateBlog={ updateBlog.mutate }
          onRemoveBlog={ deleteBlog.mutate }
        />) }
      </div>
    </>
  )
}

export default Blogs