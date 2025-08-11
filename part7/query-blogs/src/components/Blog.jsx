import { useState } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import style from '../styles/blog.module.sass'
import clsx from 'clsx'

const Blog = ({ blog, onUpdateBlog, onRemoveBlog }) => {
  const [hideDetail, setHidedetail] = useState(true)

  const hanbleVisibility = () => { setHidedetail(!hideDetail) }

  const handleLike = () => {
    const updateBlog = { ...blog, likes: blog.likes + 1 }
    delete updateBlog.user
    onUpdateBlog(updateBlog)
  }

  const handleRemove = () => {
    onRemoveBlog(blog)
  }

  const isDeleteBtnVisible = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user.token === blog.user.token
  }

  return (
    <div className={style.blog}>
      <div id={ blog.id } className={style.header}>
        <Link to={`/blog/${blog.id}`} state={blog.id}>{ blog.title }</Link>
        <div className="d-flex-content">
          <button data-testid="view-btn" onClick={ hanbleVisibility }>
            { hideDetail ? 'view' : 'hide' }
          </button>
          <button
            data-testid="delete-btn"
            className={clsx(!isDeleteBtnVisible && 'hide')}
            onClick={ handleRemove }>🗑️</button>
        </div>
      </div>
      <ul data-testid="detail" className={clsx(hideDetail && 'hide', style.detail)}>
        <li>Author: { blog.author }</li>
        <li>
          Likes: { blog.likes }
          <button data-testid="likes-btn" onClick={ handleLike }>👍</button>
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