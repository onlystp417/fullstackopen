import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onUpdateBlog, onRemoveBlog }) => {
  const [showDetail, setShowDetail] = useState(false)
  const hide = { display : 'none' }
  const show = { display: 'block' }
  const blogStyle = { border: 'solid #a4bfab', padding: '10px', margin: '0 0 5px 0' }
  const header = { display: 'flex', justifyContent: 'space-between', width: '600px' }
  const content = { backgroundColor: '#bed2c3ff', padding: '15px', margin: '5px 0' }
  const likeStyle= { border: 'none', backgroundColor: 'inherit', marginLeft: '5px', cursor: 'pointer' }

  const hanbleVisibility = () => { setShowDetail(!showDetail) }

  const handleLike = () => {
    const updateBlog = { ...blog, likes: blog.likes + 1 }
    delete updateBlog.user
    onUpdateBlog(updateBlog)
  }

  const handleRemove = () => {
    onRemoveBlog(blog)
  }

  return (
    <div style={ blogStyle }>
      <div id={ blog.id } style={ header }>
        { blog.title }
        <div>
          <button onClick={ hanbleVisibility }>{ showDetail ? 'hide' : 'view' }</button>
          <button style={{ marginLeft: '10px' }} onClick={ handleRemove }>🗑️</button>
        </div>
      </div>
      <ul style={{ ...(showDetail ? show : hide), ...content }}>
        <li>Author: { blog.author }</li>
        <li>
          Likes: { blog.likes }
          <button style={ likeStyle } onClick={ handleLike }>👍</button>
        </li>
        <li>URL: { blog.url }</li>
        <p>{ blog.user.name }</p>
      </ul>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onUpdateBlog: PropTypes.func.isRequired,
  onRemoveBlog: PropTypes.func.isRequired
}

export default Blog